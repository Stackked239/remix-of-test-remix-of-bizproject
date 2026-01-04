import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * AUTO-SYNC OG IMAGES SCRIPT
 * 
 * Scans all page files in src/pages and extracts ogImage props from SEO components,
 * then updates the ogImageMap in generate-sitemap.js for complete sitemap coverage.
 * 
 * USAGE:
 *   node sync-og-images.js          # Preview changes
 *   node sync-og-images.js --write  # Update generate-sitemap.js
 */

const PAGES_DIR = path.join(__dirname, 'src', 'pages');
const SITEMAP_SCRIPT = path.join(__dirname, 'generate-sitemap.js');

/**
 * Convert file path to route path
 */
function fileToRoute(filePath) {
  let route = filePath
    .replace(PAGES_DIR, '')
    .replace(/\.tsx$/, '')
    .replace(/\/Index$/, '')
    .replace(/\/index$/, '');
  
  // Handle special cases
  if (route === '' || route === '/Index') return '/';
  
  // Convert PascalCase to kebab-case for routes
  route = route.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  
  // Handle nested paths like /blog/ArticleName -> /blog/article-name
  return route;
}

/**
 * Extract ogImage from file content
 */
function extractOgImage(content) {
  // Pattern 1: ogImage="..." or ogImage='...'
  const ogImageMatch = content.match(/ogImage\s*=\s*["']([^"']+)["']/);
  if (ogImageMatch) {
    let imgPath = ogImageMatch[1];
    // Normalize - remove domain if present
    if (imgPath.startsWith('https://bizhealth.ai')) {
      imgPath = imgPath.replace('https://bizhealth.ai', '');
    }
    return imgPath;
  }
  
  // Pattern 2: ogImage={`...`} template literal
  const templateMatch = content.match(/ogImage\s*=\s*\{`([^`]+)`\}/);
  if (templateMatch) {
    let imgPath = templateMatch[1];
    if (imgPath.startsWith('https://bizhealth.ai')) {
      imgPath = imgPath.replace('https://bizhealth.ai', '');
    }
    return imgPath;
  }
  
  return null;
}

/**
 * Recursively scan directory for .tsx files
 */
function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip component directories
      if (!entry.name.startsWith('_') && entry.name !== 'components') {
        scanDirectory(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Main function to scan and extract OG images
 */
function syncOgImages() {
  console.log('🔍 Scanning page files for OG images...\n');
  
  const pageFiles = scanDirectory(PAGES_DIR);
  const ogImageMap = {};
  const missingOgImages = [];
  
  for (const filePath of pageFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const route = fileToRoute(filePath);
      const ogImage = extractOgImage(content);
      
      if (ogImage) {
        ogImageMap[route] = ogImage;
      } else {
        // Check if file has SEO component but no ogImage
        if (content.includes('<SEO') || content.includes('<Helmet')) {
          missingOgImages.push({ route, file: path.relative(__dirname, filePath) });
        }
      }
    } catch (err) {
      console.error(`❌ Error reading ${filePath}: ${err.message}`);
    }
  }
  
  // Sort by route for consistent output
  const sortedMap = Object.keys(ogImageMap)
    .sort()
    .reduce((acc, key) => {
      acc[key] = ogImageMap[key];
      return acc;
    }, {});
  
  console.log(`✅ Found ${Object.keys(sortedMap).length} pages with OG images\n`);
  
  // Generate the ogImageMap code
  const mapCode = generateMapCode(sortedMap);
  
  console.log('📋 Generated ogImageMap:\n');
  console.log(mapCode);
  
  if (missingOgImages.length > 0) {
    console.log('\n⚠️  Pages with SEO but NO ogImage prop:');
    for (const { route, file } of missingOgImages) {
      console.log(`   ${route} → ${file}`);
    }
  }
  
  // Check for --write flag
  if (process.argv.includes('--write')) {
    updateSitemapScript(mapCode);
  } else {
    console.log('\n💡 To update generate-sitemap.js, run:');
    console.log('   node sync-og-images.js --write\n');
  }
  
  return { ogImageMap: sortedMap, missingOgImages };
}

/**
 * Generate formatted ogImageMap code
 */
function generateMapCode(map) {
  let code = 'const ogImageMap = {\n';
  
  const entries = Object.entries(map);
  for (let i = 0; i < entries.length; i++) {
    const [route, image] = entries[i];
    const comma = i < entries.length - 1 ? ',' : '';
    code += `  '${route}': '${image}'${comma}\n`;
  }
  
  code += '};';
  return code;
}

/**
 * Update the ogImageMap in generate-sitemap.js
 */
function updateSitemapScript(newMapCode) {
  console.log('\n📝 Updating generate-sitemap.js...');
  
  try {
    let content = fs.readFileSync(SITEMAP_SCRIPT, 'utf-8');
    
    // Find and replace the ogImageMap
    const mapStart = content.indexOf('const ogImageMap = {');
    if (mapStart === -1) {
      console.error('❌ Could not find ogImageMap in generate-sitemap.js');
      return false;
    }
    
    // Find the closing brace
    let braceCount = 0;
    let mapEnd = mapStart;
    let inMap = false;
    
    for (let i = mapStart; i < content.length; i++) {
      if (content[i] === '{') {
        braceCount++;
        inMap = true;
      } else if (content[i] === '}') {
        braceCount--;
        if (inMap && braceCount === 0) {
          mapEnd = i + 1;
          // Include semicolon if present
          if (content[i + 1] === ';') mapEnd++;
          break;
        }
      }
    }
    
    // Replace the old map with the new one
    const before = content.substring(0, mapStart);
    const after = content.substring(mapEnd);
    
    const newContent = before + newMapCode + after;
    
    fs.writeFileSync(SITEMAP_SCRIPT, newContent, 'utf-8');
    console.log('✅ Successfully updated generate-sitemap.js\n');
    
    return true;
  } catch (err) {
    console.error(`❌ Error updating file: ${err.message}`);
    return false;
  }
}

// Run the script
syncOgImages();
