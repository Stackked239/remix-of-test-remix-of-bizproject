import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * OG IMAGE SIZE AUDIT
 * 
 * Checks file sizes of all OG images and flags those over 100KB.
 * Social platforms load faster with smaller images.
 * 
 * USAGE: node og-size-audit.js
 */

const ogImagesDir = path.join(__dirname, 'public', 'og-images');
const SIZE_THRESHOLD_KB = 100; // Flag images over 100KB

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + ' KB';
  return (kb / 1024).toFixed(2) + ' MB';
}

function auditOgImageSizes() {
  console.log('\n🖼️  OG IMAGE SIZE AUDIT\n');
  console.log('='.repeat(60) + '\n');
  console.log(`Threshold: ${SIZE_THRESHOLD_KB}KB (images over this are flagged)\n`);
  
  if (!fs.existsSync(ogImagesDir)) {
    console.log('❌ No og-images directory found');
    return;
  }
  
  const files = fs.readdirSync(ogImagesDir)
    .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
  
  const results = {
    total: 0,
    underThreshold: 0,
    overThreshold: 0,
    totalSize: 0,
    oversized: [],
    all: []
  };
  
  for (const file of files) {
    const filePath = path.join(ogImagesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    results.total++;
    results.totalSize += stats.size;
    
    const fileInfo = {
      name: file,
      size: stats.size,
      sizeFormatted: formatBytes(stats.size),
      sizeKB: sizeKB.toFixed(1)
    };
    
    results.all.push(fileInfo);
    
    if (sizeKB > SIZE_THRESHOLD_KB) {
      results.overThreshold++;
      results.oversized.push(fileInfo);
    } else {
      results.underThreshold++;
    }
  }
  
  // Sort all by size (largest first)
  results.all.sort((a, b) => b.size - a.size);
  results.oversized.sort((a, b) => b.size - a.size);
  
  // Print summary
  console.log('📊 SUMMARY\n');
  console.log(`   Total OG Images:     ${results.total}`);
  console.log(`   Under ${SIZE_THRESHOLD_KB}KB:          ${results.underThreshold} ✅`);
  console.log(`   Over ${SIZE_THRESHOLD_KB}KB:           ${results.overThreshold} ⚠️`);
  console.log(`   Total Size:          ${formatBytes(results.totalSize)}`);
  console.log(`   Average Size:        ${formatBytes(results.totalSize / results.total)}\n`);
  
  // Print oversized files
  if (results.oversized.length > 0) {
    console.log(`⚠️  OVERSIZED IMAGES (>${SIZE_THRESHOLD_KB}KB):\n`);
    for (const file of results.oversized) {
      console.log(`   ${file.name.padEnd(50)} ${file.sizeFormatted}`);
    }
    console.log('');
  }
  
  // Print top 10 largest
  console.log('📏 TOP 10 LARGEST:\n');
  const top10 = results.all.slice(0, 10);
  for (const file of top10) {
    const status = file.size / 1024 > SIZE_THRESHOLD_KB ? '⚠️' : '✅';
    console.log(`   ${status} ${file.name.padEnd(50)} ${file.sizeFormatted}`);
  }
  console.log('');
  
  // Recommendations
  if (results.overThreshold > 0) {
    console.log('💡 RECOMMENDATIONS:\n');
    console.log('   • Use Squoosh.app or TinyPNG to compress oversized images');
    console.log('   • Target 50-80KB for optimal social media loading');
    console.log('   • OG images should be 1200x630px for best display');
    console.log('   • Use JPG for photos, PNG only if transparency needed\n');
  } else {
    console.log('✅ All OG images are optimally sized!\n');
  }
  
  return results;
}

auditOgImageSizes();
