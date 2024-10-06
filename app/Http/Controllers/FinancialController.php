<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Mongo\FinancialStatement\Statement;
use Inertia\Inertia;

class FinancialController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;
        $page = $request->input('page', 1);
        $skip = ($page - 1) * $perPage; 
        $statements = Statement::skip($skip)->take($perPage)->get();
        $totalStatements = Statement::count();
        return Inertia::render('Financial/Financial', [
            'statements' => $statements,
            'currentPage' => $page,
            'totalPages' => ceil($totalStatements / $perPage)
        ]);
    }
}
