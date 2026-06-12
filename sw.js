const CACHE_NAME = 'echo-baduga-v5';
const ASSETS = [
  'index.html',
  'player.html',
  'app.js',
  'songs_array.js',
  'manifest.json',
  'assets/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Let the browser handle external database and streaming requests dynamically
  if (
    e.request.url.includes('supabase.co') || 
    e.request.url.includes('catbox.moe') || 
    e.request.url.includes('api.php')
  ) {
    return;
  }
  
  // Network-First with Cache fallback
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
