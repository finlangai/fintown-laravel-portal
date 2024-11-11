<?php

namespace App\Traits\Swagger\Valuation;

trait AddScenariosValuationAnnotation
{
    /**
     * @OA\POST(
     *     path="/api/valuation/{identifier}/{symbol}/scenarios",
     *     summary="Create a new scenario for a user on a stock",
     *     tags={"Valuation","Scenarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="identifier",
     *         in="path",
     *         required=true,
     *         @OA\Schema( * type="string", enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation"}, example="price-to-earnings-relative-valuation"
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
     *             @OA\Property(property="potential", type="integer", example="11"),
     *             @OA\Property(property="valuated", type="number", format="float", example="58203"),
     *             @OA\Property(property="note", type="string", example="Cả người ngoài hành tinh lẫn ma quỷ đều có thật sao?")
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