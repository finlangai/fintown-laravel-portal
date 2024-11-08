<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Models\SQL\RBAC\Role as RoleCRUD;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
class RoleController extends Controller
{
    public function index()
    {
        $AllRoles = Role::all();
        $AllPermission = Permission::all();
        $AllRole_Has_Permission = DB::table("role_has_permissions")->get();
        return Inertia::render("Staff/Role", [
            "AllRoles" => $AllRoles,
            "AllRole_Has_Permission" => $AllRole_Has_Permission,
            "allPermission" => $AllPermission,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
        ]);
        Role::create([
            "name" => $request->name,
            "guard_name" => "web",
        ]);

        return redirect()->route("staff.index");
    }
    public function destroy(Request $request, $id)
    {
        $roleExists = DB::table("roles")->where("id", $id)->exists();
        if ($roleExists) {
            DB::table("roles")->where("id", $id)->delete();
            return redirect()->route("staff.index");
        } else {
            return redirect()->route("staff.index");
        }
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required|string|max:255",
        ]);

        $role = RoleCRUD::find($id);

        if (!$role) {
            return redirect()
                ->route("staff.index")
                ->with("error", "Không tìm thấy bản ghi!");
        }

        $role->name = $request->name;
        $role->save();

        return redirect()
            ->route("staff.index")
            ->with("success", "Cập nhật thành công!");
    }

    public function updateRoleHasPermission(Request $request, $roleId)
    {
        $request->validate([
            "rolePermissions" => "required|array",
            "rolePermissions.*" => "boolean",
        ]);
        $role = Role::findById($roleId);
        $role->syncPermissions();
        foreach ($request->rolePermissions as $permissionId => $isGranted) {
            if ($isGranted) {
                $permission = Permission::find($permissionId);
                if ($permission) {
                    $role->givePermissionTo($permission);
                }
            }
        }
        return redirect()
            ->route("staff.index")
            ->with("success", "Cập nhật thành công!");
    }
}
