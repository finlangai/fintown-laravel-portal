<?php

namespace App\Traits\Swagger\Payment;

trait InitiateSubscriptionRegistrationAnnotation
{
    /**
     * @OA\Post(
     *     path="/api/general/payment/initiate",
     *     security={{"bearerAuth": {}}},
     *     operationId="InitiatePaymentFlow",
     *     tags={"General","Payment"},
     *     summary="Initiate a payment flow",
     *     description="Initiates a payment process and returns a payment URL",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="programId", type="string", example="12345"),
     *             @OA\Property(property="paymentMethod", type="string", enum={"momo", "vnpay"}, example="momo"),
     *             @OA\Property(property="callbackUrl", type="string", format="url", example="https://example.com/callback"),
     *             @OA\Property(property="promotionCode", type="string", example="PROMO2024", nullable=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             @OA\Property(property="paymentUrl", type="string", example="https://payment-url")
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
    public function InitiateSubscriptionRegistrationAnnotation()
    {
    }
}
