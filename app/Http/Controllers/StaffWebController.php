<?php

namespace App\Http\Controllers;

use App\Models\SQL\Staff\Staff;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasRoles;

class StaffWebController extends Controller
{
    use Notifiable, HasRoles;

    public function index()
    {
        $staffList = Staff::with("roles.permissions")
            ->get()
            ->map(function ($staff) {
                return [
                    "id" => $staff->id,
                    "username" => $staff->username,
                    "fullname" => $staff->fullname,
                    "email" => $staff->email,
                    "roles" => $staff->roles->pluck("name"),
                    "permissions" => $staff->roles
                        ->flatMap(function ($role) {
                            return $role->permissions->pluck("name");
                        })
                        ->unique(),
                    "role_type" => $staff->roles
                        ->pluck("name")
                        ->contains("super-admin")
                        ? "super-admin"
                        : "admin",
                ];
            });
        $permissions = Permission::where("guard_name", "web")->get();
        $roles = Role::where("guard_name", "web")->get();

        return Inertia::render("Staff/Staff", [
            "role" => $roles,
            "staffList" => $staffList,
            "permissionsList" => $permissions,
        ]);
    }

    public function updatePermissions(Request $request, $id)
    {
        $user = Staff::findOrFail($id);
        $roles = $request->input("roles", []);
        DB::table("model_has_roles")
            ->where("model_id", $user->id)
            ->delete();
        if (!empty($roles)) {
            $role = $roles[0];

            $roleRecord = DB::table("roles")->where("name", $role)->first();

            if ($roleRecord) {
                DB::table("model_has_roles")->insert([
                    "role_id" => $roleRecord->id,
                    "model_type" => Staff::class,
                    "model_id" => $user->id,
                ]);
            }
        }

        return redirect()
            ->back()
            ->with("success", "Cập nhật vai trò thành công!");
    }
}
