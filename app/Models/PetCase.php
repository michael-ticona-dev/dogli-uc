<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PetCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pet_id',
        'type',
        'status',
        'lat',
        'lng',
        'reward_amount',
        'description',
        'resolved_at',
    ];

    protected $casts = [
        'lat' => 'decimal:8',
        'lng' => 'decimal:8',
        'reward_amount' => 'decimal:2',
        'resolved_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function rewardClaims()
    {
        return $this->hasMany(RewardClaim::class);
    }
}
