import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    cssMinify: true,   // 确保 CSS 正常压缩
  }
})
