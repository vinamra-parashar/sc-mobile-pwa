import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.webp', 'vite.svg'],
      manifest: {
        name: 'SC Mobile',
        short_name: 'SC Mobile',
        description: 'Standard Chartered PWA Application',
        theme_color: '#012a4a',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any maskable'
          },
          {
            src: 'logo.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          },
          {
            src: 'logo.webp',
            sizes: '180x180',
            type: 'image/webp',
            purpose: 'apple touch icon'
          }
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,webp,svg,png}'],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
})
