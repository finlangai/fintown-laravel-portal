<?php

namespace App\Traits;

use App\Models\Mongo\FinancialStatement\Statement;

trait GetRawStatements
{
    /**
     * Get raw financial statement data
     *
     * @param string $symbol
     * @param array $validated
     * @param array $projection
     * @param array $skipIfNull
     * @return Collection
     */
    private function getRawStatement(
        string $symbol,
        array $validated,
        $projection = [],
        $skipIfNull = []
    ) {
        if (0 == $validated["quarter"]) {
            // YEARLY
            $rawStatements = Statement::getYearlyRecordsBySymbolBefore(
                $symbol,
                $validated["year"],
                $validated["limit"],
                $projection,
                $skipIfNull
            );
        } else {
            // QUARTERLY
            $rawStatements = Statement::getQuarterlyRecordsBySymbolBefore(
                $symbol,
                $validated["year"],
                $validated["quarter"],
                $validated["limit"],
                $projection,
                $skipIfNull
            );
        }
        return $rawStatements;
    }
}
