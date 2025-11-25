<?php

namespace Database\Factories;

use App\Models\PetCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RewardClaim>
 */
class RewardClaimFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pet_case_id' => PetCase::factory(),
            'claimer_id' => User::factory(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected', 'paid']),
            'proof' => $this->faker->paragraph(),
            'proof_photo_path' => $this->faker->optional(0.7)->imageUrl(640, 480, 'animals'),
            'amount' => $this->faker->randomFloat(2, 50, 500),
            'rejection_reason' => null,
            'approved_at' => null,
            'paid_at' => null,
        ];
    }

    /**
     * Indicate that the claim is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'approved_at' => null,
            'paid_at' => null,
            'rejection_reason' => null,
        ]);
    }

    /**
     * Indicate that the claim is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_at' => now(),
            'paid_at' => null,
            'rejection_reason' => null,
        ]);
    }

    /**
     * Indicate that the claim is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'approved_at' => $this->faker->dateTimeBetween('-1 month', '-1 week'),
            'paid_at' => now(),
            'rejection_reason' => null,
        ]);
    }

    /**
     * Indicate that the claim is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'approved_at' => null,
            'paid_at' => null,
            'rejection_reason' => $this->faker->sentence(),
        ]);
    }
}
