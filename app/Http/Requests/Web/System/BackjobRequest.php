<?php

namespace App\Http\Requests\Web\System;

use Illuminate\Foundation\Http\FormRequest;

class BackjobRequest extends FormRequest
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
            "name" => "required|string|max:128",
            "description" => "nullable|string|max:256",
            "job_class" => "required|string|max:256",
            "is_active" => "required|boolean",
            "parameters" => "nullable|string",
            "interval" => "required|in:minutely,hourly,daily,weekly,monthly",
            "cron_expression" => "nullable| string",
            "time" => [
                "required",
                "regex:/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/",
            ],
        ];
    }
}
