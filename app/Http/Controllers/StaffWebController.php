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
        $staffList = Staff::with('roles.permissions')->get()->map(function($staff) {
            return [
                'id' => $staff->id,
                'username' => $staff->username,
                'fullname' => $staff->fullname,
                'email' => $staff->email,
                'roles' => $staff->roles->pluck('name'), 
                'permissions' => $staff->roles->flatMap(function($role) {
                    return $role->permissions->pluck('name'); 
                })->unique(),
                'role_type' => $staff->roles->pluck('name')->contains('super-admin') ? 'super-admin' : 'admin', 
            ];
        });
        $permissions = Permission::all();
        return Inertia::render('Staff/Staff', [
            'staffList' => $staffList, 
            'permissionsList' => $permissions,
        ]);
    }
    public function updatePermissions(Request $request, $id)
{
    $staff = Staff::findOrFail($id);

    // Lấy tất cả quyền từ request
    $permissions = $request->input('permissions');
    $permissionIds = [];

    // Kiểm tra xem nhân viên thuộc vai trò nào (admin, super-admin)
    $staffRole = DB::table('model_has_roles')
        ->where('model_id', $staff->id)
        ->where('model_type', 'App\Models\SQL\Staff\Staff')
        ->first();

    if (!$staffRole) {
        return redirect()->back()->with('error', 'Không tìm thấy vai trò cho nhân viên này.');
    }
    $roleId = $staffRole->role_id;
    foreach ($permissions as $permission) {
        $perm = Permission::where('name', $permission)->first();
        if (!$perm) {
            return redirect()->back();
        }
        $permissionIds[] = $perm->id;
    }
    DB::table('role_has_permissions')
        ->where('role_id', $roleId)
        ->delete();
    foreach ($permissionIds as $permissionId) {
        DB::table('role_has_permissions')->insert([
            'permission_id' => $permissionId,
            'role_id' => $roleId,
        ]);
    }
    return redirect()->back();
}

}
