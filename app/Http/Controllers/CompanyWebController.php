<?php

namespace App\Http\Controllers;
use App\Models\Mongo\Company\Company;
use App\Models\Mongo\Holders\Holder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CompanyWebController extends Controller
{
    public function index()
    {
        $companies = Company::all(['_id', 'symbol', 'icb_code', 'company_name', 'industry' , 'profile' , 'logo']); 
        return Inertia::render('Company/Company', [
            'companies' => $companies,
        ]);
    }


    public function edit($symbol)
    {
        $holders = Holder::where('symbol', $symbol)->get();
        $company = Company::where('symbol', $symbol)->first(['_id', 'symbol', 'icb_code', 'company_name', 'industry', 'profile' ,'logo']);
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        return Inertia::render('Company/CompanyEdit/CompanyEdit', [
            'company' => $company,
            'holders' =>  $holders,
            'auth' => auth()
        ]);
    }
    public function update(Request $request, $symbol){
        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'symbol' => 'required|string|max:10',
            'icb_code' => 'nullable|string|max:10',
            'industry' => 'nullable|string|max:100',
            'logo' => 'nullable|url|max:2048', 
            'profile.short_name' => 'required|string|max:100',
            'profile.international_name' => 'nullable|string|max:255',
            'profile.head_quarters' => 'nullable|string|max:255',
            'profile.phone' => 'nullable|string|max:50', 
            'profile.fax' => 'nullable|string|max:50',
            'profile.email' => 'nullable|email|max:255',
           'profile.web_address' => 'nullable|string|max:255', 
            'profile.employees' => 'nullable|integer|min:0',
            'profile.business_license_number' => 'nullable|string|max:50',
            'profile.date_of_issue' => 'nullable|date',
            'profile.tax_id_number' => 'nullable|string|max:50',
            'profile.charter_capital' => 'nullable|numeric|min:0',
            'profile.date_of_listing' => 'nullable|date',
            'profile.exchange' => 'nullable|string|max:10',
            'profile.initial_listing_price' => 'nullable|numeric|min:0',
            'profile.listing_volume' => 'nullable|integer|min:0',
            'profile.market_cap' => 'nullable|numeric|min:0',
            'profile.is_using_cf_direct' => 'nullable|boolean',
        ]);
        $company = Company::where('symbol', $symbol)->firstOrFail();
        $company->update($validatedData);

        return redirect()->route('companies.edit', ['symbol' => $company->symbol])
                     ->with('message', 'Cập nhật thành công!');
    }
   
}

