<?php

namespace Database\Seeders;

use App\Models\SQL\Subcription\Program;
use App\Models\SQL\User\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subcription_programs')->truncate();
        /* Dùng Factory */
        // Program::factory(3)->create();

        /* Tự định nghĩa */
        // Tìm kiếm các User Types (Dùng Eloquent để lấy ID của từng loại)
        $standardType = Type::where('name', 'Standard')->first();
        $premiumType = Type::where('name', 'Premium')->first();
        $vipType = Type::where('name', 'VIP')->first();

        // Seed các Programs với liên kết đến user_types thông qua incharge_id
        Program::create([
            'id' => 'P001',
            'incharge_id' => 'T01',
            'name' => 'Chương trình đăng ký theo ngày',
            'description' => 'Chương trình đăng ký theo ngày',
            'price' => 100.00,
            'discount' => 10.00,
            'duration' => 1,
            'duration_type' => 'month',
            'is_renewable' => true,
        ]);

        Program::create([
            'id' => 'P002',
            'incharge_id' => 'T02',
            'name' => 'Chương trình đăng ký theo tháng',
            'description' => 'Chương trình đăng ký theo tháng',
            'price' => 200.00,
            'discount' => 20.00,
            'duration' => 6,
            'duration_type' => 'month',
            'is_renewable' => true,
        ]);

        Program::create([
            'id' => 'P003',
            'incharge_id' => 'T03',
            'name' => 'Chương trình đăng ký theo năm',
            'description' => 'Chương trình đăng ký theo năm',
            'price' => 500.00,
            'discount' => 50.00,
            'duration' => 1,
            'duration_type' => 'year',
            'is_renewable' => false,
        ]);
    }
}
