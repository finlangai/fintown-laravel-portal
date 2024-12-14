<?php

namespace Database\Seeders;

use App\Models\SQL\Subcription\PromotionCode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PromotionCode::truncate();
        PromotionCode::factory(36)->create();
    }
}
