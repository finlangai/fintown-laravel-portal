<?php

namespace App\Traits\Swagger\Symbols;

trait SummaryAnnotation
{
    /**
     * @OA\Get(
     *     path="/api/symbols/{symbol}/summary",
     *     operationId="GetCompanySummary",
     *     tags={"Symbols"},
     *     summary="Company Summary",
     *     description="Retrieve the summaries of a company",
     *     @OA\Parameter(
     *         description="Symbol of the instrument",
     *         in="path",
     *         name="symbol",
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcomebank"),
     *         @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *         @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="summary",
     *                 type="object",
     *                 @OA\Property(
     *                     property="overview",
     *                     type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(
     *                     property="historyDev",
     *                     type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(
     *                     property="companyPromise",
     *                     type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(
     *                     property="businessRisk",
     *                     type="array",
     *                     @OA\Items(type="string")
     *                 ),
     *                 @OA\Property(
     *                     property="keyDevelopments",
     *                     type="array",
     *                     @OA\Items(type="string")
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="fundamental",
     *                 type="object",
     *                 @OA\Property(property="sic", type="string"),
     *                 @OA\Property(property="icbCode", type="string"),
     *                 @OA\Property(property="internationName", type="string"),
     *                 @OA\Property(property="headQuarters", type="string"),
     *                 @OA\Property(property="phone", type="string"),
     *                 @OA\Property(property="fax", type="string"),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="taxIdNumber", type="string"),
     *                 @OA\Property(property="employees", type="integer"),
     *                 @OA\Property(property="charterCapital", type="integer")
     *             ),
     *             @OA\Property(
     *                 property="listingInfo",
     *                 type="object",
     *                 @OA\Property(property="exchange", type="string"),
     *                 @OA\Property(property="dateOfListing", type="string"),
     *                 @OA\Property(property="initialListingPrice", type="integer"),
     *                 @OA\Property(property="dateOfIssue", type="string"),
     *                 @OA\Property(property="listingVolume", type="integer")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No statements found"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     ),
     * )
     */
    public function SummaryAnnotation()
    {
    }
}
