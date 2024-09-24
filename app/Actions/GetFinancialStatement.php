<?php

namespace App\Actions;

use App\Enums\StatementType;
use App\Models\Mongo\Company;
use App\Models\Mongo\FinancialStatement\Format;
use App\Models\Mongo\FinancialStatement\Statement;
use Lorisleiva\Actions\Concerns\AsAction;

class GetFinancialStatement
{
    use AsAction;

    public function handle(array $validated, Company $company): false | array
    {
        if (0 == $validated[ 'quarter' ]) {
            // YEARLY
            $rawStatements = Statement::getYearlyRecordsBySymbolBefore(
                $company[ 'symbol' ],
                $validated[ 'year' ],
                $validated[ 'limit' ]
            );
        } else {
            // QUARTERLY
            $rawStatements = Statement::getQuarterlyRecordsBySymbolBefore(
                $company[ 'symbol' ],
                $validated[ 'year' ],
                $validated[ 'quarter' ],
                $validated[ 'limit' ]
            );
        }

        // Handle zero length collection
        if ($rawStatements->count() == 0) {
            return false;
        }

        // get the statement format through the icb code of the company
        $format = Format::getByICB($company[ 'icb_code' ]);

        $statementType = $validated[ 'type' ];
        // Handle Direct and Indirect Cashflow type
        if (3 == $statementType) {
            $statementType = $rawStatements[ 0 ][ 'is_cashflow_direct' ] ? 3 : 4;
        }

        // define the name of statement to retrieve the structure
        $statement_name   = StatementType::tryFrom($statementType)->name;
        $mappedStatements = $format[ 'structures' ][ $statement_name ];

        foreach ($mappedStatements as $field) {
            $field[ 'values' ] = [  ];
        }

        // Handle the name for cashflow to accessing raw statement
        if (3 == $statementType || 4 == $statementType) {
            $statement_name = 'cashflow_statement';
        }

        // loop through each statement
        foreach ($rawStatements as $statement) {
            $year    = $statement[ "year" ];
            $quarter = $statement[ "quarter" ];
            foreach ($statement[ $statement_name ] as $index => $value) {
                // Turn to Billion unit
                $fieldValue = is_null($value) ? null : round((int) $value / 1000000000, 2);
                $timestamp  = [
                    'period'  => (0 == $quarter ? "" : "Q$quarter ") . $year,
                    'year'    => $year,
                    'quarter' => $quarter,
                    'value'   => $fieldValue,
                 ];
                $mappedStatements[ $index ][ 'values' ][  ] = $timestamp;
            }
        }

        return $mappedStatements;
    }
}
