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
        $lembagas = \App\Models\Lembaga::with([
            'prestasis' => fn($q) => $q->latest()->take(3),
            'kegiatans' => fn($q) => $q->latest()->take(2)
        ])->get();

        $beritaTerbaru = \App\Models\Berita::with('category')->latest()->take(4)->get();
        
        $landingSettings = \App\Models\LandingSetting::all()->pluck('value', 'key');
        $testimonials = \App\Models\Testimonial::where('is_active', true)->get();
        $upcomingEvents = \App\Models\Event::where('is_active', true)
            ->where('date', '>=', now())
            ->orderBy('date', 'asc')
            ->take(4)
            ->get();

        // Map relations to match frontend expected names
        foreach ($lembagas as $lembaga) {
            $lembaga->latest_prestasi = $lembaga->prestasis;
            $lembaga->latest_kegiatan = $lembaga->kegiatans;
        }

        return Inertia::render('IndukPage/Home/Index', [
            'lembagas' => $lembagas,
            'beritaTerbaru' => $beritaTerbaru,
            'landingSettings' => $landingSettings,
            'testimonials' => $testimonials,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }

    public function adminLogin()
    {
        return Inertia::render('IndukAdmin/Auth/Login');
    }

    /**
     * Generate dynamic XML sitemap for search engine bots.
     */
    public function sitemap()
    {
        $urls = [];
        $baseUrl = url('/');

        // 1. Static Pages
        $staticPages = [
            '' => ['priority' => '1.0', 'changefreq' => 'daily'],
            'profil' => ['priority' => '0.8', 'changefreq' => 'monthly'],
            'info-ppdb' => ['priority' => '0.9', 'changefreq' => 'weekly'],
            'kontak' => ['priority' => '0.7', 'changefreq' => 'monthly'],
            'fasilitas' => ['priority' => '0.7', 'changefreq' => 'monthly'],
            'berita' => ['priority' => '0.8', 'changefreq' => 'daily'],
        ];

        foreach ($staticPages as $path => $meta) {
            $urls[] = [
                'loc' => $path === '' ? $baseUrl : "{$baseUrl}/{$path}",
                'lastmod' => now()->startOfDay()->toAtomString(),
                'changefreq' => $meta['changefreq'],
                'priority' => $meta['priority']
            ];
        }

        // 2. Dynamic School (Lembaga) Pages
        $lembagas = \App\Models\Lembaga::all();
        foreach ($lembagas as $l) {
            if ($l->slug) {
                $urls[] = [
                    'loc' => "{$baseUrl}/" . ltrim($l->slug, '/'),
                    'lastmod' => $l->updated_at ? $l->updated_at->toAtomString() : now()->toAtomString(),
                    'changefreq' => 'weekly',
                    'priority' => '0.9'
                ];
            }
        }

        // 3. Dynamic News (Berita) Pages
        $beritas = \App\Models\Berita::latest()->get();
        foreach ($beritas as $b) {
            if ($b->slug) {
                $urls[] = [
                    'loc' => "{$baseUrl}/berita/" . ltrim($b->slug, '/'),
                    'lastmod' => $b->updated_at ? $b->updated_at->toAtomString() : now()->toAtomString(),
                    'changefreq' => 'weekly',
                    'priority' => '0.8'
                ];
            }
        }

        // Generate XML Content
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($url['loc']) . '</loc>';
            $xml .= '<lastmod>' . $url['lastmod'] . '</lastmod>';
            $xml .= '<changefreq>' . $url['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $url['priority'] . '</priority>';
            $xml .= '</url>';
        }
        
        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}
