import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kimloang_2.0/', // GitHub Pages project site: kimloang.github.io/kimloang_2.0
})
