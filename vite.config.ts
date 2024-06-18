import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth/token": {
        target: "localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/auth/login": {
        target: "localhost:5000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
