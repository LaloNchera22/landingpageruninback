import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page build: the landing plus static legal pages, each a real HTML
// file so crawlers get proper metadata without client-side routing.
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js (~600 kB) is only fetched on demand by the Vanta backgrounds.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        cookies: resolve(import.meta.dirname, 'cookies.html'),
        privacidad: resolve(import.meta.dirname, 'privacidad.html'),
        terminos: resolve(import.meta.dirname, 'terminos.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
