<?php

namespace App\Http\Requests\API\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'fullname' => 'required|max:128|string',
            'email'    => 'required|max:256|email',
            'phone'    => 'required|string|min:10|max:11',
            'address'  => 'nullable|string|max:256',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->max(128)
                    ->numbers()
                    ->mixedCase(),
             ],
         ];
    }
}
