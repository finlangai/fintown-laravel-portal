<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Auth\LoginRequest;
use App\Traits\Swagger\Auth\LoginAnnotation;
use App\Traits\Swagger\Auth\LogoutAnnotation;
use App\Traits\Swagger\Auth\RefreshAnnotation;
use App\Utils\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use LoginAnnotation;
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return ApiResponse::unauthorized();
        }

        return ApiResponse::success([ 'token' => $token ]);
    }

    public function me()
    {
        try {
            return ApiResponse::success(auth('api')->user());
        } catch (\Throwable $th) {
            return ApiResponse::internalServerError();
        }
    }

    use RefreshAnnotation;
    public function refresh()
    {
        try {
            return ApiResponse::success([ 'token' => JWTAuth::refresh(JWTAuth::getToken()) ]);
        } catch (\Throwable $th) {
            return ApiResponse::internalServerError();
        }
    }

    use LogoutAnnotation;
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return ApiResponse::noContent();
        } catch (\Throwable $th) {
            return ApiResponse::internalServerError();
        }
    }

}
