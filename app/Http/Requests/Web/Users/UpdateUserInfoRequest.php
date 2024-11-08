<?php

namespace App\Http\Requests\Web\Users;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserInfoRequest extends FormRequest
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
            "fullname" => "required|string|max:128",
            "email" => "required|string|max:256",
            "phone" => "required|string|min:10|max:11",
            "address" => "nullable|string|max:256",
        ];
    }
}
