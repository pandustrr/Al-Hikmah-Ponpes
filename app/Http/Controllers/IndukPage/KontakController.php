<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function index()
    {
        // Pastikan settings contact_hero_bg dan contact_hero_bg_mobile selalu ada
        \App\Models\SiteSetting::firstOrCreate(
            ['key' => 'contact_hero_bg'],
            [
                'label' => 'Hero Background Kontak (Desktop)',
                'value' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600',
                'group' => 'sosial_media',
                'type' => 'image'
            ]
        );

        \App\Models\SiteSetting::firstOrCreate(
            ['key' => 'contact_hero_bg_mobile'],
            [
                'label' => 'Hero Background Kontak (Mobile)',
                'value' => '',
                'group' => 'sosial_media',
                'type' => 'image'
            ]
        );

        \App\Models\SiteSetting::firstOrCreate(
            ['key' => 'contact_google_maps_iframe'],
            [
                'label' => 'Iframe Embed Google Maps (Src URL)',
                'value' => 'https://maps.google.com/maps?q=Pondok%20Pesantren%20Al-Hikmah%20Jember&t=&z=15&ie=UTF8&iwloc=&output=embed',
                'group' => 'sosial_media',
                'type' => 'textarea'
            ]
        );

        \App\Models\SiteSetting::firstOrCreate(
            ['key' => 'contact_google_maps_link'],
            [
                'label' => 'Link Aplikasi Google Maps (Share URL)',
                'value' => 'https://share.google/euTzI1NffkXkx7PEa',
                'group' => 'sosial_media',
                'type' => 'text'
            ]
        );

        $settings = \App\Models\SiteSetting::where('group', 'sosial_media')
            ->orWhere('key', 'portal_email_kontak')
            ->get()
            ->pluck('value', 'key');

        $lembagas = \App\Models\Lembaga::with('ppdbInfo')->get();

        return Inertia::render('IndukPage/Kontak/Index', [
            'settings' => $settings,
            'lembagas' => $lembagas,
        ]);
    }
}
