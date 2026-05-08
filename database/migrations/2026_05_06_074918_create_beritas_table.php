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
        Schema::create('beritas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lembaga_id')->nullable()->constrained('lembagas')->onDelete('cascade');
            $table->string('judul');
            $table->string('slug')->unique();
            $table->text('konten');
            $table->string('image_url')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('status')->default('published');
            $table->foreignId('category_id')->nullable()->constrained('berita_categories')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beritas');
    }
};
