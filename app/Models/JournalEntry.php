<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JournalEntry extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'foundation_id',
        'entry_number',
        'entry_date',
        'description',
        'status',
        'created_by',
    ];

    protected $casts = [
        'entry_date' => 'date',
    ];

    public function foundation()
    {
        return $this->belongsTo(Foundation::class, 'foundation_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function items()
    {
        return $this->hasMany(JournalEntryItem::class, 'journal_entry_id');
    }
}
