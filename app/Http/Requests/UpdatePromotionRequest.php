<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePromotionRequest extends FormRequest
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
            "use_limit" => "nullable|integer|min:1",
            "discount" => "required|numeric|max:1|min:0",
            "commission_rate" => "required|numeric|max:1|min:0",
            "start_date" => "nullable|date",
            "expired_date" => "nullable|date",
        ];
    }
}
