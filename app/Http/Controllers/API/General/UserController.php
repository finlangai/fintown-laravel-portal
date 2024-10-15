<?php

namespace App\Http\Controllers\API\General;

use App\Actions\ChangeUserAvatar;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\General\UpdateUserRequest;
use App\Http\Requests\API\General\ChangeAvatarRequest;
use App\Models\SQL\User\User;
use App\Utils\ApiResponse;
use App\Utils\Util;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Update user info
     *
     * @param UpdateUserRequest $request
     * @return Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserRequest $request)
    {
        $validated = $request->validated();
        $email = auth("api")->user()->email;

        $user = User::where("email", $email)->first();
        if (!$user) {
            return ApiResponse::notFound("Không tìm thấy người dùng");
        }
        $user->fill($validated);
        $user->save();

        return ApiResponse::success("Cập nhật thông tin người dùng thành công");
    }

    /**
     * Change user avatar
     *
     * @param ChangeAvatarRequest $request
     * @param ChangeUserAvatar $action
     * @return void
     */
    public function changeAvatar(
        ChangeAvatarRequest $request,
        ChangeUserAvatar $action
    ) {
        $file = $request->file("avatar");
        $newAvatarUrl = $action->handle($file);
        if (!$newAvatarUrl) {
            ApiResponse::notFound("Không tìm thấy người dùng");
        }
        return ApiResponse::success([
            "message" => "Cập nhật ảnh đại diện thành công",
            "newAvatar" => $newAvatarUrl,
        ]);
    }
}
