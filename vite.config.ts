import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const djangoOrigin = (
    env.VITE_DJANGO_ORIGIN || 'https://api.etihadamu.com'
  ).replace(/\/+$/, '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      /** Open from phone / another PC: `http://<this-machine-LAN-ip>:5174` */
      host: true,
      proxy: {
        '/api': { target: djangoOrigin, changeOrigin: true, secure: true },
        '/media': { target: djangoOrigin, changeOrigin: true, secure: true },
      },
    },
  }
})
