<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\BeritaCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaCategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:berita_categories,name',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        BeritaCategory::create($validated);

        return redirect()->back()->with('success', 'Kategori berita berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BeritaCategory $beritaCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:berita_categories,name,' . $beritaCategory->id,
        ]);

        if ($request->name !== $beritaCategory->name) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);
        }

        $beritaCategory->update($validated);

        return redirect()->back()->with('success', 'Kategori berita berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BeritaCategory $beritaCategory)
    {
        BeritaCategory::destroy($beritaCategory->id);

        return redirect()->back()->with('success', 'Kategori berita berhasil dihapus.');
    }
}
