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
        Schema::create('pet_cases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pet_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // lost, found, adoption
            $table->string('status')->default('open'); // open, closed, resolved
            $table->decimal('lat', 10, 8);
            $table->decimal('lng', 11, 8);
            $table->decimal('reward_amount', 10, 2)->nullable();
            $table->text('description');
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();

            $table->index(['lat', 'lng']);
            $table->index('type');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_cases');
    }
};
