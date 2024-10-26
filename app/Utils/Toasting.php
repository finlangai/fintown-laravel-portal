<?php

namespace App\Utils;

class Toasting
{
    /**
     * Sending toast message with its type through flash message
     *
     * @param string $message
     * @param [type] $type
     * @return void
     */
    public static function sendToast(string $message, $type = "default")
    {
        session()->flash("toastMessage", [
            "content" => $message,
            "type" => $type,
        ]);
    }

    public static function success(string $message)
    {
        self::sendToast($message, "success");
    }
    public static function info(string $message)
    {
        self::sendToast($message, "info");
    }
    public static function error(string $message)
    {
        self::sendToast($message, "error");
    }
    public static function warning(string $message)
    {
        self::sendToast($message, "warning");
    }
}
