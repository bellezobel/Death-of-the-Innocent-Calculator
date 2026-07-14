const CACHE_NAME = "doic-cache-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
	"./images/background.webp",
	"./images/header.png",
	"./images/icon-small.png",
	"./images/icon-big.png"
];

// Installieren
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );

    // Neuer Service Worker wird sofort aktiv
    self.skipWaiting();
});

// Aktivieren
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );

    // Alle geöffneten Tabs sofort übernehmen
    event.waitUntil(self.clients.claim());
});

// Dateien laden
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {

            // Immer versuchen, die aktuelle Datei vom Server zu holen
            const networkFetch = fetch(event.request)
                .then(networkResponse => {

                    if (networkResponse && networkResponse.status === 200) {

                        const responseClone = networkResponse.clone();

                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }

                    return networkResponse;
                })
                .catch(() => cachedResponse);

            // Sofort Cache anzeigen, im Hintergrund aktualisieren
            return cachedResponse || networkFetch;
        })
    );
});