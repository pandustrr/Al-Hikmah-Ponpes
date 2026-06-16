<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\KegiatanGaleri;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KegiatanAdminController extends Controller
{
    public function index()
    {
        $kegiatans = Kegiatan::with(['lembaga', 'galeris'])->get();
        $lembagas = Lembaga::select('id', 'nama', 'slug')->get();

        return Inertia::render('IndukAdmin/Kegiatan/Index', [
            'kegiatans' => $kegiatans,
            'lembagas' => $lembagas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => 'nullable|integer|exists:lembagas,id',
            'judul'      => 'required|string|max:255',
            'tanggal'    => 'nullable|date',
            'deskripsi'  => 'required|string',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('kegiatan', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        $slug = Str::slug($request->judul);
        $originalSlug = $slug;
        $count = 1;
        while (Kegiatan::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        Kegiatan::create($validated);

        return back()->with('success', 'Kegiatan berhasil ditambahkan.');
    }

    public function update(Request $request, Kegiatan $kegiatan)
    {
        $validated = $request->validate([
            'lembaga_id' => 'nullable|integer|exists:lembagas,id',
            'judul'      => 'required|string|max:255',
            'tanggal'    => 'nullable|date',
            'deskripsi'  => 'required|string',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($kegiatan->image_url && str_starts_with($kegiatan->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $kegiatan->image_url));
            }
            $path = $request->file('image')->store('kegiatan', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        if ($kegiatan->judul !== $request->judul) {
            $slug = Str::slug($request->judul);
            $originalSlug = $slug;
            $count = 1;
            while (Kegiatan::where('slug', $slug)->where('id', '!=', $kegiatan->id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $validated['slug'] = $slug;
        }

        $kegiatan->update($validated);

        return back()->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(Kegiatan $kegiatan)
    {
        // Delete main image
        if ($kegiatan->image_url && str_starts_with($kegiatan->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $kegiatan->image_url));
        }

        // Delete all gallery images
        foreach ($kegiatan->galeris as $galeri) {
            if ($galeri->image_url && str_starts_with($galeri->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $galeri->image_url));
            }
            $galeri->delete();
        }

        $kegiatan->delete();

        return back()->with('success', 'Kegiatan berhasil dihapus.');
    }

    // Gallery operations
    public function storeGallery(Request $request, Kegiatan $kegiatan)
    {
        $validated = $request->validate([
            'judul'     => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'image'     => 'required|image|mimes:jpeg,png,jpg,webp|max:3072', // Up to 3MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('kegiatan_galeri', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        $validated['kegiatan_id'] = $kegiatan->id;

        KegiatanGaleri::create($validated);

        return back()->with('success', 'Foto baru berhasil ditambahkan ke galeri kegiatan.');
    }

    public function destroyGallery(KegiatanGaleri $galeri)
    {
        if ($galeri->image_url && str_starts_with($galeri->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $galeri->image_url));
        }
        $galeri->delete();

        return back()->with('success', 'Foto galeri kegiatan berhasil dihapus.');
    }
}
