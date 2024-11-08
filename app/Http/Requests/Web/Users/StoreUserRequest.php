<?php

namespace App\Http\Requests\Web\Users;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            "email" => "required|email|string|max:256",
            "phone" => "required|string|min:10|max:11",
            "address" => "nullable|string|max:256",
            "password" => "required|string",
            "confirmPassword" => "required|string|same:password",
        ];
    }
}
