<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Donation>
 */
class DonationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'shelter_id' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'currency' => 'PEN',
            'message' => $this->faker->optional(0.7)->sentence(),
            'status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
            'payment_id' => $this->faker->optional(0.8)->uuid(),
        ];
    }

    /**
     * Indicate that the donation is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'payment_id' => $this->faker->uuid(),
        ]);
    }

    /**
     * Indicate that the donation is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_id' => null,
        ]);
    }
}
