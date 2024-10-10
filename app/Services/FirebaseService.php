<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;

class FirebaseService
{
    protected $storage;
    protected $bucketName;
    protected $bucket;

    public function __construct()
    {
        $this->storage = App::make("firebase.storage");
        $this->bucketName = env("FIREBASE_STORAGE_BUCKET");
        $this->bucket = $this->storage->getBucket($this->bucketName);
    }

    public function upload(UploadedFile $file, string $path = ""): string
    {
        $fileName = $this->generateFileName($file);
        $filePath = $path ? "{$path}/{$fileName}" : $fileName;

        $this->bucket->upload(fopen($file->getRealPath(), "r"), [
            "name" => $filePath,
        ]);

        // Generate a public URL
        return $this->getPublicUrl($filePath);
    }

    public function delete(string $path): bool
    {
        $object = $this->bucket->object($path);

        if ($object->exists()) {
            $object->delete();
            return true;
        }

        return false;
    }

    protected function generateFileName(UploadedFile $file): string
    {
        return sprintf(
            "%s_%s.%s",
            time(),
            str_replace(" ", "_", $file->getClientOriginalName()),
            $file->getClientOriginalExtension()
        );
    }

    protected function getPublicUrl(string $path): string
    {
        // URL encode the path to handle special characters
        $encodedPath = urlencode($path);

        return "https://firebasestorage.googleapis.com/v0/b/{$this->bucketName}/o/{$encodedPath}?alt=media";
    }
}
