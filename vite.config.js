import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',                    // 保持相对路径
  build: {
    outDir: 'dist',              // 确保输出目录是 dist
    assetsDir: 'assets',         // 明确 assets 文件夹
  }
})
