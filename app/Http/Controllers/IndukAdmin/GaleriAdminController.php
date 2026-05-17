<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GaleriAdminController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fasilitas_id' => 'required|integer|exists:fasilitas,id',
            'judul'        => 'nullable|string|max:255',
            'deskripsi'    => 'nullable|string',
            'image'        => 'required|image|mimes:jpeg,png,jpg,webp|max:3072', // Up to 3MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('galeri', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        Galeri::create($validated);

        return back()->with('success', 'Foto galeri fasilitas berhasil ditambahkan.');
    }

    public function update(Request $request, Galeri $galeri)
    {
        $validated = $request->validate([
            'judul'     => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        if ($request->hasFile('image')) {
            if ($galeri->image_url && str_starts_with($galeri->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $galeri->image_url));
            }
            $path = $request->file('image')->store('galeri', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        $galeri->update($validated);

        return back()->with('success', 'Foto galeri berhasil diperbarui.');
    }

    public function destroy(Galeri $galeri)
    {
        if ($galeri->image_url && str_starts_with($galeri->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $galeri->image_url));
        }
        $galeri->delete();

        return back()->with('success', 'Foto galeri berhasil dihapus.');
    }
}
