<?php
namespace App\Utils;

use Ably\AblyRest;
use Carbon\Carbon;

class Notification
{
    public static function send(
        string $id,
        string $title,
        string $content,
        string $thumbnail,
        string $hyperlink,
        $createdAt = null
    ) {
        // $createdAt
        // Initialize Ably with your API key
        $ably = new AblyRest(env("ABLY_KEY"));

        // Specify the channel you want to publish to
        $channel = $ably->channel("public:notification");

        if (!$createdAt) {
            $createdAt = Carbon::now();
        }

        // Publish a message with a specific event name
        $eventName = "new-notification";
        $isReaded = "false";
        $messageData = compact(
            "id",
            "title",
            "content",
            "thumbnail",
            "hyperlink",
            "createdAt",
            "isReaded"
        );

        $channel->publish($eventName, $messageData);
    }
}
