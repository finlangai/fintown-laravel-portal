<?php

namespace App\Traits\Swagger\Valuation;

trait UpdateScenariosValuationAnnotation
{
    /**
     * @OA\PATCH(
     *     path="/api/valuation/{identifier}/{symbol}/scenarios/{scenarioId}/update",
     *     summary="Update a scenario for a user on a stock",
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
     *     @OA\Parameter(
     *         name="scenarioId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         example="67320eb359b3d083fb09fa9a"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="title", type="string", nullable=true, example="Người ngoài hành tinh và ma quỷ có thật?"),
     *             @OA\Property(property="note", type="string", nullable=true, example="ĐÚNG VẬY, DANDADAN DANDADAN DANDADAN-")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Scenario updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Cập nhật thông tin kịch bản thành công")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Not Found"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function UpdateScenariosValuationAnnotation()
    {
    }
}
