<?php

namespace Database\Factories;

use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PetCase>
 */
class PetCaseFactory extends Factory
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
            'pet_id' => Pet::factory(),
            'type' => $this->faker->randomElement(['lost', 'found', 'adoption']),
            'status' => 'open',
            'lat' => $this->faker->latitude(-16.45, -16.35), // Arequipa, Peru
            'lng' => $this->faker->longitude(-71.58, -71.50),
            'description' => $this->faker->paragraph(),
            'reward_amount' => $this->faker->optional()->numberBetween(10000, 50000),
        ];
    }
}
