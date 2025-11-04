import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './', // 添加这一行 - 重要！
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    open: true,
  },
})