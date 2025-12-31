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
          // Vendor chunk - group major dependencies together to avoid circular issues
          if (id.includes('node_modules')) {
            // Core React must stay together with react-dom
            if (id.includes('node_modules/react-dom') || 
                id.includes('node_modules/react/') ||
                id.includes('node_modules/scheduler')) {
              return 'vendor-react';
            }
            // Router
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // UI components library
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // Large optional libraries - lazy loaded
            if (id.includes('recharts') || id.includes('chart.js') || id.includes('react-chartjs')) {
              return 'vendor-charts';
            }
            if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('docx')) {
              return 'vendor-documents';
            }
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
