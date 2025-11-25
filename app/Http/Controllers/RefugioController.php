<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RefugioController extends Controller
{
    public function index()
    {
        $shelters = User::where('type', 'shelter')
            ->with('shelterProfile')
            ->paginate(12);

        return Inertia::render('refugios/index', [
            'shelters' => $shelters,
        ]);
    }

    public function show(User $refugio)
    {
        if ($refugio->type !== 'shelter') {
            abort(404);
        }

        $refugio->load(['shelterProfile', 'petCases.pet']);

        return Inertia::render('refugios/show', [
            'shelter' => $refugio,
            'cases' => $refugio->petCases,
        ]);
    }
}
