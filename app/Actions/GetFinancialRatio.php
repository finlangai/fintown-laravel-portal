<?php

namespace App\Actions;

use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Formular;
use App\Models\Mongo\MetricRecord;
use Lorisleiva\Actions\Concerns\AsAction;

class GetFinancialRatio
{
    use AsAction;

    public function handle(array $validated, Company $company): false | array
    {
        if (0 == $validated[ 'quarter' ]) {
            // YEARLY
            $rawMetrics = MetricRecord::getYearlyRecordsBySymbolBefore(
                $company[ 'symbol' ],
                $validated[ 'year' ],
                $validated[ 'limit' ]
            );
        } else {
            // QUARTERLY
            $rawMetrics = MetricRecord::getQuarterlyRecordsBySymbolBefore(
                $company[ 'symbol' ],
                $validated[ 'year' ],
                $validated[ 'quarter' ],
                $validated[ 'limit' ]
            );
        }

        // Handle zero length collection
        if ($rawMetrics->count() == 0) {
            return false;
        }

        $formulars = [  ];
        foreach ($rawMetrics[ 0 ][ 'metrics' ] as $identifer => $v) {
            // shove identifiders into array for querying
            $formulars[  ] = $identifer;
        }

        // query and sort formulars
        $formulars = Formular::query()
            ->whereIn('identifier', $formulars)
            ->orderBy('metadata.order', 'asc')
            ->get();

        $mappedMetrics = [  ];

        foreach ($formulars as $info) {
            $row                   = [  ];
            $row[ 'name' ]         = $info[ 'display_name' ];
            $row[ 'unit' ]         = $info[ 'metadata' ][ 'unit' ];
            $row[ 'isPercentage' ] = $info[ 'metadata' ][ 'is_percentage' ];
            // $row[ 'description' ]  = $info[ 'description' ];
            $row[ 'values' ] = [  ];

            $identifer               = $info[ 'identifier' ];
            $isShouldDivineByBillion = $info[ 'metadata' ][ 'is_should_divine_by_billion' ];
            foreach ($rawMetrics as $record) {
                $year       = $record[ 'year' ];
                $quarter    = $record[ 'quarter' ];
                $fieldValue = $record[ 'metrics' ][ $identifer ];

                // check if null and set a flag
                $isNullValue = is_null($fieldValue);

                // pre-processing the value if not null
                if (!$isNullValue) {
                    // check is if should divine by billion
                    if ($isShouldDivineByBillion) {
                        $fieldValue /= 1000000000;
                    }

                    $fieldValue = round($fieldValue, 2);
                }

                // compile the string for period field
                $period = (0 == $quarter ? "" : "Q$quarter/") . $year;

                $row[ 'values' ][  ] = [
                    'period'  => $period,
                    'year'    => $year,
                    'quarter' => $quarter,
                    'value'   => $fieldValue,
                 ];
            }
            $mappedMetrics[  ] = $row;
        }

        return $mappedMetrics;
    }
}
