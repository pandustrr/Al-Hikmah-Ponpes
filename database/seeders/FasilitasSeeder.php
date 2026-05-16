<?php

namespace Database\Seeders;

use App\Models\Fasilitas;
use App\Models\Lembaga;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lembagas = Lembaga::all();

        foreach ($lembagas as $lembaga) {
            $fasilitas = [
                [
                    'nama' => 'Ruang Kelas Representatif',
                    'kategori' => 'Sarana Akademik',
                    'deskripsi' => 'Ruang kelas yang nyaman dilengkapi dengan ventilasi yang baik, pencahayaan optimal, dan papan tulis modern untuk mendukung proses belajar mengajar.',
                    'image_url' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
                ],
                [
                    'nama' => 'Laboratorium Komputer',
                    'kategori' => 'Fasilitas Teknologi',
                    'deskripsi' => 'Dilengkapi dengan komputer terbaru dan akses internet cepat untuk mendukung literasi digital dan praktik mata pelajaran TIK.',
                    'image_url' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
                ],
                [
                    'nama' => 'Perpustakaan Digital',
                    'kategori' => 'Sarana Akademik',
                    'deskripsi' => 'Koleksi buku lengkap baik fisik maupun digital (E-Book) untuk meningkatkan minat baca dan mempermudah riset santri.',
                    'image_url' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
                ],
                [
                    'nama' => 'Lapangan Olahraga Serbaguna',
                    'kategori' => 'Olahraga & Kesehatan',
                    'deskripsi' => 'Fasilitas untuk berbagai cabang olahraga seperti basket, voli, dan futsal guna menjaga kebugaran fisik santri.',
                    'image_url' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
                ],
                [
                    'nama' => 'Asrama Santri Nyaman',
                    'kategori' => 'Pemukiman',
                    'deskripsi' => 'Lingkungan tempat tinggal yang bersih, rapi, dan terkontrol untuk mendukung kemandirian dan pembiasaan adab islami.',
                    'image_url' => 'https://images.unsplash.com/photo-1555854817-5b2247a8175f?w=800',
                ],
                [
                    'nama' => 'Masjid Al-Hikmah',
                    'kategori' => 'Sarana Ibadah',
                    'deskripsi' => 'Pusat kegiatan spiritual dan ibadah rutin bagi seluruh civitas akademika Al-Hikmah.',
                    'image_url' => 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800',
                ],
            ];

            foreach ($fasilitas as $item) {
                Fasilitas::create(array_merge($item, ['lembaga_id' => $lembaga->id]));
            }
        }
    }
}
