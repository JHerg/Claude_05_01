// Service Worker: macht die App nach dem ersten Besuch komplett offline nutzbar.
// Bei Updates die CACHE-Version hochzählen.

const CACHE = "familienstudio-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./assets/icon.svg",
  "./js/main.js",
  "./js/ui.js",
  "./js/storage.js",
  "./js/adventure.js",
  "./js/adventures.js",
  "./js/hub.js",
  "./js/data.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(
      (cached) =>
        cached ||
        fetch(event.request).then((res) => {
          // Neue gleich-originale Dateien für das nächste Mal merken
          if (res.ok && new URL(event.request.url).origin === location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return res;
        }),
    ),
  );
});
