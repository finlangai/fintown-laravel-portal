<?php

namespace App\Traits\Swagger\General\Notification;

trait NotificationTokenGenerateAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/notification/generate-token",
     *     summary="Generate a token for notifications",
     *     tags={"General", "Notification"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Token generated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="token", type="string", example="generated-token-value"),
     *             @OA\Property(property="expires", type="integer", example=1733759940338),
     *             @OA\Property(property="issued", type="integer", example=1733756340338),
     *             @OA\Property(property="capability", type="string", example="{}"),
     *             @OA\Property(property="clientId", type="string", example="3")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function NotificationTokenGenerateAnnotation()
    {
    }
}
