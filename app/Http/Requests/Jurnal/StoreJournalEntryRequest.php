<?php

namespace App\Http\Requests\Jurnal;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJournalEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'foundation_id' => ['required', 'exists:foundations,id'],
            'entry_date'    => ['required', 'date'],
            'description'   => ['nullable', 'string', 'max:255'],
            'items'         => ['required', 'array', 'min:2'],
            'items.*.account_id' => ['required', 'exists:accounts,id'],
            'items.*.memo'       => ['nullable', 'string', 'max:255'],
            'items.*.debit'      => ['required', 'numeric', 'min:0'],
            'items.*.credit'     => ['required', 'numeric', 'min:0'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $items = $this->input('items', []);

            $totalDebit = array_reduce($items, fn($sum, $item) => $sum + (float)($item['debit'] ?? 0), 0);
            $totalCredit = array_reduce($items, fn($sum, $item) => $sum + (float)($item['credit'] ?? 0), 0);

            if (round($totalDebit, 2) !== round($totalCredit, 2)) {
                $validator->errors()->add('items', 'Total Debet dan Total Kredit tidak seimbang (Unbalanced).');
            }

            if ($totalDebit <= 0) {
                $validator->errors()->add('items', 'Nominal transaksi harus lebih dari 0.');
            }
        });
    }
}
