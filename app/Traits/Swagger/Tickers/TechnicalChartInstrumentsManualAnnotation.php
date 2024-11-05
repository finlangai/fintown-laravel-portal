<?php

namespace App\Traits\Swagger\Tickers;

trait TechnicalChartInstrumentsManualAnnotation
{
    /**
     * @OA\POST(
     *     path="/api/tickers/technical-chart/instruments",
     *     operationId="GetTechnicalChartInstrumentsBySymbols",
     *     tags={"Tickers","Instruments"},
     *     summary="Get Technical Chart Instruments by Symbols",
     *     description="Retrieve list of instruments on technical chart by providing a list of symbols",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="symbols",
     *                 type="array",
     *                 example={"VCB", "HPG", "SSI"},
     *                 @OA\Items(
     *                     type="string"
     *                 )
     *             )
     *         )
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
     *         response=422,
     *         description="Unprocessable Entity"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function TechnicalChartInstrumentsManualAnnotation()
    {
    }
}
