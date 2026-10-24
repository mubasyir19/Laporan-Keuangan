<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\AccountingPeriod;
use App\Models\AccountOpeningBalance;
use App\Models\Foundation;
use Illuminate\Database\Seeder;
use RuntimeException;

class AccountOpeningBalanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $foundation = Foundation::query()
            ->where('code', 'YPJ-001')
            ->first();

        if ($foundation === null) {
            throw new RuntimeException('Run FoundationSeeder before AccountOpeningBalanceSeeder.');
        }

        $period = AccountingPeriod::query()
            ->whereBelongsTo($foundation)
            ->where('period_name', '2026')
            ->first();

        if ($period === null) {
            throw new RuntimeException('Run AccountingPeriodSeeder before AccountOpeningBalanceSeeder.');
        }

        $balances = [
            '11011' => '11401376.00',
            '11021' => '970000.00',
            '11022' => '0.00',
            '11023' => '194300724.05',
            '11024' => '123887221.07',
            '11025' => '0.00',
            '31011' => '333734771.12',
            '41012' => '0.00',
            '41014' => '0.00',
            '41017' => '0.00',
            '41018' => '0.00',
            '43012' => '0.00',
            '51011' => '0.00',
            '51018' => '0.00',
            '52016' => '0.00',
        ];

        foreach ($balances as $accountCode => $balance) {
            $account = Account::query()
                ->whereBelongsTo($foundation)
                ->where('code', $accountCode)
                ->first();

            if ($account === null) {
                throw new RuntimeException("Account {$accountCode} is missing for foundation YPJ-001.");
            }

            AccountOpeningBalance::updateOrCreate(
                [
                    'accounting_period_id' => $period->id,
                    'account_id' => $account->id,
                ],
                [
                    'foundation_id' => $foundation->id,
                    'debit_amount' => $account->normal_balance === 'Db' ? $balance : '0.00',
                    'credit_amount' => $account->normal_balance === 'Kr' ? $balance : '0.00',
                ],
            );
        }
    }
}
