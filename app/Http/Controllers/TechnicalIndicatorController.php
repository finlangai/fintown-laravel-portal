<?php

namespace App\Http\Controllers;

use App\Models\Mongo\Recipe\TechnicalIndicators;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnicalIndicatorController extends Controller
{
    public function index()
    {
        $technicalIndicators = TechnicalIndicators::where(
            "metadata.category",
            0
        )
            ->whereNotNull("library")
            ->orderBy("metadata.order")
            ->get();

        return Inertia::render("Formulars/Technical-Indicators", [
            "technicalIndicators" => $technicalIndicators,
        ]);
    }

    public function editOrder(Request $request)
    {
        $giatri_keo = (int) $request->input("giatri_keo");
        $giatri_Tha = (int) $request->input("giatri_Tha");

        $tempValue = -999;

        $technicalIndicator = TechnicalIndicators::where(
            "metadata.order",
            $giatri_keo
        )->first();
        if ($technicalIndicator) {
            $technicalIndicator->update(["metadata.order" => $tempValue]);
        }

        $targetIndicator = TechnicalIndicators::where(
            "metadata.order",
            $giatri_Tha
        )->first();
        if ($targetIndicator) {
            $targetIndicator->update(["metadata.order" => $giatri_keo]);
        }

        if ($technicalIndicator) {
            $technicalIndicator->update(["metadata.order" => $giatri_Tha]);
        }

        return redirect()
            ->route("formulars.technical-indicators.index")
            ->with("success", "Thay đổi dữ liệu hiển thị thành công!");
    }
    public function editNameRecipe(Request $request)
    {
        $data = $request->input("data");

        foreach ($data as $item) {
            $order = $item["order"];
            $newName = $item["name"];
            $recipe = $item["recipe"];

            // Tìm TechnicalIndicator theo order
            $technicalIndicator = TechnicalIndicators::where(
                "metadata.order",
                $order
            )->first();

            if ($technicalIndicator && isset($technicalIndicator->library)) {
                $library = $technicalIndicator->library;

                $updated = false;

                foreach ($library as $key => $libraryItem) {
                    if ($libraryItem["expression"] == $recipe) {
                        $library[$key]["name"] = $newName;
                        $updated = true;
                    }
                }

                if ($updated) {
                    $technicalIndicator->update(["library" => $library]);
                } else {
                    return response()->json(
                        ["error" => "Không tìm thấy công thức: " . $recipe],
                        404
                    );
                }
            } else {
                return response()->json(
                    [
                        "error" =>
                            "Không tìm thấy công thức với order: " . $order,
                    ],
                    404
                );
            }
        }

        return redirect()
            ->route("formulars.technical-indicators.index")
            ->with("success", "Cập nhập tên công thức thành công!");
    }
    public function metadata(Request $request)
    {
        $data = $request->input("data");

        $order = $data["order"];
        $fieldsToUpdate = [
            "is_percentage" => $data["is_percentage"] ?? null, // Thêm ?? null để tránh lỗi nếu không có
            "is_should_divine_by_billion" =>
                $data["is_should_divine_by_billion"] ?? null,
            "is_viewable" => $data["is_viewable"] ?? null,
            "is_active" => $data["is_active"] ?? null,
        ];

        // Tìm công thức dựa trên order
        $technicalIndicator = TechnicalIndicators::where(
            "metadata->order",
            $order
        )->first(); // Lưu ý: Dùng 'metadata->order' nếu order nằm trong metadata

        if ($technicalIndicator && isset($technicalIndicator->metadata)) {
            // Kiểm tra nếu metadata có các trường cần cập nhật
            $metadata = $technicalIndicator->metadata;

            // Cập nhật các trường nếu có
            foreach ($fieldsToUpdate as $key => $value) {
                if ($value !== null) {
                    // Chỉ cập nhật nếu giá trị không null
                    $metadata[$key] = $value;
                }
            }

            // Cập nhật metadata mới vào database
            $technicalIndicator->update(["metadata" => $metadata]);

            return redirect()
                ->route("formulars.technical-indicators.index")
                ->with("success", "Cập nhật các trường thành công!");
        } else {
            return redirect()
                ->route("formulars.technical-indicators.index")
                ->with(
                    "error",
                    "Không tìm thấy công thức với order: " . $order
                );
        }
    }

    public function updateRecipeOverview(Request $request)
    {
        $data = $request->input("data");
        $order = $data["order"];
        $name = $data["name"];
        $display_name = $data["display_name"];

        $technicalIndicator = TechnicalIndicators::where(
            "metadata.order",
            $order
        )->first();

        if ($technicalIndicator) {
            $technicalIndicator->update([
                "name" => $name,
                "display_name" => $display_name,
            ]);

            return redirect()
                ->route("formulars.technical-indicators.index")
                ->with("success", "Cập nhập thành công!");
        } else {
            return response()->json(
                ["message" => "Không tìm thấy chỉ báo kỹ thuật"],
                404
            );
        }
    }
}
