<?php

namespace Database\Seeders;

use App\Models\Galeri;
use App\Models\Fasilitas;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate galeris table first so we don't have duplicates
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        Galeri::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        // Let's seed photos for each facility
        $facilities_photos = [
            // SD NU 22 Full Day
            'Gedung Kelas Modern' => [
                [
                    'judul' => 'Ruang Kelas Nyaman',
                    'deskripsi' => 'Kondisi ruang kelas yang ber-AC, bersih, dan terang untuk konsentrasi belajar maksimal.',
                    'image_url' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Sudut Baca Kelas',
                    'deskripsi' => 'Area pojok baca interaktif di dalam kelas untuk menumbuhkan minat baca santri sejak dini.',
                    'image_url' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800'
                ]
            ],
            'Perpustakaan Digital' => [
                [
                    'judul' => 'Katalog Buku Digital',
                    'deskripsi' => 'Santri dapat mencari koleksi pustaka melalui terminal komputer layar sentuh.',
                    'image_url' => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Area Membaca Santai',
                    'deskripsi' => 'Ruang membaca karpet lesehan dengan bantal yang ramah anak dan santri.',
                    'image_url' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800'
                ]
            ],
            'Laboratorium Komputer' => [
                [
                    'judul' => 'Praktek Dasar TIK',
                    'deskripsi' => 'Santri SD belajar mengetik dan dasar-dasar menggambar di komputer.',
                    'image_url' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Pengenalan Bahasa Pemrograman Anak',
                    'deskripsi' => 'Belajar logika dasar komputer menggunakan modul game visual Scratch.',
                    'image_url' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
                ]
            ],
            'Masjid & Mushola' => [
                [
                    'judul' => 'Sholat Dhuha Berjamaah',
                    'deskripsi' => 'Rutinitas sholat sunnah dhuha berjamaah setiap pagi dipimpin oleh ustadz.',
                    'image_url' => 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Hafalan Juz Amma',
                    'deskripsi' => 'Santri saling menyimak hafalan surat pendek (murojaah) di dalam masjid.',
                    'image_url' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
                ]
            ],

            // SMP Unggulan
            'Laboratorium IPA' => [
                [
                    'judul' => 'Praktikum Kimia Dasar',
                    'deskripsi' => 'Santri menggunakan tabung reaksi menguji larutan asam dan basa.',
                    'image_url' => 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Pengenalan Mikroskop',
                    'deskripsi' => 'Mempelajari bagian-bagian mikroskop cahaya untuk meneliti objek mikro.',
                    'image_url' => 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800'
                ]
            ],
            'Lapangan Olahraga' => [
                [
                    'judul' => 'Lapangan Basket Outdoor',
                    'deskripsi' => 'Tempat latihan fisik dan kompetisi basket antar-kelas.',
                    'image_url' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Latihan Futsal Rutin',
                    'deskripsi' => 'Ekstrakurikuler futsal yang dibina langsung oleh pelatih berlisensi.',
                    'image_url' => 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800'
                ]
            ],

            // SMK Al-Hikmah
            'Lab Komputer & Jaringan' => [
                [
                    'judul' => 'Cisco Networking Lab',
                    'deskripsi' => 'Praktek pemasangan kabel UTP dan konfigurasi switch jaringan.',
                    'image_url' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Praktek Linux Server',
                    'deskripsi' => 'Instalasi dan administrasi sistem operasi server berbasis Debian.',
                    'image_url' => 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800'
                ]
            ],
            'Bengkel Otomotif' => [
                [
                    'judul' => 'Praktek Overhaul Mesin',
                    'deskripsi' => 'Siswa membongkar dan menganalisis komponen blok silinder mesin motor.',
                    'image_url' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Uji Kelistrikan Motor',
                    'deskripsi' => 'Mengukur kelistrikan motor menggunakan multitester digital standar AHASS.',
                    'image_url' => 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800'
                ]
            ],
            'Studio Desain' => [
                [
                    'judul' => 'Laboratorium Desain Grafis',
                    'deskripsi' => 'Pembuatan aset ilustrasi digital menggunakan pen tablet.',
                    'image_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
                ],
                [
                    'judul' => 'Editing Video Film Pendek',
                    'deskripsi' => 'Praktek penyusunan video klip (video editing) untuk kebutuhan multimedia.',
                    'image_url' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
                ]
            ]
        ];

        foreach ($facilities_photos as $facility_name => $photos) {
            // Find facility record
            $facility = Fasilitas::where('nama', $facility_name)->first();
            if ($facility) {
                foreach ($photos as $p) {
                    Galeri::create([
                        'fasilitas_id' => $facility->id,
                        'judul'        => $p['judul'],
                        'deskripsi'    => $p['deskripsi'],
                        'image_url'    => $p['image_url']
                    ]);
                }
            }
        }

        echo "✅ Data galeri foto fasilitas berhasil di-seed untuk semua fasilitas yang sesuai.\n";
    }
}
