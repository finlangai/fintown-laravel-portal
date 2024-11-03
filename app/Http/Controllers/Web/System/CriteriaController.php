<?php

namespace App\Http\Controllers\Web\System;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\System\UpdateCriteriaInfoRequest;
use App\Models\Mongo\Formular;
use App\Models\Mongo\System\Criteria;
use App\Utils\Toasting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CriteriaController extends Controller
{
    /**
     * Display the list of Criterias
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
     * Update the Info of the Criteria
     *
     * @param UpdateCriteriaInfoRequest $request
     * @param integer $criteriaId
     * @return void
     */
    public function update(UpdateCriteriaInfoRequest $request, int $criteriaId)
    {
        $validated = $request->validated();

        $criteria = Criteria::where("id", $criteriaId)->first();
        $criteria->update($validated);

        Toasting::success("Cập nhật thông tin tiêu chí thành công");
    }

    /**
     * Update the Criteria's cluster order
     *
     * @param Request $request
     * @param integer $criteriaId
     * @return void
     */
    public function updateClustersOrder(Request $request, int $criteriaId)
    {
        $clustersData = $request->input("group");
        $criteria = Criteria::where("id", $criteriaId)->first();
        $criteria->update(["group" => $clustersData]);

        Toasting::success("Cập nhật thứ tự nhóm chỉ số thành công");
    }

    /**
     * Update the info of the Cluster including its indicators
     *
     * @param Request $request
     * @param integer $criteriaId
     * @return void
     */
    public function updateClusterInfo(Request $request, int $criteriaId)
    {
        $validated = $request->validate([
            "clusterIndex" => "required|integer",
            "name" => "required|string",
            "metrics" => "required|array",
        ]);
        $clusterIndex = $validated["clusterIndex"];
        unset($validated["clusterIndex"]);

        $match = ["_id" => $criteriaId];
        $update = ['$set' => ["group.$clusterIndex" => $validated]];
        DB::connection("mongodb")
            ->getCollection(Criteria::COLLECTION_NAME)
            ->updateOne($match, $update);

        Toasting::success("Cập nhật thông tin nhóm chỉ số thành công");
    }

    /**
     * Store new Cluster
     *
     * @param Request $request
     * @param integer $criteriaId
     * @return void
     */
    public function storeCluster(Request $request, int $criteriaId)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "metrics" => "required|array",
        ]);

        $criteria = Criteria::where("id", $criteriaId)->first();
        $criteria->push("group", [$validated]);

        Toasting::success("Thêm nhóm chỉ số thành công.");
    }

    /**
     * Delete Cluster
     *
     * @param integer $criteriaId
     * @param integer $clusterIndex
     * @return void
     */
    public function destroyCluster(int $criteriaId, int $clusterIndex)
    {
        try {
            $collection = DB::connection("mongodb")->getCollection(
                Criteria::COLLECTION_NAME
            );

            $collection->updateOne(
                ["_id" => $criteriaId],
                ['$unset' => ["group.$clusterIndex" => 1]]
            );

            $collection->updateOne(
                ["_id" => $criteriaId],
                ['$pull' => ["group" => null]]
            );

            Toasting::success("Xóa nhóm chỉ số thành công.");
        } catch (\Throwable $th) {
            Toasting::error("Có lỗi xảy ra trong quá trình thực hiện.");
        }
    }
}
