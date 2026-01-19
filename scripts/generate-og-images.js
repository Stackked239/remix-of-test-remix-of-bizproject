#!/usr/bin/env node

/**
 * OG Image Generation Script
 * 
 * Generates OG images (1200x630) from hero images for blog posts.
 * 
 * Usage:
 *   node scripts/generate-og-images.js           - Generate all missing OG images
 *   node scripts/generate-og-images.js --dry-run - Preview what would be generated
 * 
 * Requirements:
 *   npm install sharp
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Error: sharp is not installed.');
  console.error('   Run: npm install sharp');
  console.error('   Then try again.\n');
  process.exit(1);
}

const BLOG_DIR = path.join(__dirname, '..', 'src', 'pages', 'blog');
const OG_IMAGES_DIR = path.join(__dirname, '..', 'public', 'og-images');
const PROJECT_ROOT = path.join(__dirname, '..');

const isDryRun = process.argv.includes('--dry-run');

// OG Image dimensions
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const MAX_FILE_SIZE = 80 * 1024; // 80KB target

/**
 * Extract ogImage path from file content
 */
function extractOgImage(content) {
  const directMatch = content.match(/ogImage=["'`]([^"'`]+)["'`]/);
  if (directMatch) {
    let ogPath = directMatch[1];
    ogPath = ogPath.replace('https://bizhealth.ai', '');
    return ogPath;
  }
  return null;
}

/**
 * Extract hero image import from file content
 */
function extractHeroImage(content) {
  const importMatch = content.match(/import\s+heroImage\s+from\s+["'`]([^"'`]+)["'`]/);
  if (importMatch) {
    let heroPath = importMatch[1];
    heroPath = heroPath.replace('@/', 'src/');
    heroPath = heroPath.replace(/^\.\.\/\.\.\//, 'src/');
    return heroPath;
  }
  return null;
}

/**
 * Convert file name to suggested OG image path
 */
function suggestOgPath(fileName) {
  const baseName = path.basename(fileName, '.tsx');
  const kebabName = baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  return `/og-images/og-${kebabName}.jpg`;
}

/**
 * Check if OG image file exists
 */
function ogImageExists(ogPath) {
  if (!ogPath) return false;
  const fullPath = path.join(PROJECT_ROOT, 'public', ogPath);
  return fs.existsSync(fullPath);
}

/**
 * Resolve hero image to absolute path
 */
function resolveHeroImage(heroPath) {
  if (!heroPath) return null;
  const fullPath = path.join(PROJECT_ROOT, heroPath);
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
    
    if (stat.isDirectory() && !item.startsWith('_')) {
      scanBlogPosts(fullPath, files);
    } else if (item.endsWith('.tsx')) {
      // Skip category pages
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
 * Generate OG image from hero image
 */
async function generateOgImage(heroPath, outputPath, fileName) {
  const fullOutputPath = path.join(PROJECT_ROOT, 'public', outputPath);
  
  // Ensure output directory exists
  const outputDir = path.dirname(fullOutputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    // Read the hero image and get its metadata
    const image = sharp(heroPath);
    const metadata = await image.metadata();
    
    // Calculate crop dimensions to get 1200x630 (1.9:1 ratio)
    const targetRatio = OG_WIDTH / OG_HEIGHT;
    const sourceRatio = metadata.width / metadata.height;
    
    let cropWidth, cropHeight, cropLeft, cropTop;
    
    if (sourceRatio > targetRatio) {
      // Image is wider than target - crop sides
      cropHeight = metadata.height;
      cropWidth = Math.round(metadata.height * targetRatio);
      cropLeft = Math.round((metadata.width - cropWidth) / 2);
      cropTop = 0;
    } else {
      // Image is taller than target - crop top/bottom
      cropWidth = metadata.width;
      cropHeight = Math.round(metadata.width / targetRatio);
      cropLeft = 0;
      cropTop = Math.round((metadata.height - cropHeight) / 2);
    }
    
    // Process the image
    let quality = 85;
    let result;
    
    do {
      result = await sharp(heroPath)
        .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
        .resize(OG_WIDTH, OG_HEIGHT, { fit: 'fill' })
        .jpeg({ quality, progressive: true })
        .toBuffer();
      
      // Reduce quality if file is too large
      if (result.length > MAX_FILE_SIZE && quality > 50) {
        quality -= 5;
      } else {
        break;
      }
    } while (quality > 50);
    
    // Write the file
    fs.writeFileSync(fullOutputPath, result);
    
    const sizeKB = (result.length / 1024).toFixed(1);
    console.log(`   ✅ Generated: ${outputPath} (${sizeKB}KB, quality: ${quality})`);
    
    return true;
  } catch (error) {
    console.error(`   ❌ Error generating ${outputPath}: ${error.message}`);
    return false;
  }
}

/**
 * Main generation function
 */
async function generateMissingOgImages() {
  console.log('\n🖼️  OG Image Generator');
  console.log('======================\n');
  
  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No files will be created\n');
  }
  
  const blogPosts = scanBlogPosts(BLOG_DIR);
  const toGenerate = [];
  
  // Find posts that need OG images
  for (const filePath of blogPosts) {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const ogImage = extractOgImage(content);
    const heroImage = extractHeroImage(content);
    const heroImagePath = resolveHeroImage(heroImage);
    
    // Check if OG image is missing or doesn't exist
    const needsOg = !ogImage || !ogImageExists(ogImage);
    
    if (needsOg && heroImagePath) {
      const suggestedPath = ogImage || suggestOgPath(fileName);
      toGenerate.push({
        file: fileName,
        heroPath: heroImagePath,
        ogPath: suggestedPath,
        hasDeclaredOg: !!ogImage
      });
    }
  }
  
  if (toGenerate.length === 0) {
    console.log('🎉 All blog posts have valid OG images!\n');
    return;
  }
  
  console.log(`📋 Found ${toGenerate.length} posts needing OG images:\n`);
  
  let generated = 0;
  let failed = 0;
  
  for (const post of toGenerate) {
    console.log(`\n📄 ${post.file}`);
    console.log(`   Hero: ${path.relative(PROJECT_ROOT, post.heroPath)}`);
    console.log(`   OG:   ${post.ogPath}`);
    
    if (!post.hasDeclaredOg) {
      console.log(`   ⚠️  Note: Add ogImage="${post.ogPath}" to SEO component`);
    }
    
    if (!isDryRun) {
      const success = await generateOgImage(post.heroPath, post.ogPath, post.file);
      if (success) {
        generated++;
      } else {
        failed++;
      }
    }
  }
  
  console.log('\n' + '─'.repeat(60));
  
  if (isDryRun) {
    console.log(`\n📊 Would generate ${toGenerate.length} OG images`);
    console.log('   Run without --dry-run to generate files\n');
  } else {
    console.log(`\n📊 Results:`);
    console.log(`   ✅ Generated: ${generated}`);
    if (failed > 0) {
      console.log(`   ❌ Failed: ${failed}`);
    }
    console.log('');
    
    // Remind about updating SEO components
    const needsUpdate = toGenerate.filter(p => !p.hasDeclaredOg);
    if (needsUpdate.length > 0) {
      console.log('⚠️  Remember to add ogImage prop to these files:');
      for (const post of needsUpdate) {
        console.log(`   - ${post.file}: ogImage="${post.ogPath}"`);
      }
      console.log('');
    }
  }
}

// Run the generator
generateMissingOgImages().catch(console.error);
