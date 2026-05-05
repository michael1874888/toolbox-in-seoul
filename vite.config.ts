import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/toolbox-in-seoul/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '工具箱 in Seoul',
        short_name: 'Seoul工具箱',
        theme_color: '#B3D9E6',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /open\.er-api\.com/,
            handler: 'NetworkFirst',
            options: { cacheName: 'exchange-rate' },
          },
          {
            urlPattern: /api\.open-meteo\.com/,
            handler: 'NetworkFirst',
            options: { cacheName: 'weather' },
          },
        ],
      },
    }),
  ],
})
