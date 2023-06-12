import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tic-tac-toe-vue/',
  plugins: [vue()],
})
