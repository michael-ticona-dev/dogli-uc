<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShelterProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'official_name',
        'address',
        'website',
        'bio',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
