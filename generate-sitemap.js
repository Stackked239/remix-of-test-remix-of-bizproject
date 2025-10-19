import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate sitemap.xml from routes.json
 */
function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...\n');
  
  // Load routes
  const routesPath = path.join(__dirname, 'routes.json');
  if (!fs.existsSync(routesPath)) {
    console.error('❌ routes.json not found. Run extract-routes.js first!');
    process.exit(1);
  }
  
  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
  const baseUrl = 'https://bizhealth.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Define route priorities and change frequencies
  const routeConfig = {
    '/': { priority: 1.0, changefreq: 'weekly' },
    '/about': { priority: 0.9, changefreq: 'monthly' },
    '/pricing': { priority: 0.9, changefreq: 'monthly' },
    '/how-it-works': { priority: 0.8, changefreq: 'monthly' },
    '/contact': { priority: 0.7, changefreq: 'monthly' },
    '/resources': { priority: 0.8, changefreq: 'weekly' },
    '/blog': { priority: 0.9, changefreq: 'weekly' },
    '/bizguides': { priority: 0.8, changefreq: 'weekly' },
    '/biztools': { priority: 0.8, changefreq: 'weekly' },
    '/bizleader': { priority: 0.8, changefreq: 'weekly' },
    '/bizgrowth': { priority: 0.8, changefreq: 'weekly' },
    '/faqs': { priority: 0.7, changefreq: 'monthly' },
    '/search': { priority: 0.5, changefreq: 'monthly' },
    '/privacy': { priority: 0.3, changefreq: 'yearly' },
    '/terms': { priority: 0.3, changefreq: 'yearly' },
    '/disclaimer': { priority: 0.3, changefreq: 'yearly' },
    '/login': { priority: 0.4, changefreq: 'monthly' },
    '/register': { priority: 0.4, changefreq: 'monthly' },
    '/portal': { priority: 0.6, changefreq: 'monthly' },
    '/checkout': { priority: 0.6, changefreq: 'monthly' },
    '/onboarding': { priority: 0.5, changefreq: 'monthly' },
  };
  
  // Blog posts get default priority
  const blogPostDefaults = { priority: 0.7, changefreq: 'monthly' };
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const route of routes) {
    // Skip wildcard routes
    if (route.includes('*')) continue;
    
    const config = routeConfig[route] || 
                   (route.startsWith('/blog/') ? blogPostDefaults : { priority: 0.5, changefreq: 'monthly' });
    
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${config.changefreq}</changefreq>\n`;
    xml += `    <priority>${config.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  
  xml += '</urlset>';
  
  // Write to public folder
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  
  console.log(`✅ Sitemap generated with ${routes.length} URLs`);
  console.log(`📁 Saved to: ${sitemapPath}\n`);
  
  // Also copy to dist if it exists
  const distSitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.writeFileSync(distSitemapPath, xml, 'utf-8');
    console.log(`✅ Also copied to: ${distSitemapPath}\n`);
  }
}

generateSitemap();
