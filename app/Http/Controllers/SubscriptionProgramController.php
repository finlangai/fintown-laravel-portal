<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SQL\Subcription\Program;
use App\Models\SQL\User\Type;
use App\Utils\Toasting;
use Database\Seeders\ProgramSeeder;

class SubscriptionProgramController extends Controller
{
    public function index()
    {
        $programs = Program::all();
        return Inertia::render(
            "Subscription/SubscriptionProgram/SubscriptionProgram",
            [
                "programs" => $programs,
            ]
        );
    }

    public function create()
    {
        return Inertia::render("Subscription/SubscriptionProgram/Add", []);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "id" => "string|max:5|unique:subcription_programs",
            "incharge_id" => "required|string|max:3",
            "name" => "required|string|max:128",
            "description" => "required|string|max:256",
            "price" => "required|numeric",
            "discount" => "nullable|numeric",
            "duration" => "required|integer",
            "duration_type" => "required|in:day,month,year",
            "is_renewable" => "boolean",
        ]);

        Program::create($validated);
        Toasting::success("Thêm gói mới thành công.");
        return redirect()
            ->route("subscription.programs.index")
            ->with("success", "Thêm chương trình thành công");
    }

    public function edit($id)
    {
        $program = Program::findOrFail($id);
        return Inertia::render("Subscription/SubscriptionProgram/Add", [
            "program" => $program,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Tìm bản ghi bằng ID
        $program = Program::findOrFail($id);

        // Validate dữ liệu
        $validated = $request->validate([
            "incharge_id" => "required|string|max:3",
            "name" => "required|string|max:128",
            "description" => "required|string|max:256",
            "price" => "required|numeric",
            "discount" => "nullable|numeric",
            "duration" => "required|integer",
            "duration_type" => "required|in:day,month,year",
            "is_renewable" => "boolean",
        ]);

        // Cập nhật bản ghi
        $program->update($validated);

        Toasting::success("Cập nhật gói thành công.");
        // Redirect hoặc trả về phản hồi
        return redirect()
            ->route("subscription.programs.index")
            ->with("success", "Program updated successfully.");
    }
    public function destroy($id)
    {
        $program = Program::where("id", $id)->first();
        $program->delete();

        Toasting::success("Xóa gói thành công.");
        return redirect()
            ->route("subscription.programs.index")
            ->with("success", "Program deleted successfully.");
    }
}
