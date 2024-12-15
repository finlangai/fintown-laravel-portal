<?php

namespace App\Traits\Swagger\General;

trait MemberAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/members",
     *     operationId="GetMembers",
     *     tags={"General"},
     *     summary="Get Members",
     *     description="Retrieve Members",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     example="Nguyễn Kim Hùng"
     *                 ),
     *                 @OA\Property(
     *                     property="avatar",
     *                     type="string",
     *                     example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/member%2Fhung.png?alt=media"
     *                 ),
     *                 @OA\Property(
     *                     property="roles",
     *                     type="string",
     *                     example="Team Lead, Full-stack Developer"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string",
     *                     example="Quản lý lịch trình dự án, làm việc trực tiếp với khách hàng làm rõ yêu cầu dự án. Đảm nhận trọng trách phát triển Web Client và các nghiệp vụ Server Side"
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
    public function MemberAnnotation()
    {
    }
}
