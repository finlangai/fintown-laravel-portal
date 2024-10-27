<?php

namespace App\Http\Controllers\Web\System;

use App\Http\Controllers\Controller;
use App\Models\Mongo\Formular;
use App\Models\Mongo\System\Criteria;
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
