const CACHE_NAME = 'echo-baduga-v1';
const ASSETS = [
  'index.html',
  'app.js',
  'songs_array.js',
  'manifest.json',
  'assets/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Let the browser handle standard streaming and external API requests dynamically
  if (e.request.url.includes('api.php') || e.request.url.includes('/songs/')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
