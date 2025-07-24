import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // libs
      '@lib': path.resolve(__dirname, './src/lib'),

      // components
      '@components': path.resolve(__dirname, './src/components'),

      //features
      '@convert-files': path.resolve(__dirname, './src/features/convert-files'),

      // pages
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
})
