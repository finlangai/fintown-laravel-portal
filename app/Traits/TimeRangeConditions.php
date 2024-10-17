<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait TimeRangeConditions
{
    /**
     * This function add time range condition for feature that require filter with unix timestamp
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $fieldName the time field to add condition on
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function addTimeRangeConditions(
        Builder $query,
        string $fieldName
    ): Builder {
        if ($this->start != -1) {
            $query->where($fieldName, ">=", $this->start);
        }

        if ($this->end != -1) {
            $query->where($fieldName, "<=", $this->end);
        }
        return $query;
    }
}
