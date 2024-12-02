<?php

namespace App\Traits\Swagger\General\User;

trait UserSubscriptionLogsAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/user/subscription-logs",
     *     summary="Get the subscriptions log of the user",
     *     tags={"General","User"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="User subscription logs retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="startDate", type="string", example="27/11/2024"),
     *                 @OA\Property(property="endDate", type="string", example="27/12/2024"),
     *                 @OA\Property(property="status", type="string", example="expired"),
     *                 @OA\Property(property="programName", type="string", example="Fintown Professional - 1 Tháng")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *     )
     * )
     */
    public function UserSubscriptionLogsAnnotation()
    {
    }
}
