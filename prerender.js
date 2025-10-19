import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs/promises';
import fssync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load routes from the extracted routes.json file
let routes = [];
const routesPath = path.join(__dirname, 'routes.json');

if (fssync.existsSync(routesPath)) {
  routes = JSON.parse(fssync.readFileSync(routesPath, 'utf-8'));
  console.log(`📋 Loaded ${routes.length} routes from routes.json`);
} else {
  console.error('❌ routes.json not found. Run extract-routes.js first!');
  process.exit(1);
}

/**
 * Create the directory structure for a route
 */
async function ensureDirectoryForRoute(route) {
  if (route === '/') {
    return path.join(__dirname, 'dist');
  }
  
  const routePath = route.replace(/^\//, '').replace(/\/$/, '');
  const dir = path.join(__dirname, 'dist', routePath);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

/**
 * Get the output path for a route's HTML file
 */
function getOutputPath(route) {
  if (route === '/') {
    return path.join(__dirname, 'dist', 'index.html');
  }
  
  const routePath = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(__dirname, 'dist', routePath, 'index.html');
}

async function prerender() {
  console.log('\n🚀 Starting prerender process...\n');
  
  // Verify dist folder exists
  const distPath = path.join(__dirname, 'dist');
  if (!fssync.existsSync(distPath)) {
    console.error('❌ dist/ folder not found. Run "npm run build" first!');
    process.exit(1);
  }
  
  // Create a simple Express server for the built files
  const app = express();
  app.use(express.static(distPath));
  
  // Handle SPA routing - serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  
  const PORT = 3000;
  const server = app.listen(PORT);
  console.log(`🌐 Preview server started on http://localhost:${PORT}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let successCount = 0;
  let failCount = 0;
  const failedRoutes = [];

  try {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const progress = `[${i + 1}/${routes.length}]`;
      
      console.log(`${progress} Prerendering: ${route}`);
      
      try {
        const page = await browser.newPage();
        
        // Set viewport for consistent rendering
        await page.setViewport({ width: 1920, height: 1080 });
        
        // Log console errors from the page
        page.on('console', msg => {
          if (msg.type() === 'error') {
            console.warn(`  ⚠️  Console error on ${route}:`, msg.text());
          }
        });
        
        // Navigate to the route
        const url = `http://localhost:${PORT}${route}`;
        await page.goto(url, {
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
        
        // Additional wait for dynamic content
        await page.waitForTimeout(1000);
        
        // Get the rendered HTML
        const html = await page.content();
        
        // Ensure directory exists for this route
        await ensureDirectoryForRoute(route);
        
        // Get the output path and write the HTML file
        const outputPath = getOutputPath(route);
        await fs.writeFile(outputPath, html, 'utf-8');
        
        // Verify the file was created
        const fileExists = fssync.existsSync(outputPath);
        if (fileExists) {
          const stats = fssync.statSync(outputPath);
          console.log(`  ✅ Success: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
          successCount++;
        } else {
          console.error(`  ❌ Failed to create file: ${outputPath}`);
          failCount++;
          failedRoutes.push(route);
        }
        
        await page.close();
      } catch (error) {
        console.error(`  ❌ Error prerendering ${route}:`, error.message);
        failCount++;
        failedRoutes.push(route);
      }
    }
  } catch (error) {
    console.error('\n❌ Fatal error during prerendering:', error);
    throw error;
  } finally {
    await browser.close();
    server.close();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Prerender Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Successfully prerendered: ${successCount} routes`);
    console.log(`❌ Failed to prerender: ${failCount} routes`);
    
    if (failedRoutes.length > 0) {
      console.log('\n⚠️  Failed routes:');
      failedRoutes.forEach(route => console.log(`  - ${route}`));
    }
    
    console.log('\n🎉 Prerender process complete!');
    console.log(`📁 Output directory: ${path.join(__dirname, 'dist')}/`);
    console.log('='.repeat(60) + '\n');
  }
}

// Run the prerender function
prerender().catch(error => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
