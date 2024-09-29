<?php

namespace App\Traits\Swagger\Auth;

trait LoginAnnotation
{
    /**
     * @OA\Post(
     *      path="/api/auth/login",
     *      operationId="authLogin",
     *      tags={"Auth"},
     *      summary="Login",
     *      description="It's login, no explanation needed",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="email",
     *                  type="string",
     *                  format="email",
     *                  maxLength=255,
     *                  example="user@example.com"
     *              ),
     *              @OA\Property(
     *                  property="password",
     *                  type="string",
     *                  minLength=8,
     *                  maxLength=128,
     *                  example="password123"
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success, token returned",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="token",
     *                  type="string",
     *                  example="I_am_the_token_of_my_sword"
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized"
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Unprocessable Entity"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error"
     *      )
     * )
     */
    public function LoginAnnotation()
    {}
}
