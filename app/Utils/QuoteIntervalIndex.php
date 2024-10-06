<?php
namespace App\Utils;

use App\Enums\QuoteInterval;
use App\Traits\GetIntervalIndex;

class QuoteIntervalIndex
{
    use GetIntervalIndex;
    /**
     * Return the index of the interval
     *
     * @param QuoteInterval $intervalType
     * @return integer
     */
    public static function get(QuoteInterval $intervalType): int
    {
        return self::getIntervalIndex($intervalType->value);
    }
}
