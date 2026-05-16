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
        Schema::create('ppdb_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lembaga_id')->constrained('lembagas')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('registration_link')->nullable();
            $table->string('banner_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb_infos');
    }
};
