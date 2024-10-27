<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SQL\User\Type;
class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /* Dùng factory */
        // Type::factory(3)->create();
        
        /* Tự định nghĩa */
        Type::insert([
            [
                'id' => 'T01',
                'name' => 'Standard'
            ],
            [
                'id' => 'T02',
                'name' => 'Premium'
            ],
            [
                'id' => 'T03',
                'name' => 'VIP'
            ]
        ]);
    }
}
