<?php

namespace App\Http\Controllers\LembagaPage;

use App\Http\Controllers\Controller;

use App\Models\Lembaga;
use App\Models\Prestasi;
use App\Models\Kegiatan;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function show($slug)
    {
        $lembaga = Lembaga::where('slug', $slug)->firstOrFail();
        
        $prestasi = Prestasi::where('lembaga_id', $lembaga->id)->latest()->get();
        $kegiatan = Kegiatan::where('lembaga_id', $lembaga->id)->latest()->get();
        
        // Sticky News
        $stickyBerita = \App\Models\Berita::where('lembaga_id', $lembaga->id)
            ->where('status', 'published')
            ->where('is_sticky', true)
            ->latest()
            ->first();

        // Regular News (excluding sticky if exists)
        $beritas = \App\Models\Berita::where('lembaga_id', $lembaga->id)
            ->where('status', 'published')
            ->when($stickyBerita, function($query) use ($stickyBerita) {
                return $query->where('id', '!=', $stickyBerita->id);
            })
            ->latest()
            ->take(4)
            ->get();

        // Sidebar Content: Multi-section, dinamis dari pilihan admin
        $sidebarSections = [];
        
        // Determine which category IDs to show in sidebar
        $catIds = [];
        if (!empty($lembaga->sidebar_categories) && is_array($lembaga->sidebar_categories)) {
            $catIds = $lembaga->sidebar_categories;
        } elseif ($lembaga->sidebar_category_id) {
            $catIds = [$lembaga->sidebar_category_id];
        } else {
            // Fallback: Prestasi category_id = 1
            $catIds = [1];
        }

        foreach ($catIds as $catId) {
            $cat = \App\Models\BeritaCategory::find($catId);
            if (!$cat) continue;

            $catBeritas = \App\Models\Berita::where('lembaga_id', $lembaga->id)
                ->where('category_id', $cat->id)
                ->where('status', 'published')
                ->latest()
                ->take(4)
                ->get();

            if ($catBeritas->isNotEmpty()) {
                $sidebarSections[] = [
                    'category_name' => $cat->name,
                    'items'         => $catBeritas,
                ];
            }
        }
        
        // Legacy: keep sidebarBeritas + sidebarCategoryName for backward compat
        $sidebarBeritas      = count($sidebarSections) > 0 ? $sidebarSections[0]['items'] : collect([]);
        $sidebarCategoryName = count($sidebarSections) > 0 ? $sidebarSections[0]['category_name'] : '';

        // PPDB Info for this lembaga
        $ppdbInfo = \App\Models\PpdbInfo::where('lembaga_id', $lembaga->id)
            ->where('is_active', true)
            ->first();

        // Teachers/Staff
        $pengajars = \App\Models\Pengajar::where('lembaga_id', $lembaga->id)
            ->orderBy('urutan')
            ->get();

        // Facilities
        $fasilitas = \App\Models\Fasilitas::where('lembaga_id', $lembaga->id)
            ->with('galeris')
            ->latest()
            ->get();

        return Inertia::render('LembagaPage/Home', [
            'lembaga'             => $lembaga,
            'prestasi'            => $prestasi,
            'kegiatan'            => $kegiatan,
            'beritas'             => $beritas,
            'stickyBerita'        => $stickyBerita,
            'sidebarSections'     => $sidebarSections,
            'sidebarBeritas'      => $sidebarBeritas,
            'sidebarCategoryName' => $sidebarCategoryName,
            'pengajars'           => $pengajars,
            'fasilitas'           => $fasilitas,
            'ppdbInfo'            => $ppdbInfo,
        ]);
    }
}




