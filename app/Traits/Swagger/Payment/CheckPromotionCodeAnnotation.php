<?php

namespace App\Traits\Swagger\Payment;

trait CheckPromotionCodeAnnotation
{
    /**
     * @OA\Post(
     *     path="/api/general/payment/check-promotion",
     *     security={{"bearerAuth": {}}},
     *     operationId="CheckPromotionCode",
     *     tags={"General","Payment"},
     *     summary="Check a promotion code",
     *     description="Checks a promotion code and returns discount information",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", example="PROMO2024"),
     *             @OA\Property(property="programId", type="string", example="12345")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             @OA\Property(property="initialPrice", type="integer", example=2388000),
     *             @OA\Property(property="discountAmount", type="integer", example=2149200),
     *             @OA\Property(property="afterDiscount", type="integer", example=238800),
     *             @OA\Property(property="discountPercent", type="integer", example=90)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function CheckPromotionCodeAnnotation()
    {
    }
}
