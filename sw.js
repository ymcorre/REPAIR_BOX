const CACHE_NAME = 'repair-box-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  // Exclusion critique : Ne PAS mettre en cache les requêtes de scan vers la Pico
  if (e.request.url.includes('/scan')) {
    return fetch(e.request);
  }
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
