<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffWebController extends Controller
{
    //
    public function index(){
        return Inertia::render('Staff/Staff');
    }
}

