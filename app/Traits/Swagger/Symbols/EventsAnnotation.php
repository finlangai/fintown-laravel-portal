<?php

namespace App\Traits\Swagger\Symbols;

trait EventsAnnotation
{
    /**
     * @OA\Get(
     *      path="/api/symbols/{symbol}/events",
     *      operationId="GetCompanyEvents",
     *      tags={"Symbols"},
     *      summary="Financial Events",
     *      description="Retrieve events of a company",
     *      @OA\Parameter(
     *          description="Symbol of the instrument",
     *          in="path",
     *          name="symbol",
     *          @OA\Schema(type="string"),
     *          @OA\Examples(example="Vietcombank", value="VCB", summary="Vietcomebank"),
     *          @OA\Examples(example="MB Bank", value="MBB", summary="MB Bank"),
     *          @OA\Examples(example="Vietnamilk", value="VNM", summary="Vietnamilk"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of events to get. 20 by default",
     *          in="query",
     *          name="limit",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Limit", value="20", summary="20 events"),
     *      ),
     *      @OA\Parameter(
     *          description="The amount of records to skip if specified, if offset is 3, skipping 3 events before actually taking events. Zero by default",
     *          in="query",
     *          name="offset",
     *          @OA\Schema(type="int"),
     *          @OA\Examples(example="Offset", value="3", summary="Skip 3 events"),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success",
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="No events found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="Insufficent parameters",
     *       ),
     *      @OA\Response(
     *          response=500,
     *          description="Internal Server Error",
     *       ),
     *     )
     */
    public function EventsAnnotation()
    {
    }
}
