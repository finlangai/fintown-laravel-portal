<?php

namespace App\Traits\Swagger\General\Notification;

trait NotificationMarkAsReadAnnotation
{
    /**
     * @OA\Post(
     *     path="/api/general/notification/mark-as-read",
     *     summary="Mark notifications as read",
     *     tags={"General", "Notification"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="uuids",
     *                 type="array",
     *                 @OA\Items(
     *                     type="string",
     *                     example="9daf1e94-ccaf-40f6-8245-a9326ec07a84"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Notifications marked as read successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Đã đánh dấu đã đọc cho các thông báo.")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function NotificationMarkAsReadAnnotation()
    {
    }
}
