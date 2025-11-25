<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shelter_id',
        'amount',
        'currency',
        'message',
        'status',
        'payment_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function donor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shelter()
    {
        return $this->belongsTo(User::class, 'shelter_id');
    }
}
