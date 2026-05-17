<?php

namespace Database\Seeders;

use App\Models\Fasilitas;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // SD NU 22 Full Day (lembaga_id: 1)
            [
                'lembaga_id' => 1, 
                'nama' => 'Gedung Kelas Modern', 
                'kategori' => 'Bangunan', 
                'deskripsi' => 'Ruang kelas ber-AC dengan fasilitas multimedia dan kursi ergonomis untuk kenyamanan belajar.',
                'image_url' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 1, 
                'nama' => 'Perpustakaan Digital', 
                'kategori' => 'Literasi', 
                'deskripsi' => 'Koleksi buku fisik dan akses digital untuk menumbuhkan budaya membaca di kalangan santri.',
                'image_url' => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 1, 
                'nama' => 'Laboratorium Komputer', 
                'kategori' => 'Teknologi', 
                'deskripsi' => 'Fasilitas komputer dengan koneksi internet untuk mendukung pembelajaran berbasis teknologi.',
                'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 1, 
                'nama' => 'Masjid & Mushola', 
                'kategori' => 'Ibadah', 
                'deskripsi' => 'Tempat ibadah yang nyaman dan representatif sebagai pusat kegiatan keagamaan santri.',
                'image_url' => 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800'
            ],
            // SMP Unggulan (lembaga_id: 2)
            [
                'lembaga_id' => 2, 
                'nama' => 'Laboratorium IPA', 
                'kategori' => 'Sains', 
                'deskripsi' => 'Laboratorium lengkap untuk praktikum fisika, kimia, dan biologi.',
                'image_url' => 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 2, 
                'nama' => 'Lapangan Olahraga', 
                'kategori' => 'Olahraga', 
                'deskripsi' => 'Lapangan multifungsi untuk kegiatan olahraga dan ekstrakurikuler.',
                'image_url' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 2, 
                'nama' => 'Asrama Santri', 
                'kategori' => 'Hunian', 
                'deskripsi' => 'Asrama yang nyaman dan aman untuk santri yang berdomisili jauh.',
                'image_url' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 2, 
                'nama' => 'Kantin Sehat', 
                'kategori' => 'Layanan', 
                'deskripsi' => 'Kantin dengan menu bergizi yang diawasi untuk menjaga kesehatan santri.',
                'image_url' => 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800'
            ],
            // SMK Al-Hikmah (lembaga_id: 3)
            [
                'lembaga_id' => 3, 
                'nama' => 'Lab Komputer & Jaringan', 
                'kategori' => 'Teknologi', 
                'deskripsi' => 'Laboratorium TKJ dan RPL dengan perangkat keras dan lunak terkini.',
                'image_url' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 3, 
                'nama' => 'Bengkel Otomotif', 
                'kategori' => 'Praktik', 
                'deskripsi' => 'Bengkel praktik teknik otomotif dilengkapi peralatan standar industri.',
                'image_url' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 3, 
                'nama' => 'Studio Desain', 
                'kategori' => 'Kreatif', 
                'deskripsi' => 'Ruang studio untuk desain grafis dan multimedia dengan software profesional.',
                'image_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 3, 
                'nama' => 'Aula Serbaguna', 
                'kategori' => 'Kegiatan', 
                'deskripsi' => 'Aula berkapasitas besar untuk kegiatan seminar, wisuda, dan acara besar.',
                'image_url' => 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
            ],
            // Madin Al-Hikmah (lembaga_id: 4)
            [
                'lembaga_id' => 4, 
                'nama' => 'Ruang Halaqah', 
                'kategori' => 'Keagamaan', 
                'deskripsi' => 'Ruang khusus untuk kegiatan halaqah, tahfidz, dan kajian kitab kuning.',
                'image_url' => 'https://images.unsplash.com/photo-1590076247563-a2e1fabb77c2?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 4, 
                'nama' => 'Perpustakaan Kitab', 
                'kategori' => 'Literasi', 
                'deskripsi' => 'Koleksi ribuan kitab klasik dan kontemporer sebagai referensi utama pembelajaran.',
                'image_url' => 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 4, 
                'nama' => 'Asrama & Pondok', 
                'kategori' => 'Hunian', 
                'deskripsi' => 'Pondok pesantren dengan lingkungan kondusif untuk tholabul ilmi.',
                'image_url' => 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'lembaga_id' => 4, 
                'nama' => 'Masjid Al-Hikmah', 
                'kategori' => 'Ibadah', 
                'deskripsi' => 'Masjid utama pesantren sebagai pusat kegiatan ibadah dan keagamaan.',
                'image_url' => 'https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=800'
            ],
        ];

        foreach ($data as $item) {
            $facility = Fasilitas::where('lembaga_id', $item['lembaga_id'])
                ->where('nama', $item['nama'])
                ->first();

            if ($facility) {
                // If it exists but has no image_url, update it!
                if (!$facility->image_url) {
                    $facility->update(['image_url' => $item['image_url']]);
                }
            } else {
                Fasilitas::create($item);
            }
        }

        echo "✅ Data fasilitas unit berhasil diperbarui dengan foto Unsplash berkualitas tinggi.\n";
    }
}
