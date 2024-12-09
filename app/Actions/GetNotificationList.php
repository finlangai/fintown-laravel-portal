<?php

namespace App\Actions;

use App\Models\SQL\System\Notification;
use App\Traits\ProcessLimitAndOffset;
use App\Utils\Util;
use Illuminate\Support\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class GetNotificationList
{
    use AsAction;
    use ProcessLimitAndOffset;

    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $from = null;

    public function handle(array $validated)
    {
        $query = Notification::orderBy("created_at", "desc")->with([
            "readByUsers" => function ($query) {
                $query->where("user_id", auth("api")->id());
            },
        ]);

        // CHECK PARAMS
        $this->processLimitAndOffset($validated);
        if (array_key_exists("from", $validated)) {
            $this->from = $validated["from"];
        }

        // ADD PARAMS TO QUERY
        $this->addQueryQuantationParam($query);

        $notifications = $query->get();

        $result = $notifications->map(function ($item) {
            $isReaded = $item->readByUsers->isNotEmpty();
            $item["isReaded"] = $isReaded;
            unset($item["readByUsers"]);
            return $item;
        });

        return Util::CamelizeArray($result->toArray());
    }

    public function addQueryQuantationParam($query)
    {
        if ($this->limit) {
            $query->limit($this->limit);
        }
        if ($this->offset) {
            $query->skip($this->offset);
        }
        if ($this->from) {
            $parsed = Carbon::parse($this->from)->setTimezone(
                env("APP_TIMEZONE")
            );
            $query->where("created_at", "<", $parsed);
        }
    }
}
