<?php

namespace App\Http\Controllers\Web\User;

use App\Http\Controllers\Controller;
use App\Utils\Toasting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserRolesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $roles = Role::with("permissions")->where("guard_name", "api")->get();
        $permissions = Permission::where("guard_name", "api")->get();

        return Inertia::render(
            "User/UserRoles",
            compact("roles", "permissions")
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "permissions" => "required|array",
        ]);
        $role = Role::create([
            "name" => $validated["name"],
            "guard_name" => "api",
        ]);

        $role->givePermissionTo($validated["permissions"]);
        Toasting::success("Thêm vai trò thành công.");
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            "name" => "nullable|string",
            "permissions" => "nullable|array",
        ]);

        $role->fill($validated);
        $role->save();
        $role->syncPermissions($validated["permissions"]);

        Toasting::success("Chỉnh sửa vai trò thành công.");
    }

    public function destroy(Role $role)
    {
        $role->delete();

        Toasting::success("Xóa vai trò thành công.");
    }
}
