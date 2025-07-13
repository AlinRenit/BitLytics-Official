package com.url.shortener.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.models.UrlMapping;
import com.url.shortener.service.UrlMappingService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class RedirectController {

    private UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(
            @PathVariable String shortUrl,
            @RequestHeader(value = "User-Agent", required = false) String userAgent,
            @RequestHeader(value = "Referer", required = false) String referer,
            @RequestHeader(value = "X-Forwarded-For", required = false) String xForwardedFor,
            @RequestHeader(value = "X-Real-IP", required = false) String xRealIp
    ) {
        // Ignore favicon.ico or other non-shortUrl requests
        if ("favicon.ico".equals(shortUrl)) {
            return ResponseEntity.notFound().build();
        }

        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);
        if (urlMapping == null) {
            return ResponseEntity.notFound().build();
        }

        // Only count real user requests (must have a User-Agent)
        if (userAgent == null || userAgent.trim().isEmpty()) {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location", urlMapping.getOriginalUrl());
            return ResponseEntity.status(302).headers(httpHeaders).build();
        }

        // Debounce: Only count a click from the same IP+shortUrl once every 2 seconds
        String clientIp = (xForwardedFor != null && !xForwardedFor.isEmpty()) ? xForwardedFor.split(",")[0].trim() : (xRealIp != null ? xRealIp : "unknown");
        String debounceKey = shortUrl + ":" + clientIp;
        // Use a simple in-memory cache for demonstration (should use Redis or similar in production)
        if (DebounceCache.isDuplicate(debounceKey, 2000)) {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location", urlMapping.getOriginalUrl());
            return ResponseEntity.status(302).headers(httpHeaders).build();
        }

        // Passed all checks: increment and record click
        urlMappingService.incrementClickCount(urlMapping);
        urlMappingService.recordClickEvent(urlMapping);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Location", urlMapping.getOriginalUrl());
        return ResponseEntity.status(302).headers(httpHeaders).build();
    }
}
