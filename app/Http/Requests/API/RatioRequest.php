<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class RatioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'year'    => 'required|numeric',
            'quarter' => 'required|numeric|min:0|max:4',
            'limit'   => 'required|numeric|min:1|max:10',
         ];
    }
}
