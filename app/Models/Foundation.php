<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Foundation extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'code',
        'name',
        'address',
        'phone',
        'email',
        'status',
    ];

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }

    public function accountingPeriods(): HasMany
    {
        return $this->hasMany(AccountingPeriod::class);
    }

    public function accountOpeningBalances(): HasMany
    {
        return $this->hasMany(AccountOpeningBalance::class);
    }

    public function journalEntries(): HasMany
    {
        return $this->hasMany(JournalEntry::class);
    }
}
