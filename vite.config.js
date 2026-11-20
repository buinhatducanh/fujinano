import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { neonApiMiddleware } from './server/neonMiddleware.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), neonApiMiddleware()],
  server: {
    port: 3000,
    open: false,
  },
});
