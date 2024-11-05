<?php

namespace App\Traits;

trait CheckKeyAndSet
{
    public function checkKeyAndSet(array $validated, string $key)
    {
        if (array_key_exists($key, $validated)) {
            $this->{$key} = $validated[$key];
        }
    }
}
