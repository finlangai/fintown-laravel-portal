<?php

namespace App\Http\Controllers\Web\User;

use App\Http\Controllers\Controller;
use App\Models\SQL\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::with("roles");

        $search = request()->input("search");
        if ($search) {
            $query->where(
                fn(Builder $query) => $query
                    ->whereRaw("LOWER(fullname) LIKE ?", [
                        "%" . strtolower($search) . "%",
                    ])
                    ->orWhereRaw("LOWER(email) LIKE ?", [
                        "%" . strtolower($search) . "%",
                    ])
                    ->orWhereRaw("LOWER(phone) LIKE ?", ["%" . $search . "%"])
            );
        }
        $paginating = $query->paginate(8);

        return Inertia::render("User/User", compact("paginating"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
