<?php

namespace App\Http\Controllers\API;

use App\Actions\GetSymbolsByQuery;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\SearchSymbolRequest;
use App\Utils\ApiResponse;
use function PHPSTORM_META\type;

class SymbolSearchController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/symbols/search?q=Hòa",
     *      operationId="StockSearch",
     *      tags={"Symbols"},
     *      summary="Stock searching",
     *      description="Search for stock symbol base on given test",
     *      @OA\Parameter(
     *          description="The text to search for",
     *          in="query",
     *          name="q",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Query Example", value="Hòa", summary="Query Example"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Not enough parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     *     )
     */
    public function __invoke(SearchSymbolRequest $request, GetSymbolsByQuery $action)
    {
        $query      = $request->input('q');
        $limit      = 12;
        $projection = [
            '_id'          => 0,
            'symbol'       => 1,
            'company_name' => 1,
            'exchange'     => '$profile.exchange',
         ];

        $result = $action->handle($query, $limit, $projection);

        // Not found if return false
        if (!$result) {
            return ApiResponse::notFound('Not found');
        }

        return ApiResponse::success($result);
    }
}
