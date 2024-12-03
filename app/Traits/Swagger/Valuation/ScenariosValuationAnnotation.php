<?php

namespace App\Traits\Swagger\Valuation;

trait ScenariosValuationAnnotation
{
    /**
     * @OA\GET(
     *     path="/api/valuation/{identifier}/{symbol}/scenarios",
     *     summary="Get the list of scenarios for a user on a stock",
     *     tags={"Scenarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="identifier",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation","discounted-cash-flow", "graham-intrinsic-value-formula", "price-earnings-to-growth-ratio", "capital-asset-pricing-model", "dividend-discount-model"},
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
     *         name="year",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="integer", example=2024)
     *     ),
     *     @OA\Parameter(
     *         name="month",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="integer", minimum=1, maximum=12, example=12)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Stock scenarios retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="symbol", type="string", example="VNM"),
     *                 @OA\Property(property="title", type="string", example="Kịch bản bố đời"),
     *                 @OA\Property(property="potential", type="integer", example=11),
     *                 @OA\Property(property="valuated", type="number", format="float", example=54577.74065296927),
     *                 @OA\Property(property="actual", type="number", example=60000),
     *                 @OA\Property(property="expected_date", type="string", example="brooo"),
     *                 @OA\Property(property="note", type="string", example="Kinh khủng vậy sao"),
     *                 @OA\Property(property="id", type="string", example="674d78b49cf422f67b0fc6d8"),
     *                 @OA\Property(property="saveAt", type="string", example="02/10/2024"),
     *                 @OA\Property(property="createdAt", type="string", example="2024-12-03T03:37:08.624000Z")
     *             )
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
