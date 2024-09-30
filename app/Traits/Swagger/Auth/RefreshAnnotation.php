<?php

namespace App\Traits\Swagger\Auth;

trait RefreshAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/auth/refresh",
     *      operationId="authRefresh",
     *      tags={"Auth"},
     *      summary="Refresh",
     *      description="Invalidate the curernt token and return a fresh new token",
     *      @OA\Response(
     *          response=200,
     *          description="Success, token returned",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="type",
     *                  type="string",
     *                  example="Bearer"
     *              ),
     *              @OA\Property(
     *                  property="token",
     *                  type="string",
     *                  example="I_am_the_token_of_my_sword"
     *              ),
     *              @OA\Property(
     *                  property="expiresIn",
     *                  type="int",
     *                  example="1209600"
     *              ),
     *          )
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
    public function RefreshAnnotation()
    {}
}
