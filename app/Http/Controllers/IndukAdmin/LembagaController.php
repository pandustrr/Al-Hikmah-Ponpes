<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LembagaController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Lembaga/Index', [
            'lembagas' => Lembaga::orderBy('id', 'asc')->get()
        ]);
    }

    public function edit(Lembaga $lembaga)
    {
        return Inertia::render('IndukAdmin/Lembaga/Edit', [
            'lembaga'   => $lembaga,
            'pengajars' => \App\Models\Pengajar::where('lembaga_id', $lembaga->id)->orderBy('urutan')->get(),
            'ppdbInfo'  => \App\Models\PpdbInfo::where('lembaga_id', $lembaga->id)->first(),
            'fasilitas' => \App\Models\Fasilitas::where('lembaga_id', $lembaga->id)->with('galeris')->latest()->get(),
            'beritaCategories' => \App\Models\BeritaCategory::orderBy('name', 'asc')->get(),
            'beritas'   => \App\Models\Berita::where('lembaga_id', $lembaga->id)->where('status', 'published')->with('category')->orderBy('judul', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'summary' => 'nullable|string',
            'running_text' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'struktur_pendidikan' => 'nullable|string',
            'keunggulan' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_mobile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'ikon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'profil_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'profil_image_mobile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_url' => 'nullable|string',
            'image_mobile_url' => 'nullable|string',
            'ikon_url' => 'nullable|string',
            'profil_image_url' => 'nullable|string',
            'profil_image_mobile_url' => 'nullable|string',
            'filosofi_tagline' => 'nullable|string|max:255',
            'filosofi_title' => 'nullable|string|max:255',
            'sidebar_category_id' => 'nullable|exists:berita_categories,id',
            'sidebar_berita_id' => 'nullable|exists:beritas,id',
            'sidebar_categories' => 'nullable|array',
            'sidebar_categories.*' => 'exists:berita_categories,id',
            'youtube_video_badge' => 'nullable|string|max:255',
            'youtube_video_title' => 'nullable|string|max:255',
            'youtube_video_desc' => 'nullable|string',
            'youtube_video_urls' => 'nullable|string',
            'hero_badge' => 'nullable|string|max:255',
            'tenaga_pendidik_tagline' => 'nullable|string|max:255',
            'tenaga_pendidik_title' => 'nullable|string|max:255',
            'tenaga_pendidik_subtitle' => 'nullable|string|max:255',
            'program_title' => 'nullable|string|max:255',
            'adab_title' => 'nullable|string|max:255',
            'struktur_title' => 'nullable|string|max:255',
            'galeri_title' => 'nullable|string|max:255',
            'berita_title' => 'nullable|string|max:255',
            'berita_section_category_id' => 'nullable|exists:berita_categories,id',
            'ppdb_tagline' => 'nullable|string|max:255',
            'ppdb_title' => 'nullable|string|max:255',
            'ppdb_subtitle' => 'nullable|string|max:255',
            'ppdb_points' => 'nullable|string',
            'ppdb_bottom_title' => 'nullable|string|max:255',
            'ppdb_bottom_subtitle' => 'nullable|string|max:255',
        ]);

        if ($request->has('youtube_video_urls')) {
            $urls = $request->input('youtube_video_urls');
            if (is_string($urls)) {
                $decoded = json_decode($urls, true);
                $validated['youtube_video_urls'] = is_array($decoded) ? $decoded : [];
            }
        }

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['nama']);
        
        // Handle File Uploads
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('lembagas/banners', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('image_mobile')) {
            $path = $request->file('image_mobile')->store('lembagas/banners_mobile', 'public');
            $validated['image_mobile_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('ikon')) {
            $path = $request->file('ikon')->store('lembagas/icons', 'public');
            $validated['ikon_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('profil_image')) {
            $path = $request->file('profil_image')->store('lembagas/profils', 'public');
            $validated['profil_image_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('profil_image_mobile')) {
            $path = $request->file('profil_image_mobile')->store('lembagas/profils_mobile', 'public');
            $validated['profil_image_mobile_url'] = '/storage/' . $path;
        }

        // Ensure slug is unique
        $originalSlug = $validated['slug'];
        $count = 1;
        while (Lembaga::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $count++;
        }

        Lembaga::create($validated);

        return back()->with('success', 'Lembaga berhasil ditambahkan.');
    }

    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'summary' => 'nullable|string',
            'running_text' => 'nullable|string',
            'jumlah_siswa' => 'nullable|string|max:50',
            'jumlah_pengajar' => 'nullable|string|max:50',
            'jumlah_fasilitas' => 'nullable|string|max:50',
            'akreditasi' => 'nullable|string|max:50',
            'program_tags' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'struktur_pendidikan' => 'nullable|string',
            'keunggulan' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_mobile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'ikon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'profil_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'profil_image_mobile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_url' => 'nullable|string',
            'image_mobile_url' => 'nullable|string',
            'ikon_url' => 'nullable|string',
            'profil_image_url' => 'nullable|string',
            'profil_image_mobile_url' => 'nullable|string',
            'filosofi_tagline' => 'nullable|string|max:255',
            'filosofi_title' => 'nullable|string|max:255',
            'sidebar_category_id' => 'nullable|exists:berita_categories,id',
            'sidebar_berita_id' => 'nullable|exists:beritas,id',
            'sidebar_categories' => 'nullable|array',
            'sidebar_categories.*' => 'exists:berita_categories,id',
            'youtube_video_badge' => 'nullable|string|max:255',
            'youtube_video_title' => 'nullable|string|max:255',
            'youtube_video_desc' => 'nullable|string',
            'youtube_video_urls' => 'nullable|string',
            'hero_badge' => 'nullable|string|max:255',
            'tenaga_pendidik_tagline' => 'nullable|string|max:255',
            'tenaga_pendidik_title' => 'nullable|string|max:255',
            'tenaga_pendidik_subtitle' => 'nullable|string|max:255',
            'program_title' => 'nullable|string|max:255',
            'adab_title' => 'nullable|string|max:255',
            'struktur_title' => 'nullable|string|max:255',
            'galeri_title' => 'nullable|string|max:255',
            'berita_title' => 'nullable|string|max:255',
            'berita_section_category_id' => 'nullable|exists:berita_categories,id',
            'ppdb_tagline' => 'nullable|string|max:255',
            'ppdb_title' => 'nullable|string|max:255',
            'ppdb_subtitle' => 'nullable|string|max:255',
            'ppdb_points' => 'nullable|string',
            'ppdb_bottom_title' => 'nullable|string|max:255',
            'ppdb_bottom_subtitle' => 'nullable|string|max:255',
        ]);

        try {
            if ($request->has('youtube_video_urls')) {
                $urls = $request->input('youtube_video_urls');
                if (is_string($urls)) {
                    $decoded = json_decode($urls, true);
                    $validated['youtube_video_urls'] = is_array($decoded) ? $decoded : [];
                }
            }

            // Keep existing URLs if not explicitly provided or if no new files are uploaded
            if (!$request->has('image_url') && !$request->hasFile('image')) {
                unset($validated['image_url']);
            }
            if (!$request->has('image_mobile_url') && !$request->hasFile('image_mobile')) {
                unset($validated['image_mobile_url']);
            }
            if (!$request->has('ikon_url') && !$request->hasFile('ikon')) {
                unset($validated['ikon_url']);
            }
            if (!$request->has('profil_image_url') && !$request->hasFile('profil_image')) {
                unset($validated['profil_image_url']);
            }
            if (!$request->has('profil_image_mobile_url') && !$request->hasFile('profil_image_mobile')) {
                unset($validated['profil_image_mobile_url']);
            }

            // Clean slug
            $validated['slug'] = Str::slug($validated['slug']);
            
            // Ensure slug is unique
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Lembaga::where('slug', $validated['slug'])->where('id', '!=', $lembaga->id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $count++;
            }

            // Handle File Uploads
            if ($request->hasFile('image')) {
                if ($lembaga->image_url && str_starts_with($lembaga->image_url, '/storage/')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image_url));
                }
                $path = $request->file('image')->store('lembagas/banners', 'public');
                $validated['image_url'] = '/storage/' . $path;
            }

            if ($request->hasFile('image_mobile')) {
                if ($lembaga->image_mobile_url && str_starts_with($lembaga->image_mobile_url, '/storage/')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image_mobile_url));
                }
                $path = $request->file('image_mobile')->store('lembagas/banners_mobile', 'public');
                $validated['image_mobile_url'] = '/storage/' . $path;
            }

            if ($request->hasFile('ikon')) {
                if ($lembaga->ikon_url && str_starts_with($lembaga->ikon_url, '/storage/')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->ikon_url));
                }
                $path = $request->file('ikon')->store('lembagas/icons', 'public');
                $validated['ikon_url'] = '/storage/' . $path;
            }

            if ($request->hasFile('profil_image')) {
                if ($lembaga->profil_image_url && str_starts_with($lembaga->profil_image_url, '/storage/')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->profil_image_url));
                }
                $path = $request->file('profil_image')->store('lembagas/profils', 'public');
                $validated['profil_image_url'] = '/storage/' . $path;
            }

            if ($request->hasFile('profil_image_mobile')) {
                if ($lembaga->profil_image_mobile_url && str_starts_with($lembaga->profil_image_mobile_url, '/storage/')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->profil_image_mobile_url));
                }
                $path = $request->file('profil_image_mobile')->store('lembagas/profils_mobile', 'public');
                $validated['profil_image_mobile_url'] = '/storage/' . $path;
            }

            $lembaga->update($validated);

            return back()->with('success', 'Lembaga berhasil diperbarui.');
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Error updating lembaga: ' . $e->getMessage(), [
                'exception' => $e,
                'request_keys' => array_keys($request->all()),
            ]);
            return back()->withErrors(['error' => 'Gagal memperbarui lembaga: ' . $e->getMessage()]);
        }
    }

    public function destroy(Lembaga $lembaga)
    {
        // Delete files
        if ($lembaga->image_url && str_starts_with($lembaga->image_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image_url));
        }
        if ($lembaga->image_mobile_url && str_starts_with($lembaga->image_mobile_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image_mobile_url));
        }
        if ($lembaga->ikon_url && str_starts_with($lembaga->ikon_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->ikon_url));
        }
        if ($lembaga->profil_image_url && str_starts_with($lembaga->profil_image_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->profil_image_url));
        }
        if ($lembaga->profil_image_mobile_url && str_starts_with($lembaga->profil_image_mobile_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->profil_image_mobile_url));
        }

        $lembaga->delete();
        return back()->with('success', 'Lembaga berhasil dihapus.');
    }
}
