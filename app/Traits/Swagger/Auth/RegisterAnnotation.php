<?php

namespace App\Traits\Swagger\Auth;

trait RegisterAnnotation
{
    /**
     * @OA\Post(
     *      path="/api/auth/register",
     *      operationId="authRegister",
     *      tags={"Auth"},
     *      summary="Register",
     *      description="Register a new user",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="fullname",
     *                  type="string",
     *                  maxLength=128,
     *                  example="John Doe"
     *              ),
     *              @OA\Property(
     *                  property="email",
     *                  type="string",
     *                  format="email",
     *                  maxLength=256,
     *                  example="user@example.com"
     *              ),
     *              @OA\Property(
     *                  property="phone",
     *                  type="string",
     *                  minLength=10,
     *                  maxLength=11,
     *                  example="0123456789"
     *              ),
     *              @OA\Property(
     *                  property="address",
     *                  type="string",
     *                  maxLength=256,
     *                  example="123 Main St, Anytown, USA"
     *              ),
     *              @OA\Property(
     *                  property="password",
     *                  type="string",
     *                  minLength=8,
     *                  maxLength=128,
     *                  example="Password123!"
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Register successfully",
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
    public function RegisterAnnotation()
    {}
}
