<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\BeritaCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing data to avoid duplicates if desired
        // Berita::truncate();
        // BeritaCategory::truncate();

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

        $newsData = [
            [
                'judul' => 'Santri Al-Hikmah Raih Juara 1 Olimpiade Matematika Nasional',
                'konten' => 'Prestasi membanggakan kembali ditorehkan oleh santri Yayasan Al-Hikmah. Kali ini, ananda Ahmad Fauzi berhasil meraih medali emas dalam ajang Olimpiade Matematika Nasional yang diselenggarakan di Jakarta. Persaingan yang ketat tidak menyurutkan semangat Fauzi untuk memberikan yang terbaik bagi pondok pesantren.\n\nKeberhasilan ini merupakan hasil dari bimbingan intensif para ustadz dan ustadzah yang selama ini mendampingi santri dalam program unggulan sains. "Kami sangat bersyukur dan bangga atas pencapaian Ahmad Fauzi. Semoga ini menjadi motivasi bagi santri lainnya untuk terus berprestasi," ujar Pengasuh Pondok.',
                'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
                'category_id' => $cats->where('slug', 'prestasi')->first()->id,
            ],
            [
                'judul' => 'Kunjungan Studi Banding dari Pondok Pesantren Modern Darussalam',
                'konten' => 'Yayasan Al-Hikmah menerima kunjungan istimewa dari jajaran pengurus Pondok Pesantren Modern Darussalam. Kunjungan ini bertujuan untuk saling berbagi pengalaman dalam pengelolaan kurikulum pendidikan Islam yang mengintegrasikan nilai-nilai salaf dengan teknologi modern.\n\nDalam diskusi yang berlangsung hangat, kedua belah pihak sepakat untuk terus menjalin silaturahmi dan kolaborasi demi kemajuan pendidikan Islam di Indonesia. Rombongan tamu juga menyempatkan diri untuk melihat langsung fasilitas laboratorium komputer dan perpustakaan digital Al-Hikmah.',
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef14697593?auto=format&fit=crop&q=80&w=1200',
                'category_id' => $cats->where('slug', 'event')->first()->id,
            ],
            [
                'judul' => 'Pendaftaran Santri Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka',
                'konten' => 'Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah secara resmi membuka pendaftaran santri baru untuk tahun ajaran 2026/2027. Program pendidikan yang ditawarkan meliputi tingkat MI, MTs, dan MA dengan fokus pada Tahfidz Al-Qur\'an dan Penguasaan Bahasa Arab/Inggris.\n\nCalon wali santri dapat melakukan pendaftaran secara online melalui portal PPDB resmi Al-Hikmah atau datang langsung ke sekretariat pendaftaran di kompleks pondok pesantren. Kuota terbatas, segera daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik yang berkarakter islami.',
                'image_url' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200',
                'category_id' => $cats->where('slug', 'pengumuman')->first()->id,
            ],
            [
                'judul' => 'Pentingnya Menjaga Adab dalam Menuntut Ilmu di Era Digital',
                'konten' => 'Di tengah derasnya arus informasi di era digital, adab seringkali terlupakan oleh para penuntut ilmu. Padahal, dalam tradisi pendidikan Islam, adab menempati posisi yang sangat krusial bahkan sebelum seseorang mempelajari ilmu itu sendiri.\n\nArtikel ini membahas bagaimana santri seharusnya bersikap dalam menggunakan media sosial dan teknologi untuk belajar. Menghormati guru (ustadz), menjaga lisan di dunia maya, dan memverifikasi kebenaran informasi adalah beberapa poin penting yang harus diperhatikan agar ilmu yang didapat menjadi berkah dan bermanfaat.',
                'image_url' => 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200',
                'category_id' => $cats->where('slug', 'artikel')->first()->id,
            ],
            [
                'judul' => 'Pembangunan Gedung Laboratorium Bahasa Baru Dimulai',
                'konten' => 'Yayasan Al-Hikmah memulai pembangunan gedung laboratorium bahasa yang modern sebagai bagian dari peningkatan fasilitas pendidikan. Gedung ini nantinya akan dilengkapi dengan perangkat audio-visual mutakhir untuk mendukung praktik percakapan bahasa Arab dan Inggris bagi seluruh santri.\n\nPeletakan batu pertama dilakukan oleh ketua yayasan disaksikan oleh seluruh dewan asatidz. Proyek ini ditargetkan selesai dalam waktu enam bulan sehingga dapat segera digunakan pada semester mendatang.',
                'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
                'category_id' => $cats->where('slug', 'pengumuman')->first()->id,
            ],
            [
                'judul' => 'Wisuda Tahfidz Al-Qur\'an Juz 30 dan 29 Angkatan Ke-10',
                'konten' => 'Suasana haru dan khidmat menyelimuti aula utama Al-Hikmah saat diselenggarakannya wisuda tahfidz angkatan ke-10. Sebanyak 150 santri dinyatakan lulus ujian hafalan juz 30 dan beberapa diantaranya telah menyelesaikan juz 29 dengan predikat sangat memuaskan.\n\nAcara ini dihadiri oleh para orang tua santri yang tak kuasa membendung air mata saat melihat putra-putri mereka mengenakan mahkota simbolis. Ini adalah langkah awal bagi para santri untuk terus menjaga dan menambah hafalan Al-Qur\'an hingga 30 juz.',
                'image_url' => 'https://images.unsplash.com/photo-1523050353091-f11bc870e7a4?auto=format&fit=crop&q=80&w=1200',
                'category_id' => $cats->where('slug', 'event')->first()->id,
            ],
        ];

        foreach ($newsData as $news) {
            Berita::updateOrCreate(
                ['slug' => Str::slug($news['judul'])],
                [
                    'judul' => $news['judul'],
                    'konten' => $news['konten'],
                    'image_url' => $news['image_url'],
                    'tanggal' => now(),
                    'category_id' => $news['category_id'],
                ]
            );
        }
    }
}
