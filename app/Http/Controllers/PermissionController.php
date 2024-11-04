<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    // Hiển thị danh sách quyền
    public function index()
    {
        $AllPermission = Permission::orderByDesc('id')->get();

        return Inertia::render('Staff/Permission', [
            'AllPermission' => $AllPermission,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        Permission::create([
            'name' => $request->name,
            'guard_name' => 'web',
        ]);

        return redirect()->route('permission.index');
    }
    public function destroy($id)
    {
        $PermissionExists = DB::table('permissions')->where('id', $id)->exists();
        if ($PermissionExists) {
            DB::table('permissions')->where('id', $id)->delete();
            return redirect()->route('permission.index');
        } else {
            return redirect()->route('permission.index');
        }
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $role = Permission::find($id);
        
        if (!$role) {
            return redirect()->route('permission.index')->with('error', 'Không tìm thấy bản ghi!');
        }

        $role->name = $request->name;
        $role->save();

        return redirect()->route('permission.index')->with('success', 'Cập nhật thành công!');
    }
}
