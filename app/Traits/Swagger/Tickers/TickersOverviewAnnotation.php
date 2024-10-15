<?php

namespace App\Traits\Swagger\Tickers;

trait TickersOverviewAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers/overview",
     *     operationId="GetTickersOverview",
     *     tags={"Tickers"},
     *     summary="Tickers list",
     *     description="Retrieve the overview of tickers",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="pe", type="number", example=43.83),
     *             @OA\Property(property="pb", type="number", example=1.75),
     *             @OA\Property(property="avg_52w", type="number", example=1240.5),
     *             @OA\Property(property="marketcap", type="number", example=3725345.54),
     *             @OA\Property(property="earnings", type="number", example=84994.08),
     *             @OA\Property(property="revenue", type="number", example=564257.07),
     *             @OA\Property(property="equity", type="number", example=2134170.48),
     *             @OA\Property(property="total", type="integer", example=30)
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
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function TickersOverviewAnnotation()
    {
    }
}
