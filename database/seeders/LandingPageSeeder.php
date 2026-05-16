<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\LandingSetting;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class LandingPageSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Landing Settings
        $settings = [
            ['key' => 'hero_subtitle', 'value' => 'Pusat Pendidikan & Dakwah Sosial', 'group' => 'hero'],
            ['key' => 'about_title_small', 'value' => 'Tentang Kami', 'group' => 'about'],
            ['key' => 'about_title_large', 'value' => 'Membangun Peradaban Melalui Pendidikan Berbasis Adab', 'group' => 'about'],
            ['key' => 'about_description', 'value' => 'Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember adalah lembaga yang berdedikasi untuk mencetak generasi yang unggul secara intelektual dan memiliki kedalaman akhlak yang mulia.', 'group' => 'about'],
            ['key' => 'ppdb_cta_title', 'value' => 'Mari Bergabung Menjadi Bagian dari Keluarga Besar Al-Hikmah', 'group' => 'ppdb'],
            ['key' => 'ppdb_cta_description', 'value' => 'Daftarkan putra-putri Anda sekarang untuk mendapatkan pendidikan terbaik dengan lingkungan yang asri dan islami.', 'group' => 'ppdb'],
            ['key' => 'ppdb_wave_1', 'value' => 'Januari – Maret 2026', 'group' => 'ppdb'],
            ['key' => 'ppdb_wave_2', 'value' => 'April – Juni 2026', 'group' => 'ppdb'],
            ['key' => 'ppdb_hero_bg', 'value' => 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1600', 'group' => 'ppdb'],
        ];

        foreach ($settings as $setting) {
            LandingSetting::updateOrCreate(['key' => $setting['key']], $setting);
        }

        // 2. Testimonials
        $testimonials = [
            [
                'name' => 'H. Sulaiman', 
                'info' => 'Wali Santri (SMA)', 
                'quote' => 'Putra kami menjadi jauh lebih mandiri dan taat beribadah sejak mondok di sini. Kurikulumnya sangat seimbang antara umum dan agama.', 
                'image_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                'stars' => 5
            ],
            [
                'name' => 'Ustadzah Fatimah', 
                'info' => 'Wali Santri (SMP)', 
                'quote' => 'Lingkungan yang asri dan aman membuat kami tenang menitipkan anak di YPDS Al-Hikmah. Guru-gurunya sangat perhatian.', 
                'image_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
                'stars' => 5
            ],
            [
                'name' => 'Abdullah Hakim', 
                'info' => 'Santri MA', 
                'quote' => 'Fasilitas laboratorium dan perpustakaannya sangat lengkap, sangat membantu kami yang ingin lanjut ke perguruan tinggi negeri.', 
                'image_url' => 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
                'stars' => 5
            ],
            [
                'name' => 'Dra. Hj. Aminah', 
                'info' => 'Tokoh Masyarakat', 
                'quote' => 'YPDS Al-Hikmah Jember adalah aset berharga bagi umat. Mencetak generasi yang cerdas dan berakhlakul karimah.', 
                'image_url' => 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
                'stars' => 5
            ],
        ];

        foreach ($testimonials as $testi) {
            Testimonial::updateOrCreate(['name' => $testi['name']], $testi);
        }

        // 3. Events
        $events = [
            [
                'title' => 'Musabaqah Tilawatil Quran Antar Siswa 2026', 
                'date' => '2026-05-15', 
                'lembaga' => 'MTS · MA · SMK', 
                'lokasi' => 'Aula Utama', 
                'image_url' => 'https://images.unsplash.com/photo-1585829365234-781f8c4414b8?w=600'
            ],
            [
                'title' => 'Seminar Nasional Pendidikan Islam Digital', 
                'date' => '2026-05-22', 
                'lembaga' => 'Seluruh Lembaga', 
                'lokasi' => 'Gedung Serbaguna', 
                'image_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'
            ],
            [
                'title' => 'Wisuda & Haflah Akhirussanah 2026', 
                'date' => '2026-06-01', 
                'lembaga' => 'MA · SMK', 
                'lokasi' => 'Lapangan Utama', 
                'image_url' => 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600'
            ],
            [
                'title' => 'Penerimaan Siswa Baru Gelombang 2', 
                'date' => '2026-06-10', 
                'lembaga' => 'MTS · MA · SMK', 
                'lokasi' => 'Kantor Pusat', 
                'image_url' => 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600'
            ],
        ];

        foreach ($events as $event) {
            Event::updateOrCreate(['title' => $event['title']], $event);
        }
    }
}
