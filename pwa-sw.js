const staticAssets = [
    './',
    './app.js',
    './fallbacks.json',
    './assets/styles.css',
    './assets/images/no-content-found.png',
];

// On page load, it listens the "install" event and creates mentioned cached storage
self.addEventListener('install', async event => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

/* On every page refresh, it listens the "fetch" event and regsiter/update
the cache storage for offline use.
*/

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cachedFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

const cachedFirst = async function(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || await fetch(req);
}

const networkFirst = async function(req) {
    const cache = await caches.open('news-dynamic-content');
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res;
    } catch (error){
        const cacheResponse = await cache.match(req);
        return cacheResponse || await fetch('./fallback.json');
    }
}