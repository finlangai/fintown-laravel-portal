<?php

namespace App\Http\Controllers\Web\System;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\System\UpdateCriteriaInfoRequest;
use App\Models\Mongo\Formular;
use App\Models\Mongo\System\Criteria;
use App\Utils\Toasting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $criterias = Criteria::all();
        $indicators = Formular::project(["name" => 1, "identifier" => 1])
            ->get()
            ->toArray();
        return Inertia::render(
            "System/Criterias",
            compact("criterias", "indicators")
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCriteriaInfoRequest $request, int $criteriaId)
    {
        $validated = $request->validated();

        $criteria = Criteria::where("id", $criteriaId)->first();
        $criteria->update($validated);

        Toasting::success("Cập nhật thông tin tiêu chí thành công");
    }

    public function updateClustersOrder(Request $request, int $criteriaId)
    {
        $clustersData = $request->input("group");
        $criteria = Criteria::where("id", $criteriaId)->first();
        $criteria->update(["group" => $clustersData]);

        Toasting::success("Cập nhật thứ tự nhóm chỉ số thành công");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
