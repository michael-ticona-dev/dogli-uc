<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ContentReport extends Model
{
    protected $fillable = [
        'reporter_id',
        'reportable_id',
        'reportable_type',
        'reason',
        'details',
        'status',
        'reviewed_by',
        'reviewed_at',
        'admin_notes',
    ];

    protected function casts(): array
    {
        return [
            'reviewed_at' => 'datetime',
        ];
    }

    /**
     * Get the user who reported the content.
     */
    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /**
     * Get the content being reported.
     */
    public function reportable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the admin who reviewed the report.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
