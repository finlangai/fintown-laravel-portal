<?php

namespace App\Http\Controllers\API\Symbols;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\EventsRequest;
use App\Models\Mongo\Company\Event;
use App\Traits\Swagger\Symbols\EventsAnnotation;
use App\Utils\ApiResponse;

class EventsController extends Controller
{
    use EventsAnnotation;
    public function __invoke(string $symbol, EventsRequest $request)
    {
        $validated = $request->validated();
        $eventLimit = 20;

        $query = Event::where("symbol", strtoupper($symbol))->orderBy(
            "exer_date",
            "desc"
        );

        if (array_key_exists("limit", $validated)) {
            $eventLimit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $query->skip($validated["offset"]);
        }

        $query->limit($eventLimit);
        $query->project($this->getEventProjection());

        $events = $query->get();

        // GUARD - handle zero length collection
        if (!$events->count()) {
            return ApiResponse::notFound("Không tìm thấy sự kiện.");
        }

        $events = $events->toArray();
        foreach ($events as $index => $e) {
            foreach ($e["date"] as $key => $date) {
                if (!is_null($date)) {
                    if ($date->getTimestamp() < 0) {
                        unset($events[$index]["date"][$key]);
                        continue;
                    }
                    $events[$index]["date"][$key] = $date->format("d/m/Y");
                }
            }
        }

        return ApiResponse::success($events);
    }

    private function getEventProjection(): array
    {
        return [
            "event" => [
                "code" => "\$event_code",
                "desc" => "\$event_desc",
                "name" => "\$event_name",
            ],
            "date" => [
                "exer" => "\$exer_date",
                "exerRight" => "\$exer_right_date",
                "notify" => "\$notify_date",
                "regFinal" => "\$reg_final_date",
            ],
            "price" => [
                "value" => "\$price",
                "change" => "\$price_change",
                "changeRatio" => "\$price_change_ratio",
            ],
        ];
    }
}
