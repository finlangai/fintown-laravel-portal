<?php

namespace App\Traits\Swagger\Symbols;

trait TickersAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers",
     *     operationId="GetTickers",
     *     tags={"Tickers"},
     *     summary="Tickers list",
     *     description="Retrieve the list of tickers with pagination",
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Limit the number of results returned",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             minimum=1,
     *             default=10
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="offset",
     *         in="query",
     *         description="Offset the start of the results",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             minimum=1,
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="symbol", type="string"),
     *                 @OA\Property(property="logo", type="string"),
     *                 @OA\Property(property="industry", type="string"),
     *                 @OA\Property(property="marketCap", type="integer"),
     *                 @OA\Property(property="weeklyDelta", type="number", format="float"),
     *                 @OA\Property(property="yearlyDelta", type="number", format="float"),
     *                 @OA\Property(property="exchange", type="string"),
     *                 @OA\Property(property="dailyDelta", type="number", format="float"),
     *                 @OA\Property(property="price", type="integer"),
     *                 @OA\Property(property="pe", type="number", format="float"),
     *                 @OA\Property(property="pb", type="number", format="float"),
     *                 @OA\Property(property="roe", type="number", format="float")
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
    public function TickersAnnotation()
    {
    }
}
