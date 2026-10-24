<?php

namespace Database\Seeders;

use App\Models\AccountingPeriod;
use App\Models\Foundation;
use Illuminate\Database\Seeder;
use RuntimeException;

class AccountingPeriodSeeder extends Seeder
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
            throw new RuntimeException('Run FoundationSeeder before AccountingPeriodSeeder.');
        }

        AccountingPeriod::updateOrCreate(
            [
                'foundation_id' => $foundation->id,
                'period_name' => '2026',
            ],
            [
                'start_date' => '2026-01-01',
                'end_date' => '2026-12-31',
                'is_closed' => false,
            ],
        );
    }
}
