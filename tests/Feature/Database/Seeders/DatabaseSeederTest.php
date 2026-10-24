<?php

namespace Tests\Feature\Database\Seeders;

use App\Models\Account;
use App\Models\AccountingPeriod;
use App\Models\AccountOpeningBalance;
use App\Models\Foundation;
use Database\Seeders\AccountingPeriodSeeder;
use Database\Seeders\AccountOpeningBalanceSeeder;
use Database\Seeders\AccountSeeder;
use Database\Seeders\FoundationSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Support\Str;
use RuntimeException;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use LazilyRefreshDatabase;

    public function test_database_seeder_creates_uuid_foundations_and_accounts_for_each_foundation(): void
    {
        $this->seed();

        $this->seed(FoundationSeeder::class);
        $this->seed(AccountSeeder::class);
        $this->seed(AccountingPeriodSeeder::class);
        $this->seed(AccountOpeningBalanceSeeder::class);

        $this->assertDatabaseCount('foundations', 3);
        $this->assertDatabaseCount('accounts', 45);
        $this->assertDatabaseCount('account_opening_balances', 15);

        $foundations = Foundation::query()->withCount('accounts')->get();

        foreach ($foundations as $foundation) {
            $this->assertTrue(Str::isUuid($foundation->id));
            $this->assertSame(15, $foundation->accounts_count);
        }

        foreach (Account::query()->get() as $account) {
            $this->assertTrue(Str::isUuid($account->id));
        }

        $foundation = Foundation::query()
            ->where('code', 'YPJ-001')
            ->firstOrFail();
        $period = AccountingPeriod::query()
            ->whereBelongsTo($foundation)
            ->where('period_name', '2026')
            ->firstOrFail();

        $this->assertTrue(Str::isUuid($period->id));
        $this->assertSame('2026-01-01', $period->start_date->toDateString());
        $this->assertSame('2026-12-31', $period->end_date->toDateString());

        $cashAccount = Account::query()
            ->whereBelongsTo($foundation)
            ->where('code', '11011')
            ->firstOrFail();

        $cashOpeningBalance = AccountOpeningBalance::query()
            ->whereBelongsTo($cashAccount)
            ->whereBelongsTo($period)
            ->firstOrFail();

        $this->assertTrue(Str::isUuid($cashOpeningBalance->id));
        $this->assertSame('11401376.00', $cashOpeningBalance->debit_amount);
        $this->assertSame('0.00', $cashOpeningBalance->credit_amount);

        $netAssetsAccount = Account::query()
            ->whereBelongsTo($foundation)
            ->where('code', '31011')
            ->firstOrFail();

        $netAssetsOpeningBalance = AccountOpeningBalance::query()
            ->whereBelongsTo($netAssetsAccount)
            ->whereBelongsTo($period)
            ->firstOrFail();

        $this->assertSame('0.00', $netAssetsOpeningBalance->debit_amount);
        $this->assertSame('333734771.12', $netAssetsOpeningBalance->credit_amount);

        $otherFoundations = Foundation::query()
            ->where('id', '!=', $foundation->id)
            ->get();

        foreach ($otherFoundations as $otherFoundation) {
            $this->assertSame(0, $otherFoundation->accountOpeningBalances()->count());
        }
    }

    public function test_opening_balance_seeders_can_run_repeatedly_without_duplicate_rows(): void
    {
        $this->seed();

        $this->seed(AccountSeeder::class);
        $this->seed(AccountingPeriodSeeder::class);
        $this->seed(AccountOpeningBalanceSeeder::class);

        $this->assertDatabaseCount('account_opening_balances', 15);
        $this->assertDatabaseCount('accounting_periods', 1);
    }

    public function test_an_account_can_have_different_opening_balances_for_multiple_periods(): void
    {
        $this->seed();

        $foundation = Foundation::query()
            ->where('code', 'YPJ-001')
            ->firstOrFail();
        $account = Account::query()
            ->whereBelongsTo($foundation)
            ->where('code', '11011')
            ->firstOrFail();
        $currentPeriod = AccountingPeriod::query()
            ->whereBelongsTo($foundation)
            ->where('period_name', '2026')
            ->firstOrFail();
        $nextPeriod = AccountingPeriod::create([
            'foundation_id' => $foundation->id,
            'period_name' => '2027',
            'start_date' => '2027-01-01',
            'end_date' => '2027-12-31',
            'is_closed' => false,
        ]);

        AccountOpeningBalance::create([
            'foundation_id' => $foundation->id,
            'accounting_period_id' => $nextPeriod->id,
            'account_id' => $account->id,
            'debit_amount' => '250.00',
            'credit_amount' => '0.00',
        ]);

        $currentPeriodBalance = $account->openingBalances()
            ->whereBelongsTo($currentPeriod)
            ->firstOrFail();
        $nextPeriodBalance = $account->openingBalances()
            ->whereBelongsTo($nextPeriod)
            ->firstOrFail();

        $this->assertSame(2, $account->openingBalances()->count());
        $this->assertSame('11401376.00', $currentPeriodBalance->debit_amount);
        $this->assertSame('250.00', $nextPeriodBalance->debit_amount);
    }

    public function test_opening_balance_cannot_link_accounts_and_periods_from_different_foundations(): void
    {
        $this->seed();

        $accountFoundation = Foundation::query()
            ->where('code', 'YPJ-001')
            ->firstOrFail();
        $periodFoundation = Foundation::query()
            ->where('code', 'YPB-002')
            ->firstOrFail();
        $account = Account::query()
            ->whereBelongsTo($accountFoundation)
            ->where('code', '11011')
            ->firstOrFail();
        $period = AccountingPeriod::create([
            'foundation_id' => $periodFoundation->id,
            'period_name' => '2026',
            'start_date' => '2026-01-01',
            'end_date' => '2026-12-31',
            'is_closed' => false,
        ]);

        $this->expectException(QueryException::class);

        AccountOpeningBalance::create([
            'foundation_id' => $accountFoundation->id,
            'accounting_period_id' => $period->id,
            'account_id' => $account->id,
            'debit_amount' => '100.00',
            'credit_amount' => '0.00',
        ]);
    }

    public function test_account_seeder_requires_foundations_to_exist(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Run FoundationSeeder before AccountSeeder.');

        $this->seed(AccountSeeder::class);
    }
}
