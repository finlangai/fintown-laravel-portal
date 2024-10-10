<?php

namespace App\Traits\Swagger\General\User;

trait ChangeUserAvatarAnnotation
{
    /**
     * @OA\Post(
     *     path="/api/general/user/change-avatar",
     *     summary="Change user avatar",
     *     tags={"User"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="avatar",
     *                     type="string",
     *                     format="binary",
     *                     description="The avatar file to upload. Must be a file of type: png, jpg, jpeg and not exceed 2048KB."
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Avatar updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Cập nhật ảnh đại diện thành công"),
     *             @OA\Property(property="newAvatar", type="string", example="https://public-url-to-new-avatar.png")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Not Found"),
     *     @OA\Response(response=422, description="Unprocessable Entity"),
     *     @OA\Response(response=500, description="Internal Server Error")
     * )
     */
    public function ChangeUserAvatarAnnotation()
    {
    }
}
