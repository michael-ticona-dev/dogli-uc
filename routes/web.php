<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dogli/index');
})->name('home');

// Rutas DogLi
Route::get('/anuncios', function () {
    return Inertia::render('dogli/anuncios');
})->name('anuncios');

Route::get('/guia', function () {
    return Inertia::render('dogli/guia');
})->name('guia');

Route::get('/nuevo-anuncio', function () {
    $accion = request()->query('accion');
    return Inertia::render('dogli/nuevo-anuncio', ['accion' => $accion]);
})->name('nuevo-anuncio');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
