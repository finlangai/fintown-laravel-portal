<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // WEB GUARD PERMISSION
        $prefixes = [
            "user",
            "role",
            "bill",
            "company",
            "financial",
            "financial_index",
            "subscription_program",
            "assessment",
            "formular",
            "criteria",
            "backjob",
        ];
        // base permission
        $permissions = [];
        foreach ($prefixes as $prefix) {
            $permissions[] = "$prefix-read";
            $permissions[] = "$prefix-write";
            $permissions[] = "$prefix-create";
            $permissions[] = "$prefix-delete";
        }
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                "name" => $permission,
                "guard_name" => "web",
            ]);
        }

        // API GUARD PERMISSION
        $userRead = [
            "account",
            "watchlist",
            "transaction",
            "assessment",
            "business-profile",
            "financial-statements",
            "financial-indicators",
            "tickers-list",
            "technical-chart",
            "valuation",
        ];
        $userWrite = ["account", "watchlist"];

        $userPermissions = [];
        foreach ($userRead as $value) {
            $userPermissions[] = "$value-read";
        }

        foreach ($userWrite as $value) {
            $userPermissions[] = "$value-write";
        }

        foreach ($userPermissions as $permission) {
            Permission::firstOrCreate([
                "name" => $permission,
                "guard_name" => "api",
            ]);
        }
    }
}
