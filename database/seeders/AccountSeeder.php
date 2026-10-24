<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Foundation;
use Illuminate\Database\Seeder;
use RuntimeException;

class AccountSeeder extends Seeder
{
    /**
     * Seed the chart of accounts for each foundation.
     */
    public function run(): void
    {
        $foundationCodes = ['YPJ-001', 'YPB-002', 'YMDC-003'];
        $foundations = Foundation::query()
            ->whereIn('code', $foundationCodes)
            ->get();

        if ($foundations->count() !== count($foundationCodes)) {
            throw new RuntimeException('Run FoundationSeeder before AccountSeeder.');
        }

        $accounts = [
            [
                'code' => '11011',
                'name' => 'Kas Kecil',
                'type' => 'asset',
                'sub_type' => 'Kas dan Setara Kas',
                'normal_balance' => 'Db',
                'report_pos' => 'NRC',
                'opening_balance' => 11401376,
            ],
            [
                'code' => '11021',
                'name' => 'Bank BNI',
                'type' => 'asset',
                'sub_type' => 'Kas dan Setara Kas',
                'normal_balance' => 'Db',
                'report_pos' => 'NRC',
                'opening_balance' => 970000,
            ],
            [
                'code' => '11022',
                'name' => 'Bank BCA',
                'type' => 'asset',
                'sub_type' => 'Kas dan Setara Kas',
                'normal_balance' => 'Db',
                'report_pos' => 'NRC',
                'opening_balance' => 0,
            ],
            [
                'code' => '11023',
                'name' => 'Bank Mandiri',
                'type' => 'asset',
                'sub_type' => 'Kas dan Setara Kas',
                'normal_balance' => 'Db',
                'report_pos' => 'NRC',
                'opening_balance' => 194300724.05,
            ],
            [
                'code' => '11024',
                'name' => 'Bank BSI',
                'type' => 'asset',
                'sub_type' => 'Kas dan Setara Kas',
                'normal_balance' => 'Db',
                'report_pos' => 'NRC',
                'opening_balance' => 123887221.07,
            ],
            [
                'code' => '11025',
                'name' => 'Bank BRI',
                'type' => 'asset',
                'sub_type' => 'Kas dan Setara Kas',
                'normal_balance' => 'Db',
                'report_pos' => 'NRC',
                'opening_balance' => 0,
            ],
            [
                'code' => '31011',
                'name' => 'Aset Neto Tanpa Pembatasan',
                'type' => 'equity',
                'sub_type' => 'Aset Neto',
                'normal_balance' => 'Kr',
                'report_pos' => 'NRC',
                'opening_balance' => 333734771.12,
            ],
            [
                'code' => '41012',
                'name' => 'Donasi Bidang Kesehatan',
                'type' => 'revenue',
                'sub_type' => 'Donasi',
                'normal_balance' => 'Kr',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '41014',
                'name' => 'Donasi Bidang Pangan',
                'type' => 'revenue',
                'sub_type' => 'Donasi',
                'normal_balance' => 'Kr',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '41017',
                'name' => 'Donasi Bidang Sosial',
                'type' => 'revenue',
                'sub_type' => 'Donasi',
                'normal_balance' => 'Kr',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '41018',
                'name' => 'Donasi Untuk Umum',
                'type' => 'revenue',
                'sub_type' => 'Donasi',
                'normal_balance' => 'Kr',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '43012',
                'name' => 'Pendapatan Lain-lain',
                'type' => 'revenue',
                'sub_type' => 'Pendapatan Lain-lain',
                'normal_balance' => 'Kr',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '51011',
                'name' => 'Beban Telepon & Internet',
                'type' => 'expense',
                'sub_type' => 'Beban Operasional',
                'normal_balance' => 'Db',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '51018',
                'name' => 'Beban Gaji Karyawan',
                'type' => 'expense',
                'sub_type' => 'Beban Operasional',
                'normal_balance' => 'Db',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
            [
                'code' => '52016',
                'name' => 'Beban Program Sosial',
                'type' => 'expense',
                'sub_type' => 'Beban Program',
                'normal_balance' => 'Db',
                'report_pos' => 'LPR',
                'opening_balance' => 0,
            ],
        ];

        foreach ($foundations as $foundation) {
            foreach ($accounts as $account) {
                $openingBalance = $account['opening_balance'];

                Account::updateOrCreate(
                    [
                        'foundation_id' => $foundation->id,
                        'code' => $account['code'],
                    ],
                    [
                        'name' => $account['name'],
                        'type' => $account['type'],
                        'sub_type' => $account['sub_type'],
                        'normal_balance' => $account['normal_balance'],
                        'report_pos' => $account['report_pos'],
                        'saldo_awal_debit' => $account['normal_balance'] === 'Db' ? $openingBalance : 0,
                        'saldo_awal_kredit' => $account['normal_balance'] === 'Kr' ? $openingBalance : 0,
                        'parent_id' => null,
                        'end_date' => null,
                    ],
                );
            }
        }
    }
}
