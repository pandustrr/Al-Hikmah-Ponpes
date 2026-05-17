<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb_infos', function (Blueprint $table) {
            $table->boolean('is_link_active')->default(true)->after('registration_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ppdb_infos', function (Blueprint $table) {
            $table->dropColumn('is_link_active');
        });
    }
};
