<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mongo\FinancialStatement\Statement;
use Inertia\Inertia;

class FinancialController extends Controller
{
    public function index(Request $request)
    {
        $statements = Statement::all();
        return Inertia::render('Financial/Financial', [
            'statements' => $statements,
        ]);
    }
}
