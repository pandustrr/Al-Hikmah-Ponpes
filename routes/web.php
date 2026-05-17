<?php

use App\Http\Controllers\IndukPage\HomeController;
use App\Http\Controllers\LembagaPage\SchoolController;
use App\Http\Controllers\IndukPage\BeritaController;
use App\Http\Controllers\IndukPage\FasilitasController;
use App\Http\Controllers\IndukPage\TentangController;

use App\Http\Controllers\IndukPage\KontakController;
use App\Http\Controllers\IndukPage\InfoPPDBController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- ADMIN INDUK (SUPER ADMIN) ---
Route::prefix('admin/console')->name('admin.')->group(function () {
    // Login Induk (Sekarang langsung di /admin/console)
    Route::get('/', [HomeController::class, 'adminLogin'])->name('login');
    
    // Dashboard Induk (Protected)
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('IndukAdmin/Dashboard');
        })->name('dashboard');

        // Sub-pages
        Route::resource('/lembaga', \App\Http\Controllers\IndukAdmin\LembagaController::class)->names('lembaga');
        Route::get('/berita/settings', [\App\Http\Controllers\IndukAdmin\BeritaController::class, 'settings'])->name('berita.settings');
        Route::resource('/berita', \App\Http\Controllers\IndukAdmin\BeritaController::class)->names('berita');
        Route::get('/landing', [\App\Http\Controllers\IndukAdmin\LandingController::class, 'index'])->name('landing.index');
        Route::post('/landing/settings', [\App\Http\Controllers\IndukAdmin\LandingController::class, 'updateSettings'])->name('landing.settings.update');
        Route::resource('/testimonials', \App\Http\Controllers\IndukAdmin\TestimonialController::class)->names('testimonials');
        Route::resource('/events', \App\Http\Controllers\IndukAdmin\EventController::class)->names('events');
        Route::resource('/pengajar', \App\Http\Controllers\IndukAdmin\PengajarController::class)->names('pengajar');
        
        Route::get('/info-ppdb', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'index'])->name('info-ppdb.index');
        Route::post('/info-ppdb/info', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'storeInfo'])->name('ppdb-info.store');
        Route::put('/info-ppdb/info/{ppdbInfo}', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'updateInfo'])->name('ppdb-info.update');
        Route::post('/info-ppdb/faq', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'storeFaq'])->name('ppdb-faq.store');
        Route::put('/info-ppdb/faq/{faq}', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'updateFaq'])->name('ppdb-faq.update');
        Route::delete('/info-ppdb/faq/{faq}', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'destroyFaq'])->name('ppdb-faq.destroy');
        Route::put('/lembaga/{lembagaId}/ppdb', [\App\Http\Controllers\IndukAdmin\PpdbInfoController::class, 'upsert'])->name('lembaga.ppdb.upsert');

        // Fasilitas CRUD (per lembaga, dari halaman edit lembaga)
        Route::post('/fasilitas', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'store'])->name('admin.fasilitas.store');
        Route::post('/fasilitas/{fasilitas}', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'update'])->name('admin.fasilitas.update');
        Route::delete('/fasilitas/{fasilitas}', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'destroy'])->name('admin.fasilitas.destroy');

        // Galeri CRUD (per lembaga, dari halaman edit lembaga)
        Route::post('/galeri', [\App\Http\Controllers\IndukAdmin\GaleriAdminController::class, 'store'])->name('admin.galeri.store');
        Route::post('/galeri/{galeri}', [\App\Http\Controllers\IndukAdmin\GaleriAdminController::class, 'update'])->name('admin.galeri.update');
        Route::delete('/galeri/{galeri}', [\App\Http\Controllers\IndukAdmin\GaleriAdminController::class, 'destroy'])->name('admin.galeri.destroy');

        Route::get('/fasilitas', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'index'])->name('fasilitas.index');
        Route::get('/tentang', function () { return Inertia::render('IndukAdmin/Tentang/Index'); })->name('tentang.index');
        Route::get('/kontak', function () { return Inertia::render('IndukAdmin/Kontak/Index'); })->name('kontak.index');
        
        // Settings
        Route::get('/settings', [\App\Http\Controllers\IndukAdmin\SiteSettingController::class, 'index'])->name('settings.index');
        Route::put('/settings', [\App\Http\Controllers\IndukAdmin\SiteSettingController::class, 'update'])->name('settings.update');
        Route::put('/settings/account', [\App\Http\Controllers\IndukAdmin\SiteSettingController::class, 'updateAccount'])->name('settings.account.update');
        Route::post('/settings/login-bg', [\App\Http\Controllers\IndukAdmin\SiteSettingController::class, 'updateLoginBg'])->name('settings.login-bg.update');
    });
});



// --- PUBLIC ROUTES ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::get('/profil', [TentangController::class, 'profil'])->name('profil');
Route::get('/info-ppdb', [InfoPPDBController::class, 'index'])->name('pendaftaran');

Route::get('/kontak', [KontakController::class, 'index'])->name('kontak');
Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');

// Dynamic Institution Page (MUST BE LAST)
Route::get('/{slug}', [SchoolController::class, 'show'])->name('lembaga.show');

require __DIR__.'/auth.php';
