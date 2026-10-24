<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountingPeriod extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'foundation_id',
        'period_name',
        'start_date',
        'end_date',
        'is_closed',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_closed' => 'boolean',
    ];

    public function foundation(): BelongsTo
    {
        return $this->belongsTo(Foundation::class, 'foundation_id');
    }

    public function openingBalances(): HasMany
    {
        return $this->hasMany(AccountOpeningBalance::class);
    }
}
