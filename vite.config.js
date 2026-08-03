import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Assets below this size are inlined as base64. Kept low so photos stay as
  // separate cacheable files that can be swapped without touching the bundle.
  build: {
    assetsInlineLimit: 2048,
    cssCodeSplit: false,
  },
})
