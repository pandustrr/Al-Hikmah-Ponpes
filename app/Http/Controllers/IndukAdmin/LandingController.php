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
        LandingSetting::firstOrCreate(
            ['key' => 'hero_bg'],
            [
                'value' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
                'group' => 'hero'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'hero_bg_mobile'],
            [
                'value' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
                'group' => 'hero'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'youtube_video_urls'],
            [
                'value' => '', // Default kosong, pisahkan dengan baris baru untuk beberapa link
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'youtube_video_badge'],
            [
                'value' => 'Galeri Video Resmi',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'youtube_video_title'],
            [
                'value' => 'Dokumentasi & Video Profil YPDS Al-Hikmah',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'youtube_video_desc'],
            [
                'value' => 'Simak video profil resmi serta dokumentasi kegiatan kami untuk melihat lingkungan belajar dan pembiasaan nilai adab santri.',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'fasilitas_tagline'],
            [
                'value' => 'Fasilitas Unggulan',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'fasilitas_title'],
            [
                'value' => 'Mendukung Perkembangan \n Potensi Siswa',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'fasilitas_desc'],
            [
                'value' => '"Fasilitas modern mulai dari laboratorium terpadu, asrama yang nyaman, hingga lapangan olahraga yang luas disediakan untuk memastikan kenyamanan belajar para siswa."',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'fasilitas_btn_text'],
            [
                'value' => 'Jelajahi Fasilitas Selengkapnya',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'warta_tagline'],
            [
                'value' => 'Warta Yayasan',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'warta_title_1'],
            [
                'value' => 'Informasi',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'warta_title_2'],
            [
                'value' => 'Terbaru',
                'group' => 'landing'
            ]
        );

        LandingSetting::firstOrCreate(
            ['key' => 'warta_btn_text'],
            [
                'value' => 'Lihat Semua Berita',
                'group' => 'landing'
            ]
        );

        $defaultFasilitas = [
            1 => ['nama' => 'Asrama Putra & Putri', 'img' => 'https://images.unsplash.com/photo-1555854817-40e09807a11d?auto=format&fit=crop&q=80&w=400'],
            2 => ['nama' => 'Laboratorium IT', 'img' => 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400'],
            3 => ['nama' => 'Perpustakaan Digital', 'img' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400'],
            4 => ['nama' => 'Pusat Olahraga', 'img' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400'],
        ];

        foreach ($defaultFasilitas as $i => $d) {
            LandingSetting::firstOrCreate(
                ['key' => "fasilitas_utama_{$i}_nama"],
                [
                    'value' => $d['nama'],
                    'group' => 'landing'
                ]
            );
            LandingSetting::firstOrCreate(
                ['key' => "fasilitas_utama_{$i}_img"],
                [
                    'value' => $d['img'],
                    'group' => 'landing'
                ]
            );
        }

        $settings = LandingSetting::all()->pluck('value', 'key')->map(function ($val) {
            if (is_string($val) && (str_starts_with($val, '[') || str_starts_with($val, '{'))) {
                $decoded = json_decode($val, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    return $decoded;
                }
            }
            return $val;
        });

        return Inertia::render('IndukAdmin/Landing/Index', [
            'settings' => $settings,
            'testimonials' => Testimonial::latest()->get(),
            'beritaList' => \App\Models\Berita::with('category')->latest()->get(),
            'categories' => \App\Models\BeritaCategory::all(),
            'lembagas' => \App\Models\Lembaga::all(['id', 'nama', 'slug']),
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
            
            // Skip file keys when they don't contain a new file (to avoid overwriting existing images with null)
            $imageKeys = [
                'hero_bg', 'hero_bg_mobile', 'about_image', 'ppdb_hero_bg', 'ppdb_hero_bg_mobile',
                'fasilitas_utama_1_img', 'fasilitas_utama_2_img', 'fasilitas_utama_3_img', 'fasilitas_utama_4_img'
            ];
            if (in_array($key, $imageKeys) && (is_null($value) || $value === 'null' || $value === '')) {
                continue;
            }
            
            // Encode arrays to JSON string
            if (is_array($value)) {
                $value = json_encode($value);
            }
            
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
