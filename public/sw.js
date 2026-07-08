// THIKANA Service Worker v2 - Full Offline Support
// ================================================
// Caching Strategy:
//   - Static assets: Cache First (JS/CSS/HTML/Icons)
//   - API calls: Network First with Cache Fallback
//   - Images: Stale While Revalidate
//   - Form submissions: Background Sync Queue
// ================================================

const STATIC_CACHE = 'thikana-static-v1';
const API_CACHE = 'thikana-api-v1';
const IMAGE_CACHE = 'thikana-images-v1';
const SYNC_TAG = 'thikana-sync';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo-thikana.png',
  '/manifest.json'
];

// Helper: Check if request is an API call
function isApiCall(url) {
  return url.includes('/api/');
}

// Helper: Check if request is an image
function isImage(request) {
  return request.destination === 'image' ||
    request.url.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i);
}

// Helper: Check if request is a static asset (JS/CSS/HTML)
function isStaticAsset(request) {
  return request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document' ||
    request.destination === 'manifest';
}

// ================================================
// INSTALL - Cache static assets
// ================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Static assets cached');
      self.skipWaiting();
    })
  );
});

// ================================================
// ACTIVATE - Clean old caches
// ================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith('thikana-') &&
              name !== STATIC_CACHE &&
              name !== API_CACHE &&
              name !== IMAGE_CACHE;
          })
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      console.log('[SW] Old caches cleaned');
      return self.clients.claim();
    })
  );
});

// ================================================
// FETCH - Smart caching strategies
// ================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (except for sync)
  if (request.method !== 'GET') {
    return;
  }

  // Strategy 1: API Calls - Network First, Cache Fallback
  if (isApiCall(url.href)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(API_CACHE).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline: return cached response
          return caches.match(request).then((cached) => {
            if (cached) {
              console.log('[SW] Serving cached API:', url.pathname);
              return cached;
            }
            // Return empty JSON for offline API calls
            return new Response(
              JSON.stringify({ offline: true, message: 'You are offline. Showing cached data.' }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Strategy 2: Images - Stale While Revalidate
  if (isImage(request)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cached); // If network fails, use cached

          // Return cached immediately, update in background
          return cached || fetchPromise;
        });
      })
    );
    return;
  }

  // Strategy 3: Static Assets - Cache First
  if (isStaticAsset(request)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          // Refresh cache in background
          fetch(request).then((response) => {
            if (response.ok) {
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, response);
              });
            }
          }).catch(() => {});
          return cached;
        }
        // Not in cache, fetch and cache
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Default: Try network, fallback to cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// ================================================
// BACKGROUND SYNC - Queue form submissions
// ================================================
self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG) {
    console.log('[SW] Background sync triggered');
    event.waitUntil(processSyncQueue());
  }
});

// Process queued requests from IndexedDB
async function processSyncQueue() {
  try {
    const db = await openDB('thikana-sync', 1);
    const requests = await db.getAll('requests');

    for (const req of requests) {
      try {
        const response = await fetch(req.url, {
          method: req.method,
          headers: req.headers,
          body: JSON.stringify(req.body),
        });

        if (response.ok) {
          await db.delete('requests', req.id);
          console.log('[SW] Synced request:', req.url);
        }
      } catch (err) {
        console.log('[SW] Sync failed for:', req.url);
      }
    }
  } catch (err) {
    console.log('[SW] Sync queue empty or error');
  }
}

// Simple IndexedDB helper
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve({
      getAll: (store) => new Promise((res, rej) => {
        const tx = request.result.transaction(store, 'readonly');
        const st = tx.objectStore(store);
        const q = st.getAll();
        q.onsuccess = () => res(q.result || []);
        q.onerror = () => rej(q.error);
      }),
      delete: (store, id) => new Promise((res, rej) => {
        const tx = request.result.transaction(store, 'readwrite');
        const st = tx.objectStore(store);
        const q = st.delete(id);
        q.onsuccess = () => res(undefined);
        q.onerror = () => rej(q.error);
      })
    });
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('requests')) {
        db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// ================================================
// PUSH NOTIFICATIONS (Future support)
// ================================================
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'New notification from THIKANA',
    icon: '/logo-thikana.png',
    badge: '/logo-thikana.png',
    tag: data.tag || 'thikana-notification',
    requireInteraction: false,
    data: data.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'THIKANA',
      options
    )
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('/')
  );
});

console.log('[SW] THIKANA Service Worker loaded');
