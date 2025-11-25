<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Donation;
use App\Models\Pet;
use App\Models\PetCase;
use App\Models\RewardClaim;
use App\Models\ShelterProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@dogli.com',
            'type' => 'admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        echo "✓ Admin created: admin@dogli.com / password\n";

        // Create regular test user
        $testUser = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'type' => 'user',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'bio' => 'Usuario de prueba del sistema',
        ]);

        echo "✓ Test user created: test@example.com / password\n";

        // Create 5 verified shelters with profiles
        $shelterNames = [
            ['name' => 'Fundación Arca de Noé', 'email' => 'arca@shelter.com'],
            ['name' => 'Refugio Patitas Felices', 'email' => 'patitas@shelter.com'],
            ['name' => 'Protectora Animal Arequipa', 'email' => 'protectora@shelter.com'],
            ['name' => 'Albergue Huellas de Amor', 'email' => 'huellas@shelter.com'],
            ['name' => 'Fundación Milagros Caninos', 'email' => 'milagros@shelter.com'],
        ];

        $shelters = [];
        foreach ($shelterNames as $index => $shelterData) {
            $shelter = User::create([
                'name' => $shelterData['name'],
                'email' => $shelterData['email'],
                'type' => 'shelter',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'is_verified' => true,
                'bio' => 'Refugio dedicado al rescate y cuidado de animales en Arequipa',
            ]);

            $addresses = [
                'Av. Ejército 1234, Yanahuara, Arequipa',
                'Calle San Juan de Dios 567, Cercado, Arequipa',
                'Av. Dolores 890, José Luis Bustamante y Rivero, Arequipa',
                'Calle Los Rosales 234, Cayma, Arequipa',
                'Av. Lambramani 456, Socabaya, Arequipa',
            ];

            ShelterProfile::create([
                'user_id' => $shelter->id,
                'official_name' => $shelterData['name'],
                'address' => $addresses[$index],
                'website' => 'https://www.' . strtolower(str_replace(' ', '', $shelterData['name'])) . '.com',
                'bio' => 'Somos una organización sin fines de lucro dedicada al rescate, rehabilitación y reubicación de animales en situación de abandono en Arequipa.',
                'verified_at' => now(),
            ]);

            $shelters[] = $shelter;
        }

        echo "✓ Created 5 verified shelters\n";

        // Create 15 regular users
        $regularUsers = User::factory(15)->create();
        echo "✓ Created 15 regular users\n";

        // Create pets and cases
        $allUsers = collect([$testUser])->merge($regularUsers)->merge($shelters);
        
        $petTypes = [
            ['type' => 'lost', 'count' => 8],
            ['type' => 'found', 'count' => 7],
            ['type' => 'adoption', 'count' => 15],
        ];

        $totalCases = 0;
        foreach ($petTypes as $petTypeConfig) {
            for ($i = 0; $i < $petTypeConfig['count']; $i++) {
                $owner = $allUsers->random();
                
                // For adoption cases, prefer shelters as owners
                if ($petTypeConfig['type'] === 'adoption' && !empty($shelters)) {
                    $owner = fake()->boolean(70) ? fake()->randomElement($shelters) : $owner;
                }

                $species = fake()->randomElement(['dog', 'cat']);
                $breeds = [
                    'dog' => ['Mestizo', 'Labrador', 'Pastor Alemán', 'Chihuahua', 'Cocker', 'Bulldog'],
                    'cat' => ['Mestizo', 'Persa', 'Siamés', 'Angora', 'Bengalí'],
                ];

                $pet = Pet::create([
                    'user_id' => $owner->id,
                    'name' => fake()->firstName(),
                    'species' => $species,
                    'breed' => fake()->randomElement($breeds[$species]),
                    'color' => fake()->randomElement(['Negro', 'Marrón', 'Blanco', 'Gris', 'Dorado', 'Tricolor']),
                    'gender' => fake()->randomElement(['male', 'female']),
                    'description' => fake()->sentence(),
                ]);

                $rewardAmount = null;
                if ($petTypeConfig['type'] === 'lost' && fake()->boolean(60)) {
                    $rewardAmount = fake()->numberBetween(50, 500);
                }

                $petCase = PetCase::create([
                    'user_id' => $owner->id,
                    'pet_id' => $pet->id,
                    'type' => $petTypeConfig['type'],
                    'status' => fake()->randomElement(['open', 'open', 'open', 'closed']), // More open than closed
                    'lat' => fake()->latitude(-16.45, -16.35), // Arequipa
                    'lng' => fake()->longitude(-71.58, -71.50),
                    'description' => $this->generateCaseDescription($petTypeConfig['type'], $pet),
                    'reward_amount' => $rewardAmount,
                ]);

                $totalCases++;

                // Add some comments to cases
                if (fake()->boolean(60)) {
                    $commentCount = fake()->numberBetween(1, 4);
                    for ($c = 0; $c < $commentCount; $c++) {
                        Comment::create([
                            'user_id' => $allUsers->random()->id,
                            'pet_case_id' => $petCase->id,
                            'content' => $this->generateComment(),
                        ]);
                    }
                }

                // Add reward claims to some lost pet cases with rewards
                if ($petTypeConfig['type'] === 'lost' && $rewardAmount && fake()->boolean(40)) {
                    $claimer = $regularUsers->random();
                    RewardClaim::create([
                        'pet_case_id' => $petCase->id,
                        'claimer_id' => $claimer->id,
                        'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
                        'proof' => 'Vi a la mascota cerca del parque. Tengo fotos de su ubicación.',
                        'amount' => $rewardAmount,
                        'approved_at' => fake()->boolean(50) ? now() : null,
                    ]);
                }
            }
        }

        echo "✓ Created {$totalCases} pet cases (8 lost, 7 found, 15 adoption)\n";

        // Create donations from users to shelters
        foreach ($shelters as $shelter) {
            $donorCount = fake()->numberBetween(2, 5);
            $donorUsers = $allUsers->random($donorCount);
            
            foreach ($donorUsers as $donor) {
                if ($donor->id === $shelter->id) continue; // Skip self-donations
                
                Donation::create([
                    'user_id' => $donor->id,
                    'shelter_id' => $shelter->id,
                    'amount' => fake()->randomFloat(2, 20, 500),
                    'currency' => 'PEN',
                    'message' => fake()->optional(0.7)->randomElement([
                        '¡Gracias por su labor!',
                        'Espero que esto ayude',
                        'Sigan con su gran trabajo',
                        'Para los perritos',
                    ]),
                    'status' => 'completed',
                    'payment_id' => fake()->uuid(),
                ]);
            }
        }

        echo "✓ Created donations to shelters\n";

        // Create some follows
        $followCount = 0;
        foreach ($regularUsers->take(10) as $user) {
            $toFollow = $allUsers->random(fake()->numberBetween(2, 5));
            foreach ($toFollow as $followTarget) {
                if ($user->id !== $followTarget->id && !$user->isFollowing($followTarget)) {
                    $user->follow($followTarget);
                    $followCount++;
                }
            }
        }

        echo "✓ Created {$followCount} follow relationships\n";

        echo "\n=== Seeding completed successfully! ===\n";
        echo "Login credentials:\n";
        echo "  Admin: admin@dogli.com / password\n";
        echo "  Test User: test@example.com / password\n";
        echo "  Shelter Example: arca@shelter.com / password\n";
    }

    private function generateCaseDescription(string $type, Pet $pet): string
    {
        $descriptions = [
            'lost' => [
                "Se perdió {$pet->name} el día de ayer cerca del parque. Es muy cariñoso/a. Por favor ayúdennos a encontrarlo/a.",
                "Perdí a mi {$pet->species} {$pet->name}. Salió de casa y no ha regresado. Cualquier información es bienvenida.",
                "{$pet->name} desapareció hace 2 días. Es de color {$pet->color}. Si lo ven por favor contactarme.",
            ],
            'found' => [
                "Encontré este/a {$pet->species} deambulando por la calle. Parece perdido/a. Busco a su dueño.",
                "Este/a {$pet->species} apareció en mi casa. Es muy amigable. ¿Alguien lo conoce?",
                "Rescaté a este/a {$pet->species} {$pet->color}. Necesita volver con su familia.",
            ],
            'adoption' => [
                "{$pet->name} está buscando un hogar lleno de amor. Es muy cariñoso/a y juguetón/a.",
                "¿Buscas adoptar? {$pet->name} es perfecto/a para ti. {$pet->breed}, {$pet->color}, muy sano/a.",
                "Este/a hermoso/a {$pet->species} necesita una familia. Es muy tranquilo/a y se lleva bien con niños.",
            ],
        ];

        return fake()->randomElement($descriptions[$type]);
    }

    private function generateComment(): string
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
            '¡Mucha suerte!',
            'Ojalá lo encuentren pronto',
        ];

        return fake()->randomElement($comments);
    }
}
