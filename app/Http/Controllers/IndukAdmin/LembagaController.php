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
            'lembagas' => Lembaga::latest()->get()
        ]);
    }

    public function edit(Lembaga $lembaga)
    {
        return Inertia::render('IndukAdmin/Lembaga/Edit', [
            'lembaga' => $lembaga
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'summary' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'struktur_pendidikan' => 'nullable|string',
            'keunggulan' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'ikon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'image_url' => 'nullable|string',
            'ikon_url' => 'nullable|string',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['nama']);
        
        // Handle File Uploads
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('lembagas/banners', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('ikon')) {
            $path = $request->file('ikon')->store('lembagas/icons', 'public');
            $validated['ikon_url'] = '/storage/' . $path;
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
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'struktur_pendidikan' => 'nullable|string',
            'keunggulan' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'ikon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
            'image_url' => 'nullable|string',
            'ikon_url' => 'nullable|string',
        ]);

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

        if ($request->hasFile('ikon')) {
            if ($lembaga->ikon_url && str_starts_with($lembaga->ikon_url, '/storage/')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->ikon_url));
            }
            $path = $request->file('ikon')->store('lembagas/icons', 'public');
            $validated['ikon_url'] = '/storage/' . $path;
        }

        $lembaga->update($validated);

        return back()->with('success', 'Lembaga berhasil diperbarui.');
    }

    public function destroy(Lembaga $lembaga)
    {
        // Delete files
        if ($lembaga->image_url && str_starts_with($lembaga->image_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->image_url));
        }
        if ($lembaga->ikon_url && str_starts_with($lembaga->ikon_url, '/storage/')) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $lembaga->ikon_url));
        }

        $lembaga->delete();
        return back()->with('success', 'Lembaga berhasil dihapus.');
    }
}
