<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dogli/index');
})->name('home');

// Anuncios - Redirect to mascotas (radar público)
Route::get('/anuncios', [\App\Http\Controllers\MascotaController::class, 'index'])->name('anuncios');

Route::get('/guia', function () {
    return Inertia::render('dogli/guia');
})->name('guia');

Route::get('/nuevo-anuncio', function () {
    $accion = request()->query('accion');
    return Inertia::render('dogli/nuevo-anuncio', ['accion' => $accion]);
})->name('nuevo-anuncio');

// Radar de Mascotas - Público
Route::get('mascotas', [\App\Http\Controllers\MascotaController::class, 'index'])->name('mascotas.index');
Route::get('mascotas/{mascota}', [\App\Http\Controllers\MascotaController::class, 'show'])->name('mascotas.show');

// Refugios - Público
Route::get('refugios', [\App\Http\Controllers\RefugioController::class, 'index'])->name('refugios.index');
Route::get('refugios/{refugio}', [\App\Http\Controllers\RefugioController::class, 'show'])->name('refugios.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // Mascotas - Solo crear/editar requiere autenticación
    Route::get('mascotas/create', [\App\Http\Controllers\MascotaController::class, 'create'])->name('mascotas.create');
    Route::post('mascotas', [\App\Http\Controllers\MascotaController::class, 'store'])->name('mascotas.store');
    Route::get('mascotas/{mascota}/edit', [\App\Http\Controllers\MascotaController::class, 'edit'])->name('mascotas.edit');
    Route::put('mascotas/{mascota}', [\App\Http\Controllers\MascotaController::class, 'update'])->name('mascotas.update');
    Route::delete('mascotas/{mascota}', [\App\Http\Controllers\MascotaController::class, 'destroy'])->name('mascotas.destroy');

    // Donaciones
    Route::get('refugios/{refugio}/donar', [\App\Http\Controllers\DonacionController::class, 'create'])->name('donaciones.create');
    Route::post('refugios/{refugio}/donar', [\App\Http\Controllers\DonacionController::class, 'store'])->name('donaciones.store');

    // Profiles
    Route::get('perfil/{user}', [\App\Http\Controllers\ProfileController::class, 'show'])->name('perfil.show');
    Route::post('perfil/{user}/follow', [\App\Http\Controllers\ProfileController::class, 'follow'])->name('perfil.follow');
    Route::post('perfil/{user}/unfollow', [\App\Http\Controllers\ProfileController::class, 'unfollow'])->name('perfil.unfollow');

    // Rewards
    Route::get('mascotas/{petCase}/reclamar-recompensa', [\App\Http\Controllers\RewardController::class, 'create'])->name('recompensas.create');
    Route::post('mascotas/{petCase}/reclamar-recompensa', [\App\Http\Controllers\RewardController::class, 'store'])->name('recompensas.store');
    Route::get('mascotas/{petCase}/gestionar-reclamaciones', [\App\Http\Controllers\RewardController::class, 'manageClaims'])->name('recompensas.manage');
    Route::post('reclamaciones/{claim}/aprobar', [\App\Http\Controllers\RewardController::class, 'approve'])->name('recompensas.approve');
    Route::post('reclamaciones/{claim}/rechazar', [\App\Http\Controllers\RewardController::class, 'reject'])->name('recompensas.reject');
    Route::post('reclamaciones/{claim}/marcar-pagado', [\App\Http\Controllers\RewardController::class, 'markAsPaid'])->name('recompensas.paid');

    // Admin Routes
    Route::middleware([\App\Http\Middleware\EnsureUserRole::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [\App\Http\Controllers\AdminController::class, 'dashboard'])->name('dashboard');
        
        // Verifications
        Route::get('/verificaciones', [\App\Http\Controllers\AdminController::class, 'verifications'])->name('verifications');
        Route::post('/verificaciones/{user}/approve', [\App\Http\Controllers\AdminController::class, 'approveVerification'])->name('verifications.approve');
        Route::post('/verificaciones/{user}/reject', [\App\Http\Controllers\AdminController::class, 'rejectVerification'])->name('verifications.reject');
        
        // Moderation
        Route::get('/moderacion', [\App\Http\Controllers\AdminController::class, 'moderation'])->name('moderation');
        Route::post('/moderacion/{report}/resolve', [\App\Http\Controllers\AdminController::class, 'resolveReport'])->name('moderation.resolve');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
