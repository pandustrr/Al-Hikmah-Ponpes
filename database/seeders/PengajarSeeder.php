<?php

namespace Database\Seeders;

use App\Models\Pengajar;
use Illuminate\Database\Seeder;

class PengajarSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // SD NU 22 Full Day Al-Hikmah (lembaga_id: 1)
            ['lembaga_id' => 1, 'nama' => 'Ust. Ahmad Fauzi, S.Pd.I', 'jabatan' => 'Kepala Sekolah', 'urutan' => 1],
            ['lembaga_id' => 1, 'nama' => 'Usth. Siti Maisaroh, S.Pd', 'jabatan' => 'Wali Kelas I', 'urutan' => 2],
            ['lembaga_id' => 1, 'nama' => 'Ust. Muhammad Rizki, S.Pd.I', 'jabatan' => 'Guru Tahfidz', 'urutan' => 3],
            ['lembaga_id' => 1, 'nama' => 'Usth. Nur Hidayah, S.Pd', 'jabatan' => 'Guru Matematika', 'urutan' => 4],
            ['lembaga_id' => 1, 'nama' => 'Ust. Abdurrahman, S.Pd.I', 'jabatan' => 'Guru PAI', 'urutan' => 5],
            ['lembaga_id' => 1, 'nama' => 'Usth. Fatimah Az-Zahra, S.Pd', 'jabatan' => 'Guru Bahasa Indonesia', 'urutan' => 6],
            ['lembaga_id' => 1, 'nama' => 'Ust. Zainul Arifin, S.Pd.I', 'jabatan' => 'Guru Bahasa Arab', 'urutan' => 7],
            ['lembaga_id' => 1, 'nama' => 'Usth. Rahmawati, S.Pd', 'jabatan' => 'Guru IPA', 'urutan' => 8],

            // SMP Unggulan Al-Hikmah (lembaga_id: 2)
            ['lembaga_id' => 2, 'nama' => 'Ust. Syaifuddin, M.Pd.I', 'jabatan' => 'Kepala Sekolah', 'urutan' => 1],
            ['lembaga_id' => 2, 'nama' => 'Usth. Khoirun Nisa, S.Pd', 'jabatan' => 'Guru Bahasa Inggris', 'urutan' => 2],
            ['lembaga_id' => 2, 'nama' => 'Ust. Habib Mustofa, S.Pd.I', 'jabatan' => 'Guru Fiqih', 'urutan' => 3],
            ['lembaga_id' => 2, 'nama' => 'Usth. Dewi Aminah, S.Pd', 'jabatan' => 'Guru Matematika', 'urutan' => 4],
            ['lembaga_id' => 2, 'nama' => 'Ust. Hasan Bashori, S.Pd.I', 'jabatan' => 'Guru Tahfidz', 'urutan' => 5],
            ['lembaga_id' => 2, 'nama' => 'Usth. Laila Maghfiroh, S.Pd', 'jabatan' => 'Guru IPS', 'urutan' => 6],

            // SMK Al-Hikmah Jember (lembaga_id: 3)
            ['lembaga_id' => 3, 'nama' => 'Ust. Drs. Ghufron, M.Pd', 'jabatan' => 'Kepala Sekolah', 'urutan' => 1],
            ['lembaga_id' => 3, 'nama' => 'Bpk. Irfan Maulana, S.Kom', 'jabatan' => 'Guru TKJ & RPL', 'urutan' => 2],
            ['lembaga_id' => 3, 'nama' => 'Ibu. Rina Fitriani, S.E', 'jabatan' => 'Guru Akuntansi', 'urutan' => 3],
            ['lembaga_id' => 3, 'nama' => 'Ust. Saifullah, S.Pd.I', 'jabatan' => 'Guru PAI & Tahfidz', 'urutan' => 4],
            ['lembaga_id' => 3, 'nama' => 'Bpk. Rudi Hartono, S.T', 'jabatan' => 'Guru Produktif Teknik', 'urutan' => 5],
            ['lembaga_id' => 3, 'nama' => 'Ibu. Nurul Hidayati, S.Pd', 'jabatan' => 'Guru Bahasa Inggris', 'urutan' => 6],

            // Madin Al-Hikmah Jember (lembaga_id: 4)
            ['lembaga_id' => 4, 'nama' => 'KH. Abdullah Musta\'in', 'jabatan' => 'Mudir / Kepala Madin', 'urutan' => 1],
            ['lembaga_id' => 4, 'nama' => 'Ust. Muhammad Sholeh, Lc', 'jabatan' => 'Ustadz Nahwu & Shorof', 'urutan' => 2],
            ['lembaga_id' => 4, 'nama' => 'Ust. Zainuddin Al-Hafidz', 'jabatan' => 'Ustadz Tahfidz Qur\'an', 'urutan' => 3],
            ['lembaga_id' => 4, 'nama' => 'Ust. Ahmad Syauqi, S.Pd.I', 'jabatan' => 'Ustadz Fiqih & Ushul', 'urutan' => 4],
            ['lembaga_id' => 4, 'nama' => 'Ust. Hamid Fahmi, Lc', 'jabatan' => 'Ustadz Hadits & Tafsir', 'urutan' => 5],
        ];

        foreach ($data as $pengajar) {
            Pengajar::updateOrCreate(
                ['lembaga_id' => $pengajar['lembaga_id'], 'nama' => $pengajar['nama']],
                $pengajar
            );
        }

        $this->command->info('✅ Data pengajar berhasil di-seed untuk semua lembaga.');
    }
}
