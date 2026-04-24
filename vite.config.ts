import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const apiTarget = env.VITE_GENIE_API_URL || 'http://localhost:8787';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/chat': {
            target: apiTarget,
            changeOrigin: true,
          },
          '/health': {
            target: apiTarget,
            changeOrigin: true,
          },
        },
      },
      plugins: [react(), tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
      },
    };
});
