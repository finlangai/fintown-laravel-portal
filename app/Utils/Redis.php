<?php

namespace App\Utils;

use Illuminate\Support\Facades\Cache;

class Redis
{
    /**
     * Set a value to a key.
     *
     * @param string $key
     * @param mixed $value
     * @param int|null $ttl
     * @return bool
     */
    public static function set(string $key, mixed $value, int $ttl): bool
    {
        if ($ttl) {
            return Cache::store("redis")->put($key, $value, $ttl);
        }

        return Cache::store("redis")->put($key, $value, null);
    }

    /**
     * Get the value of a key.
     *
     * @param string $key
     * @return mixed
     */
    public static function get(string $key): mixed
    {
        return Cache::store("redis")->get($key);
    }

    /**
     * Delete a key.
     *
     * @param string $key
     * @return bool
     */
    public static function del(string $key): bool
    {
        return Cache::store("redis")->forget($key);
    }

    /**
     * Check if a key exists.
     *
     * @param string $key
     * @return bool
     */
    public static function exists(string $key): bool
    {
        return Cache::store("redis")->has($key);
    }

    /**
     * Get the TTL of a key.
     *
     * @param string $key
     * @return int|null
     */
    public static function ttl(string $key): ?int
    {
        // Cache facade does not directly support TTL retrieval, so this method might need a workaround
        // For now, returning null as a placeholder
        return null;
    }

    /**
     * Set the TTL of a key.
     *
     * @param string $key
     * @param int $ttl
     * @return bool
     */
    public static function expire(string $key, int $ttl): bool
    {
        $value = self::get($key);
        if ($value !== null) {
            return self::set($key, $value, $ttl);
        }
        return false;
    }

    /**
     * Get the type of a key.
     *
     * @param string $key
     * @return string|null
     */
    public static function type(string $key): ?string
    {
        // Cache facade does not directly support type retrieval, so this method might need a workaround
        // For now, returning null as a placeholder
        return null;
    }

    // Add more methods as needed
}
