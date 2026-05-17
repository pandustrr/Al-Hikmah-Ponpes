<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ppdb_infos', function (Blueprint $table) {
            // JSON array of { name: string, number: string }
            $table->json('contact_persons')->nullable()->after('contact_number');
        });
    }

    public function down(): void
    {
        Schema::table('ppdb_infos', function (Blueprint $table) {
            $table->dropColumn('contact_persons');
        });
    }
};
