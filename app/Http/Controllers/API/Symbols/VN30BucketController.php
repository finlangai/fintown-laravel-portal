<?php

namespace App\Http\Controllers\API\Symbols;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\VN30BucketAnnotation;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class VN30BucketController extends Controller
{
    use VN30BucketAnnotation;
    public function __invoke(Request $request)
    {
        try {
            $companies = Company::raw(function ($collection) {
                return $collection->aggregate([
                    [
                        '$sort' => ["profile.market_cap" => -1],
                    ],
                    [
                        '$limit' => 30,
                    ],
                    [
                        '$project' => [
                            "_id" => 0,
                            "symbol" => 1,
                            "company_name" => 1,
                            "exchange" => '$profile.exchange',
                        ],
                    ],
                ]);
            });
            return ApiResponse::success($companies);
        } catch (\Throwable $th) {
            return ApiResponse::internalServerError();
        }
    }
}
