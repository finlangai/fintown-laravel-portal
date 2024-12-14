<?php

namespace Database\Factories\SQL\Subcription;

use App\Models\SQL\Subcription\Program;
use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SQL\Subcription\PromotionCode>
 */
class PromotionCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "partner_id" => User::whereHas("roles", function ($query) {
                $query->where("name", "partner");
            })
                ->inRandomOrder()
                ->first()->id,
            "program_id" => Program::inRandomOrder()->first()->id,
            "code" => fake()->unique()->regexify("[A-Za-z0-9]{64}"),
            "use_limit" => fake()->randomNumber(),
            "discount" => fake()->randomFloat(2, 0, 1),
            "commission_rate" => fake()->randomFloat(2, 0, 1),
            "start_date" => fake()
                ->dateTimeBetween("-1 year", "now")
                ->format("Y-m-d"),
            "expired_date" => fake()
                ->dateTimeBetween("now", "+1 year")
                ->format("Y-m-d"),
        ];
    }
}
