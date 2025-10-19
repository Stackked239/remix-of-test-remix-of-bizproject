import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All routes to prerender
const routes = [
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
  '/search'
];

async function prerender() {
  console.log('Starting prerender process...');
  
  // Create a simple Express server for the built files
  const app = express();
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle SPA routing - serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  
  const server = app.listen(3000);
  console.log('Preview server started on http://localhost:3000');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      
      const page = await browser.newPage();
      
      // Set viewport for consistent rendering
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Navigate to the route
      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for the app-rendered event or timeout after 5 seconds
      await Promise.race([
        page.evaluate(() => {
          return new Promise((resolve) => {
            document.addEventListener('app-rendered', resolve);
          });
        }),
        new Promise((resolve) => setTimeout(resolve, 5000))
      ]);
      
      // Get the rendered HTML
      const html = await page.content();
      
      // Determine the output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join(__dirname, 'dist', 'index.html');
      } else {
        const routePath = route.replace(/^\//, '').replace(/\/$/, '');
        const dir = path.join(__dirname, 'dist', routePath);
        await fs.mkdir(dir, { recursive: true });
        outputPath = path.join(dir, 'index.html');
      }
      
      // Write the HTML file
      await fs.writeFile(outputPath, html, 'utf-8');
      console.log(`✓ Saved ${outputPath}`);
      
      await page.close();
    }
  } catch (error) {
    console.error('Error during prerendering:', error);
    throw error;
  } finally {
    await browser.close();
    server.close();
    console.log('Prerender complete!');
  }
}

// Run the prerender function
prerender().catch(error => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
