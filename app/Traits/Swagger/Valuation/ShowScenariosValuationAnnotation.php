<?php

namespace App\Traits\Swagger\Valuation;

trait ShowScenariosValuationAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/valuation/{identifier}/{symbol}/scenarios/{scenarioId}",
     *     summary="Get the info about a valuation scenario",
     *     tags={"Scenarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="identifier",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation", "discounted-cash-flow", "graham-intrinsic-value-formula", "price-earnings-to-growth-ratio", "capital-asset-pricing-model"},
     *             example="price-to-earnings-relative-valuation"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="symbol",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         example="VNM"
     *     ),
     *     @OA\Parameter(
     *         name="scenarioId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         example="6734bf885fb113a3c906fc15"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Stock scenarios retrieved successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="symbol", type="string", example="HPG"),
     *             @OA\Property(property="title", type="string", example="Kịch bản này vjp pro"),
     *             @OA\Property(property="potential", type="integer", example=11),
     *             @OA\Property(property="valuated", type="integer", example=12123),
     *             @OA\Property(property="note", type="string", example="Cả người ngoài hành tinh lẫn ma quỷ đều có thật sao?"),
     *             @OA\Property(property="id", type="string", example="6734bf885fb113a3c906fc15"),
     *             @OA\Property(property="saveAt", type="integer", example=1731510152)
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function ScenariosValuationAnnotation()
    {
    }
}
