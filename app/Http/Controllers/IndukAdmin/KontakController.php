<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

        \App\Models\SiteSetting::firstOrCreate(
            ['key' => 'contact_alamat'],
            [
                'label' => 'Alamat Lengkap Yayasan/Kantor',
                'value' => 'Jl. Raya Ambulu No. 123, Ambulu, Jember, Jawa Timur 68172',
                'group' => 'sosial_media',
                'type' => 'textarea'
            ]
        );

        \App\Models\SiteSetting::firstOrCreate(
            ['key' => 'contact_footer_tagline'],
            [
                'label' => 'Tagline/Deskripsi Footer Yayasan',
                'value' => 'Mencetak generasi rabbani yang unggul dalam ilmu pengetahuan, kokoh dalam iman, dan mulia dalam akhlak.',
                'group' => 'sosial_media',
                'type' => 'textarea'
            ]
        );

        $settings = \App\Models\SiteSetting::where('group', 'sosial_media')
                        ->orWhere('key', 'portal_email_kontak')
                        ->get()
                        ->groupBy('group');

        $lembagas = \App\Models\Lembaga::with('ppdbInfo')->get();

        return \Inertia\Inertia::render('IndukAdmin/Kontak/Index', [
            'settings' => $settings,
            'lembagas' => $lembagas,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|exists:site_settings,id',
            'lembagas' => 'nullable|array',
            'lembagas.*.id' => 'required|exists:lembagas,id',
            'lembagas.*.ppdb_info.contact_number' => 'nullable|string|max:30',
            'lembagas.*.ppdb_info.contact_name' => 'nullable|string|max:100',
            'lembagas.*.ppdb_info.contact_persons' => 'nullable|array',
            'lembagas.*.ppdb_info.contact_persons.*.name' => 'required|string|max:100',
            'lembagas.*.ppdb_info.contact_persons.*.number' => 'required|string|max:30',
        ]);

        // 1. Update Site Settings
        foreach ($request->input('settings', []) as $index => $item) {
            $setting = \App\Models\SiteSetting::find($item['id']);
            
            if ($request->hasFile("settings.$index.value")) {
                $file = $request->file("settings.$index.value");
                $path = $file->store('settings', 'public');
                $setting->update(['value' => \Illuminate\Support\Facades\Storage::url($path)]);
            } else if (isset($item['value']) && is_string($item['value'])) {
                $setting->update(['value' => $item['value']]);
            }
        }

        // 2. Update Lembaga PPDB Contacts
        foreach ($request->input('lembagas', []) as $item) {
            $lembagaId = $item['id'];
            $ppdbData = $item['ppdb_info'] ?? [];
            
            // Find or create ppdbInfo
            $ppdbInfo = \App\Models\PpdbInfo::firstOrCreate(
                ['lembaga_id' => $lembagaId],
                [
                    'description' => "Pendaftaran Peserta Didik Baru.",
                    'registration_link' => '',
                    'banner_url' => 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1200'
                ]
            );

            $ppdbInfo->update([
                'contact_number' => $ppdbData['contact_number'] ?? '',
                'contact_name' => $ppdbData['contact_name'] ?? '',
                'contact_persons' => $ppdbData['contact_persons'] ?? [],
            ]);
        }

        return redirect()->back()->with('success', 'Seluruh kontak & sosial media berhasil disimpan secara terpusat.');
    }
}
