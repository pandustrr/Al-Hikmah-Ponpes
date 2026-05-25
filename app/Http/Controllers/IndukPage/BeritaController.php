<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;

use App\Models\Berita;
use App\Models\BeritaCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::with('category')->where('status', 'published');
        $kategoriInput = $request->route('kategori') ?? $request->query('kategori');
        $resolvedCategory = null;

        if (!empty($kategoriInput)) {
            $resolvedCategory = BeritaCategory::where('slug', $kategoriInput)->first();

            if (!$resolvedCategory) {
                $normalizedInput = Str::slug($kategoriInput);

                $resolvedCategory = BeritaCategory::all()->first(function ($category) use ($normalizedInput) {
                    return Str::slug($category->name) === $normalizedInput;
                });
            }

            if ($resolvedCategory) {
                $query->where('category_id', $resolvedCategory->id);
            }
        }

        // Search feature
        if ($request->q) {
            $query->where(function($q) use ($request) {
                $q->where('judul', 'like', "%{$request->q}%")
                  ->orWhere('konten', 'like', "%{$request->q}%");
            });
        }

        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        $currentCategorySlug = $resolvedCategory?->slug ?? $kategoriInput;
        $currentCategorySeoSlug = $resolvedCategory ? Str::slug($resolvedCategory->name) : null;

        return Inertia::render('IndukPage/Berita/Index', [
            'berita' => $query->latest()->get(),
            'popularNews' => Berita::where('status', 'published')->orderBy('views', 'desc')->take(5)->get(),
            'multimedia' => Berita::where('is_multimedia', true)->where('status', 'published')->latest()->take(5)->get(),
            'currentCategory' => $currentCategorySlug,
            'currentCategorySeoSlug' => $currentCategorySeoSlug,
            'categories' => \App\Models\BeritaCategory::withCount('beritas')->orderBy('beritas_count', 'desc')->get(),
            'settings' => $settings,
            'filters' => $request->only(['q']),
        ]);
    }

    public function show($slug)
    {
        $berita = Berita::with('category')->where('slug', $slug)->firstOrFail();

        // Increment view counter
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





