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
        $monthlyPackage = [];
        foreach (["name", "price"] as $key) {
            $monthlyPackage[$key] = $rawMonthly[$key];
        }

        // populate data for yearly
        $rawYearly = Program::find("PY1");
        $yearlyPackage = [];

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
}
