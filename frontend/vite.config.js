import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

// Asegúrate de que la ruta a tus archivos de certificado es correcta
const certPath = path.resolve(__dirname, '../localhost.crt');
const keyPath = path.resolve(__dirname, '../localhost.key');

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3001',
        secure: false, // Only user this for testing purposes
      }
    }
  }
})
