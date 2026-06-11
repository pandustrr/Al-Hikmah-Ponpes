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
            return Inertia::render('IndukAdmin/Dashboard', [
                'stats' => [
                    'total_lembaga' => \App\Models\Lembaga::count(),
                    'total_berita' => \App\Models\Berita::count(),
                    'total_pengajar' => \App\Models\Pengajar::count(),
                    'total_event' => \App\Models\Event::count(),
                    'total_testimonial' => \App\Models\Testimonial::count(),
                    'total_fasilitas' => \App\Models\Fasilitas::count(),
                ],
                'recent_berita' => \App\Models\Berita::with('category')->latest()->take(5)->get(),
                'recent_lembaga' => \App\Models\Lembaga::latest()->take(5)->get(),
            ]);
        })->name('dashboard');

        // Sub-pages
        Route::post('/lembaga/{lembaga}', [\App\Http\Controllers\IndukAdmin\LembagaController::class, 'update'])->name('lembaga.update-post');
        Route::resource('/lembaga', \App\Http\Controllers\IndukAdmin\LembagaController::class)->names('lembaga');
        Route::get('/berita/settings', [\App\Http\Controllers\IndukAdmin\BeritaController::class, 'settings'])->name('berita.settings');
        Route::resource('/berita', \App\Http\Controllers\IndukAdmin\BeritaController::class)->names('berita')->parameters(['berita' => 'berita']);
        Route::resource('/berita-category', \App\Http\Controllers\IndukAdmin\BeritaCategoryController::class)->names('berita-category');
        Route::get('/landing', [\App\Http\Controllers\IndukAdmin\LandingController::class, 'index'])->name('landing.index');
        Route::post('/landing/settings', [\App\Http\Controllers\IndukAdmin\LandingController::class, 'updateSettings'])->name('landing.settings.update');
        Route::resource('/testimonials', \App\Http\Controllers\IndukAdmin\TestimonialController::class)->names('testimonials');
        Route::resource('/events', \App\Http\Controllers\IndukAdmin\EventController::class)->names('events');
        Route::post('/pengajar/{pengajar}', [\App\Http\Controllers\IndukAdmin\PengajarController::class, 'update'])->name('admin.pengajar.update-post');
        Route::resource('/pengajar', \App\Http\Controllers\IndukAdmin\PengajarController::class)->names('pengajar');

        Route::get('/info-ppdb', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'index'])->name('info-ppdb.index');
        Route::post('/info-ppdb/info', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'storeInfo'])->name('ppdb-info.store');
        Route::put('/info-ppdb/info/{ppdbInfo}', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'updateInfo'])->name('ppdb-info.update');
        Route::post('/info-ppdb/faq', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'storeFaq'])->name('ppdb-faq.store');
        Route::put('/info-ppdb/faq/{faq}', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'updateFaq'])->name('ppdb-faq.update');
        Route::delete('/info-ppdb/faq/{faq}', [\App\Http\Controllers\IndukAdmin\InfoPPDBController::class, 'destroyFaq'])->name('ppdb-faq.destroy');
        Route::put('/lembaga/{lembagaId}/ppdb', [\App\Http\Controllers\IndukAdmin\PpdbInfoController::class, 'upsert'])->name('lembaga.ppdb.upsert');

        // Fasilitas CRUD (per lembaga, dari halaman edit lembaga)
        Route::post('/fasilitas', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'store'])->name('fasilitas.store');
        Route::post('/fasilitas/{fasilitas}', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'update'])->name('fasilitas.update');
        Route::delete('/fasilitas/{fasilitas}', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'destroy'])->name('fasilitas.destroy');

        // Galeri CRUD (per lembaga, dari halaman edit lembaga)
        Route::post('/galeri', [\App\Http\Controllers\IndukAdmin\GaleriAdminController::class, 'store'])->name('galeri.store');
        Route::post('/galeri/{galeri}', [\App\Http\Controllers\IndukAdmin\GaleriAdminController::class, 'update'])->name('galeri.update');
        Route::delete('/galeri/{galeri}', [\App\Http\Controllers\IndukAdmin\GaleriAdminController::class, 'destroy'])->name('galeri.destroy');

        Route::get('/fasilitas', [\App\Http\Controllers\IndukAdmin\FasilitasAdminController::class, 'index'])->name('fasilitas.index');
        Route::get('/tentang', [\App\Http\Controllers\IndukAdmin\TentangAdminController::class, 'index'])->name('tentang.index');
        Route::post('/tentang', [\App\Http\Controllers\IndukAdmin\TentangAdminController::class, 'update'])->name('tentang.update');
        Route::get('/kontak', [\App\Http\Controllers\IndukAdmin\KontakController::class, 'index'])->name('kontak.index');
        Route::post('/kontak', [\App\Http\Controllers\IndukAdmin\KontakController::class, 'update'])->name('kontak.update');

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
Route::get('/berita/kategori/{kategori}', [BeritaController::class, 'index'])->name('berita.kategori');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::get('/profil', [TentangController::class, 'profil'])->name('profil');
Route::get('/info-ppdb', [InfoPPDBController::class, 'index'])->name('pendaftaran');

Route::get('/kontak', [KontakController::class, 'index'])->name('kontak');
Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');

// Automatic Sitemap for Google Indexing
Route::get('/sitemap.xml', [HomeController::class, 'sitemap'])->name('sitemap');

// Dynamic Institution Page (MUST BE LAST)
Route::get('/{slug}', [SchoolController::class, 'show'])->name('lembaga.show');

require __DIR__.'/auth.php';
