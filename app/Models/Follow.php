<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Follow extends Model
{
    protected $fillable = [
        'follower_id',
        'followable_id',
        'followable_type',
    ];

    /**
     * Get the user who is following.
     */
    public function follower(): BelongsTo
    {
        return $this->belongsTo(User::class, 'follower_id');
    }

    /**
     * Get the entity being followed (User or Shelter).
     */
    public function followable(): MorphTo
    {
        return $this->morphTo();
    }
}
