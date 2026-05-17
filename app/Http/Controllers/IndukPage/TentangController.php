<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TentangController extends Controller
{
    public function profil()
    {
        $settings = \App\Models\LandingSetting::where('group', 'profil')->get()->pluck('value', 'key');
        
        // Decode JSON arrays if they exist
        $settings['profil_misi_list'] = isset($settings['profil_misi_list']) ? json_decode($settings['profil_misi_list'], true) : [];
        $settings['profil_sejarah_timeline'] = isset($settings['profil_sejarah_timeline']) ? json_decode($settings['profil_sejarah_timeline'], true) : [];

        return Inertia::render('IndukPage/Tentang/Profil', [
            'settings' => $settings,
        ]);
    }
}
