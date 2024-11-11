<?php

namespace App\Traits\Swagger\Valuation;

trait DeleteScenariosValuationAnnotation
{
    /**
     * @OA\DELETE(
     *     path="/api/valuation/{identifier}/{symbol}/scenarios/{scenarioId}",
     *     summary="Delete a scenario for a user on a stock",
     *     tags={"Valuation","Scenarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="identifier",
     *         in="path",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             enum={"price-to-earnings-relative-valuation", "price-to-book-relative-valuation"},
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
     *         example="67320eb359b3d083fb09fa9a"
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Scenario deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Xóa kịch bản thành công.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="Unauthorized request")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="Scenario not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="An unexpected error occurred")
     *         )
     *     )
     * )
     */
    public function DeleteScenariosValuationAnnotation()
    {
    }
}
