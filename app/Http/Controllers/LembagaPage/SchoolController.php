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

        // Sidebar Content: Announcements (ID 3)
        $announcements = \App\Models\Berita::where('lembaga_id', $lembaga->id)
            ->where('category_id', 3)
            ->where('status', 'published')
            ->latest()
            ->take(3)
            ->get();

        // Sidebar Content: Sticky Articles only
        $articles = \App\Models\Berita::where('lembaga_id', $lembaga->id)
            ->where('category_id', 4)
            ->where('status', 'published')
            ->where('is_sticky', true)
            ->latest()
            ->take(3)
            ->get();

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
            'lembaga'     => $lembaga,
            'prestasi'    => $prestasi,
            'kegiatan'    => $kegiatan,
            'beritas'     => $beritas,
            'stickyBerita'=> $stickyBerita,
            'announcements'=> $announcements,
            'articles'    => $articles,
            'pengajars'   => $pengajars,
            'fasilitas'   => $fasilitas,
            'ppdbInfo'    => $ppdbInfo,
        ]);
    }
}




