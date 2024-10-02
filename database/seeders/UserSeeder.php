<?php

namespace Database\Seeders;

use App\Models\SQL\User\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(12)->create();
    }
}
