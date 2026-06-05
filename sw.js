const CACHE_NAME = 'aiden-v1';
const STATIC_ASSETS = ['/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('supabase') || e.request.url.includes('anthropic')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
