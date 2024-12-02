<?php

namespace App\Actions;

use Illuminate\Support\Collection;
use Lorisleiva\Actions\Concerns\AsAction;

class ProcessUserSubscriptionData
{
    use AsAction;

    public function handle(Collection $subscriptions)
    {
        $mapped = $subscriptions->map(function ($record) {
            $item = [];
            $item["startDate"] = $record->start_date->format("d/m/Y");
            $item["endDate"] = $record->end_date->format("d/m/Y");
            $item["status"] = $record->status;
            $item["programName"] = $record->program->name;
            return $item;
        });
        return $mapped;
    }
}
