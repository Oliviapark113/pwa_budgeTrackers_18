const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/dist/bundle.js",
    "/dist/manifest.json",
    "/dist/icon_192x192.png",
    "/dist/icon_512x512.png",
    
  
  ];
  
  const CACHE_NAME = "budget-app-cache-v2";
  const DATA_CACHE_NAME = "budget-data-cache-v1";

  // install
self.addEventListener("install", function (evt) {
    // pre cache transaction data
    evt.waitUntil(
      caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
      );
      
    // pre cache all static assets
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );

    // tell the browser to activate this service worker immediately once it
    // has finished installing
    self.skipWaiting();
  });

    //activate

    self.addEventListener("activate", function(evt) {
        evt.waitUntil(
          caches.keys().then(keyList => {
            return Promise.all(
              keyList.map(key => {
                if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                  console.log("Removing old cache data", key);
                  return caches.delete(key);
                }
              })
            );
          })
        );
    
        self.clients.claim();
      });

      // fetch

self.addEventListener("fetch", evt =>{
   
    if (evt.request.url.includes("/api/")){
      evt.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache =>{
          return fetch(evt.request).then(response =>{
            if(response.status === 200){
              cache.put(evt.request.url, response.clone())
            }
            return response
          })
          .catch(err =>{
            return cache.match(evt.request)
          })
        })
      )
      return;
    }
  
   //offline first static assets 
   console.log(evt.request)
   evt.respondWith(
      caches.open(CACHE_NAME).then(cache=>{
        return cache.match(evt.request)
        .then(response =>{
          return response || fetch(evt.request)
        })
      })
   )
  
  
  })