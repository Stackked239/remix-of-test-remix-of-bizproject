import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

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
    mode === 'production' &&
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/how-it-works',
        '/pricing',
        '/resources',
        '/about',
        '/contact',
        '/blog',
        '/blog/business-health-assessment-2025',
        '/login',
        '/register',
        '/portal',
        '/checkout',
        '/onboarding',
        '/bizguides',
        '/biztools',
        '/bizleader',
        '/bizgrowth',
        '/blog/warning-signs-business',
        '/blog/operational-resilience',
        '/blog/financial-health-metrics',
        '/blog/ai-business-analytics',
        '/blog/strategic-planning-post-pandemic',
        '/blog/business-intelligence-roi',
        '/blog/when-to-pivot',
        '/blog/leadership-stress-success',
        '/blog/operations',
        '/blog/business-strategy',
        '/blog/financial-management',
        '/blog/technology',
        '/blog/risk-management',
        '/blog/business-intelligence',
        '/blog/business-leadership',
        '/blog/retail-remote-tools',
        '/blog/daily-grind-fixes',
        '/blog/real-time-analytics-smb-agility',
        '/blog/solving-smb-workforce-gaps-2025',
        '/blog/talent-wars-smb-hiring-2025',
        '/blog/2025-smb-financial-trends',
        '/blog/e-commerce-scaling-5-strategies-for-smbs-thriving-in-2025',
        '/blog/smb-cash-flow-hacks-2025',
        '/privacy',
        '/terms',
        '/disclaimer',
        '/faqs',
        '/search',
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
