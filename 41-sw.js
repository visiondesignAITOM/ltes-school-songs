const CACHE_NAME = 'ltes-buttons-candidate-v64-player';
const APP_SHELL = [
  './', './index.html', './styles.css', './app.js', './songs.js',
  './player-light.css', './buttons.css',
  './assets/branding/ltes-school-logo-transparent.png',
  './music/ltes-soul/timing/auto-candidate.js',
  './music/ltes-light/timing/auto-candidate.js',
  './manifest.webmanifest', './icon.svg',
  './fonts/bpmf/BpmfGenSenRounded-R.ttf', './fonts/bpmf/readings.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  // The old prefix is retained only to remove caches created before the rename.
  const isPlayerCache = (key) => key.startsWith('ltes-buttons-candidate-') || key.startsWith('ltes-player-') || key.startsWith('landian-player-');
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => isPlayerCache(key) && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
