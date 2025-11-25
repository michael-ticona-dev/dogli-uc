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
        Schema::create('reward_claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_case_id')->constrained()->onDelete('cascade');
            $table->foreignId('claimer_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['pending', 'approved', 'rejected', 'paid'])->default('pending');
            $table->text('proof')->nullable(); // Description of how they found the pet
            $table->string('proof_photo_path')->nullable(); // Photo evidence
            $table->decimal('amount', 10, 2)->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['pet_case_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reward_claims');
    }
};
