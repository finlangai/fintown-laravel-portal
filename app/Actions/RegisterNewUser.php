<?php

namespace App\Actions;

use App\Models\SQL\User\User;
use Lorisleiva\Actions\Concerns\AsAction;

class RegisterNewUser
{
    use AsAction;

    public function handle(array $data): array
    {
        $isEmailExist = User::where("email", $data["email"])->exists();

        // Check if the email is already associating with another user
        if ($isEmailExist) {
            return [
                "isSuccess" => false,
                "errors" => ["email" => "Email đã tồn tồn tại."],
            ];
        }

        // create new user
        $user = new User($data);
        $user->avatar = env("DEFAULT_AVATAR");
        $isSuccess = $user->save();
        $user->assignRole("basic");
        return ["isSuccess" => $isSuccess, "errors" => []];
    }
}
