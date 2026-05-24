<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->string('hero_badge')->nullable()->default('Unit Pendidikan Formal');
            $table->string('tenaga_pendidik_tagline')->nullable()->default('Tenaga Pendidik');
            $table->string('tenaga_pendidik_title')->nullable()->default('Mengenal Para');
            $table->string('tenaga_pendidik_subtitle')->nullable()->default('Asatidzah Kami');
            $table->string('program_title')->nullable()->default('Program & Keunggulan');
            $table->string('adab_title')->nullable()->default('Adab & Kompetensi');
            $table->string('struktur_title')->nullable()->default('Struktur Pendidikan');
            $table->string('galeri_title')->nullable()->default('Galeri Unit');
            $table->string('berita_title')->nullable()->default('Berita & Kegiatan Unit');
            $table->unsignedBigInteger('berita_section_category_id')->nullable();
            $table->string('ppdb_tagline')->nullable()->default('Penerimaan Peserta Didik Baru');
            $table->string('ppdb_title')->nullable()->default('Bergabunglah Bersama');
            $table->string('ppdb_subtitle')->nullable()->default('SD NU 22 Full Day Al-Hikmah');
            $table->text('ppdb_points')->nullable();
            $table->string('ppdb_bottom_title')->nullable()->default('Mulai Perjalanan Pendidikan di SD NU 22 Full Day Al-Hikmah');
            $table->string('ppdb_bottom_subtitle')->nullable()->default('Pendaftaran Peserta Didik Baru.');

            $table->foreign('berita_section_category_id')->references('id')->on('berita_categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->dropForeign(['berita_section_category_id']);
            $table->dropColumn([
                'hero_badge',
                'tenaga_pendidik_tagline',
                'tenaga_pendidik_title',
                'tenaga_pendidik_subtitle',
                'program_title',
                'adab_title',
                'struktur_title',
                'galeri_title',
                'berita_title',
                'berita_section_category_id',
                'ppdb_tagline',
                'ppdb_title',
                'ppdb_subtitle',
                'ppdb_points',
                'ppdb_bottom_title',
                'ppdb_bottom_subtitle',
            ]);
        });
    }
};
