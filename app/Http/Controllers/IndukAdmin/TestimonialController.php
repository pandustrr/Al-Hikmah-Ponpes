<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'info' => 'required|string|max:255',
            'quote' => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|string',
            'stars' => 'required|integer|min:1|max:5',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('testimonials', 'public');
            $validated['image_url'] = \Illuminate\Support\Facades\Storage::url($path);
        }

        unset($validated['image_file']);

        Testimonial::create($validated);

        return back()->with('success', 'Testimoni berhasil ditambahkan.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'info' => 'required|string|max:255',
            'quote' => 'required|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|string',
            'stars' => 'required|integer|min:1|max:5',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image_file')) {
            // Delete old file if exists in storage/testimonials
            if ($testimonial->image_url) {
                $oldPath = str_replace('/storage/', '', $testimonial->image_url);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_file')->store('testimonials', 'public');
            $validated['image_url'] = \Illuminate\Support\Facades\Storage::url($path);
        }

        unset($validated['image_file']);

        $testimonial->update($validated);

        return back()->with('success', 'Testimoni berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image_url) {
            $oldPath = str_replace('/storage/', '', $testimonial->image_url);
            \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
        }
        $testimonial->delete();

        return back()->with('success', 'Testimoni berhasil dihapus.');
    }
}
