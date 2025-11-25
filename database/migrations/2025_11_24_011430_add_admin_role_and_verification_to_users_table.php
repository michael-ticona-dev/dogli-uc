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
        Schema::table('users', function (Blueprint $table) {
            // Change type column to include 'admin'
            $table->enum('type', ['user', 'shelter', 'admin'])->default('user')->change();
            
            // Add verification fields
            $table->boolean('is_verified')->default(false)->after('type');
            $table->timestamp('verification_requested_at')->nullable()->after('is_verified');
            $table->text('verification_notes')->nullable()->after('verification_requested_at');
            
            // Add profile fields
            $table->text('bio')->nullable()->after('verification_notes');
            $table->string('avatar_path')->nullable()->after('bio');
            $table->string('phone')->nullable()->after('avatar_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_verified', 'verification_requested_at', 'verification_notes', 'bio', 'avatar_path', 'phone']);
            $table->enum('type', ['user', 'shelter'])->default('user')->change();
        });
    }
};
