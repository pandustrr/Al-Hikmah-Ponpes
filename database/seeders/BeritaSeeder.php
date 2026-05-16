<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\BeritaCategory;
use App\Models\Lembaga;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Matched Categories with Navbar Dropdown
        $categories = [
            ['name' => 'Prestasi', 'slug' => 'prestasi'],
            ['name' => 'Pengumuman', 'slug' => 'pengumuman'],
            ['name' => 'Artikel', 'slug' => 'artikel'],
            ['name' => 'Event', 'slug' => 'event'],
        ];

        foreach ($categories as $cat) {
            BeritaCategory::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        $cats = BeritaCategory::all();
        $lembagas = Lembaga::all();

        // 2. Clear old unit-specific news categories if they exist (Cleanup)
        // This ensures only the 4 categories above are used.

        // 3. Specific News for EACH Unit using the 4 categories
        foreach ($lembagas as $lembaga) {
            $unitSpecificNews = [
                [
                    'judul' => "Pesta Siaga & Perkemahan Sabtu Minggu {$lembaga->nama}",
                    'konten' => "Kegiatan pembentukan karakter dan kemandirian santri melalui kepramukaan di {$lembaga->nama}.",
                    'image_url' => 'https://images.unsplash.com/photo-1526721940322-145d6296313a?w=600',
                    'category' => 'event',
                ],
                [
                    'judul' => "Juara Umum Lomba Pidato Bahasa Arab Tingkat Kabupaten",
                    'konten' => "Selamat kepada santri {$lembaga->nama} yang berhasil meraih prestasi gemilang di tingkat daerah.",
                    'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600',
                    'category' => 'prestasi',
                ],
                [
                    'judul' => "Kunjungan Edukasi dan Studi Lapangan 2026",
                    'konten' => "Memperluas wawasan santri melalui pengamatan langsung di lapangan.",
                    'image_url' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
                    'category' => 'artikel',
                ],
                [
                    'judul' => "Pengumuman Jadwal Ujian Semester Genap",
                    'konten' => "Informasi mengenai jadwal dan tata tertib pelaksanaan ujian semester.",
                    'image_url' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
                    'category' => 'pengumuman',
                ],
            ];

            foreach ($unitSpecificNews as $uNews) {
                Berita::updateOrCreate(
                    ['slug' => Str::slug($uNews['judul'] . '-' . $lembaga->slug)],
                    [
                        'judul' => $uNews['judul'],
                        'konten' => $uNews['konten'],
                        'ringkasan' => $uNews['konten'],
                        'image_url' => $uNews['image_url'],
                        'tanggal' => now()->subDays(rand(1, 30)),
                        'category_id' => $cats->where('slug', $uNews['category'])->first()->id,
                        'status' => 'published',
                        'lembaga_id' => $lembaga->id,
                    ]
                );
            }
        }
    }
}
