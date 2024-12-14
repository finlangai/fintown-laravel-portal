<?php

namespace App\Http\Controllers\Web\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePromotionCodeRequest;
use App\Http\Requests\UpdatePromotionRequest;
use App\Models\SQL\Subcription\Program;
use App\Models\SQL\Subcription\PromotionCode;
use App\Models\SQL\User\User;
use App\Utils\ApiResponse;
use App\Utils\Toasting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginating = PromotionCode::with("partner", "program")
            ->orderBy("created_at", "desc")
            ->paginate(10);
        $partners = User::whereHas("roles", function ($query) {
            $query->where("name", "partner");
        })->get();
        $programs = Program::all();
        return Inertia::render(
            "User/Promotion",
            compact("paginating", "partners", "programs")
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromotionCodeRequest $request)
    {
        $validated = $request->validated();
        try {
            PromotionCode::create($validated);
            Toasting::success("Tạo mã giới thiệu thành công.");
        } catch (\Throwable $th) {
            Toasting::error("Đã có lỗi xảy ra trong quá trình thực hiện.");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdatePromotionRequest $request,
        PromotionCode $promotion
    ) {
        try {
            $validated = $request->validated();
            $promotion->update($validated);
            Toasting::success("Cập nhật mã giới thiệu thành công.");
        } catch (\Throwable $th) {
            Toasting::error("Đã có lỗi xảy ra trong quá trình thực hiện.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromotionCode $promotion)
    {
        try {
            $promotion->delete();
            Toasting::success("Xóa mã giới thiệu thành công.");
        } catch (\Throwable $th) {
            Toasting::error("Đã có lỗi xảy ra trong quá trình thực hiện.");
        }
    }
}
