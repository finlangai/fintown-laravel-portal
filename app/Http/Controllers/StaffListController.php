<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\SQL\Staff;
use App\Models\SQL\Staff\Staff as StaffList;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class StaffListController extends Controller
{
    public function index(Request $request) // Thêm tham số $request
    {
        $ViewstaffList = StaffList::all(['id', 'username', 'fullname', 'email', 'created_at', 'updated_at']);
    
        return Inertia::render('Staff/StaffList', [
            'ViewstaffList' => $ViewstaffList,
            'flash' => [
                'idNhanVienreset' => $request->session()->get('idNhanVienreset'),
                'new_password' => $request->session()->get('new_password'),
            ],
        ]);
    }
    
    public function destroy($id)
    {
        $staff = StaffList::find($id);
        if ($staff) {
            $staff->delete();
            return redirect()->route('staffList.index')->with('success', 'Nhân viên đã được xóa thành công!');
        }
        return redirect()->route('staffList.index')->with('error', 'Nhân viên không tìm thấy!');
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:staffs,email', 
            'password' => 'required|string|min:8',
        ]);
    
        $staff = StaffList::create([
            'username' => $validatedData['username'],
            'fullname' => $validatedData['fullname'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);
        return redirect()->route('staffList.index')->with('success', 'Nhân viên đã được thêm thành công!');
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:15',
        ]);
        $staff = StaffList::findOrFail($id);
        $staff->username = $request->input('username');
        $staff->email = $request->input('email');
        $staff->fullname = $request->input('fullname'); 
        $staff->save();
        return redirect()->route('staffList.index')->with('success', 'Nhân viên Cập nhập thành công!');
    }
    public function resetPassword(Request $request, $id)
{
    $staff = StaffList::findOrFail($id);
    $newPassword = Str::random(8); 
    $staff->password = bcrypt($newPassword);
    $staff->save();

    return redirect()->route('staffList.index')->with([
        'idNhanVienreset' => $id,
        'new_password' => $newPassword,
    ]);
}
}
