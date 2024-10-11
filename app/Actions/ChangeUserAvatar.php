<?php

namespace App\Actions;

use App\Utils\ApiResponse;
use App\Models\SQL\User\User;
use App\Services\FirebaseService;
use App\Utils\Util;
use Illuminate\Http\UploadedFile;
use Lorisleiva\Actions\Concerns\AsAction;

class ChangeUserAvatar
{
    use AsAction;
    public function __construct(private FirebaseService $firebaseService)
    {
    }

    /**
     * Upload new avatar  -> save new avatar url to databae -> delete old avatar on storage
     *
     * @param UploadedFile $file
     * @return void
     */
    public function handle(UploadedFile $file): string|false
    {
        // upload new one
        $publicUrl = $this->firebaseService->upload($file, "avatar");

        // save the new avatar public url
        $email = auth("api")->user()->email;
        $user = User::where("email", $email)->first();
        if (!$user) {
            return false;
        }
        // save old avatar url to delete later
        $oldAvatarUrl = $user->avatar;
        $user->avatar = $publicUrl;
        $user->save();

        // delete old one old firebase storage
        $pathOnBucket = Util::getPathFromUrl($oldAvatarUrl);
        if ($pathOnBucket != "avatar/default.jpg") {
            $this->firebaseService->delete($pathOnBucket);
        }

        return $publicUrl;
    }
}
