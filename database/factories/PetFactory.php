<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
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
            'name' => $this->faker->firstName(),
            'species' => $this->faker->randomElement(['dog', 'cat']),
            'breed' => $this->faker->word(),
            'color' => $this->faker->colorName(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'description' => $this->faker->sentence(),
        ];
    }
}
