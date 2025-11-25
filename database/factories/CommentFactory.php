<?php

namespace Database\Factories;

use App\Models\PetCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $comments = [
            '¡Lo vi cerca del parque Selva Alegre!',
            'Creo que lo vi ayer por la tarde',
            '¿Todavía está perdido? Puedo ayudar a buscar',
            'Espero que lo encuentren pronto',
            '¡Qué hermoso! Me interesa adoptarlo',
            'Compartí en redes sociales para ayudar',
            'Tengo información que podría ayudar',
            '¿Ya apareció?',
        ];

        return [
            'user_id' => User::factory(),
            'pet_case_id' => PetCase::factory(),
            'content' => $this->faker->randomElement($comments),
            'parent_id' => null,
        ];
    }

    /**
     * Indicate that the comment is a reply.
     */
    public function reply(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => 1, // Will be set properly in seeder
        ]);
    }
}
