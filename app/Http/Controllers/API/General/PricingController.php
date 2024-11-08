<?php

namespace App\Http\Controllers\API\General;

use App\Http\Controllers\Controller;
use App\Models\SQL\Subcription\Program;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        // monthly data
        $rawMonthly = Program::find("PM1");
        $monthlyPackage = ["programId" => "PM1"];
        foreach (["name", "price"] as $key) {
            $monthlyPackage[$key] = $rawMonthly[$key];
        }

        // populate data for yearly
        $rawYearly = Program::find("PY1");
        $yearlyPackage = ["programId" => "PY1"];

        $yearlyPackage["name"] = $rawYearly["name"];
        $yearlyPackage["discountPercentage"] = $rawYearly["discount"];

        $discountFloat = $rawYearly["discount"] / 100;
        $yearlyPackage["discountAmount"] = $discountFloat * $rawYearly["price"];

        $yearlyPackage["discountedPrice"] =
            $rawYearly["price"] - $yearlyPackage["discountAmount"];

        $yearlyPackage["originalPrice"] = $rawYearly["price"];

        return ApiResponse::success([
            "MONTHLY" => $monthlyPackage,
            "YEARLY" => $yearlyPackage,
        ]);
    }

    public function program(string $programId)
    {
        try {
            $program = Program::findOrFail(strtoupper($programId));
        } catch (\Throwable $th) {
            return ApiResponse::notFound();
        }

        $discountFloat = $program->discount / 100;

        $programInfo = [
            "programId" => $program->id,
            "name" => $program->name,
            "discountPercentage" => $program->discount,
            "originalPrice" => $program->price,
            "discountAmount" => $program->price * $discountFloat,
        ];

        $programInfo["discountedPrice"] =
            $program->price - $programInfo["discountAmount"];

        $programInfo["monthDuration"] = $program->duration;

        return ApiResponse::success($programInfo);
    }
}
