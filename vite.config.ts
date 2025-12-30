import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true,
      },
    },
    // Split chunks for better caching and reduced initial bundle
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries - loaded immediately
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react-core';
          }
          // Router - needed for navigation
          if (id.includes('react-router')) {
            return 'router';
          }
          // UI components library - split out for caching
          if (id.includes('@radix-ui')) {
            return 'ui-radix';
          }
          // Query library
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          // Charting libraries - only loaded when needed
          if (id.includes('recharts') || id.includes('chart.js') || id.includes('react-chartjs')) {
            return 'charts';
          }
          // PDF/document generation - only loaded when needed
          if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('docx')) {
            return 'documents';
          }
          // Drag and drop - only loaded for specific tools
          if (id.includes('@dnd-kit')) {
            return 'dnd';
          }
          // Supabase
          if (id.includes('@supabase')) {
            return 'supabase';
          }
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging but smaller
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
  },
}));
