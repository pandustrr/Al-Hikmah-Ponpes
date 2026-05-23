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
            $table->string('youtube_video_badge')->nullable();
            $table->string('youtube_video_title')->nullable();
            $table->text('youtube_video_desc')->nullable();
            $table->text('youtube_video_urls')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lembagas', function (Blueprint $table) {
            $table->dropColumn([
                'youtube_video_badge',
                'youtube_video_title',
                'youtube_video_desc',
                'youtube_video_urls',
            ]);
        });
    }
};
