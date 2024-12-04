<?php

namespace App\Http\Controllers\Valuation;

use App\Actions\GetUserScenariosList;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\AddValuationScenarioRequest;
use App\Http\Requests\API\UpdateValuationScenarioRequest;
use App\Models\Mongo\Formular;
use App\Models\Mongo\General\ValuationScenario;
use App\Utils\ApiResponse;
use App\Utils\Util;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ScenariosController extends Controller
{
    public function index(
        Formular $formularInfo,
        string $symbol,
        GetUserScenariosList $action
    ) {
        $result = $action->handle($formularInfo, $symbol);

        return ApiResponse::success($result);
    }

    public function store(
        AddValuationScenarioRequest $request,
        Formular $formularInfo,
        string $symbol
    ) {
        $validated = $request->validated();
        ValuationScenario::create([
            "symbol" => $symbol,
            "user_id" => auth("api")->id(),
            "type_id" => $formularInfo->id,
            ...Util::SnakeizeArray($validated),
        ]);
        return ApiResponse::created(["message" => "Tạo kịch bản thành công."]);
    }

    public function show($_, $__, string $scenarioId)
    {
        try {
            $scenario = ValuationScenario::findOrFail($scenarioId);
        } catch (\Throwable $th) {
            return ApiResponse::notFound("Không tìm thấy kịch bản.");
        }

        $scenario = $scenario->toArray();

        // QUARTER TIMESTAMP
        $createdAtCarbon = Carbon::parse($scenario["updated_at"]);
        $createdAtQuarter = $createdAtCarbon->quarter;
        $createdAtYear = $createdAtCarbon->year;
        $scenario["saveAt"] = "Q$createdAtQuarter/$createdAtYear";

        unset($scenario["type_id"]);
        unset($scenario["updated_at"]);
        unset($scenario["created_at"]);

        $result = Util::CamelizeArray($scenario);
        return ApiResponse::success($result);
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

            return ApiResponse::noContent();
        } catch (\Throwable $th) {
            return ApiResponse::notFound("Kịch bản không tồn tại.");
        }
    }
}
