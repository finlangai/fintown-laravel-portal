<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\GetCompanyComparisonPeers;
use App\Actions\GetComparisonData;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Company\Stash;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;
use MongoDB\Collection;

class ComparisonController extends Controller
{
    public function __invoke(
        string $symbol,
        GetCompanyComparisonPeers $getComparisonPeers
    ) {
        $symbol = strtoupper($symbol);
        return $getComparisonPeers->handle($symbol);
    }

    public function retrieve(GetComparisonData $getComparisonData)
    {
        $validated = request()->validate([
            "symbols" => "required|array|min:1|max:5",
        ]);
        $symbols = $validated["symbols"];

        $result = $getComparisonData->handle($symbols);

        // $result->map(function ($item) {
        //     $item["logo"] = $item["companyInfo"][0]["logo"];
        //     unset($item["companyInfo"]);
        // });

        return ApiResponse::success($result);
    }

    public function search()
    {
        $q = request()->validate(["q" => "required|string|min:1"])["q"];
        $result = Company::raw(
            fn(Collection $collection) => $collection->aggregate([
                // Match documents where 'is_stock' is not false
                [
                    '$match' => [
                        '$or' => [
                            ["symbol" => ['$regex' => $q, '$options' => "i"]],
                            [
                                "company_name" => [
                                    '$regex' => $q,
                                    '$options' => "i",
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    '$project' => ["symbol" => 1, "logo" => 1],
                ],
                [
                    '$lookup' => [
                        "from" => "stash",
                        "localField" => "symbol",
                        "foreignField" => "symbol",
                        "pipeline" => [
                            [
                                '$project' => [
                                    "_id" => 0,
                                    "latest_quarter" => 1,
                                    "latest_year" => 1,
                                ],
                            ],
                            ['$limit' => 1],
                        ],
                        "as" => "meta",
                    ],
                ],
            ])
        );

        $result->map(function ($item) {
            $item["quarter"] = $item["meta"][0]["latest_quarter"];
            $item["year"] = $item["meta"][0]["latest_year"];
            unset($item["meta"]);
        });

        return ApiResponse::success($result);
    }
}
