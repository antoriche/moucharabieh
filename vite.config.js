import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/moucharabieh/',
  server: {
    port: 3000,
    open: true
  }
})
