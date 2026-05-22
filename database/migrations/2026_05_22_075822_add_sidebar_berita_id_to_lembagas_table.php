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
            $table->foreignId('sidebar_berita_id')->nullable()->constrained('beritas')->onDelete('set null')->after('sidebar_category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->dropForeign(['sidebar_berita_id']);
            $table->dropColumn('sidebar_berita_id');
        });
    }
};
