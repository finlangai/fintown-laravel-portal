<?php

namespace App\Utils;

/**
 * Utility class for calculating Unix timestamps.
 */
class Unix
{
    /**
     * Calculates the Unix timestamp for the specified number of minutes.
     *
     * @param int $minutes The number of minutes.
     * @return int The Unix timestamp.
     */
    public static function minute($minutes)
    {
        return $minutes * 60;
    }

    /**
     * Calculates the Unix timestamp for the specified number of hours.
     *
     * @param int $hours The number of hours.
     * @return int The Unix timestamp.
     */
    public static function hour($hours)
    {
        return $hours * 60 * 60;
    }

    /**
     * Calculates the Unix timestamp for the specified number of days.
     *
     * @param int $days The number of days.
     * @return int The Unix timestamp.
     */
    public static function day($days)
    {
        return $days * 24 * 60 * 60;
    }

    /**
     * Calculates the Unix timestamp for the specified number of weeks.
     *
     * @param int $weeks The number of weeks.
     * @return int The Unix timestamp.
     */
    public static function week($weeks)
    {
        return $weeks * 7 * 24 * 60 * 60;
    }

    /**
     * Calculates the Unix timestamp from now until the next specified hour.
     *
     * @param int $nextHour The next hour (1-24).
     * @return int The Unix timestamp from now until the next specified hour.
     */
    public static function untilNextHour($nextHour)
    {
        $currentHour = (int) date("G");
        $currentMinutes = (int) date("i");
        $currentSeconds = (int) date("s");

        if ($nextHour <= $currentHour) {
            $nextHour += 24;
        }

        $hoursUntilNext = $nextHour - $currentHour;
        $secondsUntilNext =
            $hoursUntilNext * 60 * 60 - $currentMinutes * 60 - $currentSeconds;

        return $secondsUntilNext;
    }
}
