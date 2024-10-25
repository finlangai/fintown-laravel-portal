<?php

namespace App\Http\Controllers\Web\System;

use App\Http\Controllers\Controller;
use App\Models\SQL\System\Backjob;
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
    public function update(Request $request, Backjob $backjob)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Backjob $backjob)
    {
        //
    }
}
