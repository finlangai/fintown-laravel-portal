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
     *         @OA\Schema( * type="string", enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation","discounted-cash-flow", "graham-intrinsic-value-formula"}, example="price-to-earnings-relative-valuation"
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
     *         description="Stock scenarios retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="symbol", type="string", example="VNM"),
     *                 @OA\Property(property="title", type="string", example="Kịch bản bố đời"),
     *                 @OA\Property(property="potential", type="string", example="11"),
     *                 @OA\Property(property="valuated", type="string", example="58203"),
     *                 @OA\Property(property="note", type="string", example="Kinh khủng vậy sao"),
     *                 @OA\Property(property="id", type="string", example="67320eb359b3d083fb09fa9a"),
     *                 @OA\Property(property="saveAt", type="string", example="11/11/2024")
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
