<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Company;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class VN30StockController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/symbols/vn30",
     *      operationId="Vn30Stocks",
     *      tags={"Symbols"},
     *      summary="VN30 Stocks list",
     *      description="Get the VN30 stocklist",
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal error",
     *       ),
     *     )
     */
    public function __invoke(Request $request)
    {
        try {
            $companies = Company::raw(function ($collection) {
                return $collection->aggregate([
                    [
                        '$sort' => [ 'profile.market_cap' => -1 ],
                     ],
                    [
                        '$limit' => 30,
                     ],
                    [
                        '$project' => [
                            '_id'          => 0,
                            'symbol'       => 1,
                            'company_name' => 1,
                            'exchange'     => '$profile.exchange',
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
