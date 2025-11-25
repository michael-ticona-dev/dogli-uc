<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DonacionController extends Controller
{
    public function create(User $refugio)
    {
        if ($refugio->type !== 'shelter') {
            abort(404);
        }

        return Inertia::render('donaciones/create', [
            'shelter' => $refugio->load('shelterProfile'),
        ]);
    }

    public function store(Request $request, User $refugio)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'message' => 'nullable|string',
        ]);

        // Mock payment processing
        Donation::create([
            'user_id' => Auth::id(),
            'shelter_id' => $refugio->id,
            'amount' => $validated['amount'],
            'message' => $validated['message'],
            'status' => 'completed',
            'payment_id' => 'mock_' . uniqid(),
        ]);

        return redirect()->route('refugios.show', $refugio)->with('success', '¡Gracias por tu donación!');
    }
}
