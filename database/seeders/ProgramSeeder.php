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
        DB::table("subcription_programs")->truncate();
        /* Dùng Factory */
        // Program::factory(3)->create();

        /* Tự định nghĩa */
        // Tìm kiếm các User Types (Dùng Eloquent để lấy ID của từng loại)
        // $standardType = Type::where('name', 'Standard')->first();
        // $premiumType = Type::where('name', 'Premium')->first();
        // $vipType = Type::where('name', 'VIP')->first();

        // Seed các Programs với liên kết đến user_types thông qua incharge_id
        Program::create([
            "id" => "PM1",
            "incharge_id" => "1",
            "name" => "Fintown Professional - 1 Tháng",
            "description" =>
                "Gói Professional danh cho người dùng chuyên nghiệp muốn truy cập vào các chức năng chuyên sâu",
            "price" => 199000,
            "discount" => 0,
            "duration" => 1,
            "duration_type" => "month",
            "is_renewable" => true,
        ]);

        Program::create([
            "id" => "PY1",
            "incharge_id" => "1",
            "name" => "Fintown  Professional - 1 Năm",
            "description" =>
                "Gói Professional theo năm dành cho người dùng chuyên nghiệp muốn gắn bó lâu dài và hưởng lợi từ ưu đãi",
            "price" => 199000 * 12,
            "discount" => 21,
            "duration" => 12,
            "duration_type" => "month",
            "is_renewable" => true,
        ]);
    }
}
