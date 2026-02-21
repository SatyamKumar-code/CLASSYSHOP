import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  
  server: {
    host: true,  // or '0.0.0.0' to expose on network
  },
})