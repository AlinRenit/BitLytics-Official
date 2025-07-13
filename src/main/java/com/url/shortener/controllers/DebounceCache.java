package com.url.shortener.controllers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DebounceCache {
    private static final Map<String, Long> cache = new ConcurrentHashMap<>();

    /**
     * Returns true if the key was seen within the debounce window (ms), false otherwise.
     * Updates the timestamp if not duplicate.
     */
    public static boolean isDuplicate(String key, long debounceMs) {
        long now = System.currentTimeMillis();
        Long last = cache.get(key);
        if (last != null && (now - last) < debounceMs) {
            return true;
        }
        cache.put(key, now);
        return false;
    }
}
