<?php

use App\Http\Controllers\IndukPage\HomeController;
use App\Http\Controllers\LembagaPage\SchoolController;
use App\Http\Controllers\IndukPage\BeritaController;
use App\Http\Controllers\IndukPage\FasilitasController;
use App\Http\Controllers\IndukPage\TentangController;
use App\Http\Controllers\IndukPage\AlumniController;
use App\Http\Controllers\IndukPage\KontakController;
use App\Http\Controllers\IndukPage\InfoPPDBController;
use App\Http\Controllers\LembagaAdmin\Auth\AuthenticatedSessionController as LembagaAuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- ADMIN INDUK (SUPER ADMIN) ---
Route::prefix('admin')->name('admin.')->group(function () {
    // Login Induk
    Route::get('/login', [HomeController::class, 'adminLogin'])->name('login');
    
    // Dashboard Induk (Protected)
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', function () {
            return Inertia::render('IndukAdmin/Dashboard');
        })->name('dashboard');
    });
});

// --- ADMIN LEMBAGA (SCOPED) ---
Route::prefix('{lembaga_slug}/admin')->name('lembaga.admin.')->group(function () {
    // Login Lembaga
    Route::get('/login', [LembagaAuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [LembagaAuthenticatedSessionController::class, 'store']);

    // Dashboard Lembaga (Protected)
    Route::middleware(['auth', 'verified', 'lembaga.admin'])->group(function () {
        Route::get('/', function ($lembaga_slug) {
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Dashboard', [
                'lembaga' => $lembaga
            ]);
        })->name('dashboard');
    });
});

// --- PUBLIC ROUTES ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::get('/profil', [TentangController::class, 'profil'])->name('profil');
Route::get('/visi-misi', [TentangController::class, 'visiMisi'])->name('visi-misi');
Route::get('/sejarah', [TentangController::class, 'sejarah'])->name('sejarah');
Route::get('/pendaftaran', [InfoPPDBController::class, 'index'])->name('pendaftaran');
Route::get('/alumni', [AlumniController::class, 'index'])->name('alumni');
Route::get('/kontak', [KontakController::class, 'index'])->name('kontak');
Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');

// Dynamic Institution Page (MUST BE LAST)
Route::get('/{slug}', [SchoolController::class, 'show'])->name('lembaga.show');

require __DIR__.'/auth.php';
