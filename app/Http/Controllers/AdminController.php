<?php

namespace App\Http\Controllers;

use App\Models\ContentReport;
use App\Models\PetCase;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Admin Dashboard.
     */
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_shelters' => User::where('type', 'shelter')->count(),
            'pending_verifications' => User::where('type', 'shelter')->where('is_verified', false)->whereNotNull('verification_requested_at')->count(),
            'active_cases' => PetCase::where('status', 'open')->count(),
            'pending_reports' => ContentReport::where('status', 'pending')->count(),
        ];

        $recentReports = ContentReport::with(['reporter', 'reportable'])
            ->where('status', 'pending')
            ->latest()
            ->take(5)
            ->get();

        $pendingShelters = User::with('shelterProfile')
            ->where('type', 'shelter')
            ->where('is_verified', false)
            ->whereNotNull('verification_requested_at')
            ->latest('verification_requested_at')
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentReports' => $recentReports,
            'pendingShelters' => $pendingShelters,
        ]);
    }

    /**
     * Manage Shelter Verifications.
     */
    public function verifications()
    {
        $pendingShelters = User::with('shelterProfile')
            ->where('type', 'shelter')
            ->where('is_verified', false)
            ->whereNotNull('verification_requested_at')
            ->latest('verification_requested_at')
            ->paginate(10);

        return Inertia::render('admin/verifications', [
            'shelters' => $pendingShelters,
        ]);
    }

    /**
     * Approve Shelter Verification.
     */
    public function approveVerification(User $user)
    {
        $user->update([
            'is_verified' => true,
            'verification_notes' => null,
        ]);

        // TODO: Send notification to shelter

        return back()->with('success', 'Shelter verified successfully.');
    }

    /**
     * Reject Shelter Verification.
     */
    public function rejectVerification(Request $request, User $user)
    {
        $request->validate(['reason' => 'required|string']);

        $user->update([
            'verification_requested_at' => null,
            'verification_notes' => $request->reason,
        ]);

        // TODO: Send notification to shelter

        return back()->with('success', 'Shelter verification rejected.');
    }

    /**
     * Content Moderation Queue.
     */
    public function moderation()
    {
        $reports = ContentReport::with(['reporter', 'reportable'])
            ->where('status', 'pending')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/moderation', [
            'reports' => $reports,
        ]);
    }

    /**
     * Resolve Content Report.
     */
    public function resolveReport(Request $request, ContentReport $report)
    {
        $request->validate([
            'action' => 'required|in:dismiss,delete_content,ban_user',
            'admin_notes' => 'nullable|string',
        ]);

        $report->update([
            'status' => 'resolved',
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
            'admin_notes' => $request->admin_notes,
        ]);

        if ($request->action === 'delete_content') {
            $report->reportable->delete();
        } elseif ($request->action === 'ban_user') {
            // Assuming reportable is a user or has a user_id
            $user = $report->reportable instanceof User ? $report->reportable : $report->reportable->user;
            // Implement ban logic (e.g., soft delete or status column)
            // $user->delete(); 
        }

        return back()->with('success', 'Report resolved.');
    }
}
