import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // เปิด browser อัตโนมัติ
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 🔗 ชี้ไปที่ backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
