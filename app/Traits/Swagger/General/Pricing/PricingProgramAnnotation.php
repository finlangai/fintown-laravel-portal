<?php

namespace App\Traits\Swagger\General\Pricing;

trait PricingProgramAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/pricing/program/{programId}",
     *     operationId="GetPricingProgramInfo",
     *     tags={"General", "Payment"},
     *     summary="Get Pricing Program Information",
     *     description="Retrieve pricing information for a specific program",
     *     @OA\Parameter(
     *         name="programId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="programId",
     *                 type="string",
     *                 example="PY1"
     *             ),
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 example="Fintown Professional - 1 Năm"
     *             ),
     *             @OA\Property(
     *                 property="discountPercentage",
     *                 type="integer",
     *                 example=21
     *             ),
     *             @OA\Property(
     *                 property="originalPrice",
     *                 type="integer",
     *                 example=2388000
     *             ),
     *             @OA\Property(
     *                 property="discountAmount",
     *                 type="integer",
     *                 example=501480
     *             ),
     *             @OA\Property(
     *                 property="discountedPrice",
     *                 type="integer",
     *                 example=1886520
     *             ),
     *             @OA\Property(
     *                 property="monthDuration",
     *                 type="integer",
     *                 example=12
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function PricingProgramAnnotation()
    {
    }
}
