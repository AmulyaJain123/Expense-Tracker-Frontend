import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  visualizer({
    // Configuration options for the visualizer
    filename: './dist/stats.html', // Output location for the analysis file
    open: true, // Open the file automatically after the build
    gzipSize: true, // Show gzip size of the files
    brotliSize: true, // Show brotli size of the files
  })
  ],
})
