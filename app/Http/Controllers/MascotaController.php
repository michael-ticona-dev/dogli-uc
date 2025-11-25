<?php

namespace App\Http\Controllers;

use App\Models\PetCase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MascotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $cases = PetCase::with(['pet', 'user'])
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        // Different views for authenticated vs public users
        $view = Auth::check() ? 'mascotas/index' : 'dogli/anuncios';

        return Inertia::render($view, [
            'cases' => $cases,
            'filters' => $request->only(['type', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('mascotas/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pet_name' => 'required|string|max:255',
            'species' => 'required|string',
            'type' => 'required|in:lost,found,adoption',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'description' => 'required|string',
            'reward_amount' => 'nullable|numeric',
        ]);

        // Create Pet first (simplified for demo, ideally select existing pet)
        $pet = Auth::user()->pets()->create([
            'name' => $validated['pet_name'],
            'species' => $validated['species'],
        ]);

        $petCase = PetCase::create([
            'user_id' => Auth::id(),
            'pet_id' => $pet->id,
            'type' => $validated['type'],
            'lat' => $validated['lat'],
            'lng' => $validated['lng'],
            'description' => $validated['description'],
            'reward_amount' => $validated['reward_amount'],
            'status' => 'open',
        ]);

        return redirect()->route('mascotas.show', $petCase)->with('success', 'Caso publicado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PetCase $mascota)
    {
        $mascota->load(['pet', 'user', 'comments.user']);
        
        return Inertia::render('mascotas/show', [
            'petCase' => $mascota,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PetCase $mascota)
    {
        if ($mascota->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('mascotas/edit', [
            'petCase' => $mascota->load('pet'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PetCase $mascota)
    {
        if ($mascota->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:open,closed,resolved',
            'description' => 'required|string',
        ]);

        $mascota->update($validated);

        return redirect()->route('mascotas.show', $mascota)->with('success', 'Caso actualizado.');
    }
}
