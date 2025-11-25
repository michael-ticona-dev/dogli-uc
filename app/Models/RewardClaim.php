<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RewardClaim extends Model
{
    protected $fillable = [
        'pet_case_id',
        'claimer_id',
        'status',
        'proof',
        'proof_photo_path',
        'amount',
        'rejection_reason',
        'approved_at',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'approved_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    /**
     * Get the pet case this claim is for.
     */
    public function petCase(): BelongsTo
    {
        return $this->belongsTo(PetCase::class);
    }

    /**
     * Get the user claiming the reward.
     */
    public function claimer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'claimer_id');
    }

    /**
     * Check if claim is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if claim is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    /**
     * Check if claim is paid.
     */
    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }
}
