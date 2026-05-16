<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Social Media
            [
                'key' => 'social_facebook',
                'value' => 'https://facebook.com/alhikmah',
                'label' => 'Facebook URL',
                'group' => 'social',
            ],
            [
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/alhikmah',
                'label' => 'Instagram URL',
                'group' => 'social',
            ],
            [
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/alhikmah',
                'label' => 'Twitter/X URL',
                'group' => 'social',
            ],
            [
                'key' => 'social_youtube',
                'value' => 'https://youtube.com/alhikmah',
                'label' => 'YouTube URL',
                'group' => 'social',
            ],
            // News Header
            [
                'key' => 'news_tagline',
                'value' => 'Independent • Trustworthy • Educational',
                'label' => 'News Tagline',
                'group' => 'berita',
            ],
        ];

        foreach ($settings as $setting) {
            \App\Models\SiteSetting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
