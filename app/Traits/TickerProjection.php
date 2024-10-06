<?php

namespace App\Traits;

trait TickerProjection
{
    public function getTickerProjection(): array
    {
        return [
            "_id" => 0,
            "symbol" => 1,
            "logo" => 1,
            "companyName" => "\$company_name",
            "delta" => "\$delta.delta_in_week",
            "exchange" => "\$profile.exchange",
        ];
    }
}
