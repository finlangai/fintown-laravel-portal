<?php

namespace App\Traits\Swagger\Tickers;

trait TopRevenueTickersAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers/top-revenue",
     *     operationId="GetTopRevenueTickers",
     *     tags={"Tickers"},
     *     summary="Get Top revenue tickers",
     *     description="Retrieve the list of top revenue tickers",
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Limit the number of results returned",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             minimum=1,
     *             default=4
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 required={"symbol", "logo", "companyName", "delta", "exchange", "quotes", "price"},
     *                 @OA\Property(
     *                     property="symbol",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="logo",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="companyName",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="delta",
     *                     type="number",
     *                     format="float"
     *                 ),
     *                 @OA\Property(
     *                     property="exchange",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="quotes",
     *                     type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         required={"time", "price"},
     *                         @OA\Property(
     *                             property="time",
     *                             type="integer",
     *                             format="int64"
     *                         ),
     *                         @OA\Property(
     *                             property="price",
     *                             type="integer"
     *                         )
     *                     )
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="integer"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Entity"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function TopRevenueTickersAnnotation()
    {
    }
}
