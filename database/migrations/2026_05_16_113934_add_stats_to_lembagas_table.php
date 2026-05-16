<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->string('jumlah_siswa')->nullable()->after('running_text');
            $table->string('jumlah_pengajar')->nullable()->after('jumlah_siswa');
            $table->string('jumlah_fasilitas')->nullable()->after('jumlah_pengajar');
            $table->string('akreditasi')->nullable()->after('jumlah_fasilitas');
            $table->text('program_tags')->nullable()->after('akreditasi'); // pipe-separated: Kurikulum Merdeka|Tahfidz|...
        });
    }

    public function down(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->dropColumn(['jumlah_siswa', 'jumlah_pengajar', 'jumlah_fasilitas', 'akreditasi', 'program_tags']);
        });
    }
};
