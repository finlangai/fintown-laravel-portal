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
        $users = User::factory(42)->create();
        foreach ($users as $user) {
            $user->assignRole("basic");
        }
    }
}
