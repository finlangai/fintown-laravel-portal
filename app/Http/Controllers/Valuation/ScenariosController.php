<?php

namespace App\Http\Controllers\Valuation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\AddValuationScenarioRequest;
use App\Http\Requests\API\UpdateValuationScenarioRequest;
use App\Models\Mongo\Formular;
use App\Models\Mongo\General\ValuationScenario;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class ScenariosController extends Controller
{
    public function index(Formular $formularInfo, string $symbol)
    {
        $userId = auth("api")->id();
        $scenarios = ValuationScenario::where("symbol", $symbol)
            ->where("type_id", $formularInfo->id)
            ->where("user_id", $userId)
            ->orderBy("created_at", "desc")
            ->get();

        $result = $scenarios->map(function ($item) {
            $item["saveAt"] = $item["created_at"]->format("d/m/Y");
            unset($item["created_at"]);
            unset($item["type_id"]);
        });

        return ApiResponse::success($scenarios);
    }

    public function store(
        AddValuationScenarioRequest $request,
        Formular $formularInfo,
        string $symbol
    ) {
        ValuationScenario::create([
            "symbol" => $symbol,
            "user_id" => auth("api")->id(),
            "type_id" => $formularInfo->id,
            ...$request->validated(),
        ]);
        return ApiResponse::created(["message" => "Tạo kịch bản thành công."]);
    }

    public function show()
    {
        //
    }

    public function update(
        UpdateValuationScenarioRequest $request,
        $_,
        $__,
        ValuationScenario $scenario
    ) {
        $validated = $request->validated();
        if (empty($validated)) {
            return ApiResponse::badRequest(
                "Cần cung cấp ít nhất một tham số để cập nhật."
            );
        }
        // prevent from updating if current auth user not match
        if ($scenario->user_id != auth("api")->id()) {
            return ApiResponse::forbidden();
        }

        $scenario->update($validated);

        return ApiResponse::success([
            "message" => "Cập nhật thông tin kịch bản thành công",
        ]);
    }

    public function destroy($_, $__, string $scenarioId)
    {
        try {
            $scenario = ValuationScenario::where("id", $scenarioId)->first();

            // prevent from delete if current auth user not match
            if ($scenario->user_id != auth("api")->id()) {
                return ApiResponse::forbidden();
            }

            $scenario->delete();

            return ApiResponse::noContent([
                "message" => "Xóa kịch bản thành công.",
            ]);
        } catch (\Throwable $th) {
            return ApiResponse::notFound("Kịch bản không tồn tại.");
        }
    }
}
