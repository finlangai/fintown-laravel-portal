<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Company\Assessment;
use App\Models\Mongo\System\Criteria;
use App\Utils\ApiResponse;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Assessment::with("company");

        $search = request()->input("searchSymbol");
        if ($search) {
            $query->whereLike("symbol", strtoupper($search));
        }
        $paginationData = $query->paginate(9);

        return Inertia::render(
            "Assessment/Assessment",
            compact("paginationData")
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $symbol)
    {
        $assessment = Assessment::where("symbol", strtoupper($symbol))
            ->with("company")
            ->first();

        $criterias = Criteria::all();

        return Inertia::render(
            "Assessment/AssessmentDetail",
            compact("assessment", "criterias")
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
