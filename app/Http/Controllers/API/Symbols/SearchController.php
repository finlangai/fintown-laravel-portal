<?php

namespace App\Http\Controllers\API\Symbols;

use App\Actions\GetSymbolsByQuery;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\SearchSymbolRequest;
use App\Traits\Swagger\Symbols\SearchAnnotation;
use App\Utils\ApiResponse;

class SearchController extends Controller
{
    use SearchAnnotation;
    public function __invoke(
        SearchSymbolRequest $request,
        GetSymbolsByQuery $action
    ) {
        $query = $request->input("q");
        $limit = 12;
        $projection = [
            "_id" => 0,
            "symbol" => 1,
            "company_name" => 1,
            "exchange" => '$profile.exchange',
        ];

        $result = $action->handle($query, $limit, $projection);

        // Not found if return false
        if (!$result) {
            return ApiResponse::notFound("Not found");
        }

        return ApiResponse::success($result);
    }
}
