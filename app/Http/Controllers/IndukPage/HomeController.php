<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use App\Models\Prestasi;
use App\Models\Kegiatan;
use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    public function index()
    {
        $activeLembagaSetting = \App\Models\LandingSetting::where('key', 'active_lembaga_ids')->first();
        $activeLembagaIds = null;
        if ($activeLembagaSetting && !empty($activeLembagaSetting->value)) {
            $activeLembagaIds = json_decode($activeLembagaSetting->value, true);
        }

        $lembagasQuery = \App\Models\Lembaga::with([
            'prestasis' => fn($q) => $q->latest()->take(3),
            'kegiatans' => fn($q) => $q->latest()->take(2)
        ]);

        if (!is_null($activeLembagaIds)) {
            $lembagasQuery->whereIn('id', is_array($activeLembagaIds) ? $activeLembagaIds : []);
        }

        $lembagas = $lembagasQuery->get();

        // Load berita terbaru per lembaga untuk section "Update Lembaga"
        foreach ($lembagas as $lembaga) {
            $lembaga->berita_terbaru = \App\Models\Berita::where('lembaga_id', $lembaga->id)
                ->where('status', 'published')
                ->with('category')
                ->latest()
                ->take(4)
                ->get();
        }

        $siteSettings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        $landingSettings = \App\Models\LandingSetting::all()->pluck('value', 'key')->merge($siteSettings)->map(function ($val) {
            if (is_string($val) && (str_starts_with($val, '[') || str_starts_with($val, '{'))) {
                $decoded = json_decode($val, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    return $decoded;
                }
            }
            return $val;
        });
        $testimonials = \App\Models\Testimonial::where('is_active', true)->get();

        // Load fasilitas untuk section "Fasilitas Unggulan" (diambil langsung dari database)
        $fasilitasUnggulan = \App\Models\Fasilitas::latest()
            ->take(4)
            ->get(['id', 'nama', 'image_url']);

        // 1. Hero News
        $heroNewsCategoryId = $landingSettings->get('hero_news_category_id', '');
        if (!empty($heroNewsCategoryId)) {
            $heroBerita = \App\Models\Berita::with('category')
                ->where('category_id', $heroNewsCategoryId)
                ->latest()
                ->take(5)
                ->get();
        } else {
            $heroBerita = \App\Models\Berita::with('category')->latest()->take(4)->get();
        }

        // 2. Announcements
        $announcementCategoryId = $landingSettings->get('sticky_announcement_category_id', '');
        $announcementCategory = null;
        if (!empty($announcementCategoryId)) {
            $announcementCategory = \App\Models\BeritaCategory::find($announcementCategoryId);
        }

        if ($announcementCategory) {
            $announcements = \App\Models\Berita::with('category')
                ->where('category_id', $announcementCategoryId)
                ->latest()
                ->take(3)
                ->get();
            $announcementTitle = $announcementCategory->name;
            $announcementSlug = $announcementCategory->slug;
        } else {
            $announcements = \App\Models\Berita::with('category')
                ->whereHas('category', fn($q) => $q->where('name', 'like', '%pengumuman%'))
                ->latest()
                ->take(3)
                ->get();
            $announcementTitle = 'Pengumuman';
            $firstAnn = $announcements->first();
            $announcementSlug = $firstAnn && $firstAnn->category ? $firstAnn->category->slug : 'pengumuman';
        }

        // 3. Articles
        $articleCategoryId = $landingSettings->get('sticky_article_category_id', '');
        $articleCategory = null;
        if (!empty($articleCategoryId)) {
            $articleCategory = \App\Models\BeritaCategory::find($articleCategoryId);
        }

        if ($articleCategory) {
            $articles = \App\Models\Berita::with('category')
                ->where('category_id', $articleCategoryId)
                ->latest()
                ->take(3)
                ->get();
            $articleTitle = $articleCategory->name;
            $articleSlug = $articleCategory->slug;
        } else {
            $articles = \App\Models\Berita::with('category')
                ->whereHas('category', fn($q) => $q->where('name', 'like', '%artikel%'))
                ->latest()
                ->take(3)
                ->get();
            $articleTitle = 'Artikel & Wawasan';
            $firstArt = $articles->first();
            $articleSlug = $firstArt && $firstArt->category ? $firstArt->category->slug : 'artikel';
        }

        // Format dates
        $formatItemDate = function($item) {
            $item->formatted_date = \Carbon\Carbon::parse($item->tanggal)->format('d/m/Y');
            return $item;
        };
        $announcements->map($formatItemDate);
        $articles->map($formatItemDate);

        // General Latest News (for the grid at the bottom)
        $beritaTerbaru = \App\Models\Berita::with('category')->latest()->take(4)->get();

        // 4. Bottom Category News
        $bottomNewsCategoryId = $landingSettings->get('bottom_news_category_id', '');

        if ($bottomNewsCategoryId === 'all') {
            $bottomNews = \App\Models\Berita::with('category')->latest()->take(4)->get();
            $bottomNewsTitle = 'Terbaru';
            $bottomNewsSlug = '';
        } elseif (!empty($bottomNewsCategoryId) && $bottomNewsCategoryId !== 'none') {
            $bottomNewsCategory = \App\Models\BeritaCategory::find($bottomNewsCategoryId);
            if ($bottomNewsCategory) {
                $bottomNews = \App\Models\Berita::with('category')
                    ->where('category_id', $bottomNewsCategoryId)
                    ->latest()
                    ->take(4)
                    ->get();
                $bottomNewsTitle = $bottomNewsCategory->name;
                $bottomNewsSlug = $bottomNewsCategory->slug;
            } else {
                $bottomNews = collect([]);
                $bottomNewsTitle = '';
                $bottomNewsSlug = '';
            }
        } else {
            $bottomNews = collect([]);
            $bottomNewsTitle = '';
            $bottomNewsSlug = '';
        }

        // Map relations to match frontend expected names
        foreach ($lembagas as $lembaga) {
            $lembaga->latest_prestasi = $lembaga->prestasis;
            $lembaga->latest_kegiatan = $lembaga->kegiatans;
        }

        return Inertia::render('IndukPage/Home/Index', [
            'lembagas' => $lembagas,
            'heroBerita' => $heroBerita,
            'beritaTerbaru' => $beritaTerbaru,
            'bottomNews' => $bottomNews,
            'bottomNewsTitle' => $bottomNewsTitle,
            'bottomNewsSlug' => $bottomNewsSlug,
            'announcements' => $announcements,
            'announcementTitle' => $announcementTitle,
            'announcementSlug' => $announcementSlug,
            'articles' => $articles,
            'articleTitle' => $articleTitle,
            'articleSlug' => $articleSlug,
            'landingSettings' => $landingSettings,
            'testimonials' => $testimonials,
            'fasilitasUnggulan' => $fasilitasUnggulan,
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
            ''          => ['priority' => '1.0', 'changefreq' => 'daily'],
            'profil'    => ['priority' => '0.8', 'changefreq' => 'monthly'],
            'info-ppdb' => ['priority' => '0.9', 'changefreq' => 'weekly'],
            'kontak'    => ['priority' => '0.7', 'changefreq' => 'monthly'],
            'fasilitas' => ['priority' => '0.7', 'changefreq' => 'monthly'],
            'berita'    => ['priority' => '0.9', 'changefreq' => 'daily'],
        ];

        foreach ($staticPages as $path => $meta) {
            $urls[] = [
                'loc' => $path === '' ? $baseUrl : "{$baseUrl}/{$path}",
                'lastmod' => now()->startOfDay()->toAtomString(),
                'changefreq' => $meta['changefreq'],
                'priority' => $meta['priority']
            ];
        }

        // 2. Dynamic School (Lembaga) Pages — Priority 0.95 (diprioritaskan untuk Sitelinks)
        $lembagas = \App\Models\Lembaga::all();
        foreach ($lembagas as $l) {
            if ($l->slug) {
                $urls[] = [
                    'loc' => "{$baseUrl}/" . ltrim($l->slug, '/'),
                    'lastmod' => $l->updated_at ? $l->updated_at->toAtomString() : now()->toAtomString(),
                    'changefreq' => 'monthly',
                    'priority' => '0.95'
                ];
            }
        }

        // 3. Dynamic News (Berita) Pages — with Image Sitemap
        $beritas = \App\Models\Berita::with('category')->latest()->get();
        foreach ($beritas as $b) {
            if ($b->slug) {
                $imageUrl = null;
                if (!empty($b->image_url)) {
                    $imageUrl = filter_var($b->image_url, FILTER_VALIDATE_URL)
                        ? $b->image_url
                        : url(ltrim($b->image_url, '/'));
                }
                $urls[] = [
                    'loc'        => "{$baseUrl}/berita/" . ltrim($b->slug, '/'),
                    'lastmod'    => $b->updated_at ? $b->updated_at->toAtomString() : now()->toAtomString(),
                    'changefreq' => 'weekly',
                    'priority'   => '0.8',
                    'image_url'  => $imageUrl,
                    'image_title'   => $b->judul,
                    'image_caption' => $b->judul . ' - YPDS Al-Hikmah Jember',
                ];
            }
        }

        // 4. Dynamic News Categories (Kategori Berita) — Priority 0.75
        $categories = \App\Models\BeritaCategory::all();
        foreach ($categories as $cat) {
            if ($cat->slug) {
                $latestBeritaInCat = \App\Models\Berita::where('category_id', $cat->id)->latest()->first();
                $lastmod = $latestBeritaInCat && $latestBeritaInCat->updated_at
                    ? $latestBeritaInCat->updated_at->toAtomString()
                    : now()->startOfDay()->toAtomString();

                $urls[] = [
                    'loc' => "{$baseUrl}/berita/kategori/" . ltrim($cat->slug, '/'),
                    'lastmod' => $lastmod,
                    'changefreq' => 'daily',
                    'priority' => '0.75'
                ];
            }
        }

        // Generate XML Content
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($url['loc']) . '</loc>';
            $xml .= '<lastmod>' . $url['lastmod'] . '</lastmod>';
            $xml .= '<changefreq>' . $url['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $url['priority'] . '</priority>';
            // Add image sitemap tag if image exists
            if (!empty($url['image_url'])) {
                $xml .= '<image:image>';
                $xml .= '<image:loc>' . htmlspecialchars($url['image_url']) . '</image:loc>';
                $xml .= '<image:title>' . htmlspecialchars($url['image_title'] ?? '') . '</image:title>';
                $xml .= '<image:caption>' . htmlspecialchars($url['image_caption'] ?? '') . '</image:caption>';
                $xml .= '</image:image>';
            }
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}
