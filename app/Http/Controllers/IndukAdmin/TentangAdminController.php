<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LandingSetting;
use Illuminate\Support\Facades\Storage;

class TentangAdminController extends Controller
{
    public function index()
    {
        $settings = LandingSetting::where('group', 'profil')->get()->pluck('value', 'key');
        
        // Decode JSON arrays if they exist, otherwise provide defaults
        $settings['profil_misi_list'] = isset($settings['profil_misi_list']) ? json_decode($settings['profil_misi_list'], true) : [];
        $settings['profil_sejarah_timeline'] = isset($settings['profil_sejarah_timeline']) ? json_decode($settings['profil_sejarah_timeline'], true) : [];

        return Inertia::render('IndukAdmin/Tentang/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', 'hero_bg_file', 'hero_bg_mobile_file', 'profil_image_file']);
        
        // Handle file uploads
        if ($request->hasFile('hero_bg_file')) {
            $path = $request->file('hero_bg_file')->store('landing', 'public');
            $data['profil_hero_bg'] = '/storage/' . $path;
        }

        if ($request->hasFile('hero_bg_mobile_file')) {
            $path = $request->file('hero_bg_mobile_file')->store('landing', 'public');
            $data['profil_hero_bg_mobile'] = '/storage/' . $path;
        }

        if ($request->hasFile('profil_image_file')) {
            $path = $request->file('profil_image_file')->store('landing', 'public');
            $data['profil_image'] = '/storage/' . $path;
        }

        foreach ($data as $key => $value) {
            // Store arrays as JSON
            if (is_array($value)) {
                $value = json_encode($value);
            }
            
            LandingSetting::updateOrCreate(
                ['key' => $key, 'group' => 'profil'],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'Pengaturan Profil & Tentang Kami berhasil diperbarui.');
    }
}
