// THIKANA Offline Manager
// Handles offline detection, request queuing, and local caching
// ================================================================

const SYNC_DB_NAME = 'thikana-sync';
const SYNC_STORE = 'requests';
const SYNC_TAG = 'thikana-sync';

// ---- Online/Offline Detection ----

export function isOnline(): boolean {
  return navigator.onLine;
}

export function isOffline(): boolean {
  return !navigator.onLine;
}

export function addConnectionListener(
  onOnline?: () => void,
  onOffline?: () => void
) {
  if (onOnline) {
    window.addEventListener('online', onOnline);
  }
  if (onOffline) {
    window.addEventListener('offline', onOffline);
  }

  // Return cleanup function
  return () => {
    if (onOnline) window.removeEventListener('online', onOnline);
    if (onOffline) window.removeEventListener('offline', onOffline);
  };
}

// ---- IndexedDB Helper ----

function openSyncDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SYNC_DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(SYNC_STORE)) {
        db.createObjectStore(SYNC_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// ---- Request Queueing (for offline form submissions) ----

export interface QueuedRequest {
  id?: number;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
  timestamp: number;
}

export async function queueRequest(req: Omit<QueuedRequest, 'id' | 'timestamp'>) {
  const db = await openSyncDB();
  const tx = db.transaction(SYNC_STORE, 'readwrite');
  const store = tx.objectStore(SYNC_STORE);

  const entry: QueuedRequest = {
    ...req,
    timestamp: Date.now(),
  };

  return new Promise<number>((resolve, reject) => {
    const request = store.add(entry);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
}

export async function getQueuedRequests(): Promise<QueuedRequest[]> {
  const db = await openSyncDB();
  const tx = db.transaction(SYNC_STORE, 'readonly');
  const store = tx.objectStore(SYNC_STORE);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function removeQueuedRequest(id: number) {
  const db = await openSyncDB();
  const tx = db.transaction(SYNC_STORE, 'readwrite');
  const store = tx.objectStore(SYNC_STORE);

  return new Promise<void>((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ---- Background Sync Trigger ----

export async function triggerBackgroundSync(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    return false;
  }

  const registration = await navigator.serviceWorker.ready;
  try {
    await (registration as any).sync.register(SYNC_TAG);
    console.log('[Offline] Background sync registered');
    return true;
  } catch {
    console.log('[Offline] Background sync not supported');
    return false;
  }
}

// ---- Local Data Cache (for offline viewing) ----

const CACHE_PREFIX = 'thikana_cache_';

export function setCache<T>(key: string, data: T, ttlMinutes = 60): void {
  const entry = {
    data,
    timestamp: Date.now(),
    ttl: ttlMinutes * 60 * 1000,
  };
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Storage full - ignore
  }
}

export function getCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const entry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > entry.ttl) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data as T;
  } catch {
    return null;
  }
}

export function clearCache(key?: string): void {
  if (key) {
    localStorage.removeItem(CACHE_PREFIX + key);
  } else {
    // Clear all thikana cache entries
    Object.keys(localStorage)
      .filter((k) => k.startsWith(CACHE_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  }
}

// ---- Smart Fetch with Offline Support ----

export async function offlineFetch<T>(
  url: string,
  options?: RequestInit & { cacheKey?: string; cacheTTL?: number }
): Promise<T> {
  const cacheKey = options?.cacheKey || url;

  if (isOnline()) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        // Cache the response
        if (options?.cacheKey) {
          setCache(cacheKey, data, options.cacheTTL || 60);
        }
        return data;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      // Network failed, try cache
      const cached = getCache<T>(cacheKey);
      if (cached) return cached;
      throw err;
    }
  } else {
    // Offline: return cached data
    const cached = getCache<T>(cacheKey);
    if (cached) {
      console.log('[Offline] Serving cached data for:', url);
      return cached;
    }
    throw new Error('No internet connection and no cached data available');
  }
}

// ---- App Install Prompt ----

let installPrompt: any = null;

export function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    console.log('[PWA] Install prompt saved');
  });
}

export async function showInstallPrompt(): Promise<boolean> {
  if (!installPrompt) return false;

  installPrompt.prompt();
  const result = await installPrompt.userChoice;
  installPrompt = null;
  return result.outcome === 'accepted';
}

export function isInstallable(): boolean {
  return !!installPrompt;
}

// ---- Init ----

export function initOfflineSupport() {
  initInstallPrompt();
  console.log('[Offline] Support initialized');
}
