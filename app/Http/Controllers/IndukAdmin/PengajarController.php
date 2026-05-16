<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Pengajar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PengajarController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => 'required|exists:lembagas,id',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('pengajar', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        Pengajar::create($validated);

        return back()->with('success', 'Pengajar berhasil ditambahkan.');
    }

    public function update(Request $request, Pengajar $pengajar)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($pengajar->image_url) {
                $oldPath = str_replace('/storage/', '', $pengajar->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('pengajar', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $pengajar->update($validated);

        return back()->with('success', 'Data pengajar berhasil diperbarui.');
    }

    public function destroy(Pengajar $pengajar)
    {
        if ($pengajar->image_url) {
            $path = str_replace('/storage/', '', $pengajar->image_url);
            Storage::disk('public')->delete($path);
        }
        $pengajar->delete();
        return back()->with('success', 'Pengajar berhasil dihapus.');
    }
}
