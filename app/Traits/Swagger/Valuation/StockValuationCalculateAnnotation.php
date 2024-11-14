<?php

namespace App\Traits\Swagger\Valuation;

trait StockValuationCalculateAnnotation
{
    /**
     * @OA\POST(
     *     path="/api/valuation/{identifier}/{symbol}/calculate",
     *     summary="Calculate the Valuation value for a stock for a certain method",
     *     tags={"Valuation"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="identifier",
     *         in="path",
     *         required=true,
     *         @OA\Schema( * type="string", enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation","discounted-cash-flow", "graham-intrinsic-value-formula", "price-earnings-to-growth-ratio"}, example="price-to-earnings-relative-valuation"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="symbol",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         example="VNM"
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             type="object",
     *             additionalProperties=true
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Valuation calculated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="valuationResult", type="number", format="float", example=58203)
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function StockValuationCalculateAnnotation()
    {
    }
}
