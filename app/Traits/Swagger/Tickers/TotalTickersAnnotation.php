<?php

namespace App\Traits\Swagger\Tickers;

trait TotalTickersAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/tickers/total",
     *     operationId="GetTotalTickers",
     *     tags={"Tickers"},
     *     summary="Total tickers",
     *     description="Retrieve the total tickers in the system",
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="total", type="interge", example="30")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=500,   

    *         description="Internal Server Error"
    *     )
    * )
    */
    public function TotalTickersAnnotation()
    {
    }
}
