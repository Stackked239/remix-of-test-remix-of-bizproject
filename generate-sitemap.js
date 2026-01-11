import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * AUTOMATED SITEMAP GENERATOR WITH OG IMAGE SUPPORT
 * 
 * This script automatically generates sitemap.xml from all discovered routes,
 * including image:image tags for OG images (helps with SEO & image indexing).
 * 
 * HOW IT WORKS:
 * 1. Reads routes from routes.json (extracted from App.tsx)
 * 2. Auto-categorizes routes (homepage, blog, tools, pages, legal)
 * 3. Determines file modification dates for accurate lastmod
 * 4. Assigns priorities and changefreq based on route patterns
 * 5. Detects OG images from page source files
 * 6. Generates valid XML sitemap with image extensions
 * 
 * TO ADD NEW CONTENT TYPES:
 * - Just add routes to App.tsx - they'll be auto-detected
 * - Blog posts: /blog/* automatically get priority 0.7
 * - Tools: /biztools/* automatically get priority 0.8-0.9
 * - Main pages: manually configured below for SEO optimization
 * 
 * RUNS AUTOMATICALLY:
 * - During build: ./build-ssg.sh or build-ssg.bat
 * - Manual: node generate-sitemap.js
 */

// OG Image mapping for routes (extracted from page files)
const ogImageMap = {
  '/': '/og-images/og-homepage.jpg',
  '/about': '/og-images/og-about.jpg',
  '/pricing': '/og-images/og-pricing.jpg',
  '/contact': '/og-images/og-contact.jpg',
  '/blog': '/og-images/og-blog.jpg',
  '/biztools': '/og-images/og-biztools.jpg',
  '/biztools/how-it-works': '/og-images/og-biztools-how-it-works.jpg',
  '/biztools/toolbox': '/og-images/og-biztools-toolbox.jpg',
  '/biztools/toolbox/process-mapping-tools/guide': '/og-images/og-process-mapping-guide.jpg',
  '/biztools/toolbox/free-roi-calculator': '/og-images/og-roi-calculator.jpg',
  '/bizguides': '/og-images/og-bizguides.jpg',
  '/bizguides/bizguide-sherpa': '/og-images/og-bizguide-sherpa.jpg',
  '/bizleader': '/og-images/og-bizleader.jpg',
  '/bizleader/leadership-development-bot': '/og-images/og-bizleader-bot.jpg',
  '/bizgrowth': '/og-images/og-bizgrowth.jpg',
  '/sherpas': '/og-images/og-sherpas.jpg',
  '/how-it-works': '/og-images/og-how-it-works.jpg',
  '/faqs': '/og-images/og-faqs.jpg',
  '/resources': '/og-images/og-resources.jpg',
  '/security': '/og-images/og-security.jpg',
  '/glossary-of-terms': '/og-images/og-glossary.jpg',
  '/reports': '/og-images/og-reports.jpg',
  '/concerns': '/og-images/og-concerns.jpg',
  '/logo': '/og-images/og-logo.jpg',
  '/for-ai-assistants': '/og-images/og-ai-assistants.jpg',
  '/playbooks/landscaping': '/og-images/og-landscaping-playbook.jpg',
  // Blog posts - Complete OG image mappings (48 blog posts total)
  '/blog/feast-or-famine-cycle-small-business': '/og-images/og-feast-famine-cycle.jpg',
  '/blog/growth-trap-or-growth-engine': '/og-images/og-growth-trap.jpg',
  '/blog/growth-trap-broken-business-model': '/og-images/og-growth-trap.jpg',
  '/blog/fractional-cfo-toolkit': '/og-images/og-fractional-cfo-toolkit.jpg',
  '/blog/ai-business-analytics': '/og-images/og-ai-business-analytics.jpg',
  '/blog/business-health-assessment-2025': '/og-images/og-business-health-assessment.jpg',
  '/blog/business-health-scores-by-stage': '/og-images/og-business-health-scores-stages.jpg',
  '/blog/business-intelligence-roi': '/og-images/og-business-intelligence-roi.jpg',
  '/blog/customer-loyalty-starts-with-reliability': '/og-images/og-customer-loyalty-reliability.jpg',
  '/blog/employee-retention-company-culture-leadership': '/og-images/og-employee-retention-leadership.jpg',
  '/blog/financial-health-metrics': '/og-images/og-financial-health-metrics.jpg',
  '/blog/happy-new-year-2026-year-of-growth': '/og-images/og-happy-new-year-2026.jpg',
  '/blog/how-to-prioritize-operator-survival-guide': '/og-images/og-prioritize-survival.jpg',
  '/blog/operational-resilience': '/og-images/og-operational-resilience.jpg',
  '/blog/small-business-financials-know-your-numbers': '/og-images/og-know-your-numbers.jpg',
  '/blog/strategic-planning-post-pandemic': '/og-images/og-strategic-planning.jpg',
  '/blog/stress-test-pricing-framework-margins-cash-flow': '/og-images/og-stress-test-pricing.jpg',
  '/blog/warning-signs-business': '/og-images/og-warning-signs-business.jpg',
  '/blog/when-to-pivot': '/og-images/og-when-to-pivot.jpg',
  // New batch of 30 blog post OG images
  '/blog/business-blind-spots-2025': '/og-images/og-business-blind-spots-2025.jpg',
  '/blog/business-blind-spots-operational-issues': '/og-images/og-business-blind-spots-2025.jpg',
  '/blog/business-intelligence': '/og-images/og-business-intelligence.jpg',
  '/blog/business-leadership': '/og-images/og-business-leadership.jpg',
  '/blog/business-strategy': '/og-images/og-business-strategy.jpg',
  '/blog/crm-reality-check': '/og-images/og-crm-reality.jpg',
  '/blog/cash-flow-crisis-management': '/og-images/og-cash-flow-crisis.jpg',
  '/blog/chaos-to-clarity': '/og-images/og-chaos-to-clarity.jpg',
  '/blog/complete-guide-business-health-assessment-2026': '/og-images/og-complete-guide-2026.jpg',
  '/blog/confirm-business-weaknesses-without-consultants': '/og-images/og-confirm-weaknesses.jpg',
  '/blog/daily-grind-fixes': '/og-images/og-daily-grind-fixes.jpg',
  '/blog/e-commerce-scaling-smb-2025': '/og-images/og-ecommerce-scaling.jpg',
  '/blog/estimating-crisis-service-business': '/og-images/og-estimating-crisis.jpg',
  '/blog/financial-management': '/og-images/og-financial-management.jpg',
  '/blog/financial-stewardship-everyones-responsibility': '/og-images/og-financial-stewardship.jpg',
  '/blog/grow-your-business-with-ai': '/og-images/og-grow-with-ai.jpg',
  '/blog/hr-program-asset-multiplier': '/og-images/og-hr-asset-multiplier.jpg',
  '/blog/hidden-costs-manual-processes': '/og-images/og-hidden-costs-manual.jpg',
  '/blog/how-to-check-your-business-health': '/og-images/og-check-business-health.jpg',
  '/blog/identifying-smb-leadership-blind-spots': '/og-images/og-leadership-blind-spots.jpg',
  '/blog/leadership-stress-success': '/og-images/og-leadership-stress-success.jpg',
  '/blog/operations': '/og-images/og-operations.jpg',
  '/blog/overcoming-bi-challenges-smb': '/og-images/og-overcoming-bi-challenges.jpg',
  '/blog/overcoming-marketing-challenges': '/og-images/og-marketing-challenges.jpg',
  '/blog/q4-cost-cuts-2025': '/og-images/og-q4-cost-cuts.jpg',
  '/blog/real-time-analytics-smb': '/og-images/og-realtime-analytics.jpg',
  '/blog/retail-remote-tools': '/og-images/og-retail-remote-tools.jpg',
  '/blog/smb-cash-flow-hacks-2025': '/og-images/og-cash-flow-hacks.jpg',
  '/blog/smb-financial-trends-2025': '/og-images/og-smb-financial-trends.jpg',
  '/blog/smb-scaling-paradox-2025': '/og-images/og-scaling-paradox.jpg',
  '/blog/scaling-operations-without-losing-control': '/og-images/og-scaling-operations.jpg',
  '/blog/scheduling-crisis-operational-costs': '/og-images/og-operations.jpg',
  '/blog/small-business-ai-adoption': '/og-images/og-ai-adoption.jpg',
  '/blog/small-business-struggles': '/og-images/og-small-business-struggles.jpg',
  '/blog/small-business-survival-checklist': '/og-images/og-survival-checklist.jpg',
  '/blog/solving-smb-workforce-gaps': '/og-images/og-workforce-gaps.jpg',
  '/blog/success-begins-with-2026-strategy': '/og-images/og-success-2026-strategy.jpg',
  '/blog/talent-wars-hiring': '/og-images/og-talent-wars.jpg',
  '/blog/technology': '/og-images/og-technology.jpg',
  '/blog/technology-innovation-gap': '/og-images/og-technology-innovation-gap.jpg',
  '/blog/technology-strategic-ally-roi': '/og-images/og-technology-strategic-ally-roi.jpg',
  '/blog/vision-sharing-business-owner': '/og-images/og-vision-sharing-business-owner.jpg',
  '/blog/impact-over-information': '/og-images/og-impact-over-information.jpg',
  '/blog/risk-management': '/og-images/og-risk-management.jpg',
};

/**
 * Get the last modification date of a file
 * Falls back to current date if file doesn't exist
 */
function getFileLastModified(routePath) {
  // Map route to potential source file
  const possiblePaths = [
    path.join(__dirname, 'src', 'pages', `${routePath.slice(1) || 'Index'}.tsx`),
    path.join(__dirname, 'src', 'pages', routePath.slice(1), 'index.tsx'),
    path.join(__dirname, 'src', 'pages', 'blog', `${routePath.split('/').pop()}.tsx`),
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return stats.mtime.toISOString().split('T')[0];
    }
  }
  
  // Fallback to current date
  return new Date().toISOString().split('T')[0];
}

/**
 * Extract OG image from a page source file
 */
function extractOgImageFromFile(routePath) {
  // Check static mapping first
  if (ogImageMap[routePath]) {
    return ogImageMap[routePath];
  }
  
  // Try to read from source file
  const possiblePaths = [
    path.join(__dirname, 'src', 'pages', `${routePath.slice(1) || 'Index'}.tsx`),
    path.join(__dirname, 'src', 'pages', 'blog', `${routePath.split('/').pop()}.tsx`),
    path.join(__dirname, 'src', 'pages', 'tools', `${routePath.split('/').pop()}.tsx`),
  ];
  
  // Convert route to Pascal case for file matching
  const routeName = routePath.split('/').pop() || '';
  const pascalCase = routeName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  possiblePaths.push(path.join(__dirname, 'src', 'pages', 'blog', `${pascalCase}.tsx`));
  possiblePaths.push(path.join(__dirname, 'src', 'pages', 'tools', `${pascalCase}.tsx`));
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Look for ogImage prop
        const seoMatch = content.match(/ogImage\s*=\s*["']([^"']+)["']/);
        if (seoMatch) {
          let imgPath = seoMatch[1];
          // Normalize path
          if (imgPath.startsWith('https://bizhealth.ai')) {
            imgPath = imgPath.replace('https://bizhealth.ai', '');
          }
          return imgPath;
        }
      } catch {
        // Ignore read errors
      }
    }
  }
  
  return null;
}

/**
 * Auto-categorize route and assign priority/changefreq
 */
function getRouteConfig(route) {
  // Homepage - highest priority
  if (route === '/') {
    return { priority: 1.0, changefreq: 'weekly' };
  }
  
  // Blog posts - high priority, updated monthly
  if (route.startsWith('/blog/') && route !== '/blog') {
    return { priority: 0.7, changefreq: 'monthly' };
  }
  
  // Blog listing - very high priority, updated weekly
  if (route === '/blog') {
    return { priority: 0.9, changefreq: 'weekly' };
  }
  
  // BizTools pages - high priority
  if (route.startsWith('/biztools/toolbox')) {
    return { priority: 0.9, changefreq: 'monthly' };
  }
  if (route.startsWith('/biztools')) {
    return { priority: 0.8, changefreq: 'weekly' };
  }
  
  // BizGuides, BizLeader, BizGrowth - high priority
  if (route.match(/^\/(bizguides|bizleader|bizgrowth|sherpas)/)) {
    return { priority: 0.8, changefreq: 'weekly' };
  }
  
  // Key pages - high priority
  if (route.match(/^\/(pricing|reports|about|how-it-works)$/)) {
    return { priority: 0.9, changefreq: 'monthly' };
  }
  
  // Resources and glossary - high priority
  if (route.match(/^\/(resources|glossary-of-terms|faqs)$/)) {
    return { priority: 0.8, changefreq: 'monthly' };
  }
  
  // Contact - medium-high priority
  if (route === '/contact') {
    return { priority: 0.7, changefreq: 'monthly' };
  }
  
  // Auth pages - medium priority
  if (route.match(/^\/(login|register|portal|checkout|onboarding)$/)) {
    return { priority: 0.5, changefreq: 'monthly' };
  }
  
  // Legal pages - low priority
  if (route.match(/^\/(privacy|terms|disclaimer)$/)) {
    return { priority: 0.3, changefreq: 'yearly' };
  }
  
  // Search - medium-low priority
  if (route === '/search') {
    return { priority: 0.5, changefreq: 'monthly' };
  }
  
  // Default for any other routes
  return { priority: 0.6, changefreq: 'monthly' };
}

/**
 * Generate sitemap.xml from routes.json
 */
function generateSitemap() {
  console.log('🗺️  Generating automated sitemap.xml with OG images...\n');
  
  // Load routes
  const routesPath = path.join(__dirname, 'routes.json');
  if (!fs.existsSync(routesPath)) {
    console.error('❌ routes.json not found. Run extract-routes.js first!');
    process.exit(1);
  }
  
  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
  const baseUrl = 'https://bizhealth.ai';
  
  // Build XML sitemap with image namespace
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  let urlCount = 0;
  let imageCount = 0;
  const categorizedRoutes = {
    homepage: [],
    mainPages: [],
    blog: [],
    tools: [],
    auth: [],
    legal: []
  };
  
  for (const route of routes) {
    // Skip wildcard routes and dynamic parameters
    if (route.includes('*') || route.includes(':')) {
      console.log(`⏭️  Skipping dynamic route: ${route}`);
      continue;
    }
    
    // Get automated config
    const config = getRouteConfig(route);
    const lastMod = getFileLastModified(route);
    const ogImage = extractOgImageFromFile(route);
    
    // Categorize for reporting
    if (route === '/') categorizedRoutes.homepage.push(route);
    else if (route.startsWith('/blog')) categorizedRoutes.blog.push(route);
    else if (route.startsWith('/biztools')) categorizedRoutes.tools.push(route);
    else if (route.match(/^\/(login|register|portal)/)) categorizedRoutes.auth.push(route);
    else if (route.match(/^\/(privacy|terms|disclaimer)/)) categorizedRoutes.legal.push(route);
    else categorizedRoutes.mainPages.push(route);
    
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>${config.changefreq}</changefreq>\n`;
    xml += `    <priority>${config.priority}</priority>\n`;
    
    // Add image tag if OG image exists
    if (ogImage) {
      const imageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${imageUrl}</image:loc>\n`;
      xml += '    </image:image>\n';
      imageCount++;
    }
    
    xml += '  </url>\n';
    
    urlCount++;
  }
  
  xml += '</urlset>';
  
  // Validate XML - ensure no BOM or leading whitespace
  if (xml.charCodeAt(0) === 0xFEFF) {
    xml = xml.substring(1);
  }
  xml = xml.trim();
  
  // Write to public folder
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully!\n`);
  console.log(`📊 STATISTICS:`);
  console.log(`   Total URLs: ${urlCount}`);
  console.log(`   With OG Images: ${imageCount}`);
  console.log(`   Homepage: ${categorizedRoutes.homepage.length}`);
  console.log(`   Main Pages: ${categorizedRoutes.mainPages.length}`);
  console.log(`   Blog Posts: ${categorizedRoutes.blog.length}`);
  console.log(`   Tools: ${categorizedRoutes.tools.length}`);
  console.log(`   Auth Pages: ${categorizedRoutes.auth.length}`);
  console.log(`   Legal Pages: ${categorizedRoutes.legal.length}\n`);
  console.log(`📁 Saved to: ${sitemapPath}\n`);
  
  // Also copy to dist if it exists
  const distSitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.writeFileSync(distSitemapPath, xml, 'utf-8');
    console.log(`✅ Also copied to: ${distSitemapPath}\n`);
  }
  
  console.log(`🎯 TIP: New pages added to App.tsx are automatically included!`);
  console.log(`   Just run: ./build-ssg.sh (or build-ssg.bat on Windows)\n`);
}

generateSitemap();
