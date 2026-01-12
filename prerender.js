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

// Number of pages to prerender concurrently (adjust based on available memory)
const MAX_CONCURRENT_PAGES = 5;

/**
 * Prerender a single route
 */
async function prerenderRoute(browser, route, PORT, index, total) {
  const progress = `[${index + 1}/${total}]`;
  console.log(`${progress} Prerendering: ${route}`);
  
  const page = await browser.newPage();
  
  try {
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Log console errors from the page (suppress expected 403s from external resources)
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Suppress expected 403 errors from external resources during SSG
        const suppressedPatterns = [
          /Failed to load resource.*403/i,
          /net::ERR_/i,
          /googletagmanager/i,
          /google-analytics/i,
          /fonts\.googleapis/i,
          /fonts\.gstatic/i,
          /supabase/i,
          /favicon\.ico/i
        ];
        const isSuppressed = suppressedPatterns.some(pattern => pattern.test(text));
        if (!isSuppressed) {
          console.warn(`  ⚠️  Console error on ${route}:`, text);
        }
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
    
    // Wait for React Helmet to inject meta tags into the head
    await page.waitForFunction(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      // Return true if at least og:title or og:description exists
      return ogTitle || ogDesc;
    }, { timeout: 5000 }).catch(() => {
      console.warn(`  ⚠️  Helmet meta tags not detected for ${route}, proceeding anyway`);
    });
    
    // Additional wait for dynamic content
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
      return { success: true, route };
    } else {
      console.error(`  ❌ Failed to create file: ${outputPath}`);
      return { success: false, route };
    }
  } catch (error) {
    console.error(`  ❌ Error prerendering ${route}:`, error.message);
    return { success: false, route };
  } finally {
    await page.close();
  }
}

async function prerender() {
  console.log('\n🚀 Starting prerender process...\n');
  console.log(`⚡ Concurrent pages: ${MAX_CONCURRENT_PAGES}\n`);
  
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
  // Express 5 requires named wildcard parameters
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  
  const PORT = 3000;
  const server = app.listen(PORT);
  console.log(`🌐 Preview server started on http://localhost:${PORT}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  let successCount = 0;
  let failCount = 0;
  const failedRoutes = [];
  const startTime = Date.now();

  try {
    // Process routes in batches for concurrent prerendering
    for (let i = 0; i < routes.length; i += MAX_CONCURRENT_PAGES) {
      const batch = routes.slice(i, i + MAX_CONCURRENT_PAGES);
      
      // Prerender batch concurrently
      const results = await Promise.all(
        batch.map((route, batchIndex) => 
          prerenderRoute(browser, route, PORT, i + batchIndex, routes.length)
        )
      );
      
      // Tally results
      for (const result of results) {
        if (result.success) {
          successCount++;
        } else {
          failCount++;
          failedRoutes.push(result.route);
        }
      }
    }
  } catch (error) {
    console.error('\n❌ Fatal error during prerendering:', error);
    throw error;
  } finally {
    await browser.close();
    server.close();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Prerender Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Successfully prerendered: ${successCount} routes`);
    console.log(`❌ Failed to prerender: ${failCount} routes`);
    console.log(`⏱️  Total time: ${duration}s (~${(duration / routes.length).toFixed(1)}s per route)`);
    
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
