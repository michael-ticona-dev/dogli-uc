<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'type',
        'password',
        'bio',
        'avatar_path',
        'phone',
        'is_verified',
        'verification_requested_at',
        'verification_notes',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_verified' => 'boolean',
            'verification_requested_at' => 'datetime',
        ];
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->type === 'admin';
    }

    /**
     * Check if user is shelter.
     */
    public function isShelter(): bool
    {
        return $this->type === 'shelter';
    }

    /**
     * Check if user is regular user.
     */
    public function isUser(): bool
    {
        return $this->type === 'user';
    }

    /**
     * Check if shelter is verified.
     */
    public function isVerifiedShelter(): bool
    {
        return $this->isShelter() && $this->is_verified;
    }

    /**
     * Get the shelter profile associated with the user.
     */
    public function shelterProfile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ShelterProfile::class);
    }

    /**
     * Get the pets belonging to the user.
     */
    public function pets(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Pet::class);
    }

    /**
     * Get the pet cases created by the user.
     */
    public function petCases(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PetCase::class);
    }

    /**
     * Get the donations made by the user.
     */
    public function donationsMade(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Donation::class, 'user_id');
    }

    /**
     * Get the donations received by the user (if shelter).
     */
    public function donationsReceived(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Donation::class, 'shelter_id');
    }

    /**
     * Users that this user is following.
     */
    public function following(): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $this->morphedByMany(User::class, 'followable', 'follows', 'follower_id');
    }

    /**
     * Users following this user.
     */
    public function followers(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Follow::class, 'followable');
    }

    /**
     * Check if user is following a given user.
     */
    public function isFollowing(User $user): bool
    {
        return $this->following()->where('followable_id', $user->id)->exists();
    }

    /**
     * Follow a user.
     */
    public function follow(User $user): void
    {
        if (!$this->isFollowing($user) && $this->id !== $user->id) {
            $this->following()->attach($user->id);
        }
    }

    /**
     * Unfollow a user.
     */
    public function unfollow(User $user): void
    {
        $this->following()->detach($user->id);
    }
}
