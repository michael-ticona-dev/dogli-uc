<?php

namespace App\Http\Controllers;

use App\Models\PetCase;
use App\Services\PetImageAnalyzer;
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
            'breed' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'gender' => 'nullable|in:male,female,unknown',
            'type' => 'required|in:lost,found,adoption',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'description' => 'required|string',
            'reward_amount' => 'nullable|numeric',
            'photo' => 'nullable|image|max:5120', // Max 5MB
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('pets'), $filename);
            $photoPath = 'pets/' . $filename;
        }

        // Create Pet first (simplified for demo, ideally select existing pet)
        $pet = Auth::user()->pets()->create([
            'name' => $validated['pet_name'],
            'species' => $validated['species'],
            'breed' => $validated['breed'] ?? null,
            'color' => $validated['color'] ?? null,
            'gender' => $validated['gender'] ?? 'unknown',
            'photo_path' => $photoPath,
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PetCase $mascota)
    {
        \Illuminate\Support\Facades\Log::info('Attempting to delete case: ' . $mascota->id . ' by user: ' . Auth::id());
        
        if ($mascota->user_id !== Auth::id()) {
            \Illuminate\Support\Facades\Log::warning('Unauthorized deletion attempt');
            abort(403);
        }

        try {
            $mascota->delete();
            \Illuminate\Support\Facades\Log::info('Case deleted successfully: ' . $mascota->id);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error deleting case: ' . $e->getMessage());
            return back()->with('error', 'Error al eliminar el caso: ' . $e->getMessage());
        }

        return redirect()->route('dashboard')->with('success', 'Caso eliminado correctamente.');
    }

    /**
     * Analiza una imagen de mascota usando AWS Rekognition
     */
    public function analyzeImage(Request $request, PetImageAnalyzer $analyzer)
    {
        $request->validate([
            'image' => 'required|image|max:5120' // Max 5MB
        ]);


        try {
            $file = $request->file('image');
            
            // Convert to Base64 Data URI
            $mimeType = $file->getMimeType();
            $content = file_get_contents($file->getRealPath());
            $base64 = base64_encode($content);
            $dataUri = 'data:' . $mimeType . ';base64,' . $base64;

            $result = $analyzer->analyze($dataUri);

            // Verificar si es una mascota válida
            if (!$analyzer->isValidPet($result)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se detectó ningún perro o gato en la imagen. Por favor, sube una foto clara de tu mascota.'
                ], 422);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'tipo' => $result['tipo'],
                    'raza_principal' => $analyzer->getPrimaryBreed($result),
                    'todas_razas' => $result['posible_raza'],
                    'color_principal' => $analyzer->getPrimaryColor($result),
                    'todos_colores' => $result['colores']
                ],
                'message' => "¡Es un {$result['tipo']} de raza {$analyzer->getPrimaryBreed($result)}!"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la imagen: ' . $e->getMessage()
            ], 500);
        }
    }
}

