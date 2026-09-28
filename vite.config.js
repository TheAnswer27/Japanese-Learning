import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 引入 Tailwind 插件

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 加入這裡
  ],
  server: {
    port: 5173,
    host: true
  }
})