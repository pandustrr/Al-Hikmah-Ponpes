<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use Illuminate\Database\Seeder;

class LembagaContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'sd' => [
                'summary' => 'Pendidikan tingkat dasar yang mengedepankan pembentukan karakter islami dan pembiasaan adab harian sejak dini dengan metode Full Day School.',
                'visi' => 'Terwujudnya Generasi yang Berakhlakul Karimah, Cerdas, dan Mandiri berlandaskan Nilai-Nilai Islam Ahlussunnah Wal Jamaah.',
                'misi' => "1. Menanamkan Akidah Islam yang murni sejak dini.\n2. Membiasakan adab dan akhlak mulia dalam kehidupan sehari-hari.\n3. Menyelenggarakan pendidikan dasar yang kreatif dan inovatif.\n4. Mengembangkan potensi minat dan bakat siswa secara optimal.",
                'struktur_pendidikan' => "Kurikulum Nasional (Merdeka) yang diintegrasikan dengan Kurikulum Lokal Pesantren meliputi:\n- Tahfidz Juz 30 & Surat Pilihan\n- Pembiasaan Shalat Dhuha & Dhuhur Berjamaah\n- Bahasa Arab Dasar\n- Ekstrakurikuler Memanah & Berenang",
                'keunggulan' => "Gedung Milik Sendiri\nTenaga Pendidik Lulusan S1\nLingkungan Aman & Nyaman\nProgram Tahfidz Intensif\nKantin Sehat Higienis",
                'image_url' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000',
                'ikon_url' => 'https://img.icons8.com/bubbles/200/school.png',
            ],
            'smp' => [
                'summary' => 'Menyiapkan generasi remaja yang tangguh secara intelektual dan spiritual melalui integrasi sains dan ilmu syar\'i dalam lingkungan pesantren.',
                'visi' => 'Menjadi Lembaga Pendidikan Menengah Pertama yang Unggul dalam Prestasi dan Mulia dalam Budi Pekerti.',
                'misi' => "1. Meningkatkan kualitas akademik melalui pembelajaran berbasis IT.\n2. Memperdalam pemahaman kitab kuning dan literasi islami.\n3. Membentuk karakter pemimpin yang amanah dan bertanggung jawab.\n4. Menjalin sinergi yang kuat antara sekolah, orang tua, dan masyarakat.",
                'struktur_pendidikan' => "Program Unggulan meliputi:\n- Kelas Billingual (Arab - Inggris)\n- Madrasah Diniyah Sore Hari\n- Pendalaman Sains Terapan\n- Leadership Camp & Organisasi Santri",
                'keunggulan' => "Laboratorium IPA & Komputer\nPerpustakaan Digital\nAsrama Representatif\nBeasiswa Prestasi & Tahfidz\nBimbingan Konseling Intensif",
                'image_url' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000',
                'ikon_url' => 'https://img.icons8.com/bubbles/200/books.png',
            ],
            'smk' => [
                'summary' => 'Pusat keunggulan pendidikan vokasi yang mencetak tenaga ahli profesional dengan tetap memegang teguh nilai-nilai kesantrian dan etika kerja islami.',
                'visi' => 'Menghasilkan Lulusan yang Kompeten di Bidang Teknologi, Berjiwa Wirausaha, dan Berakhlak Mulia.',
                'misi' => "1. Menyelenggarakan diklat kejuruan berbasis standar industri.\n2. Menumbuhkan jiwa enterpreneurship melalui Unit Produksi.\n3. Mengintegrasikan etika kerja islami dalam setiap praktikum.\n4. Membangun jaringan kerjasama dengan IDUKA (Industri & Dunia Kerja).",
                'struktur_pendidikan' => "Kompetensi Keahlian:\n- Teknik Komputer & Jaringan (TKJ)\n- Multimedia & Desain Komunikasi Visual\n- Perbankan Syariah\n- Praktik Kerja Lapangan (PKL) di Instansi Ternama",
                'keunggulan' => "Sertifikasi Kompetensi BNSP\nBursa Kerja Khusus (BKK)\nBengkel & Lab Standar Industri\nE-Learning System\nProgram Magang Luar Negeri",
                'image_url' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000',
                'ikon_url' => 'https://img.icons8.com/bubbles/200/technical-support.png',
            ],
            'madin' => [
                'summary' => 'Lembaga pendidikan non-formal yang fokus pada pendalaman kitab salaf dan penguatan literasi keagamaan sebagai fondasi utama setiap santri.',
                'visi' => 'Melestarikan Ajaran Islam Salafush Shalih melalui Kajian Kitab Kuning yang Mendalam.',
                'misi' => "1. Menyelenggarakan pengajaran kitab kuning secara berjenjang.\n2. Menguatkan literasi Bahasa Arab (Nahwu & Sharaf).\n3. Membentuk pribadi santri yang taat beribadah dan tawadhu.\n4. Menyiapkan kader ulama yang mampu menjawab tantangan zaman.",
                'struktur_pendidikan' => "Materi Pembelajaran Utama:\n- Fiqih (Safinatun Najah - Fathul Qarib)\n- Tauhid (Aqidatul Awam - Jawahirul Kalamiyah)\n- Akhlak (Taysirul Khalaq - Ta'lim Muta'allim)\n- Nahwu Sharaf Intensif",
                'keunggulan' => "Metode Sorogan & Bandongan\nHalaqah Ilmiah Mingguan\nIjazah Sanad Kitab\nUstadz Lulusan Pesantren Ternama\nLingkungan Full Bahasa Arab",
                'image_url' => 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1000',
                'ikon_url' => 'https://img.icons8.com/bubbles/200/mosque.png',
            ],
        ];

        foreach ($data as $slug => $fields) {
            Lembaga::where('slug', $slug)->update($fields);
        }
    }
}
