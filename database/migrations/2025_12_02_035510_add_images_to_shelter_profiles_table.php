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
        Schema::table('shelter_profiles', function (Blueprint $table) {
            $table->string('logo_path')->nullable()->after('bio');
            $table->string('banner_path')->nullable()->after('logo_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shelter_profiles', function (Blueprint $table) {
            //
        });
    }
};
