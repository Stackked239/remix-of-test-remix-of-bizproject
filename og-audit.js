import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * OG IMAGE AUDIT SCRIPT
 * 
 * Scans all page files and verifies og:image meta tags are properly configured.
 * Generates a comprehensive report of OG image coverage.
 * 
 * USAGE:
 *   node og-audit.js
 * 
 * OUTPUT:
 *   - Console report with coverage stats
 *   - og-audit-report.json with detailed findings
 */

const pagesDir = path.join(__dirname, 'src', 'pages');
const ogImagesDir = path.join(__dirname, 'public', 'og-images');

// Get all og images that exist
function getExistingOgImages() {
  if (!fs.existsSync(ogImagesDir)) {
    return [];
  }
  return fs.readdirSync(ogImagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
}

// Extract ogImage from a file
function extractOgImage(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check for SEO component with ogImage prop
  const seoMatch = content.match(/ogImage\s*=\s*["']([^"']+)["']/);
  if (seoMatch) {
    return { type: 'SEO', value: seoMatch[1] };
  }
  
  // Check for Helmet og:image meta tag
  const helmetMatch = content.match(/<meta\s+property\s*=\s*["']og:image["']\s+content\s*=\s*["']([^"']+)["']/);
  if (helmetMatch) {
    return { type: 'Helmet', value: helmetMatch[1] };
  }
  
  // Check for alternate Helmet format
  const helmetAltMatch = content.match(/property:\s*["']og:image["'],\s*content:\s*["']([^"']+)["']/);
  if (helmetAltMatch) {
    return { type: 'Helmet', value: helmetAltMatch[1] };
  }
  
  return null;
}

// Extract page title/route from file
function extractPageInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Try to get canonical URL
  const canonicalMatch = content.match(/canonical\s*=\s*["']([^"']+)["']/);
  if (canonicalMatch) {
    return canonicalMatch[1].replace('https://bizhealth.ai', '');
  }
  
  // Try to get title
  const titleMatch = content.match(/title\s*=\s*["']([^"']+)["']/);
  if (titleMatch) {
    return titleMatch[1];
  }
  
  return path.basename(filePath, '.tsx');
}

// Recursively find all TSX files
function findTsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findTsxFiles(fullPath, files);
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Check if og image file exists
function ogImageExists(ogImagePath) {
  if (!ogImagePath) return false;
  
  // Handle absolute URLs
  if (ogImagePath.startsWith('https://bizhealth.ai/')) {
    const relativePath = ogImagePath.replace('https://bizhealth.ai/', '');
    return fs.existsSync(path.join(__dirname, 'public', relativePath));
  }
  
  // Handle relative paths
  if (ogImagePath.startsWith('/')) {
    return fs.existsSync(path.join(__dirname, 'public', ogImagePath.slice(1)));
  }
  
  return false;
}

// Main audit function
function runAudit() {
  console.log('\n🔍 OG IMAGE AUDIT REPORT\n');
  console.log('='.repeat(60) + '\n');
  
  const existingImages = getExistingOgImages();
  console.log(`📁 OG Images in public/og-images/: ${existingImages.length}\n`);
  
  const allFiles = findTsxFiles(pagesDir);
  
  const results = {
    total: 0,
    withOgImage: 0,
    withoutOgImage: 0,
    withBrokenOgImage: 0,
    usingSEO: 0,
    usingHelmet: 0,
    pages: []
  };
  
  // Categorized results
  const categories = {
    blog: { with: [], without: [], broken: [] },
    tools: { with: [], without: [], broken: [] },
    main: { with: [], without: [], broken: [] },
    other: { with: [], without: [], broken: [] }
  };
  
  for (const file of allFiles) {
    const relativePath = path.relative(pagesDir, file);
    const pageInfo = extractPageInfo(file);
    const ogImage = extractOgImage(file);
    
    results.total++;
    
    // Categorize
    let category = 'other';
    if (relativePath.startsWith('blog/')) category = 'blog';
    else if (relativePath.startsWith('tools/')) category = 'tools';
    else if (!relativePath.includes('/')) category = 'main';
    
    const pageData = {
      file: relativePath,
      route: pageInfo,
      ogImage: ogImage?.value || null,
      ogImageType: ogImage?.type || null,
      ogImageExists: ogImage ? ogImageExists(ogImage.value) : false
    };
    
    results.pages.push(pageData);
    
    if (ogImage) {
      if (ogImageExists(ogImage.value)) {
        results.withOgImage++;
        categories[category].with.push(relativePath);
      } else {
        results.withBrokenOgImage++;
        categories[category].broken.push({ file: relativePath, path: ogImage.value });
      }
      
      if (ogImage.type === 'SEO') results.usingSEO++;
      else results.usingHelmet++;
    } else {
      results.withoutOgImage++;
      categories[category].without.push(relativePath);
    }
  }
  
  // Print summary
  console.log('📊 COVERAGE SUMMARY\n');
  console.log(`   Total Pages:        ${results.total}`);
  console.log(`   With OG Image:      ${results.withOgImage} (${Math.round(results.withOgImage/results.total*100)}%)`);
  console.log(`   Without OG Image:   ${results.withoutOgImage} (${Math.round(results.withoutOgImage/results.total*100)}%)`);
  console.log(`   Broken OG Images:   ${results.withBrokenOgImage}`);
  console.log(`   Using SEO comp:     ${results.usingSEO}`);
  console.log(`   Using Helmet:       ${results.usingHelmet}\n`);
  
  // Print by category
  console.log('📂 BY CATEGORY\n');
  
  for (const [cat, data] of Object.entries(categories)) {
    const total = data.with.length + data.without.length + data.broken.length;
    if (total === 0) continue;
    
    const coverage = Math.round(data.with.length / total * 100);
    console.log(`   ${cat.toUpperCase()} (${total} pages):`);
    console.log(`     ✅ With OG: ${data.with.length} | ❌ Without: ${data.without.length} | ⚠️ Broken: ${data.broken.length}`);
    console.log(`     Coverage: ${coverage}%\n`);
  }
  
  // Print pages without OG images
  if (results.withoutOgImage > 0) {
    console.log('❌ PAGES WITHOUT OG IMAGES:\n');
    for (const [cat, data] of Object.entries(categories)) {
      if (data.without.length > 0) {
        console.log(`   ${cat.toUpperCase()}:`);
        data.without.forEach(f => console.log(`     - ${f}`));
        console.log('');
      }
    }
  }
  
  // Print broken OG images
  if (results.withBrokenOgImage > 0) {
    console.log('⚠️ BROKEN OG IMAGE PATHS:\n');
    for (const [cat, data] of Object.entries(categories)) {
      if (data.broken.length > 0) {
        console.log(`   ${cat.toUpperCase()}:`);
        data.broken.forEach(b => console.log(`     - ${b.file}: ${b.path}`));
        console.log('');
      }
    }
  }
  
  // Check for unused OG images
  const usedImages = results.pages
    .filter(p => p.ogImage)
    .map(p => {
      const img = p.ogImage;
      if (img.includes('/og-images/')) {
        return img.split('/og-images/')[1];
      }
      return null;
    })
    .filter(Boolean);
  
  const unusedImages = existingImages.filter(img => !usedImages.includes(img));
  if (unusedImages.length > 0) {
    console.log('🗑️ UNUSED OG IMAGES:\n');
    unusedImages.forEach(img => console.log(`   - ${img}`));
    console.log('');
  }
  
  // Save detailed report
  const reportPath = path.join(__dirname, 'og-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);
  
  // Final status
  const coverage = Math.round(results.withOgImage / results.total * 100);
  if (coverage === 100 && results.withBrokenOgImage === 0) {
    console.log('✅ PERFECT! All pages have valid OG images.\n');
  } else if (coverage >= 90) {
    console.log('🟡 GOOD - Most pages have OG images. Review missing pages above.\n');
  } else {
    console.log('🔴 NEEDS WORK - Many pages missing OG images.\n');
  }
}

runAudit();
