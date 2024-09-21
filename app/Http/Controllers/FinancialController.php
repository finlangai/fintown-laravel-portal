<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FinancialController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Financial/financial-reports');
    }
}
