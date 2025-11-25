<?php

use App\Models\User;
use App\Models\PetCase;

test('authenticated user can view create case page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('mascotas.create'));

    $response->assertStatus(200);
});

test('authenticated user can create a lost pet case', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('mascotas.store'), [
        'pet_name' => 'Fido',
        'species' => 'dog',
        'type' => 'lost',
        'lat' => -33.45,
        'lng' => -70.66,
        'description' => 'Lost dog in the park',
        'reward_amount' => 100,
    ]);

    $response->assertRedirect();
    
    $this->assertDatabaseHas('pets', [
        'name' => 'Fido',
        'species' => 'dog',
        'user_id' => $user->id,
    ]);

    $this->assertDatabaseHas('pet_cases', [
        'type' => 'lost',
        'description' => 'Lost dog in the park',
        'user_id' => $user->id,
    ]);
});

test('guests cannot create pet cases', function () {
    $response = $this->post(route('mascotas.store'), [
        'pet_name' => 'Fido',
        'species' => 'dog',
        'type' => 'lost',
        'lat' => -33.45,
        'lng' => -70.66,
        'description' => 'Lost dog',
    ]);

    $response->assertRedirect(route('login'));
});
