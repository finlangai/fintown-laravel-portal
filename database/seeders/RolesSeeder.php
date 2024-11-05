<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
class RolesSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(["name" => "super-admin", "guard_name" => "web"]);
        Role::firstOrCreate(["name" => "admin", "guard_name" => "web"]);

        Role::firstOrCreate(["name" => "basic", "guard_name" => "api"]);
        Role::firstOrCreate(["name" => "professional", "guard_name" => "api"]);
        Role::firstOrCreate(["name" => "partner", "guard_name" => "api"]);
    }
}
