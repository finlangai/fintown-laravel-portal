<?php

namespace App\Enums;

enum InstrumentCategory: string
{
    case WATCHLIST = "watchlist";
    case VN30 = "vn30";
    case HOSE = "hose";
    case HSX = "hsx";
    case MANUAL = "manual";
    case SEARCH = "search";
}
