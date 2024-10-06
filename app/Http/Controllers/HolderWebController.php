<?php

namespace App\Http\Controllers;

use App\Models\Mongo\Holders\Holder;
use App\Models\SQL\System\Log;
use Illuminate\Http\Request;

class HolderWebController extends Controller
{
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'symbol' => 'required|string|max:10',
            'name' => 'required|string|max:100',
            'position' => 'nullable|string|max:100',
            'shares' => 'required|integer|min:0',
            'ownership' => 'nullable|numeric|min:0',
            'is_organization' => 'nullable|boolean',
            'is_foreigner' => 'nullable|boolean',
            'is_founder' => 'nullable|boolean',
        ]);
        $holder = Holder::findOrFail($id);
        $holder->update($validatedData);
        return redirect()->route('companies.edit', [
            'symbol' => $holder->symbol,
            'id' => $holder->id          
        ])->with('message', 'Cập nhật thành công!');
        
    }
    public function destroy($id)
    {
        $holder = Holder::findOrFail($id);
        $holder->delete();

         return redirect()->route('companies.edit', [
            'symbol' => $holder->symbol,
            'id' => $holder->id          
        ])->with('message', 'Cập nhật thành công!');
    }
}
