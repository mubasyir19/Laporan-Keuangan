import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/dashboardLayout";
import React, { useState } from "react";

// Interface diselaraskan dengan model Account Laravel
interface Account {
    id: string; // account_id
    code: string;
    name: string;
}

// Interface diselaraskan dengan model JournalEntryItem
interface JournalRow {
    id: string; // Temporary ID untuk key di UI React
    account_id: string; // Sesuai $fillable JournalEntryItem
    memo: string;
    debit: number;
    credit: number;
}

interface Foundation {
    id: string; // foundation_id UUID
    name: string;
    code: string;
}

// Mock Data Contoh
const MOCK_FOUNDATION: Foundation = {
    id: "9b1deb4d-3b7d-4149-9cc8-0248c8233a1e",
    name: "Yayasan Bantu Teman Indonesia (BTI)",
    code: "YBTI-2023",
};

const COA_LIST: Account[] = [
    { id: "acc-uuid-1", code: "11023", name: "Bank Mandiri" },
    { id: "acc-uuid-2", code: "41017", name: "Donasi Bidang Sosial" },
    { id: "acc-uuid-3", code: "11001", name: "Kas Kecil" },
    { id: "acc-uuid-4", code: "51001", name: "Beban Operasional" },
];

const JurnalUmum = () => {
    const [activeFoundation] = useState<Foundation>(MOCK_FOUNDATION);
    const [entryDate, setEntryDate] = useState<string>("2023-06-01"); // Sesuai field 'entry_date'
    const [description, setDescription] = useState<string>(""); // Sesuai field 'description'

    // Initial State menggunakan account_id
    const [journalRows, setJournalRows] = useState<JournalRow[]>([
        {
            id: "1",
            account_id: "acc-uuid-1",
            memo: "Bank Mandiri",
            debit: 15000000,
            credit: 0,
        },
        {
            id: "2",
            account_id: "acc-uuid-2",
            memo: "Donasi Sosial Publik",
            debit: 0,
            credit: 15000000,
        },
        {
            id: "3",
            account_id: "",
            memo: "",
            debit: 0,
            credit: 0,
        },
    ]);

    // Handler: Tambah Baris Akun
    const addJournalRow = () => {
        const newRow: JournalRow = {
            id: Date.now().toString(),
            account_id: "",
            memo: "",
            debit: 0,
            credit: 0,
        };
        setJournalRows([...journalRows, newRow]);
    };

    // Handler: Hapus Baris Akun
    const removeJournalRow = (id: string) => {
        if (journalRows.length <= 1) return;
        setJournalRows(journalRows.filter((row) => row.id !== id));
    };

    // Handler: Update Field Baris
    const updateRowField = <K extends keyof JournalRow>(
        id: string,
        field: K,
        value: JournalRow[K],
    ) => {
        setJournalRows(
            journalRows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row,
            ),
        );
    };

    // Handler: Reset Form
    const handleReset = () => {
        setDescription("");
        setJournalRows([
            {
                id: Date.now().toString(),
                account_id: "",
                memo: "",
                debit: 0,
                credit: 0,
            },
        ]);
    };

    // Helper Perhitungan Status Balance
    const totalDebit = journalRows.reduce(
        (sum, item) => sum + (Number(item.debit) || 0),
        0,
    );
    const totalCredit = journalRows.reduce(
        (sum, item) => sum + (Number(item.credit) || 0),
        0,
    );
    const isBalanced = totalDebit === totalCredit && totalDebit > 0;

    // Handler Submit Data ke Laravel Controller
    const handleSubmit = async () => {
        if (!isBalanced) return;

        // Filter baris yang belum memilih akun
        const validItems = journalRows.filter((item) => item.account_id !== "");

        // Format JSON yang dikirimkan ke Laravel
        const payload = {
            foundation_id: activeFoundation.id, // JournalEntry
            entry_date: entryDate, // JournalEntry
            description: description, // JournalEntry
            items: validItems.map((item) => ({
                account_id: item.account_id, // JournalEntryItem
                debit: item.debit, // JournalEntryItem
                credit: item.credit, // JournalEntryItem
                memo: item.memo, // JournalEntryItem
            })),
        };

        console.log("Payload siap kirim ke API Laravel:", payload);
        // Jalankan axios.post('/api/journal-entries', payload) di sini
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mx-auto font-sans">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
                <div>
                    <h2 className="text-base font-bold text-slate-800">
                        Form Transaksi Jurnal Umum (Double-Entry)
                    </h2>
                    <p className="text-xs text-slate-500">
                        Mencatat transaksi untuk tenant: {activeFoundation.name}
                    </p>
                </div>
                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded border">
                    Voucher Auto: {activeFoundation.code}-202306-0035
                </span>
            </div>

            {/* Inputs Form Atas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tanggal Transaksi
                    </label>
                    <Input
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        className="w-full text-sm border-slate-300 rounded-lg text-slate-700"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Keterangan Transaksi
                    </label>
                    <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Contoh: Penerimaan Donasi Kesehatan / Penyaluran Program..."
                        className="w-full text-sm border-slate-300 rounded-lg text-slate-700"
                    />
                </div>
            </div>

            {/* Tabel Jurnal */}
            <div className="border rounded-lg overflow-hidden mb-4 border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">
                        <tr>
                            <th className="p-3 w-1/3">AKUN / COA</th>
                            <th className="p-3">MEMO BARIS</th>
                            <th className="p-3 w-1/5">DEBET (RP)</th>
                            <th className="p-3 w-1/5">KREDIT (RP)</th>
                            <th className="p-3 w-12 text-center">AKSI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {journalRows.map((row) => (
                            <tr key={row.id}>
                                <td className="p-2">
                                    <select
                                        value={row.account_id}
                                        onChange={(e) =>
                                            updateRowField(
                                                row.id,
                                                "account_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full text-sm border-slate-300 rounded border p-2 bg-white text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">
                                            -- Pilih Akun --
                                        </option>
                                        {COA_LIST.map((acc) => (
                                            <option key={acc.id} value={acc.id}>
                                                {acc.code} - {acc.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-2">
                                    <Input
                                        type="text"
                                        value={row.memo}
                                        onChange={(e) =>
                                            updateRowField(
                                                row.id,
                                                "memo",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Catatan opsional"
                                        className="w-full text-sm border-slate-300 rounded border p-2 text-slate-700"
                                    />
                                </td>
                                <td className="p-2">
                                    <Input
                                        type="number"
                                        value={row.debit || ""}
                                        onChange={(e) =>
                                            updateRowField(
                                                row.id,
                                                "debit",
                                                parseFloat(e.target.value) || 0,
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full text-sm border-slate-300 rounded border p-2 text-right text-slate-700"
                                    />
                                </td>
                                <td className="p-2">
                                    <Input
                                        type="number"
                                        value={row.credit || ""}
                                        onChange={(e) =>
                                            updateRowField(
                                                row.id,
                                                "credit",
                                                parseFloat(e.target.value) || 0,
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full text-sm border-slate-300 rounded border p-2 text-right text-slate-700"
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        onClick={() => removeJournalRow(row.id)}
                                        className="text-rose-500 hover:text-rose-700 transition"
                                        title="Hapus Baris"
                                    >
                                        <svg
                                            className="w-5 h-5 mx-auto"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Footer Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <button
                    onClick={addJournalRow}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                    <span className="text-base leading-none">+</span> Tambah
                    Baris Akun
                </button>

                <div className="flex items-center gap-6 text-xs">
                    <div>
                        <span className="text-slate-500 block">
                            Total Debet:
                        </span>
                        <span className="font-bold text-sm text-slate-800">
                            Rp {totalDebit.toLocaleString("id-ID")}
                        </span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">
                            Total Kredit:
                        </span>
                        <span className="font-bold text-sm text-slate-800">
                            Rp {totalCredit.toLocaleString("id-ID")}
                        </span>
                    </div>
                    <div className="pl-4 border-l border-slate-300">
                        <span className="text-slate-500 block">
                            Status Balance:
                        </span>
                        {isBalanced ? (
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded inline-flex items-center gap-1 mt-0.5">
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                BALANCE !
                            </span>
                        ) : (
                            <span className="bg-rose-100 text-rose-800 font-bold px-2.5 py-1 rounded inline-flex items-center gap-1 mt-0.5">
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                UNBALANCED
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition"
                >
                    Batal / Reset
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!isBalanced}
                    className={`px-6 py-2 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                        isBalanced
                            ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                            : "bg-slate-300 cursor-not-allowed"
                    }`}
                >
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Post Jurnal ke Buku Besar
                </button>
            </div>
        </div>
    );
};

export default JurnalUmum;

JurnalUmum.layout = (page: React.ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
);
