<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Portal Berita
            [
                'key'   => 'portal_tagline',
                'label' => 'Tagline Portal Berita',
                'value' => 'Pusat Informasi & Kabar Terkini Al-Hikmah Ambulu',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'portal_deskripsi',
                'label' => 'Deskripsi Singkat Portal',
                'value' => 'Ikuti perkembangan, prestasi, dan kegiatan seluruh unit pendidikan di lingkungan Yayasan Al-Hikmah Ambulu.',
                'group' => 'portal_berita',
                'type'  => 'textarea',
            ],
            [
                'key'   => 'portal_email_kontak',
                'label' => 'Email Redaksi',
                'value' => 'redaksi@alhikmahambulu.sch.id',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            // Pengaturan Teks Tampilan Berita
            [
                'key'   => 'news_hero_bg',
                'label' => 'Gambar Background Header (Upload)',
                'value' => '', // Default kosong, akan pakai warna solid
                'group' => 'portal_berita',
                'type'  => 'image',
            ],
            [
                'key'   => 'news_portal_badge',
                'label' => 'Badge Teks (Kecil di Atas)',
                'value' => 'Portal Berita',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_portal_title',
                'label' => 'Judul Utama Portal',
                'value' => 'Al-Hikmah NEWS',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_search_placeholder',
                'label' => 'Teks Placeholder Pencarian',
                'value' => 'Cari berita atau informasi...',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_other_title',
                'label' => 'Judul Bagian Berita Lainnya',
                'value' => 'Berita Lainnya',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_multimedia_title',
                'label' => 'Judul Bagian Multimedia',
                'value' => 'Multimedia Al-Hikmah',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_popular_title',
                'label' => 'Judul Sidebar Terpopuler',
                'value' => 'Terpopuler',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_newsletter_title',
                'label' => 'Judul Langganan Email',
                'value' => 'Langganan Warta',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_newsletter_desc',
                'label' => 'Deskripsi Langganan Email',
                'value' => 'Dapatkan berita terbaru langsung di inbox Anda.',
                'group' => 'portal_berita',
                'type'  => 'textarea',
            ],
            [
                'key'   => 'news_ig_title',
                'label' => 'Judul Feed Instagram',
                'value' => 'Instagram @alhikmah',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],
            [
                'key'   => 'news_tags_title',
                'label' => 'Judul Tag Populer',
                'value' => 'Tag Populer',
                'group' => 'portal_berita',
                'type'  => 'text',
            ],


            // Sosial Media
            [
                'key'   => 'sosmed_instagram',
                'label' => 'Instagram',
                'value' => 'https://instagram.com/alhikmahambulu',
                'group' => 'sosial_media',
                'type'  => 'url',
            ],
            [
                'key'   => 'sosmed_facebook',
                'label' => 'Facebook',
                'value' => 'https://facebook.com/alhikmahambulu',
                'group' => 'sosial_media',
                'type'  => 'url',
            ],
            [
                'key'   => 'sosmed_youtube',
                'label' => 'YouTube',
                'value' => 'https://youtube.com/@alhikmahambulu',
                'group' => 'sosial_media',
                'type'  => 'url',
            ],
            [
                'key'   => 'sosmed_tiktok',
                'label' => 'TikTok',
                'value' => '',
                'group' => 'sosial_media',
                'type'  => 'url',
            ],
            [
                'key'   => 'sosmed_whatsapp',
                'label' => 'WhatsApp (No. HP dengan kode negara)',
                'value' => '6281234567890',
                'group' => 'sosial_media',
                'type'  => 'text',
            ],
            [
                'key'   => 'contact_hero_bg',
                'label' => 'Hero Background Kontak (Desktop)',
                'value' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600',
                'group' => 'sosial_media',
                'type'  => 'image',
            ],
            [
                'key'   => 'contact_hero_bg_mobile',
                'label' => 'Hero Background Kontak (Mobile)',
                'value' => '',
                'group' => 'sosial_media',
                'type'  => 'image',
            ],

            // SEO
            [
                'key'   => 'seo_meta_description',
                'label' => 'Meta Description (SEO)',
                'value' => 'Portal berita resmi Yayasan Al-Hikmah Ambulu. Dapatkan informasi terbaru seputar pendidikan, prestasi, dan kegiatan santri.',
                'group' => 'seo',
                'type'  => 'textarea',
            ],
            [
                'key'   => 'seo_keywords',
                'label' => 'Keywords (SEO, pisahkan koma)',
                'value' => 'Al-Hikmah, Ambulu, pesantren, berita, pendidikan islam, jember',
                'group' => 'seo',
                'type'  => 'text',
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
