<?php

namespace App\Traits\Swagger\General\Notification;

trait NotificationListAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/notification",
     *     summary="Get the list of notification",
     *     tags={"General", "Notification"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             default=null
     *         ),
     *         description="Number of records to return"
     *     ),
     *     @OA\Parameter(
     *         name="offset",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             default=null
     *         ),
     *         description="Number of records to skip"
     *     ),
     *     @OA\Parameter(
     *         name="from",
     *         in="query",
     *         required=false,
     *         @OA\Schema(
     *             type="string",
     *             example="2024-12-09T13:41:58.000000Z"
     *         ),
     *         description="Get notifications from this date and time"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of notifications",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="string", example="9daf1e94-ccaf-40f6-8245-a9326ec07a84"),
     *                 @OA\Property(property="title", type="string", example="VPB"),
     *                 @OA\Property(property="content", type="string", example="Đã có kết quả dự báo mới"),
     *                 @OA\Property(property="thumbnail", type="string", example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/logo%2FVPB.jpeg?alt=media"),
     *                 @OA\Property(property="hyperlink", type="string", example="/dashboard/co-phieu/$symbol/ket-qua-du-bao"),
     *                 @OA\Property(property="createdAt", type="string", example="2024-12-09T14:29:39.000000Z"),
     *                 @OA\Property(property="isReaded", type="boolean", example=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=422, description="Unprocessable Entity"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function NotificationListAnnotation()
    {
    }
}
