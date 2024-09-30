<?php

namespace App\Traits\Swagger\Auth;

trait ProfileAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/auth/profile",
     *      operationId="authProfile",
     *      tags={"Auth"},
     *      summary="Profile",
     *      description="Get the current user's profile",
     *      @OA\Response(
     *          response=200,
     *          description="Success, user data returned",
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     *     )
     */
    public function ProfileAnnotation()
    {}
}
