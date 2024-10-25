<?php

namespace App\Http\Controllers\Web\System;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\System\UpdateBackjobRequest;
use App\Models\SQL\System\Backjob;
use App\Utils\ApiResponse;
use App\Utils\Toasting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackjobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $backjobs = Backjob::all();
        return Inertia::render("System/Backjobs", compact("backjobs"));
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
    public function update(UpdateBackjobRequest $request, Backjob $backjob)
    {
        $validated = $request->validated();
        $backjob->fill($validated);
        $backjob->save();
        Toasting::success("Cập nhật Backjob thành công.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Backjob $backjob)
    {
        //
    }
}
