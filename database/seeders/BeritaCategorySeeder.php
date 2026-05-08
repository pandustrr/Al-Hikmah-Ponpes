<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeritaCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Prestasi', 'slug' => 'prestasi'],
            ['name' => 'Kegiatan', 'slug' => 'kegiatan'],
            ['name' => 'Pengumuman', 'slug' => 'pengumuman'],
            ['name' => 'Artikel', 'slug' => 'artikel'],
        ];

        foreach ($categories as $category) {
            \App\Models\BeritaCategory::create($category);
        }
    }
}
