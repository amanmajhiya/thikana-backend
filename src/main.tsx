import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { initOfflineSupport } from './lib/offline'

// Register Service Worker for PWA + Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker registered:', reg.scope);
        // Initialize offline utilities
        initOfflineSupport();
      })
      .catch(() => {
        // SW registration failed - app still works
        console.log('[PWA] Service Worker registration failed');
      });
  });
} else {
  // No SW support - still init offline utilities for local caching
  initOfflineSupport();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
