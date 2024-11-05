<?php

namespace App\Traits\Swagger\Tickers;

trait TechnicalChartInstrumentsSearchAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers/technical-chart/instruments/search",
     *     operationId="GetTechnicalChartInstrumentsBySearching",
     *     tags={"Tickers","Instruments"},
     *     summary="Searching Technical Chart Instruments",
     *     description="Retrieve list of instruments on technical chart by query",
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             minimum=1,
     *             default="Ngân hàng",
     *         ),
     *         description="Searching symbol base on symbol and company name"
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             format="int32",
     *             minimum=1
     *         ),
     *         description="Limit the number of results"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 required={"symbol", "logo", "volume", "price", "delta", "isInWatchlist"},
     *                 @OA\Property(
     *                     property="symbol",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="logo",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="volume",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="delta",
     *                     type="number",
     *                     format="float"
     *                 ),
     *                 @OA\Property(
     *                     property="isInWatchlist",
     *                     type="boolean"
     *                 )
     *             )
     *         )
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
    public function TechnicalChartInstrumentsSearchAnnotation()
    {
    }
}
