<?php

namespace Database\Seeders;

use App\Models\SQL\System\Backjob;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BackjobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $updateDailyStats = [
            "name" => "Cập nhật thông số hằng ngày",
            "description" =>
                "Chạy vào lúc 3 giờ sáng mỗi ngày để cập nhật giá và chỉ số mới nhất dựa trên giá đóng cửa cửa hôm trước",
            "is_active" => true,
            "job_class" => "App\Jobs\UpdateDailyStats",
            "parameters" => json_encode(["endpoint" => "refresh/stash_stats"]),
            "interval" => "1",
            "interval_type" => "daily",
            "time" => "03:00:00",
            "last_run" => Carbon::now(),
            "next_run" => Carbon::now(),
        ];
        $getNewStatements = [
            "name" => "Lấy Báo Cáo Tài Chính mới cho mỗi quý",
            "description" => "",
            "is_active" => false,
            "job_class" => "App\Jobs\PopulateNewFinancialStatement",
            // "parameters" => json_encode(["endpoint" => "refresh/stash_stats"]),
            "interval" => "3",
            "interval_type" => "monthly",
            "time" => "00:00:00",
            "last_run" => Carbon::now(),
            "next_run" => Carbon::now(),
        ];
        Backjob::create($updateDailyStats);
        Backjob::create($getNewStatements);
    }
}
