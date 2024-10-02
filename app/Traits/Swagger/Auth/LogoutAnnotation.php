<?php

namespace App\Traits\Swagger\Auth;

trait LogoutAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/auth/logout",
     *      operationId="authLogout",
     *      tags={"Auth"},
     *      summary="Logout",
     *      description="Invalidate the current user's token",
     *      @OA\Response(
     *          response=204,
     *          description="Success, no reponse data needed",
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
    public function LogoutAnnotation()
    {}
}
