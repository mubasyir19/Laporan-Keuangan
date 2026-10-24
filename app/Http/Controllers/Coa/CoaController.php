<?php

namespace App\Http\Controllers\Coa;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoaController extends Controller
{
    //
    public function show()
    {
        // $coa = Account::get
        return Inertia::render('CoA/CoA');
    }

    public function addDataCoA(Request $request)
    {
        $validated = $request->validate([
            'foundation_id' => 'required',
            'code' => 'required',
            'name' => 'required|string|max:255',
            'type' => 'required',
            'sub_type' => 'required',
            'report_pos' => 'required',
            'parent_id' => '',
            'normal_balance' => 'numeric|min:0',
            'saldo_awal_debit' => 'numeric|min:0',
            'saldo_awal_kredit' => 'numeric|min:0',
            'end_date' => '',
        ]);

        Account::create($validated);

        return redirect()->back()->with('success', 'Data CoA berhasil ditambah');
    }
}
