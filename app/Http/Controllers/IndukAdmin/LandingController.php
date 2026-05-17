<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\LandingSetting;
use App\Models\Testimonial;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Landing/Index', [
            'settings' => LandingSetting::all()->pluck('value', 'key'),
            'testimonials' => Testimonial::latest()->get(),
            'events' => Event::latest()->get(),
        ]);
    }

    public function updateSettings(Request $request)
    {
        // Handle potential file uploads for specific keys
        $files = $request->allFiles();
        foreach ($files as $key => $file) {
            $path = $file->store('settings', 'public');
            LandingSetting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => '/storage/' . $path,
                    'group' => str_starts_with($key, 'ppdb_') ? 'ppdb' : 'landing'
                ]
            );
        }

        // Handle regular text inputs
        foreach ($request->all() as $key => $value) {
            if ($request->hasFile($key) || $key === '_method') continue;
            
            LandingSetting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'group' => str_starts_with($key, 'ppdb_') ? 'ppdb' : 'landing'
                ]
            );
        }

        return back()->with('success', 'Pengaturan beranda berhasil diperbarui.');
    }
}
