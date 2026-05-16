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
            $table->string('ikon_url')->nullable()->after('image_url');
            $table->text('summary')->nullable()->after('deskripsi');
            $table->text('struktur_pendidikan')->nullable()->after('misi');
            $table->text('keunggulan')->nullable()->after('struktur_pendidikan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->dropColumn(['ikon_url', 'summary', 'struktur_pendidikan', 'keunggulan']);
        });
    }
};
