import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Verify SSG build by checking that all routes have been pre-rendered
 */
function verifySSG() {
  console.log('🔍 Verifying Static Site Generation...\n');
  
  // Load routes
  const routesPath = path.join(__dirname, 'routes.json');
  if (!fs.existsSync(routesPath)) {
    console.error('❌ routes.json not found');
    process.exit(1);
  }
  
  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
  
  let successCount = 0;
  let failCount = 0;
  const issues = [];
  
  console.log(`Checking ${routes.length} routes...\n`);
  
  for (const route of routes) {
    let filePath;
    
    if (route === '/') {
      filePath = path.join(__dirname, 'dist', 'index.html');
    } else {
      const routePath = route.replace(/^\//, '').replace(/\/$/, '');
      filePath = path.join(__dirname, 'dist', routePath, 'index.html');
    }
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileSize = (fs.statSync(filePath).size / 1024).toFixed(2);
      
      // Check for common issues
      const hasH1 = /<h1[^>]*>/.test(content);
      const hasContent = content.length > 5000; // Reasonable threshold
      const notJustSkeleton = !content.includes('<div id="root"></div>');
      
      if (hasH1 && hasContent && notJustSkeleton) {
        console.log(`✅ ${route} → ${filePath.replace(__dirname + '/', '')} (${fileSize} KB)`);
        successCount++;
      } else {
        const warnings = [];
        if (!hasH1) warnings.push('missing H1');
        if (!hasContent) warnings.push('suspiciously small');
        if (!notJustSkeleton) warnings.push('appears to be skeleton only');
        
        console.log(`⚠️  ${route} → ${filePath.replace(__dirname + '/', '')} (${fileSize} KB) - ${warnings.join(', ')}`);
        issues.push({ route, warnings });
        successCount++;
      }
    } else {
      console.log(`❌ ${route} → File not found: ${filePath.replace(__dirname + '/', '')}`);
      failCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Verification Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successfully pre-rendered: ${successCount} routes`);
  console.log(`❌ Missing files: ${failCount} routes`);
  console.log(`⚠️  Warnings: ${issues.length} routes`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  Routes with warnings:');
    issues.forEach(({ route, warnings }) => {
      console.log(`  ${route}: ${warnings.join(', ')}`);
    });
  }
  
  console.log('='.repeat(60) + '\n');
  
  if (failCount > 0) {
    console.error('❌ SSG verification failed - some routes are missing');
    process.exit(1);
  } else if (issues.length > 0) {
    console.warn('⚠️  SSG verification passed with warnings');
  } else {
    console.log('✅ All routes successfully pre-rendered!');
  }
}

verifySSG();
