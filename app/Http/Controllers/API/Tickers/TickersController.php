<?php

namespace App\Http\Controllers\API\Tickers;

use App\Actions\PopulateTickers;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\TickersRequest;
use App\Models\Mongo\Company\Company;
use App\Traits\Swagger\Symbols\TickersAnnotation;
use App\Utils\ApiResponse;

class TickersController extends Controller
{
    use TickersAnnotation;
    public function __invoke(TickersRequest $request, PopulateTickers $action)
    {
        $validated = $request->validated();
        $tickersLimit = 10;

        $query = Company::orderBy("profile.market_cap", "desc")->project(
            $this->getTickerProjection()
        );

        if (array_key_exists("limit", $validated)) {
            $tickersLimit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $query->skip($validated["offset"]);
        }

        $query->limit($tickersLimit);
        $tickers = $query->get();

        // handle zero length collection
        if (!$tickers->count()) {
            return ApiResponse::notFound();
        }

        $result = $action->handle($tickers);

        return $result;
    }

    private function getTickerProjection(): array
    {
        return [
            "_id" => 0,
            "symbol" => 1,
            "companyName" => "\$compane_name",
            "logo" => 1,
            "industry" => "\$industry",
            "marketCap" => "\$profile.market_cap",
            "weeklyDelta" => "\$delta.delta_in_week",
            "yearlyDelta" => "\$delta.delta_in_year",
            "exchange" => "\$profile.exchange",
        ];
    }
}
