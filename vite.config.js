import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const fromRoot = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fromRoot('./src/frontend'),
      '#shared': fromRoot('./src/shared'),
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: true,
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'frontend',
          environment: 'jsdom',
          include: ['src/frontend/**/*.test.{js,jsx}'],
          setupFiles: ['src/frontend/tests/setup.js'],
        },
      },
      {
        extends: true,
        test: {
          name: 'backend',
          environment: 'node',
          include: ['src/backend/**/*.test.js', 'src/shared/**/*.test.js'],
          env: { DATABASE_URL: 'postgresql://test:test@localhost:5432/test', LOG_LEVEL: 'silent' },
        },
      },
    ],
  },
});
