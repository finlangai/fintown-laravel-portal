<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class QuotesRequest extends FormRequest
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
            "start" => "required|integer|lt:end",
            "end" => "required|integer|gt:start",
            "interval" => "required|string|in:1m,1H,1D,1W,1M",
            "type" => "required|integer|in:1,2",
            "limit" => "nullable|integer|min:1",
            "offset" => "nullable|integer|min:1",
        ];
    }
}
