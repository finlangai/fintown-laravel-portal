<?php

namespace Database\Factories\SQL\User;

use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SQL\User\Type>
 */
class UserTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->regexify('[A-Z]{3}'),  // Tạo ID ngẫu nhiên dạng 3 chữ cái
            'name' => $this->faker->randomElement(['Standard', 'Premium', 'VIP']),  // Tên mẫu
        ];
    }
}
