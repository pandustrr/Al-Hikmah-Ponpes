<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\BeritaCategory;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Berita/Index', [
            'berita'     => Berita::with(['category', 'lembaga'])->latest()->get(),
            'categories' => BeritaCategory::all(),
            'lembagas'   => Lembaga::all(),
            'settings'   => \App\Models\SiteSetting::all()->groupBy('group'),
        ]);
    }

    public function create()
    {
        return Inertia::render('IndukAdmin/Berita/Create', [
            'categories' => BeritaCategory::all(),
            'lembagas' => Lembaga::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'ringkasan' => 'nullable|string',
            'konten' => 'required|string',
            'category_id' => 'required|exists:berita_categories,id',
            'lembaga_id' => 'nullable|exists:lembagas,id',
            'tanggal' => 'required|date',
            'status' => 'required|in:published,draft',
            'is_multimedia' => 'required|boolean',
            'is_sticky' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('berita', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $validated['slug'] = Str::slug($validated['judul']) . '-' . Str::random(5);

        Berita::create($validated);

        return redirect()->route('admin.berita.index')->with('success', 'Berita berhasil dibuat.');
    }

    public function edit(Berita $berita)
    {
        return Inertia::render('IndukAdmin/Berita/Edit', [
            'berita' => $berita,
            'categories' => BeritaCategory::all(),
            'lembagas' => Lembaga::all(),
        ]);
    }

    public function update(Request $request, Berita $berita)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'ringkasan' => 'nullable|string',
            'konten' => 'required|string',
            'category_id' => 'required|exists:berita_categories,id',
            'lembaga_id' => 'nullable|exists:lembagas,id',
            'tanggal' => 'required|date',
            'status' => 'required|in:published,draft',
            'is_multimedia' => 'required|boolean',
            'is_sticky' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($berita->image_url) {
                $oldPath = str_replace('/storage/', '', $berita->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('berita', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        // Only update slug if judul changed
        if ($request->judul !== $berita->judul) {
            $validated['slug'] = Str::slug($validated['judul']) . '-' . Str::random(5);
        }

        $berita->update($validated);

        return redirect()->route('admin.berita.index')->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(Berita $berita)
    {
        if ($berita->image_url) {
            $path = str_replace('/storage/', '', $berita->image_url);
            Storage::disk('public')->delete($path);
        }

        $berita->delete();

        return redirect()->route('admin.berita.index')->with('success', 'Berita berhasil dihapus.');
    }
}
