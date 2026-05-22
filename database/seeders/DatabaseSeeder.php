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
        $admin = User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Super Admin Yayasan',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
            ]
        );

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
                'nama' => 'PAUD Al-Hikmah',
                'slug' => 'paud',
                'deskripsi' => 'Pendidikan Anak Usia Dini yang membentuk fondasi karakter islami sejak dini dalam suasana bermain yang menyenangkan.',
            ],
            [
                'nama' => 'TPQ Allimna Al-Hikmah',
                'slug' => 'tpq',
                'deskripsi' => 'Taman Pendidikan Al-Qur`an dengan metode yang menyenangkan untuk mengenalkan Al-Qur`an dan nilai-nilai Islam kepada anak-anak.',
            ],
        ];

        // 3. Create Lembagas and their Admins
        foreach ($lembagas as $data) {
            $lembaga = Lembaga::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'nama' => $data['nama'],
                    'deskripsi' => $data['deskripsi']
                ]
            );

            // Create Admin for this Lembaga
            User::updateOrCreate(
                ['username' => $lembaga->slug . '_admin'],
                [
                    'name' => 'Admin ' . $lembaga->nama,
                    'password' => Hash::make('password'),
                    'role' => 'lembaga_admin',
                    'lembaga_id' => $lembaga->id,
                ]
            );

            // Create dummy News for each Lembaga (Safe from duplicates)
            Berita::firstOrCreate(
                [
                    'lembaga_id' => $lembaga->id,
                    'judul' => 'Pendaftaran Siswa Baru ' . $lembaga->nama,
                ],
                [
                    'slug' => 'ppdb-' . $lembaga->slug,
                    'konten' => 'Telah dibuka pendaftaran siswa baru untuk tahun ajaran mendatang.',
                    'status' => 'published',
                    'tanggal' => now(),
                ]
            );

            // Create dummy Achievements (Prestasi) (Safe from duplicates)
            \App\Models\Prestasi::firstOrCreate(
                [
                    'lembaga_id' => $lembaga->id,
                    'judul' => 'Juara 1 Lomba Tahfidz Al-Qur`an',
                ],
                [
                    'slug' => 'juara-tahfidz-' . $lembaga->slug,
                    'konten' => 'Santri kami berhasil meraih juara 1 dalam perlombaan tingkat kabupaten.',
                    'tanggal' => now(),
                ]
            );

            // Create dummy Activities (Kegiatan) (Safe from duplicates)
            \App\Models\Kegiatan::firstOrCreate(
                [
                    'lembaga_id' => $lembaga->id,
                    'judul' => 'Kegiatan Ekstrakurikuler Rutin',
                ],
                [
                    'slug' => 'ekskul-rutin-' . $lembaga->slug,
                    'deskripsi' => 'Pengembangan minat dan bakat santri melalui berbagai kegiatan positif.',
                    'tanggal' => now(),
                ]
            );
        }

        // 4. Call Detailed Seeders (Includes all missing seeders now)
        $this->call([
            BeritaSeeder::class,
            LandingPageSeeder::class,
            PpdbSeeder::class,
            LembagaContentSeeder::class,
            RunningTextSeeder::class,
            FasilitasSeeder::class,     // Seed facilities data dynamically
            GaleriSeeder::class,        // Seed gallery photo sliders for facilities
            PengajarSeeder::class,      // Seed organizational teachers list
            SiteSettingSeeder::class,   // Seed general settings, contact page, social links
        ]);
    }
}
