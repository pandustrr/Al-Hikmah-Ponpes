<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lembaga;
use App\Models\Berita;
use App\Models\BeritaCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Super Admin
        $admin = User::create([
            'name' => 'Super Admin Yayasan',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
        ]);

        // 2. Define Lembaga Data with short slugs
        $lembagas = [
            [
                'nama' => 'SD NU 22 Full Day Al-Hikmah',
                'slug' => 'sd',
                'deskripsi' => 'Sekolah Dasar dengan sistem Full Day yang mengedepankan adab dan ilmu.',
            ],
            [
                'nama' => 'SMP Unggulan Al-Hikmah',
                'slug' => 'smp',
                'deskripsi' => 'Sekolah Menengah Pertama unggulan dengan kurikulum integrasi pesantren.',
            ],
            [
                'nama' => 'SMK Al-Hikmah Jember',
                'slug' => 'smk',
                'deskripsi' => 'Sekolah Menengah Kejuruan yang mencetak tenaga ahli profesional berkarakter santri.',
            ],
            [
                'nama' => 'Madin Al-Hikmah Jember',
                'slug' => 'madin',
                'deskripsi' => 'Madrasah Diniyah untuk pendalaman ilmu agama dan Al-Qur`an.',
            ],
        ];

        // 3. Create Lembagas and their Admins
        foreach ($lembagas as $data) {
            $lembaga = Lembaga::create($data);

            // Create Admin for this Lembaga
            User::create([
                'name' => 'Admin ' . $lembaga->nama,
                'username' => $lembaga->slug . '_admin',
                'password' => Hash::make('password'),
                'role' => 'lembaga_admin',
                'lembaga_id' => $lembaga->id,
            ]);

            // Create dummy News for each Lembaga
            Berita::create([
                'lembaga_id' => $lembaga->id,
                'judul' => 'Pendaftaran Siswa Baru ' . $lembaga->nama,
                'slug' => 'ppdb-' . $lembaga->slug . '-' . uniqid(),
                'konten' => 'Telah dibuka pendaftaran siswa baru untuk tahun ajaran mendatang.',
                'status' => 'published',
                'tanggal' => now(),
            ]);

            // Create dummy Achievements (Prestasi)
            \App\Models\Prestasi::create([
                'lembaga_id' => $lembaga->id,
                'judul' => 'Juara 1 Lomba Tahfidz Al-Qur`an',
                'slug' => 'juara-tahfidz-' . $lembaga->slug . '-' . uniqid(),
                'konten' => 'Santri kami berhasil meraih juara 1 dalam perlombaan tingkat kabupaten.',
                'tanggal' => now(),
            ]);

            // Create dummy Activities (Kegiatan)
            \App\Models\Kegiatan::create([
                'lembaga_id' => $lembaga->id,
                'judul' => 'Kegiatan Ekstrakurikuler Rutin',
                'slug' => 'ekskul-rutin-' . $lembaga->slug . '-' . uniqid(),
                'deskripsi' => 'Pengembangan minat dan bakat santri melalui berbagai kegiatan positif.',
                'tanggal' => now(),
            ]);
        }

        // 4. Create Global News Categories
        $categories = ['Kegiatan', 'Prestasi', 'Pengumuman'];
        foreach ($categories as $cat) {
            BeritaCategory::create([
                'name' => $cat,
                'slug' => strtolower($cat),
            ]);
        }
    }
}
