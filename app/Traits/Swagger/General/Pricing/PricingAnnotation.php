<?php

namespace App\Traits\Swagger\General\Pricing;

trait PricingAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/pricing",
     *     operationId="GetPricing",
     *     tags={"General","Payment"},
     *     summary="Get Pricing Information",
     *     description="Retrieve pricing information for different subscription plans",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="MONTHLY",
     *                 type="object",
     *                 required={"programId","name", "price"},
     *                 @OA\Property(
     *                     property="programId",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="integer"
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="YEARLY",
     *                 type="object",
     *                 required={"programId","discountPercentage", "discountAmount", "discountedPrice", "originalPrice"},
     *                 @OA\Property(
     *                     property="programId",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="discountPercentage",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="discountAmount",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="discountedPrice",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="originalPrice",
     *                     type="integer"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function PricingAnnotation()
    {
    }
}
