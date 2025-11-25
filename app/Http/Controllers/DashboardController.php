<?php

namespace App\Http\Controllers;

use App\Models\PetCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Common stats
        $stats = [
            'my_cases' => $user->petCases()->count(),
            'active_cases' => $user->petCases()->where('status', 'open')->count(),
            'resolved_cases' => $user->petCases()->where('status', 'resolved')->count(),
            'followers' => $user->followers()->count(),
            'following' => $user->following()->count(),
        ];

        // Get recent activity
        $recentCases = $user->petCases()
            ->with('pet')
            ->latest()
            ->take(5)
            ->get();

        // Shelter-specific data
        if ($user->isShelter()) {
            $shelterStats = [
                'adoption_listings' => $user->petCases()->where('type', 'adoption')->where('status', 'open')->count(),
                'successful_adoptions' => $user->petCases()->where('type', 'adoption')->where('status', 'resolved')->count(),
                'total_donations' => $user->donationsReceived()->sum('amount'),
                'recent_donations' => $user->donationsReceived()
                    ->with('donor')
                    ->latest()
                    ->take(5)
                    ->get(),
            ];

            return Inertia::render('dashboard-shelter', [
                'user' => $user->load('shelterProfile'),
                'stats' => array_merge($stats, $shelterStats),
                'recentCases' => $recentCases,
            ]);
        }

        // Regular user dashboard
        $nearbyCases = PetCase::with(['pet', 'user'])
            ->where('status', 'open')
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('dashboard', [
            'user' => $user,
            'stats' => $stats,
            'recentCases' => $recentCases,
            'nearbyCases' => $nearbyCases,
        ]);
    }
}
