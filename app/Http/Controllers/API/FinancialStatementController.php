<?php

namespace App\Http\Controllers\API;

use App\Enums\StatementType;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\FinancialStatementRequest;
use App\Models\Mongo\Company;
use App\Models\Mongo\FinancialStatement\Format;
use App\Models\Mongo\FinancialStatement\Statement;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class FinancialStatementController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/financial-statements?type=1&year=2024&quarter=4&limit=1",
     *      operationId="TestId",
     *      tags={"Symbols"},
     *      summary="Financial Statement",
     *      description="Retrieve a specific type of financial statements for a company",
     *      @OA\Parameter(
     *          description="Company Symbol",
     *          in="path",
     *          name="company",
     *          required=true,
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcomebank", value="VCB", summary="Vietcomebank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *      ),
     *      @OA\Parameter(
     *          description="Statement type",
     *          in="query",
     *          name="type",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Balance Sheet", value="1", summary="Balance Sheet"),
     *          @OA\Examples(example="Income Statement", value="2", summary="Income Statement"),
     *          @OA\Examples(example="Cashflow Statement", value="3", summary="Cashflow Statement"),
     *      ),
     *      @OA\Parameter(
     *          description="Year",
     *          in="query",
     *          name="year",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Year", value="2024", summary="A year"),
     *      ),
     *      @OA\Parameter(
     *          description="Quarter value to query retrieve from a specific quarter or retrieve yearly statements",
     *          in="query",
     *          name="quarter",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="First Quarter", value="1", summary="First Quarter"),
     *          @OA\Examples(example="Second Quarter", value="2", summary="Second Quarter"),
     *          @OA\Examples(example="Third Quarter", value="3", summary="Third Quarter"),
     *          @OA\Examples(example="Fourth Quarter", value="4", summary="Fourth Quarter"),
     *          @OA\Examples(example="Yearly", value="0", summary="Yearly"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of statement to get. Max is 8",
     *          in="query",
     *          name="limit",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Limit", value="8", summary="Limit value"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="success",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request, maybe missing required parameters",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No statements found",
     *       ),
     *     )
     */
    public function show(Company $company, FinancialStatementRequest $request)
    {
        $validated = $request->validated();

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
            return ApiResponse::notFound('No statements found');
        }

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

        // dd($result);
        return ApiResponse::success($mappedStatements);
    }

}
