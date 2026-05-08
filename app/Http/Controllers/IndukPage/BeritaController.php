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
        $query = Berita::query();

        if ($request->has('kategori')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('slug', $request->kategori);
            });
        }

        return Inertia::render('IndukPage/Berita/Index', [
            'berita' => $query->latest()->get(),
            'currentCategory' => $request->kategori,
            'categories' => \App\Models\BeritaCategory::all(),
        ]);
    }

    public function show($slug)
    {
        $berita = Berita::where('slug', $slug)->firstOrFail();

        return Inertia::render('IndukPage/Berita/Show', [
            'berita' => $berita,
        ]);
    }
}




