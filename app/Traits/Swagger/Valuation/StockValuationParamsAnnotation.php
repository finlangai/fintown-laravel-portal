<?php

namespace App\Traits\Swagger\Valuation;

trait StockValuationParamsAnnotation
{
    /**
     * @OA\GET(
     *     path="/api/valuation/{identifier}/{symbol}/params",
     *     summary="Retrieve the list of parameters for a stock",
     *     tags={"Valuation"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="identifier",
     *         in="path",
     *         required=true,
     *         @OA\Schema( * type="string", enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation","discounted-cash-flow", "graham-intrinsic-value-formula", "price-earnings-to-growth-ratio", "capital-asset-pricing-model"}, example="price-to-earnings-relative-valuation"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="symbol",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         example="VNM"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Stock parameters retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="earnings_per_share", type="number", format="float", example=1289.96),
     *             @OA\Property(property="price_to_earnings", type="number", format="float", example=45.12)
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Not Found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function StockValuationParamsAnnotation()
    {
    }
}
