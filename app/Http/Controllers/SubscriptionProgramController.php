<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionProgramController extends Controller
{
    public function index()
    {
        return Inertia::render('Subscription/SubscriptionProgram');
    }
}
