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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Donor
            $table->foreignId('shelter_id')->constrained('users')->cascadeOnDelete(); // Recipient (Shelter User)
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('USD');
            $table->text('message')->nullable();
            $table->string('status')->default('completed'); // pending, completed
            $table->string('payment_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
