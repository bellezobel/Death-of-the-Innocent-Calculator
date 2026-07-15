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

    "./images/icon-192.png",

    "./images/icon-512.png",

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





/* ======================================
        INSTALL
====================================== */


self.addEventListener(
"install",
event => {


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {


            return cache.addAll(FILES_TO_CACHE);


        })

    );


    self.skipWaiting();


});







/* ======================================
        ACTIVATE
====================================== */


self.addEventListener(
"activate",
event => {


    event.waitUntil(

        caches.keys()

        .then(cacheNames => {


            return Promise.all(


                cacheNames.map(cacheName => {


                    if(cacheName !== CACHE_NAME){


                        return caches.delete(cacheName);


                    }


                })


            );


        })

    );



    self.clients.claim();


});








/* ======================================
        FETCH
====================================== */


self.addEventListener(
"fetch",
event => {



    if(event.request.method !== "GET"){

        return;

    }




    event.respondWith(


        caches.match(event.request)

        .then(cachedResponse => {



            const networkFetch =


                fetch(event.request)

                .then(networkResponse => {



                    if(

                        networkResponse

                        &&

                        networkResponse.status === 200

                    ){



                        const responseClone =

                        networkResponse.clone();




                        caches.open(CACHE_NAME)

                        .then(cache => {


                            cache.put(

                                event.request,

                                responseClone

                            );


                        });


                    }




                    return networkResponse;



                })



                .catch(() => {


                    return cachedResponse;


                });






            return cachedResponse || networkFetch;



        })


    );


});