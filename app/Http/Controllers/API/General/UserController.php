<?php

namespace App\Http\Controllers\API\General;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\General\UpdateUserRequest;
use App\Models\SQL\User\User;
use App\Utils\ApiResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Update the specified resource in storage.
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
}
