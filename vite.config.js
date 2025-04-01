import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 10000,
    host: '0.0.0.0',
    historyApiFallback: true
  },
  preview: {
    allowedHosts: [
      'liga-de-heroes-client.onrender.com',
    ],
    port: 10000,
    host: '0.0.0.0',
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  }
})
