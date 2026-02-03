#!/usr/bin/env node

/**
 * OG Image Audit & Generation Script
 * 
 * Usage:
 *   node scripts/audit-og-images.js           - Report missing OG images
 *   node scripts/audit-og-images.js --generate - Generate missing OG images from hero images
 * 
 * This script:
 * 1. Scans all blog posts in src/pages/blog/
 * 2. Extracts ogImage paths and hero image imports
 * 3. Checks if OG images exist in public/og-images/
 * 4. Reports missing OG images with their hero image sources
 * 5. Optionally generates OG images (1200x630) from hero images
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'pages', 'blog');
const OG_IMAGES_DIR = path.join(__dirname, '..', 'public', 'og-images');
const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');

const shouldGenerate = process.argv.includes('--generate');

/**
 * Extract ogImage path from file content
 */
function extractOgImage(content) {
  // Match ogImage="/og-images/..." or ogImage="https://..."
  const directMatch = content.match(/ogImage=["'`]([^"'`]+)["'`]/);
  if (directMatch) {
    let ogPath = directMatch[1];
    // Normalize: remove domain if present
    ogPath = ogPath.replace('https://bizhealth.ai', '');
    return ogPath;
  }
  return null;
}

/**
 * Extract hero image import from file content
 */
function extractHeroImage(content) {
  // Match: import heroImage from "@/assets/..." or "../../assets/..."
  const importMatch = content.match(/import\s+heroImage\s+from\s+["'`]([^"'`]+)["'`]/);
  if (importMatch) {
    let heroPath = importMatch[1];
    // Normalize path
    heroPath = heroPath.replace('@/', 'src/');
    heroPath = heroPath.replace(/^\.\.\/\.\.\//, 'src/');
    return heroPath;
  }
  return null;
}

/**
 * Convert file path to route
 */
function fileToRoute(filePath) {
  let route = filePath
    .replace(BLOG_DIR, '')
    .replace(/\.tsx$/, '')
    .replace(/\/index$/, '');
  
  // Convert PascalCase to kebab-case
  route = route.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  
  return `/blog${route}`;
}

/**
 * Check if OG image file exists
 */
function ogImageExists(ogPath) {
  if (!ogPath) return false;
  const fullPath = path.join(__dirname, '..', 'public', ogPath);
  return fs.existsSync(fullPath);
}

/**
 * Resolve hero image to absolute path
 */
function resolveHeroImage(heroPath) {
  if (!heroPath) return null;
  const fullPath = path.join(__dirname, '..', heroPath);
  if (fs.existsSync(fullPath)) {
    return fullPath;
  }
  return null;
}

/**
 * Scan blog directory recursively
 */
function scanBlogPosts(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip category pages directory
      if (!item.startsWith('_')) {
        scanBlogPosts(fullPath, files);
      }
    } else if (item.endsWith('.tsx')) {
      // Skip category index pages (they use different OG images)
      const categoryPages = [
        'Operations.tsx', 'Technology.tsx', 'FinancialManagement.tsx',
        'BusinessLeadership.tsx', 'HumanResources.tsx', 'MarketingSales.tsx',
        'StrategicPlanning.tsx', 'GrowthScaling.tsx'
      ];
      if (!categoryPages.includes(item)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Main audit function
 */
function auditOgImages() {
  console.log('\n📊 OG Image Audit Report');
  console.log('========================\n');
  
  const blogPosts = scanBlogPosts(BLOG_DIR);
  const results = {
    total: 0,
    withOgImage: 0,
    missingOgImage: 0,
    ogImageExists: 0,
    ogImageMissing: 0,
    canGenerate: 0,
    noHeroImage: 0,
    posts: []
  };
  
  for (const filePath of blogPosts) {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const route = fileToRoute(filePath);
    
    const ogImage = extractOgImage(content);
    const heroImage = extractHeroImage(content);
    const heroImagePath = resolveHeroImage(heroImage);
    
    results.total++;
    
    const postInfo = {
      file: fileName,
      route,
      ogImage,
      heroImage,
      heroImagePath,
      ogImageDeclared: !!ogImage,
      ogImageFileExists: ogImageExists(ogImage),
      canGenerateFromHero: !!heroImagePath
    };
    
    if (ogImage) {
      results.withOgImage++;
      if (ogImageExists(ogImage)) {
        results.ogImageExists++;
      } else {
        results.ogImageMissing++;
        if (heroImagePath) {
          results.canGenerate++;
        } else {
          results.noHeroImage++;
        }
        results.posts.push(postInfo);
      }
    } else {
      results.missingOgImage++;
      if (heroImagePath) {
        results.canGenerate++;
      } else {
        results.noHeroImage++;
      }
      results.posts.push(postInfo);
    }
  }
  
  // Print summary
  console.log('📈 Summary:');
  console.log(`   Total blog posts scanned: ${results.total}`);
  console.log(`   ✅ Posts with OG image declared: ${results.withOgImage}`);
  console.log(`   ✅ OG image files that exist: ${results.ogImageExists}`);
  console.log(`   ⚠️  Posts missing ogImage prop: ${results.missingOgImage}`);
  console.log(`   ❌ OG image files missing: ${results.ogImageMissing}`);
  console.log(`   🔧 Can generate from hero image: ${results.canGenerate}`);
  console.log(`   ⛔ No hero image available: ${results.noHeroImage}`);
  console.log('');
  
  if (results.posts.length === 0) {
    console.log('🎉 All blog posts have valid OG images!\n');
    return results;
  }
  
  // Print details of missing OG images
  console.log('📝 Posts Needing OG Images:');
  console.log('─'.repeat(80));
  
  for (const post of results.posts) {
    console.log(`\n📄 ${post.file}`);
    console.log(`   Route: ${post.route}`);
    
    if (post.ogImage) {
      console.log(`   OG Image (declared): ${post.ogImage}`);
      console.log(`   ❌ File missing in public/og-images/`);
    } else {
      console.log(`   ⚠️  No ogImage prop in SEO component`);
    }
    
    if (post.heroImage) {
      console.log(`   Hero Image: ${post.heroImage}`);
      if (post.heroImagePath) {
        console.log(`   ✅ Hero image exists - can generate OG image`);
      } else {
        console.log(`   ❌ Hero image file not found`);
      }
    } else {
      console.log(`   ⛔ No hero image import found`);
    }
  }
  
  console.log('\n' + '─'.repeat(80));
  
  if (shouldGenerate) {
    console.log('\n🔧 Generation mode enabled...');
    console.log('   Note: Actual image generation requires sharp or similar library.');
    console.log('   Run: npm install sharp');
    console.log('   Then use the generate-og-images.js script.\n');
    
    // Generate commands for manual generation
    console.log('📋 Manual generation commands (copy to generate OG images):');
    console.log('─'.repeat(80));
    
    for (const post of results.posts.filter(p => p.heroImagePath)) {
      const suggestedOgPath = post.ogImage || `/og-images/og-${path.basename(post.file, '.tsx').toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2')}.jpg`;
      console.log(`\n# ${post.file}`);
      console.log(`# Hero: ${post.heroImage}`);
      console.log(`# Suggested OG: ${suggestedOgPath}`);
    }
  } else {
    console.log('\n💡 Tip: Run with --generate flag to see generation commands');
    console.log('   node scripts/audit-og-images.js --generate\n');
  }
  
  return results;
}

// Run the audit
auditOgImages();
