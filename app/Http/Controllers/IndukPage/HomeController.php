<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use App\Models\Prestasi;
use App\Models\Kegiatan;
use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $lembagas = Lembaga::with([
            'prestasis' => fn($q) => $q->latest()->take(3),
            'kegiatans' => fn($q) => $q->latest()->take(2)
        ])->get();

        $beritaTerbaru = Berita::with('category')->latest()->take(4)->get();
        
        // Map relations to match frontend expected names
        foreach ($lembagas as $lembaga) {
            $lembaga->latest_prestasi = $lembaga->prestasis;
            $lembaga->latest_kegiatan = $lembaga->kegiatans;
        }

        return Inertia::render('IndukPage/Home/Index', [
            'lembagas' => $lembagas,
            'beritaTerbaru' => $beritaTerbaru,
        ]);
    }

    public function adminLogin()
    {
        return Inertia::render('IndukAdmin/Auth/Login');
    }
}
