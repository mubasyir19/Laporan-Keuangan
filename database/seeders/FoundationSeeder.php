<?php

namespace Database\Seeders;

use App\Models\Foundation;
use Illuminate\Database\Seeder;

class FoundationSeeder extends Seeder
{
    /**
     * Seed the application's foundations.
     */
    public function run(): void
    {
        $foundations = [
            [
                'code' => 'YPJ-001',
                'name' => 'Yayasan Pendidikan Jaya',
            ],
            [
                'code' => 'YPB-002',
                'name' => 'Yayasan Peduli Bangsa',
            ],
            [
                'code' => 'YMDC-003',
                'name' => 'Yayasan Masa Depan Cerah',
            ],
        ];

        foreach ($foundations as $foundation) {
            Foundation::updateOrCreate(
                ['code' => $foundation['code']],
                [
                    'name' => $foundation['name'],
                    'status' => 'active',
                ],
            );
        }
    }
}
