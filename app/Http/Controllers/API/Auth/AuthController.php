<?php

namespace App\Http\Controllers\API\Auth;

use App\Actions\RegisterNewUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\Auth\LoginRequest;
use App\Http\Requests\API\Auth\RegisterRequest;
use App\Traits\Swagger\Auth as AuthSwagger;
use App\Utils\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    private function respondeWithToken(string $token, string $type = 'Bearer')
    {
        return ApiResponse::success([
            'type'      => $type,
            'token'     => $token,
            'expiresIn' => config('jwt.refresh_ttl') * 60,
         ]);
    }

    use AuthSwagger\RegisterAnnotation;
    public function register(RegisterRequest $request, RegisterNewUser $action)
    {
        $validated = $request->validated();
        $result    = $action->handle($validated);

        if (!$result[ 'isSuccess' ]) {
            return ApiResponse::validationError($result[ 'errors' ], "Đăng ký không thành công");
        }

        return ApiResponse::created([ 'message' => 'Đăng ký thành công.' ]);
    }

    use AuthSwagger\LoginAnnotation;
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return ApiResponse::unauthorized();
        }

        return $this->respondeWithToken($token);
    }

    use AuthSwagger\ProfileAnnotation;
    public function profile()
    {
        return ApiResponse::success(auth('api')->user());
    }

    use AuthSwagger\RefreshAnnotation;
    public function refresh()
    {
        $newToken = JWTAuth::refresh(JWTAuth::getToken());
        return $this->respondeWithToken($newToken);
    }

    use AuthSwagger\LogoutAnnotation;
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return ApiResponse::noContent();
    }

}
