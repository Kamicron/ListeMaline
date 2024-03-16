/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue'],
      dirs: ['./stores', './composables']
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': './'
    }
  }
})
