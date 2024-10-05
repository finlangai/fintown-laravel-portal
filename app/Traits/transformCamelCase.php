<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait transformCamelCase
{
    public function transform($data)
    {
        return array_map(function ($item) {
            return array_map(
                function ($key, $value) {
                    return [
                        Str::camel($key) => $value,
                    ];
                },
                array_keys($item),
                array_values($item)
            );
        }, $data);
    }
}
