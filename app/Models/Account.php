<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'foundation_id',
        'code',
        'name',
        'type',
        'sub_type',
        'report_pos',
        'parent_id',
        'normal_balance',
        'saldo_awal_debit',
        'saldo_awal_kredit',
        'end_date',
    ];

    protected $casts = [
        'saldo_awal_debit' => 'decimal:2',
        'saldo_awal_kredit' => 'decimal:2',
        'end_date' => 'date',
    ];

    public function foundation(): BelongsTo
    {
        return $this->belongsTo(Foundation::class, 'foundation_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Account::class, 'parent_id');
    }

    public function journalEntryItems(): HasMany
    {
        return $this->hasMany(JournalEntryItem::class, 'account_id');
    }

    public function openingBalances(): HasMany
    {
        return $this->hasMany(AccountOpeningBalance::class);
    }
}
