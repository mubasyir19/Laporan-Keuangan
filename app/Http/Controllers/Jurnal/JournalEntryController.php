<?php

namespace App\Http\Controllers\Jurnal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jurnal\StoreJournalEntryRequest;
use App\Models\JournalEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JournalEntryController extends Controller
{
    public function index()
    {
        return Inertia::render('JurnalUmum/JurnalUmum');
    }

    public function store(StoreJournalEntryRequest $request): JsonResponse
    {
        $validated = $request->validated();

        try {
            // Gunakan Transaction agar jika salah satu item gagal, seluruhnya dibatalkan (rollback)
            $journalEntry = DB::transaction(function () use ($validated, $request) {

                // 1. Generate Auto Voucher Number (Contoh: YBTI-202306-0001)
                $entryNumber = $this->generateEntryNumber($validated['foundation_id'], $validated['entry_date']);

                // 2. Simpan Header Transaksi (JournalEntry)
                $entry = JournalEntry::create([
                    'foundation_id' => $validated['foundation_id'],
                    'entry_number' => $entryNumber,
                    'entry_date' => $validated['entry_date'],
                    'description' => $validated['description'] ?? null,
                    'status' => 'posted', // langsung posted
                    'created_by' => $request->user()?->id, // ID user yang sedang login
                ]);

                // 3. Simpan Detail Item (JournalEntryItem)
                $itemsData = array_map(function ($item) {
                    return [
                        'id' => (string) Str::uuid(),
                        'account_id' => $item['account_id'],
                        'debit' => $item['debit'],
                        'credit' => $item['credit'],
                        'memo' => $item['memo'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }, $validated['items']);

                // Simpan banyak item sekaligus lewat relasi
                $entry->items()->createMany($itemsData);

                return $entry->load('items.account');
            });

            return response()->json([
                'success' => true,
                'message' => 'Jurnal umum berhasil diposting ke Buku Besar!',
                'data' => $journalEntry,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan transaksi jurnal.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function generateEntryNumber(string $foundationId, string $entryDate): string
    {
        $date = date('Ym', strtotime($entryDate));

        // Hitung urutan jurnal pada bulan tersebut
        $count = JournalEntry::where('foundation_id', $foundationId)
            ->whereYear('entry_date', date('Y', strtotime($entryDate)))
            ->whereMonth('entry_date', date('m', strtotime($entryDate)))
            ->count() + 1;

        $sequence = str_pad($count, 4, '0', STR_PAD_LEFT);

        return "JV-{$date}-{$sequence}";
    }
}
