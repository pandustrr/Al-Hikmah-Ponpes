<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\Lembaga;
use App\Models\PpdbInfo;
use Illuminate\Database\Seeder;

class PpdbSeeder extends Seeder
{
    public function run(): void
    {
        $lembagas = Lembaga::all();

        foreach ($lembagas as $lembaga) {
            // Create PPDB Info
            PpdbInfo::create([
                'lembaga_id' => $lembaga->id,
                'description' => "Pendaftaran Peserta Didik Baru di {$lembaga->nama} telah dibuka. Kami mencari calon santri yang bersemangat untuk belajar dan berkembang bersama kami dalam lingkungan yang islami dan modern.",
                'contact_number' => '0812-3456-' . rand(1000, 9999),
                'registration_link' => "https://ppdb.alhikmah.sch.id/daftar/{$lembaga->slug}",
                'banner_url' => 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1200',
            ]);

            // Create some FAQs for each lembaga
            Faq::create([
                'lembaga_id' => $lembaga->id,
                'question' => "Kapan batas akhir pendaftaran di {$lembaga->nama}?",
                'answer' => "Pendaftaran gelombang pertama akan ditutup pada akhir Maret 2026. Segera daftarkan putra-putri Anda sebelum kuota terpenuhi.",
                'order' => 1,
            ]);

            Faq::create([
                'lembaga_id' => $lembaga->id,
                'question' => "Apa saja dokumen yang harus disiapkan?",
                'answer' => "Dokumen utama meliputi fotokopi KK, Akta Kelahiran, Ijazah terakhir, dan pas foto terbaru ukuran 3x4.",
                'order' => 2,
            ]);
        }

        // General FAQs (No lembaga_id)
        Faq::create([
            'lembaga_id' => null,
            'question' => "Apakah ada sistem asrama di Pondokan Ambulu?",
            'answer' => "Ya, seluruh unit pendidikan di bawah naungan YPDS Al-Hikmah mewajibkan santri untuk tinggal di asrama guna pembinaan karakter yang optimal.",
            'order' => 0,
        ]);
        
        Faq::create([
            'lembaga_id' => null,
            'question' => "Apakah tersedia beasiswa bagi santri berprestasi?",
            'answer' => "Kami menyediakan berbagai program beasiswa, mulai dari beasiswa tahfidz, beasiswa akademik, hingga bantuan bagi santri kurang mampu.",
            'order' => 0,
        ]);
    }
}
