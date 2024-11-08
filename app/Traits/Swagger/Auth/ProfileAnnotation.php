<?php

namespace App\Traits\Swagger\Auth;

trait ProfileAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/auth/profile",
     *      operationId="authProfile",
     *      tags={"Auth"},
     *     security={{"bearerAuth": {}}},
     *      summary="Profile",
     *      description="Get the current user's profile",
     *      @OA\Response(
     *          response=200,
     *          description="Success, user data returned",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="fullname", type="string", example="Satio Hiragi"),
     *              @OA\Property(property="email", type="string", example="saito19@hogwarts.edu.us"),
     *              @OA\Property(property="phone", type="string", example="0976810291"),
     *              @OA\Property(property="address", type="string", nullable=true, example=null),
     *              @OA\Property(property="avatar", type="string", example="https://firebasestorage.googleapis.com/v0/b/fintown-4ddd6.appspot.com/o/avatar%2Fdefault.jpg?alt=media"),
     *              @OA\Property(
     *                  property="scope",
     *                  type="array",
     *                  @OA\Items(type="string", example="account-read")
     *              ),
     *              @OA\Property(property="role", type="string", example="basic")
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     * )
     */
    public function ProfileAnnotation()
    {
    }
}
