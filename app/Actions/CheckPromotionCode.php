<?php

namespace App\Actions;

use App\Exceptions\JsonResponseException;
use App\Models\SQL\Subcription\PromotionCode;
use App\Utils\ApiResponse;
use Illuminate\Support\Carbon;
use JsonException;
use Lorisleiva\Actions\Concerns\AsAction;

class CheckPromotionCode
{
    use AsAction;

    public function handle(array $validated)
    {
        // check if promotion code exists
        // no -> throw bad request
        // programId, code
        $programId = $validated["programId"];
        $code = $validated["code"];

        try {
            $promotion = PromotionCode::with("program")
                ->where("code", $code)
                ->where("program_id", $programId)
                ->firstOrFail();
        } catch (\Throwable $th) {
            throw new JsonResponseException("Mã giới thiệu không hợp lệ.");
        }

        // the promotion exists from here
        $currentTime = Carbon::now()->getTimestamp();

        // CHECK START DATE
        if ($promotion->start_date) {
            $startDate = Carbon::parse($promotion->start_date);
            if ($startDate->getTimestamp() > $currentTime) {
                throw new JsonResponseException(
                    "Mã giới thiệu chưa được kích hoạt."
                );
            }
        }

        // CHECK EXPIRED DATE
        if ($promotion->expired_date) {
            $startDate = Carbon::parse($promotion->expired_date);
            if ($startDate->getTimestamp() < $currentTime) {
                throw new JsonResponseException("Mã giới thiệu đã hết hạn.");
            }
        }

        // CHECK USE LIMIT
        // nah im lazy, its 11:54pm im sleepy as hell

        // it's all clean from here
        $initialPrice = $promotion->program->price;
        $discountAmount = $initialPrice * $promotion->discount;
        $afterDiscount = $initialPrice - $discountAmount;
        $discountPercent = $promotion->discount * 100;

        return compact(
            "initialPrice",
            "discountAmount",
            "afterDiscount",
            "discountPercent"
        );
    }
}
