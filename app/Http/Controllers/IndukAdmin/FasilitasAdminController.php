<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FasilitasAdminController extends Controller
{
    public function index()
    {
        $fasilitas = Fasilitas::with(['lembaga', 'galeris'])->get();
        $lembagas = Lembaga::select('id', 'nama', 'slug')->get();

        return Inertia::render('IndukAdmin/Fasilitas/Index', [
            'fasilitas' => $fasilitas,
            'lembagas' => $lembagas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => 'nullable|integer|exists:lembagas,id',
            'nama'       => 'required|string|max:255',
            'kategori'   => 'nullable|string|max:100',
            'deskripsi'  => 'nullable|string',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_utama'   => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('fasilitas', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        // Default is_utama to true if request is from landing/homepage context or explicitly passed
        $validated['is_utama'] = $request->boolean('is_utama', true);

        Fasilitas::create($validated);

        return back()->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    public function update(Request $request, Fasilitas $fasilitas)
    {
        $validated = $request->validate([
            'lembaga_id' => 'nullable|integer|exists:lembagas,id',
            'nama'       => 'required|string|max:255',
            'kategori'   => 'nullable|string|max:100',
            'deskripsi'  => 'nullable|string',
            'image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_utama'   => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($fasilitas->image_url && str_starts_with($fasilitas->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $fasilitas->image_url));
            }
            $path = $request->file('image')->store('fasilitas', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }
        unset($validated['image']);

        if ($request->has('is_utama')) {
            $validated['is_utama'] = $request->boolean('is_utama');
        }

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
