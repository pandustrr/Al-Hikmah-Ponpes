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
Route::prefix('admin/console')->name('admin.')->group(function () {
    // Login Induk (Sekarang langsung di /admin/console)
    Route::get('/', [HomeController::class, 'adminLogin'])->name('login');
    
    // Dashboard Induk (Protected)
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('IndukAdmin/Dashboard');
        })->name('dashboard');

        // Sub-pages
        Route::get('/lembaga', function () { return Inertia::render('IndukAdmin/Lembaga/Index'); })->name('lembaga.index');
        Route::get('/berita', function () { return Inertia::render('IndukAdmin/Berita/Index'); })->name('berita.index');
        Route::get('/info-ppdb', function () { return Inertia::render('IndukAdmin/InfoPPDB/Index'); })->name('info-ppdb.index');
        Route::get('/alumni', function () { return Inertia::render('IndukAdmin/Alumni/Index'); })->name('alumni.index');
        Route::get('/fasilitas', function () { return Inertia::render('IndukAdmin/Fasilitas/Index'); })->name('fasilitas.index');
        Route::get('/tentang', function () { return Inertia::render('IndukAdmin/Tentang/Index'); })->name('tentang.index');
    });
});

// --- ADMIN LEMBAGA (SCOPED) ---
Route::prefix('{lembaga_slug}/admin/console')->name('lembaga.admin.')->group(function () {
    // Login Lembaga (Sekarang langsung di /{slug}/admin/console)
    Route::get('/', [LembagaAuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/', [LembagaAuthenticatedSessionController::class, 'store']);

    // Dashboard Lembaga (Protected)
    Route::middleware(['auth', 'verified', 'lembaga.admin'])->group(function () {
        Route::get('/dashboard', function ($lembaga_slug) {
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Dashboard', [
                'lembaga' => $lembaga
            ]);
        })->name('dashboard');

        // Sub-pages (Scoped by Lembaga)
        Route::get('/berita', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Berita/Index', ['lembaga' => $lembaga]); 
        })->name('berita.index');
        
        Route::get('/alumni', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Alumni/Index', ['lembaga' => $lembaga]); 
        })->name('alumni.index');

        Route::get('/fasilitas', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Fasilitas/Index', ['lembaga' => $lembaga]); 
        })->name('fasilitas.index');

        Route::get('/tentang', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Tentang/Index', ['lembaga' => $lembaga]); 
        })->name('tentang.index');

        Route::get('/kegiatan', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Kegiatan/Index', ['lembaga' => $lembaga]); 
        })->name('kegiatan.index');

        Route::get('/prestasi', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/Prestasi/Index', ['lembaga' => $lembaga]); 
        })->name('prestasi.index');

        Route::get('/info-ppdb', function ($lembaga_slug) { 
            $lembaga = \App\Models\Lembaga::where('slug', $lembaga_slug)->firstOrFail();
            return Inertia::render('LembagaAdmin/InfoPPDB/Index', ['lembaga' => $lembaga]); 
        })->name('info-ppdb.index');
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
