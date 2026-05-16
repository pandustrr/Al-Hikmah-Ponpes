<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;

use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::with('category')->where('status', 'published');

        if ($request->has('kategori')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->kategori);
            });
        }

        if ($request->has('q')) {
            $search = $request->q;
            $query->where(function($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('konten', 'like', "%{$search}%");
            });
        }

        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        
        return Inertia::render('IndukPage/Berita/Index', [
            'berita' => $query->latest()->get(),
            'popularNews' => Berita::where('status', 'published')->orderBy('views', 'desc')->take(5)->get(),
            'multimedia' => Berita::where('is_multimedia', true)->where('status', 'published')->latest()->take(5)->get(),
            'currentCategory' => $request->kategori,
            'categories' => \App\Models\BeritaCategory::withCount('beritas')->orderBy('beritas_count', 'desc')->get(),
            'settings' => $settings,
            'filters' => $request->only(['q']),
        ]);
    }

    public function show($slug)
    {
        $berita = Berita::with('category')->where('slug', $slug)->firstOrFail();
        
        // Increment views
        $berita->increment('views');
        
        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');

        return Inertia::render('IndukPage/Berita/Show', [
            'berita' => $berita,
            'recentBerita' => Berita::with('category')
                ->where('id', '!=', $berita->id)
                ->where('status', 'published')
                ->latest()
                ->take(5)
                ->get(),
            'settings' => $settings,
        ]);
    }
}





