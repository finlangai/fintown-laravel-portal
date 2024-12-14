<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class CheckPromotionCode
{
    use AsAction;

    public function handle(array $validated)
    {
        // check if promotion code exists
        // no -> throw bad request
    }
}
