<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'species',
        'breed',
        'color',
        'gender',
        'birth_date',
        'description',
        'photo_path',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cases()
    {
        return $this->hasMany(PetCase::class);
    }
}
