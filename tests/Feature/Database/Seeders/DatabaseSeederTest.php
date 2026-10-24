<?php

namespace Tests\Feature\Database\Seeders;

use App\Models\Account;
use App\Models\Foundation;
use Database\Seeders\AccountSeeder;
use Database\Seeders\FoundationSeeder;
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

        $this->assertDatabaseCount('foundations', 3);
        $this->assertDatabaseCount('accounts', 45);

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

        $cashAccount = Account::query()
            ->whereBelongsTo($foundation)
            ->where('code', '11011')
            ->firstOrFail();

        $this->assertSame('11401376.00', $cashAccount->saldo_awal_debit);
        $this->assertSame('0.00', $cashAccount->saldo_awal_kredit);

        $netAssetsAccount = Account::query()
            ->whereBelongsTo($foundation)
            ->where('code', '31011')
            ->firstOrFail();

        $this->assertSame('0.00', $netAssetsAccount->saldo_awal_debit);
        $this->assertSame('333734771.12', $netAssetsAccount->saldo_awal_kredit);
    }

    public function test_account_seeder_requires_foundations_to_exist(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Run FoundationSeeder before AccountSeeder.');

        $this->seed(AccountSeeder::class);
    }
}
