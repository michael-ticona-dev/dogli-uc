<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function show(User $user)
    {
        $user->load(['shelterProfile', 'petCases.pet']);
        
        // Load followers and following counts
        $followersCount = $user->followers()->count();
        $followingCount = $user->following()->count();
        
        // Check if current user is following this profile
        $isFollowing = Auth::check() ? Auth::user()->isFollowing($user) : false;
        
        // Get statistics
        $stats = [
            'pet_cases' => $user->petCases()->count(),
            'pets_found' => $user->petCases()->where('type', 'found')->where('status', 'resolved')->count(),
            'followers' => $followersCount,
            'following' => $followingCount,
        ];

        // Different view based on user type
        $view = $user->isShelter() ? 'perfil/shelter-show' : 'perfil/user-show';

        return Inertia::render($view, [
            'profile' => $user,
            'stats' => $stats,
            'isFollowing' => $isFollowing,
            'isOwnProfile' => Auth::check() && Auth::id() === $user->id,
        ]);
    }

    /**
     * Follow a user.
     */
    public function follow(User $user)
    {
        if (Auth::id() === $user->id) {
            return back()->with('error', 'You cannot follow yourself.');
        }

        Auth::user()->follow($user);

        return back()->with('success', 'Following ' . $user->name);
    }

    /**
     * Unfollow a user.
     */
    public function unfollow(User $user)
    {
        Auth::user()->unfollow($user);

        return back()->with('success', 'Unfollowed ' . $user->name);
    }
}
