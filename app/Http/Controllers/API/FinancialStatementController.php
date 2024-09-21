<?php

namespace App\Http\Controllers\API;

use App\Enums\StatementType;
use App\Http\Controllers\Controller;
use App\Models\Mongo\Company;
use App\Models\Mongo\FinancialStatement\Format;
use App\Models\Mongo\FinancialStatement\Statement;
use App\Utils\ApiResponse;
use Illuminate\Http\Request;

class FinancialStatementController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{company}/financial-statements",
     *      operationId="TestId",
     *      tags={"Symbols"},
     *      summary="Financial Statement",
     *      description="Retrieve a specific type of financial statements for a company",
     *      @OA\Parameter(
     *          description="Statement type",
     *          in="path",
     *          name="type",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Balance Sheet", value="1", summary="Balance Sheet"),
     *          @OA\Examples(example="Income Statement", value="2", summary="Income Statement"),
     *          @OA\Examples(example="Cashflow Statement", value="3", summary="Cashflow Statement"),
     *      ),
     *      @OA\Parameter(
     *          description="Year",
     *          in="path",
     *          name="year",
     *          required=true,
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Year", value="2024", summary="A year"),
     *      ),
     *      @OA\Parameter(
     *          description="Quarter value to query retrieve from a specific quarter or retrieve yearly statements",
     *          in="path",
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
     *          in="path",
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
     *     )
     */
    public function show(Company $company, Request $request)
    {
        try {
            $validated = $request->validate([
                'type'    => 'required|numeric|min:1|max:3',
                'year'    => 'required|numeric',
                'quarter' => 'required|numeric|min:0|max:4',
                'limit'   => 'required|numeric|min:1|max:8',
             ]);
        } catch (\Throwable $th) {
            return ApiResponse::badRequest();
        }

        if (0 == $validated[ 'quarter' ]) {
            // YEARLY
            $raw_statements = Statement::getYearlyRecordsBySymbolBefore(
                $company[ 'symbol' ],
                $validated[ 'year' ],
                $validated[ 'limit' ]
            );
        } else {
            // QUARTERLY
            $raw_statements = Statement::getQuarterlyRecordsBySymbolBefore(
                $company[ 'symbol' ],
                $validated[ 'year' ],
                $validated[ 'quarter' ],
                $validated[ 'limit' ]
            );
        }

        // Handle zero length collection
        if ($raw_statements->count() == 0) {
            return ApiResponse::notFound('No records found');
        }

        $format = Format::getByICB($company[ 'icb_code' ]);
        $result = $format;

        $statement_type = $validated[ 'type' ];
        // Handle Direct and Indirect Cashflow type
        if (3 == $statement_type) {
            $statement_type = $raw_statements[ 0 ][ 'is_cashflow_direct' ] ? 3 : 4;
        }

        // define the name of statement to retrieve the structure
        $statement_name    = StatementType::tryFrom($statement_type)->name;
        $mapped_statements = $format[ 'structures' ][ $statement_name ];

        foreach ($mapped_statements as $field) {
            $field[ 'values' ] = [  ];
        }

        // Handle the name for cashflow to accessing raw statement
        if (3 == $statement_type || 4 == $statement_type) {
            $statement_name = 'cashflow_statement';
        }

        // loop through each statement
        foreach ($raw_statements as $statement) {
            $year    = $statement[ "year" ];
            $quarter = $statement[ "quarter" ];
            foreach ($statement[ $statement_name ] as $index => $value) {
                $timestamp = [
                    'period'  => (0 == $quarter ? "" : "Q$quarter ") . $year,
                    'year'    => $statement[ 'year' ],
                    'quarter' => $quarter,
                    'value'   => $value,
                 ];
                $mapped_statements[ $index ][ 'values' ][  ] = $timestamp;
            }
        }

        // dd($result);
        return ApiResponse::success($mapped_statements);
    }

}
