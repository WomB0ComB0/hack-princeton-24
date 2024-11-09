// import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    https: true,
    port: 5173,
  },
  plugins: [
    react(),
    // TanStackRouterVite(),
    mkcert({
      source: 'coding',
    }),
    tsPaths(),
  ],
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
});
