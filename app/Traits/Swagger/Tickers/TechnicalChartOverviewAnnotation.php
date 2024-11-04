<?php

namespace App\Traits\Swagger\Tickers;

trait TechnicalChartOverviewAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers/technical-chart/overview",
     *     operationId="GetTechnicalChartOverview",
     *     tags={"Tickers"},
     *     summary="Get Technical Chart Overview",
     *     description="Retrieve the overview information for the technical chart",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             required={"totalMarketCap", "highestDeltaSymbol", "highestDeltaPercent", "totalTradingVolume", "totalTickers"},
     *             @OA\Property(
     *                 property="totalMarketCap",
     *                 type="number",
     *                 format="float"
     *             ),
     *             @OA\Property(
     *                 property="highestDeltaSymbol",
     *                 type="string"
     *             ),
     *             @OA\Property(
     *                 property="highestDeltaPercent",
     *                 type="number",
     *                 format="float"
     *             ),
     *             @OA\Property(
     *                 property="totalTradingVolume",
     *                 type="integer"
     *             ),
     *             @OA\Property(
     *                 property="totalTickers",
     *                 type="integer"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */

    public function TechnicalChartOverviewAnnotation()
    {
    }
}
