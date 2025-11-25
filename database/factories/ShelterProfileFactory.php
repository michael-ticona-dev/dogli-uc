<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShelterProfile>
 */
class ShelterProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $shelterNames = [
            'Fundación Arca de Noé',
            'Refugio Patitas Felices',
            'Asociación Protectora Animal Arequipa',
            'Albergue Huellas de Amor',
            'Fundación Milagros Caninos',
            'Hogar Temporal Arequipa',
        ];

        return [
            'user_id' => User::factory(),
            'official_name' => $this->faker->randomElement($shelterNames),
            'address' => $this->faker->randomElement([
                'Av. Ejército 1234, Yanahuara, Arequipa',
                'Calle San Juan de Dios 567, Cercado, Arequipa',
                'Av. Dolores 890, José Luis Bustamante y Rivero, Arequipa',
                'Calle Los Rosales 234, Cayma, Arequipa',
                'Av. Lambramani 456, Socabaya, Arequipa',
            ]),
            'website' => $this->faker->optional()->url(),
            'bio' => $this->faker->paragraph(3),
            'verified_at' => $this->faker->optional(0.8)->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the shelter is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'verified_at' => now(),
        ]);
    }

    /**
     * Indicate that the shelter is unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'verified_at' => null,
        ]);
    }
}
