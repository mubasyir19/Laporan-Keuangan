import DashboardLayout from "@/layouts/dashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ChartAccount = {
    code: string;
    name: string;
    normalBalance: "Db" | "Kr";
    reportPosition: "NRC" | "LPR";
    openingBalance: number;
};

type CoAType = {
    label: string;
    value: string;
};

type PosLaporanType = {
    label: string;
    value: string;
};

const typeAccount: CoAType[] = [
    { label: "Debit", value: "Db" },
    { label: "Kredit", value: "Kr" },
];

const posLaporan: PosLaporanType[] = [
    { label: "Neraca", value: "NRC" },
    { label: "Laporan", value: "LR" },
];

const accounts: ChartAccount[] = [
    {
        code: "11011",
        name: "Kas Kecil",
        normalBalance: "Db",
        reportPosition: "NRC",
        openingBalance: 11401376,
    },
    {
        code: "11021",
        name: "Bank BNI",
        normalBalance: "Db",
        reportPosition: "NRC",
        openingBalance: 970000,
    },
    {
        code: "11022",
        name: "Bank BCA",
        normalBalance: "Db",
        reportPosition: "NRC",
        openingBalance: 0,
    },
    {
        code: "11023",
        name: "Bank Mandiri",
        normalBalance: "Db",
        reportPosition: "NRC",
        openingBalance: 194300724.05,
    },
    {
        code: "11024",
        name: "Bank BSI",
        normalBalance: "Db",
        reportPosition: "NRC",
        openingBalance: 123887221.07,
    },
    {
        code: "11025",
        name: "Bank BRI",
        normalBalance: "Db",
        reportPosition: "NRC",
        openingBalance: 0,
    },
    {
        code: "31011",
        name: "Aset Neto Tanpa Pembatasan",
        normalBalance: "Kr",
        reportPosition: "NRC",
        openingBalance: 333734771.12,
    },
    {
        code: "41012",
        name: "Donasi Bidang Kesehatan",
        normalBalance: "Kr",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "41014",
        name: "Donasi Bidang Pangan",
        normalBalance: "Kr",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "41017",
        name: "Donasi Bidang Sosial",
        normalBalance: "Kr",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "41018",
        name: "Donasi Untuk Umum",
        normalBalance: "Kr",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "43012",
        name: "Pendapatan Lain-lain",
        normalBalance: "Kr",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "51011",
        name: "Beban Telepon & Internet",
        normalBalance: "Db",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "51018",
        name: "Beban Gaji Karyawan",
        normalBalance: "Db",
        reportPosition: "LPR",
        openingBalance: 0,
    },
    {
        code: "52016",
        name: "Beban Program Sosial",
        normalBalance: "Db",
        reportPosition: "LPR",
        openingBalance: 0,
    },
];

const summaryCards = [
    {
        label: "Total Akun",
        count: accounts.length,
        borderColor: "border-l-slate-400",
    },
    {
        label: "Aset",
        count: accounts.filter((account) => account.code.startsWith("1"))
            .length,
        borderColor: "border-l-emerald-500",
    },
    {
        label: "Kewajiban",
        count: accounts.filter((account) => account.code.startsWith("2"))
            .length,
        borderColor: "border-l-amber-500",
    },
    {
        label: "Pendapatan",
        count: accounts.filter((account) => account.code.startsWith("4"))
            .length,
        borderColor: "border-l-indigo-500",
    },
    {
        label: "Beban",
        count: accounts.filter((account) => account.code.startsWith("5"))
            .length,
        borderColor: "border-l-rose-500",
    },
];

const formatBalance = (amount: number): string =>
    new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 2,
    }).format(amount);

const CoA = () => {
    const [searchCoa, setSearchCoa] = useState("");
    const filteredAccounts = useMemo(() => {
        const query = searchCoa.trim().toLocaleLowerCase("id-ID");

        if (!query) {
            return accounts;
        }

        return accounts.filter(
            (account) =>
                account.code.toLocaleLowerCase("id-ID").includes(query) ||
                account.name.toLocaleLowerCase("id-ID").includes(query),
        );
    }, [searchCoa]);

    return (
        <div>
            <section
                aria-label="Ringkasan akun"
                className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5"
            >
                {summaryCards.map((card) => (
                    <div
                        key={card.label}
                        className={`rounded-xl border border-slate-200 border-l-4 ${card.borderColor} bg-white p-4 shadow-sm`}
                    >
                        <p className="text-xs font-medium text-slate-500">
                            {card.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-800">
                            {card.count}
                        </p>
                    </div>
                ))}
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-base font-bold text-slate-800">
                            Daftar Bagian Akun (Chart of Accounts)
                        </h2>
                        <p className="text-xs text-slate-500">
                            Master COA lengkap dengan pemetaan Pos Laporan NRC /
                            LPR (Sesuai Excel Y BTI).
                        </p>
                    </div>

                    <div className="flex w-full gap-2 md:w-auto">
                        <div className="relative w-full md:w-60">
                            <Search
                                aria-hidden="true"
                                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                            />
                            <Input
                                type="search"
                                value={searchCoa}
                                onChange={(event) =>
                                    setSearchCoa(event.target.value)
                                }
                                placeholder="Cari Kode atau Nama Akun..."
                                aria-label="Cari kode atau nama akun"
                                className="h-9 pl-9 text-xs"
                            />
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <Button
                                    type="button"
                                    className="shrink-0 bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700"
                                >
                                    <Plus aria-hidden="true" />
                                    Tambah Akun Baru
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Akun Baru (CoA)
                                    </DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <form>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>Kode Akun</FieldLabel>
                                            <Input
                                                id="code"
                                                type="text"
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Nama Akun</FieldLabel>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                            />
                                        </Field>
                                        <div className="flex items-stretch gap-4">
                                            <Field>
                                                <FieldLabel>
                                                    Pos Saldo
                                                </FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-45">
                                                        <SelectValue placeholder="Pos Saldo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {typeAccount.map(
                                                                (item) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.value
                                                                        }
                                                                        value={
                                                                            item.value
                                                                        }
                                                                    >
                                                                        {`${item.label} - ${item.value}`}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                            <Field>
                                                <FieldLabel>
                                                    Pos Laporan
                                                </FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-45">
                                                        <SelectValue placeholder="Pos Saldo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {posLaporan.map(
                                                                (item) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.value
                                                                        }
                                                                        value={
                                                                            item.value
                                                                        }
                                                                    >
                                                                        {`${item.label} - ${item.value}`}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        </div>
                                        <Field>
                                            <FieldLabel>
                                                Saldo Awal Debet
                                            </FieldLabel>
                                            <Input
                                                id="saldo_awal_debit"
                                                type="number"
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>
                                                Saldo Awal Kredit
                                            </FieldLabel>
                                            <Input
                                                id="saldo_awal_kredit"
                                                type="text"
                                                required
                                            />
                                        </Field>
                                    </FieldGroup>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="border-b bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                            <tr>
                                <th scope="col" className="w-32 p-3">
                                    Kode Akun
                                </th>
                                <th scope="col" className="p-3">
                                    Nama Buku Besar / Akun
                                </th>
                                <th scope="col" className="p-3">
                                    Pos Saldo
                                </th>
                                <th scope="col" className="p-3">
                                    Pos Laporan
                                </th>
                                <th scope="col" className="p-3 text-right">
                                    Saldo Awal (Rp)
                                </th>
                                <th
                                    scope="col"
                                    className="w-28 p-3 text-center"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAccounts.length > 0 ? (
                                filteredAccounts.map((account) => (
                                    <tr
                                        key={account.code}
                                        className="transition hover:bg-slate-50"
                                    >
                                        <td className="p-3 font-mono font-bold text-indigo-600">
                                            {account.code}
                                        </td>
                                        <td className="p-3 font-semibold text-slate-800">
                                            {account.name}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                                                    account.normalBalance ===
                                                    "Db"
                                                        ? "bg-slate-200 text-slate-800"
                                                        : "bg-slate-800 text-white"
                                                }`}
                                            >
                                                {account.normalBalance}
                                            </span>
                                        </td>
                                        <td className="p-3 font-mono text-xs">
                                            <span
                                                className={`rounded px-2 py-0.5 font-bold ${
                                                    account.reportPosition ===
                                                    "NRC"
                                                        ? "bg-indigo-100 text-indigo-800"
                                                        : "bg-amber-100 text-amber-800"
                                                }`}
                                            >
                                                {account.reportPosition}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right font-mono">
                                            {formatBalance(
                                                account.openingBalance,
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Edit akun ${account.code}`}
                                                    title="Edit akun"
                                                >
                                                    <Pencil
                                                        aria-hidden="true"
                                                        className="size-4 text-indigo-600"
                                                    />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Hapus akun ${account.code}`}
                                                    title="Hapus akun"
                                                >
                                                    <Trash2
                                                        aria-hidden="true"
                                                        className="size-4 text-rose-600"
                                                    />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-6 text-center text-sm text-slate-500"
                                    >
                                        Tidak ada akun yang cocok dengan
                                        pencarian.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default CoA;

CoA.layout = (page: React.ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
);
