<?php

namespace App\Http\Controllers\API\Symbols;

use App\Enums\DividendType;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Dividend;
use App\Traits\Swagger\Symbols\DividendsAnnotation;
use App\Utils\ApiResponse;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class DividendsController extends Controller
{
    use DividendsAnnotation;
    public function __invoke(string $symbol)
    {
        $symbol = strtoupper($symbol);
        $result = Dividend::where("symbol", $symbol)
            ->orderBy("record_date", "desc")
            ->project(["symbol" => 0, "registration_date" => 0])
            ->get();

        if (!$result->count()) {
            return ApiResponse::notFound("Không tìm thấy dữ liệu cổ tức.");
        }

        $records = $this->mapRecords($result);
        // cash dividend legend for chart
        $cashLegend = $this->mapCashLegend($result);
        // stock dividend legend for chart
        $stockLegend = $this->mapStockLegend($result);
        return ApiResponse::success(
            compact("cashLegend", "stockLegend", "records")
        );
    }

    private function mapRecords(Collection $documents)
    {
        return $documents->map(function ($record) {
            $recordDate = Carbon::parse($record["record_date"])->format(
                "d/m/Y"
            );
            $executionDate = $record["execution_date"]
                ? Carbon::parse($record["execution_date"])->format("d/m/Y")
                : null;
            return [
                "title" => $record["title"],
                "type" => $record["type"],
                ...compact("recordDate", "executionDate"),
            ];
        });
    }

    private function mapCashLegend(Collection $documents)
    {
        $currentYear = Carbon::now()->year;
        $minYear = $currentYear - 6;
        $filtered = $documents->filter(function ($record) use ($minYear) {
            return $record["type"] == DividendType::CASH->value &&
                $record["year"] > $minYear;
        });

        $mapped = $this->mapLegendStructure(
            $filtered,
            "cash",
            $currentYear,
            $minYear
        );

        return $mapped;
    }

    private function mapStockLegend(Collection $documents)
    {
        $currentYear = Carbon::now()->year;
        $minYear = $currentYear - 6;
        $filtered = $documents->filter(function ($record) use ($minYear) {
            return $record["type"] == DividendType::STOCK->value &&
                $record["year"] > $minYear;
        });

        $mapped = $this->mapLegendStructure(
            $filtered,
            "percentage",
            $currentYear,
            $minYear
        );

        $mapped = array_map(function ($item) {
            $item["value"] *= 100;
            $item["value"] = round($item["value"], 2);
            return $item;
        }, $mapped);

        return $mapped;
    }

    private function mapLegendStructure(
        Collection $filtered,
        string $dividendValueKey,
        int $startYear,
        int $minYear
    ) {
        // associated array use to sum dividends that are paid on the same year
        $hashmap = [];
        foreach ($filtered as $record) {
            $recordYear = $record["year"];
            $currentCash = $record[$dividendValueKey] ?? 0;
            if (array_key_exists($recordYear, $hashmap)) {
                $hashmap[$recordYear] += $currentCash;
                continue;
            }
            $hashmap[$recordYear] = $currentCash;
        }
        $mapped = [];
        while ($startYear > $minYear) {
            $point = [
                "year" => $startYear,
                "value" => $hashmap[$startYear] ?? 0,
            ];
            $mapped[] = $point;
            $startYear--;
        }
        return $mapped;
    }
}
