<?php

namespace App\Http\Controllers\API\Auth;

use App\Actions\RegisterNewUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\Auth\LoginRequest;
use App\Http\Requests\API\Auth\RegisterRequest;
use App\Models\SQL\User\User;
use App\Traits\Swagger\Auth as AuthSwagger;
use App\Utils\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    private function respondeWithToken(string $token, string $type = "Bearer")
    {
        return ApiResponse::success([
            "type" => $type,
            "token" => $token,
            "expiresIn" => config("jwt.refresh_ttl") * 60,
        ]);
    }

    public function register(RegisterRequest $request, RegisterNewUser $action)
    {
        $validated = $request->validated();
        $result = $action->handle($validated);

        if (!$result["isSuccess"]) {
            return ApiResponse::validationError(
                $result["errors"],
                "Đăng ký không thành công"
            );
        }

        return ApiResponse::created(["message" => "Đăng ký thành công."]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!($token = Auth::guard("api")->attempt($credentials))) {
            return ApiResponse::unauthorized();
        }

        return $this->respondeWithToken($token);
    }

    public function profile()
    {
        $currentUserId = auth("api")->id();
        $user = User::find($currentUserId);

        $profile = $user->toArray();
        // get permissions for the user
        $userPermissions = $user->getAllPermissions()->toArray();
        $permissionList = array_map(
            fn($permission) => $permission["name"],
            $userPermissions
        );
        $profile["scope"] = $permissionList;

        // get role name
        $profile["role"] = $user->getRoleNames()[0];

        // unset unnecessary properties
        unset($profile["id"]);
        unset($profile["created_at"]);
        unset($profile["updated_at"]);

        return ApiResponse::success($profile);
    }

    public function refresh()
    {
        $newToken = JWTAuth::refresh(JWTAuth::getToken());
        return $this->respondeWithToken($newToken);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return ApiResponse::noContent();
    }
}
