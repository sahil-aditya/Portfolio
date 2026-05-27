const CACHE_NAME = 'sam-portfolio-cache-v1';

// Install the Service Worker instantly
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});

// Take control of the website immediately upon activation
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); 
});

// Intercept all network requests
self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests (images, json, css, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        
        // Fetch fresh data in the background
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          // Save a copy of the fresh image/file into the cache for next time
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(() => {
          // If the internet is disconnected, ignore the error and rely on the cache
        });

        // IMMEDIATELY return the cached version if it exists (instant load).
        // If it doesn't exist yet, wait for the network fetch.
        return cachedResponse || fetchedResponse;
      });
    })
  );
});

