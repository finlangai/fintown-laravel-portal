<?php

namespace App\Traits\Swagger\General;

trait FaqAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/general/faq",
     *     operationId="GetFaq",
     *     tags={"General"},
     *     summary="Get FAQ",
     *     description="Retrieve FAQ",
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="number",
     *                     type="string",
     *                     example="1"
     *                 ),
     *                 @OA\Property(
     *                     property="title",
     *                     type="string",
     *                     example="Việc thanh toán diễn ra thế nào?"
     *                 ),
     *                 @OA\Property(
     *                     property="content",
     *                     type="string",
     *                     example="Sau khi xác nhận thanh toán, việc thanh toán được diễn ra một lần duy nhất tại thời điểm đăng ký và bạn sẽ nhận được đầy đủ các quyền hạn trong gói. Việc này lặp lại vào mỗi định kỳ tùy theo thời gian của gói."
     *                 ),
     *                 @OA\Property(
     *                     property="id",
     *                     type="string",
     *                     example="675e93302f35f27a06a786b6"
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
    public function FaqAnnotation()
    {
    }
}
