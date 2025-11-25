<?php

namespace App\Http\Controllers;

use App\Models\PetCase;
use App\Models\RewardClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RewardController extends Controller
{
    /**
     * Show the form for claiming a reward.
     */
    public function create(PetCase $petCase)
    {
        // Ensure the case has a reward
        if (!$petCase->reward_amount) {
            return redirect()->back()->with('error', 'This case does not have a reward.');
        }

        // Ensure user hasn't already claimed
        $existingClaim = RewardClaim::where('pet_case_id', $petCase->id)
            ->where('claimer_id', Auth::id())
            ->first();

        if ($existingClaim) {
            return redirect()->back()->with('error', 'You have already submitted a claim for this case.');
        }

        return Inertia::render('recompensas/create', [
            'petCase' => $petCase->load(['pet', 'user']),
        ]);
    }

    /**
     * Store a reward claim.
     */
    public function store(Request $request, PetCase $petCase)
    {
        $request->validate([
            'proof' => 'required|string|min:20',
            'proof_photo' => 'nullable|image|max:2048',
        ]);

        $claim = RewardClaim::create([
            'pet_case_id' => $petCase->id,
            'claimer_id' => Auth::id(),
            'proof' => $request->proof,
            'amount' => $petCase->reward_amount,
            'status' => 'pending',
        ]);

        // TODO: Handle photo upload
        // if ($request->hasFile('proof_photo')) {
        //     $path = $request->file('proof_photo')->store('reward-claims', 'public');
        //     $claim->update(['proof_photo_path' => $path]);
        // }

        return redirect()->route('mascotas.show', $petCase)
            ->with('success', 'Reward claim submitted! The case owner will review it.');
    }

    /**
     * Show claims for a pet case (for case owner).
     */
    public function manageClaims(PetCase $petCase)
    {
        // Ensure user owns this case
        if ($petCase->user_id !== Auth::id()) {
            abort(403);
        }

        $claims = $petCase->rewardClaims()
            ->with('claimer')
            ->latest()
            ->get();

        return Inertia::render('recompensas/manage', [
            'petCase' => $petCase->load('pet'),
            'claims' => $claims,
        ]);
    }

    /**
     * Approve a reward claim.
     */
    public function approve(RewardClaim $claim)
    {
        $petCase = $claim->petCase;

        // Ensure user owns the case
        if ($petCase->user_id !== Auth::id()) {
            abort(403);
        }

        $claim->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Claim approved! You can now mark it as paid.');
    }

    /**
     * Reject a reward claim.
     */
    public function reject(Request $request, RewardClaim $claim)
    {
        $petCase = $claim->petCase;

        // Ensure user owns the case
        if ($petCase->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'rejection_reason' => 'required|string',
        ]);

        $claim->update([
            'status' => 'rejected',
            'rejection_reason' => $request->rejection_reason,
        ]);

        return back()->with('success', 'Claim rejected.');
    }

    /**
     * Mark claim as paid.
     */
    public function markAsPaid(RewardClaim $claim)
    {
        $petCase = $claim->petCase;

        // Ensure user owns the case
        if ($petCase->user_id !== Auth::id()) {
            abort(403);
        }

        if (!$claim->isApproved()) {
            return back()->with('error', 'You must approve the claim first.');
        }

        $claim->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Optionally mark the case as resolved
        $petCase->update([
            'status' => 'resolved',
            'resolved_at' => now(),
        ]);

        return back()->with('success', 'Claim marked as paid and case resolved!');
    }
}
