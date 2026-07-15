const CACHE_NAME = "doic-cache-v2";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",


    // JavaScript

    "./js/script.js",

    "./js/database-weapons.js",

    "./js/database-spells.js",

    "./js/database-accessories.js",

    "./js/database-skills.js",

    "./js/database-status.js",

    "./js/database-buffs.js",



    // Images

    "./images/background.webp",

    "./images/header.png",

    "./images/icon-small.png",

    "./images/icon-big.png",

    "./images/placeholder.png",


    // Status Icons

    "./images/hunger1.png",

    "./images/hunger2.png",

    "./images/withdrawal.png",

    "./images/severe-withdrawal.png",

    "./images/confused.png",

    "./images/attack-drop.png",



    // Buff Icons

    "./images/heroin.png",

    "./images/attackbuff.png",

    "./images/bloodlust.png",



    // Coin Flip

    "./images/coinfliphead.gif",

    "./images/coinfliptail.gif"

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
