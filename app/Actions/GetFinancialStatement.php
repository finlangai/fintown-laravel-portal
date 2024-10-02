<?php

namespace App\Actions;

use App\Enums\StatementType;
use App\Models\Mongo\Company\Company;
use App\Models\Mongo\FinancialStatement\Format;
use App\Models\Mongo\FinancialStatement\Statement;
use App\Traits\GetRawStatements;
use Lorisleiva\Actions\Concerns\AsAction;

class GetFinancialStatement
{
    use AsAction, GetRawStatements;

    /**
     * Get the statement name from the StatementType enum
     *
     * @param integer $type
     * @return string
     */
    private function getStatementName(int $type): string
    {
        return StatementType::tryFrom($type)->name;
    }

    public function handle(array $validated, Company $company): false|array
    {
        $statementType = $validated["type"];

        // get the name of the statement inside records for easier reference
        $rawStatementName =
            $statementType == 3
                ? "cashflow_statement"
                : $this->getStatementName($statementType);

        // Get raw statement data of the required statement type
        $rawStatements = $this->getRawStatement(
            symbol: $company["symbol"],
            validated: $validated,
            projection: [
                "_id" => 0,
                "year" => 1,
                "quarter" => 1,
                $rawStatementName => 1,
            ],
            skipIfNull: [$rawStatementName]
        );

        // Handle cashflow type to decide what structure to use
        if (3 == $statementType) {
            $statementType = $company->profile["is_using_cf_direct"] ? 3 : 4;
        }
        // Define the name of statement to retrieve the structure
        $structureName = $this->getStatementName($statementType);

        // Get the statement format through the icb code of the company
        $format = Format::getByICB($company["icb_code"], $structureName);
        // Use the structure as parent array
        $mappedStatements = $format["structures"][$structureName];

        // Handle zero length collection
        if ($rawStatements->count() == 0) {
            return false;
        }

        foreach ($mappedStatements as $field) {
            $field["values"] = [];
        }

        // Map final document
        foreach ($rawStatements as $statement) {
            $year = $statement["year"];
            $quarter = $statement["quarter"];
            $requiredStatement = $statement[$rawStatementName];

            // skip if the statement is null
            if (is_null($requiredStatement)) {
                continue;
            }

            foreach ($statement[$rawStatementName] as $index => $value) {
                // Turn to Billion unit
                $fieldValue = is_null($value)
                    ? null
                    : round((int) $value / 1000000000, 2);
                $timestamp = [
                    "period" => (0 == $quarter ? "" : "Q$quarter/") . $year,
                    "year" => $year,
                    "quarter" => $quarter,
                    "value" => $fieldValue,
                ];
                $mappedStatements[$index]["values"][] = $timestamp;
            }
        }

        return $mappedStatements;
    }
}
