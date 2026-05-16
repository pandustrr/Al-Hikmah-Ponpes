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
            'image_url' => 'nullable|string',
            'stars' => 'required|integer|min:1|max:5',
        ]);

        Testimonial::create($validated);

        return back()->with('success', 'Testimoni berhasil ditambahkan.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'info' => 'required|string|max:255',
            'quote' => 'required|string',
            'image_url' => 'nullable|string',
            'stars' => 'required|integer|min:1|max:5',
            'is_active' => 'required|boolean',
        ]);

        $testimonial->update($validated);

        return back()->with('success', 'Testimoni berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return back()->with('success', 'Testimoni berhasil dihapus.');
    }
}
