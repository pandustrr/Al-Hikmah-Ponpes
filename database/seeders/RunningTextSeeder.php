<?php

namespace Database\Seeders;

use App\Models\Lembaga;
use Illuminate\Database\Seeder;

class RunningTextSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'sd' => [
                'running_text' => 'Penerimaan Peserta Didik Baru (PPDB) SD NU 22 Full Day Al-Hikmah Tahun Pelajaran 2026/2027 Telah Dibuka! Dapatkan Potongan Infaq Khusus Pendaftar Gelombang Pertama.',
            ],
            'smp' => [
                'running_text' => 'Selamat Datang di Portal Resmi SMP Unggulan Al-Hikmah. Mari Bergabung Bersama Kami Mewujudkan Generasi Qurani yang Berakhlak Mulia.',
            ],
            'smk' => [
                'running_text' => 'SMK Al-Hikmah Jember: Mencetak Tenaga Ahli Profesional Berkarakter Santri. Pendaftaran Jalur Beasiswa Tahfidz Masih Dibuka Hingga Akhir Bulan Ini.',
            ],
            'madin' => [
                'running_text' => 'Pengajian Rutin Ahad Pagi Bersama Pengasuh Yayasan Al-Hikmah. Terbuka Untuk Umum dan Seluruh Wali Santri.',
            ],
        ];

        foreach ($data as $slug => $fields) {
            Lembaga::where('slug', $slug)->update($fields);
        }
    }
}
