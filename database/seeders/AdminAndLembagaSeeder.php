<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lembaga;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminAndLembagaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat Super Admin
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Super Admin Yayasan',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
            ]
        );

        // 2. Daftar Unit Pendidikan (Tanpa Madin)
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
                'deskripsi' => 'Pendidikan Anak Usia Dini yang membentuk fondasi karakter islami sejak dini.',
            ],
            [
                'nama' => 'TPQ Allimna Al-Hikmah',
                'slug' => 'tpq',
                'deskripsi' => 'Taman Pendidikan Al-Qur`an dengan metode Allimna.',
            ],
        ];

        // 3. Simpan Unit Pendidikan & Buat Admin per Unit
        foreach ($lembagas as $data) {
            $lembaga = Lembaga::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'nama' => $data['nama'],
                    'deskripsi' => $data['deskripsi']
                ]
            );

            // Buat Admin Unit
            User::updateOrCreate(
                ['username' => $lembaga->slug . '_admin'],
                [
                    'name' => 'Admin ' . $lembaga->nama,
                    'password' => Hash::make('password'),
                    'role' => 'lembaga_admin',
                    'lembaga_id' => $lembaga->id,
                ]
            );
        }

        // 4. Jalankan pengisian konten detail unit pendidikan
        $this->call([
            LembagaContentSeeder::class,
        ]);
    }
}
