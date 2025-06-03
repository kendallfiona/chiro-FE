import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({ 
  server: {
    proxy: {
      '/api': {
        target: 'https://api.open-meteo.com/v1',
        changeOrigin: true,
        secure: false,
      },
    },
  } ,
  plugins: [react()],
})
