<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FasilitasAdminController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => 'required|integer|exists:lembagas,id',
            'nama'       => 'required|string|max:255',
            'kategori'   => 'nullable|string|max:100',
            'deskripsi'  => 'nullable|string',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('fasilitas', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        Fasilitas::create($validated);

        return back()->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    public function update(Request $request, Fasilitas $fasilitas)
    {
        $validated = $request->validate([
            'nama'      => 'required|string|max:255',
            'kategori'  => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($fasilitas->image_url && str_starts_with($fasilitas->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $fasilitas->image_url));
            }
            $path = $request->file('image')->store('fasilitas', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        $fasilitas->update($validated);

        return back()->with('success', 'Fasilitas berhasil diperbarui.');
    }

    public function destroy(Fasilitas $fasilitas)
    {
        if ($fasilitas->image_url && str_starts_with($fasilitas->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $fasilitas->image_url));
        }
        $fasilitas->delete();

        return back()->with('success', 'Fasilitas berhasil dihapus.');
    }
}
