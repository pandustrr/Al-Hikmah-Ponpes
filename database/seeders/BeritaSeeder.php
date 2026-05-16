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
        // 1. Ensure categories exist
        $categories = [
            ['name' => 'Visi Kami', 'slug' => 'visi-kami'],
            ['name' => 'Prestasi', 'slug' => 'prestasi'],
            ['name' => 'Pengumuman', 'slug' => 'pengumuman'],
            ['name' => 'Artikel', 'slug' => 'artikel'],
            ['name' => 'Event', 'slug' => 'event'],
        ];

        foreach ($categories as $cat) {
            BeritaCategory::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        $cats = BeritaCategory::all();
        $pusatLembaga = Lembaga::where('slug', 'pusat')->first(); // If exists

        // 2. Sophisticated News Data for Hero Slider
        $newsData = [
            [
                'judul' => 'Membangun Masa Depan dengan Adab & Ilmu',
                'konten' => 'Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember berkomitmen untuk mencetak generasi yang tidak hanya unggul secara intelektual, tetapi juga memiliki kedalaman akhlak yang mulia. Kami mengintegrasikan kurikulum modern dengan nilai-nilai luhur pesantren untuk membentuk karakter santri yang tangguh dan berintegritas.',
                'ringkasan' => 'Filosofi pendidikan kami menggabungkan tradisi keilmuan Islam dengan inovasi teknologi masa kini.',
                'image_url' => 'https://picsum.photos/id/1018/1200/800',
                'category_id' => $cats->where('slug', 'visi-kami')->first()->id,
                'status' => 'published',
            ],
            [
                'judul' => 'Eksplorasi Cakrawala Ilmu di Perpustakaan Al-Hikmah',
                'konten' => 'Fasilitas perpustakaan kami menyediakan ribuan koleksi literatur klasik maupun modern. Ini adalah pusat riset dan literasi bagi santri untuk memperdalam pemahaman mereka tentang dunia dan agama. Kami percaya bahwa membaca adalah kunci pembuka pintu-pintu kebijaksanaan.',
                'ringkasan' => 'Literasi adalah fondasi utama dalam setiap jenjang pendidikan di lingkungan YPDS Al-Hikmah.',
                'image_url' => 'https://picsum.photos/id/1019/1200/800',
                'category_id' => $cats->where('slug', 'artikel')->first()->id,
                'status' => 'published',
            ],
            [
                'judul' => 'Harmoni Alam dan Kedamaian Spritual di Lingkungan Pondok',
                'konten' => 'Suasana yang asri dan tenang di Al-Hikmah Jember diciptakan untuk mendukung fokus santri dalam menghafal Al-Qur\'an dan menuntut ilmu. Kedekatan dengan alam membawa ketenangan batin yang mempermudah proses penyerapan nilai-nilai spiritual.',
                'ringkasan' => 'Lingkungan belajar yang kondusif adalah faktor krusial dalam keberhasilan pendidikan karakter.',
                'image_url' => 'https://picsum.photos/id/1015/1200/800',
                'category_id' => $cats->where('slug', 'event')->first()->id,
                'status' => 'published',
            ],
            [
                'judul' => 'Inovasi Pembelajaran Digital untuk Santri Milenial',
                'konten' => 'Meskipun berbasis nilai tradisional, Al-Hikmah tetap mengadopsi teknologi digital dalam metode pembelajarannya. Laboratorium bahasa dan komputer kami dirancang untuk membekali santri dengan keahlian yang relevan dengan tuntutan zaman tanpa mengorbankan identitas keislaman mereka.',
                'ringkasan' => 'Teknologi adalah sarana, akhlak adalah tujuan. Kami menyeimbangkan keduanya dengan presisi.',
                'image_url' => 'https://picsum.photos/id/1016/1200/800',
                'category_id' => $cats->where('slug', 'pengumuman')->first()->id,
                'status' => 'published',
            ],
            [
                'judul' => 'Pendaftaran Santri Baru (PPDB) 2026/2027 Telah Dibuka',
                'konten' => 'Kami mengundang putra-putri terbaik bangsa untuk bergabung menjadi bagian dari keluarga besar YPDS Al-Hikmah. Mari bersama-sama membangun masa depan yang cemerlang di bawah bimbingan para pengajar yang berdedikasi tinggi dan berpengalaman.',
                'ringkasan' => 'Kesempatan terbatas untuk pendaftaran gelombang pertama. Segera amankan kursi Anda.',
                'image_url' => 'https://picsum.photos/id/1025/1200/800',
                'category_id' => $cats->where('slug', 'pengumuman')->first()->id,
                'status' => 'published',
            ],
        ];

        foreach ($newsData as $news) {
            Berita::updateOrCreate(
                ['slug' => Str::slug($news['judul'])],
                [
                    'judul' => $news['judul'],
                    'konten' => $news['konten'],
                    'ringkasan' => $news['ringkasan'] ?? Str::limit(strip_tags($news['konten']), 150),
                    'image_url' => $news['image_url'],
                    'tanggal' => now(),
                    'category_id' => $news['category_id'],
                    'status' => $news['status'],
                    'lembaga_id' => null, // Berita Yayasan (Pusat)
                ]
            );
        }
    }
}
