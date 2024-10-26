<?php

namespace Database\Factories\SQL\Subcription;

use App\Models\SQL\User\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SQL\Subcription\Program>
 */
class ProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->regexify('[A-Z]{1}[0-9]{3}'),  // Tạo ID ngẫu nhiên dạng P001, P002
            'incharge_id' => Type::factory(),  // Gọi Factory của Type để tạo và liên kết incharge_id
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->text(100),
            'price' => $this->faker->randomFloat(2, 50, 500),
            'discount' => $this->faker->randomFloat(2, 0, 50),
            'duration' => $this->faker->numberBetween(1, 12),
            'duration_type' => $this->faker->randomElement(['day', 'month', 'year']),
            'is_renewable' => $this->faker->boolean(),
        ];
    }
}
