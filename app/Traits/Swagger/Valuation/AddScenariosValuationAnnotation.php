<?php

namespace App\Traits\Swagger\Valuation;

trait AddScenariosValuationAnnotation
{
    /**
     * @OA\POST(
     *     path="/api/valuation/{identifier}/{symbol}/scenarios",
     *     summary="Create a new scenario for a user on a stock",
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
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="title", type="string", example="Kịch bản đầu tay"),
     *             @OA\Property(property="potential", type="integer", example=11),
     *             @OA\Property(property="valuated", type="number", format="float", example=58203),
     *             @OA\Property(property="actual", type="number", format="float", example=60000),
     *             @OA\Property(property="note", type="string", example="Cả người ngoài hành tinh lẫn ma quỷ đều có thật sao?"),
     *             @OA\Property(property="expectedDate", type="string", example="03/12/2024")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Scenario created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Tạo kịch bản thành công.")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function AddScenariosValuationAnnotation()
    {
    }
}
