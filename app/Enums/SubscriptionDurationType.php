<?php

namespace App\Enums;

enum SubscriptionDurationType: string
{
    case DAY = "day";
    case MONTH = "month";
    case YEAR = "year";
}
