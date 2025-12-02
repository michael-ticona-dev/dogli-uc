<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Models\PetCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $conversations = Conversation::where('user_one_id', $user->id)
            ->orWhere('user_two_id', $user->id)
            ->with(['userOne', 'userTwo', 'petCase.pet', 'messages' => function ($query) {
                $query->latest()->limit(1);
            }])
            ->get()
            ->sortByDesc(function ($conversation) {
                return $conversation->messages->first()?->created_at ?? $conversation->created_at;
            })
            ->values();

        return Inertia::render('chat/index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation)
    {
        if ($conversation->user_one_id !== Auth::id() && $conversation->user_two_id !== Auth::id()) {
            abort(403);
        }

        $conversation->load(['userOne', 'userTwo', 'petCase.pet', 'messages.sender']);
        
        // Mark messages as read
        $conversation->messages()
            ->where('sender_id', '!=', Auth::id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return Inertia::render('chat/show', [
            'conversation' => $conversation,
            'messages' => $conversation->messages,
        ]);
    }

    public function store(Request $request, Conversation $conversation)
    {
        if ($conversation->user_one_id !== Auth::id() && $conversation->user_two_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $conversation->messages()->create([
            'sender_id' => Auth::id(),
            'content' => $validated['content'],
        ]);

        return redirect()->back();
    }

    public function start(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'pet_case_id' => 'nullable|exists:pet_cases,id',
            'initial_message' => 'nullable|string',
        ]);

        $authId = Auth::id();
        $otherUserId = $validated['user_id'];

        if ($authId == $otherUserId) {
            return redirect()->back()->with('error', 'No puedes iniciar un chat contigo mismo.');
        }

        // Check if conversation exists
        $conversation = Conversation::where(function ($query) use ($authId, $otherUserId) {
            $query->where('user_one_id', $authId)->where('user_two_id', $otherUserId);
        })->orWhere(function ($query) use ($authId, $otherUserId) {
            $query->where('user_one_id', $otherUserId)->where('user_two_id', $authId);
        })
        ->when($request->pet_case_id, function ($query, $petCaseId) {
             $query->where('pet_case_id', $petCaseId);
        })
        ->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $authId,
                'user_two_id' => $otherUserId,
                'pet_case_id' => $request->pet_case_id,
            ]);
        }

        if ($request->initial_message) {
            $conversation->messages()->create([
                'sender_id' => $authId,
                'content' => $request->initial_message,
            ]);
        }

        return redirect()->route('chat.show', $conversation);
    }
}
