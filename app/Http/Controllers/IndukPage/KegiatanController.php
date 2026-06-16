<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\Lembaga;
use Inertia\Inertia;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    public function index(Request $request)
    {
        $query = Kegiatan::with(['lembaga', 'galeris']);

        if ($request->lembaga) {
            $query->where('lembaga_id', $request->lembaga);
        }

        if ($request->q) {
            $query->where(function($q) use ($request) {
                $q->where('judul', 'like', "%{$request->q}%")
                  ->orWhere('deskripsi', 'like', "%{$request->q}%");
            });
        }

        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');

        return Inertia::render('IndukPage/Kegiatan/Index', [
            'kegiatan' => $query->orderBy('tanggal', 'desc')->get(),
            'lembagas' => Lembaga::select('id', 'nama', 'slug')->get(),
            'settings' => $settings,
            'filters' => $request->only(['lembaga', 'q']),
        ]);
    }

    public function show($slug)
    {
        $kegiatan = Kegiatan::with(['lembaga', 'galeris'])->where('slug', $slug)->firstOrFail();
        
        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        
        // Fetch recent activities
        $recentKegiatan = Kegiatan::where('id', '!=', $kegiatan->id)
            ->orderBy('tanggal', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('IndukPage/Kegiatan/Show', [
            'kegiatan' => $kegiatan,
            'recentKegiatan' => $recentKegiatan,
            'settings' => $settings,
        ]);
    }
}
