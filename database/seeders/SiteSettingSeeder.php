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
