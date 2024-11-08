<?php

namespace App\Http\Controllers\Web\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\Users\StoreUserRequest;
use App\Http\Requests\Web\Users\UpdateUserInfoRequest;
use App\Models\SQL\User\User;
use App\Utils\Toasting;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::with("roles");

        $search = request()->input("search");
        if ($search) {
            $query->where(
                fn(Builder $query) => $query
                    ->whereRaw("LOWER(fullname) LIKE ?", [
                        "%" . strtolower($search) . "%",
                    ])
                    ->orWhereRaw("LOWER(email) LIKE ?", [
                        "%" . strtolower($search) . "%",
                    ])
                    ->orWhereRaw("LOWER(phone) LIKE ?", ["%" . $search . "%"])
            );
        }
        $paginating = $query->paginate(8);

        return Inertia::render("User/User", compact("paginating"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        try {
            $validated["avatar"] = env("DEFAULT_AVATAR");
            $user = User::create($validated);
            $user->assignRole("basic");

            Toasting::success("Thêm người dùng thành công.");
        } catch (\Throwable $th) {
            Toasting::error("Có lỗi xảy ra trong quá trình thực hiện.");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserInfoRequest $request, User $user)
    {
        try {
            $validated = $request->validated();
            $user->fill($validated);
            $user->save();
            Toasting::success("Cập nhật thông tin khách hàng thành công");
        } catch (\Throwable $th) {
            Toasting::error("Có lỗi xảy ra trong quá trình thực hiện.");
        }
    }

    public function updatePassword(Request $request, User $user)
    {
        $validated = $request->validate([
            "password" => "required|string",
            "confirmPassword" => "required|string|same:password",
        ]);
        try {
            $user->update(["password" => $validated["password"]]);
            Toasting::success(
                "Thay đổi mật khẩu cho khách hàng với email " .
                    $user->email .
                    "thành công."
            );
        } catch (\Throwable $th) {
            Toasting::error("Có lỗi xảy ra trong quá trình thực hiện.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->deleteOrFail();
            Toasting::success("Đã xóa khách hàng khỏi hệ thống.");
        } catch (\Throwable $th) {
            Toasting::error("Có lỗi xảy ra trong quá trình thực hiện.");
        }
    }
}
