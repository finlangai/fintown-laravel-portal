<?php

namespace App\Traits;

trait ProcessLimitAndOffset
{
    /**
     * This function is for quickly read and get limit and offset params for API endpoints
     *
     * @param array $validated
     * @return void
     */
    public function processLimitAndOffset(array $validated): void
    {
        if (array_key_exists("limit", $validated)) {
            $this->limit = $validated["limit"];
        }

        if (array_key_exists("offset", $validated)) {
            $this->offset = $validated["offset"];
        }
    }
}
