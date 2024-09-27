<?php
namespace App\Utils;

use Symfony\Component\Console\Output\ConsoleOutput;

class Logger
{
    protected static $console;

    public static function init(): void
    {
        self::$console = new ConsoleOutput();
    }

    public static function write($message): void
    {
        self::init();
        self::$console->writeln($message);
    }

    public static function info($message): void
    {
        self::write("[INFO] " . self::timestamp() . " - " . $message);
    }

    public static function warning($message): void
    {
        self::write("[WARNING] " . self::timestamp() . " - " . $message);
    }

    public static function error($message): void
    {
        self::write("[ERROR] " . self::timestamp() . " - " . $message);
    }

    protected static function timestamp()
    {
        return date('Y-m-d H:i:s');
    }

    public static function formatted($message, array $context = [  ]): void
    {
        foreach ($context as $key => $value) {
            $message = str_replace("{{$key}}", $value, $message);
        }
        self::write($message);
    }
}
