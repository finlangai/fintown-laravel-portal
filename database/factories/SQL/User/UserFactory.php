<?php

namespace Database\Factories\SQL\User;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SQL\User\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "fullname" => fake()->firstName() . " " . fake()->lastName(),
            "email" => fake()->email(),
            "phone" => "0" . rand(100000000, 999999999),
            "address" => fake()->boolean() ? fake()->address() : null,
            "avatar" => env("DEFAULT_AVATAR"),
            "password" => Hash::make("Password!123"),
            "is_banned" => false,
        ];
    }
}
