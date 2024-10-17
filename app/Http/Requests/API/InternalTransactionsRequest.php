<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class InternalTransactionsRequest extends FormRequest
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
            "limit" => "nullable|integer|min:1",
            "offset" => "nullable|integer|min:1",
            "start" => "nullable|integer",
            "end" => "nullable|integer",
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $start = $this->input("start");
            $end = $this->input("end");

            if ($start !== null && $end !== null) {
                if ($start >= $end) {
                    $validator
                        ->errors()
                        ->add("start", "The start must be less than the end.");
                    $validator
                        ->errors()
                        ->add("end", "The end must be greater than the start.");
                }
            }
        });
    }
}
