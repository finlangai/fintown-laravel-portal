<?php

namespace App\Enums;

enum QuoteInterval: string
{
    case MINUTELY = "1m";
    case HOURLY = "1H";
    case DAILY = "1D";
    case WEEKLY = "1W";
    case MONTHLY = "1M";
}
