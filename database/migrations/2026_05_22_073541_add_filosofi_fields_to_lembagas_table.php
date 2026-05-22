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
            $table->string('filosofi_tagline')->nullable()->after('running_text');
            $table->string('filosofi_title')->nullable()->after('filosofi_tagline');
            $table->unsignedBigInteger('sidebar_category_id')->nullable()->after('filosofi_title');
            
            $table->foreign('sidebar_category_id')->references('id')->on('berita_categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->dropForeign(['sidebar_category_id']);
            $table->dropColumn(['filosofi_tagline', 'filosofi_title', 'sidebar_category_id']);
        });
    }
};
