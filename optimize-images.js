import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Check images for SEO optimization
 * This script verifies that images have proper loading attributes
 */
function checkImageOptimization() {
  console.log('🖼️  Checking image optimization...\n');
  
  const srcDir = path.join(__dirname, 'src');
  const issues = [];
  let filesChecked = 0;
  
  function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = filePath.replace(__dirname + '/', '');
    
    // Check for img tags without loading="lazy"
    const imgRegex = /<img\s+([^>]*?)>/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const imgTag = match[0];
      const attrs = match[1];
      
      // Check for loading attribute
      if (!attrs.includes('loading=')) {
        issues.push({
          file: relPath,
          issue: 'Missing loading attribute',
          fix: 'Add loading="lazy" to <img> tag'
        });
      }
      
      // Check for alt attribute
      if (!attrs.includes('alt=')) {
        issues.push({
          file: relPath,
          issue: 'Missing alt attribute',
          fix: 'Add descriptive alt text for accessibility and SEO'
        });
      }
      
      // Check for width/height
      if (!attrs.includes('width=') && !attrs.includes('height=')) {
        issues.push({
          file: relPath,
          issue: 'Missing width/height attributes',
          fix: 'Add width and height to prevent layout shift (CLS)'
        });
      }
    }
  }
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        filesChecked++;
        checkFile(filePath);
      }
    }
  }
  
  walkDir(srcDir);
  
  console.log(`📊 Checked ${filesChecked} component files\n`);
  
  if (issues.length === 0) {
    console.log('✅ All images are optimized!\n');
  } else {
    console.log(`⚠️  Found ${issues.length} optimization opportunities:\n`);
    
    const groupedIssues = {};
    issues.forEach(({ file, issue, fix }) => {
      if (!groupedIssues[file]) {
        groupedIssues[file] = [];
      }
      groupedIssues[file].push({ issue, fix });
    });
    
    for (const [file, fileIssues] of Object.entries(groupedIssues)) {
      console.log(`📁 ${file}`);
      fileIssues.forEach(({ issue, fix }) => {
        console.log(`   - ${issue}`);
        console.log(`     → ${fix}`);
      });
      console.log('');
    }
  }
  
  console.log('💡 Best practices:');
  console.log('   - Add loading="lazy" to all images below the fold');
  console.log('   - Use descriptive alt text for SEO and accessibility');
  console.log('   - Specify width and height to prevent layout shift');
  console.log('   - Use WebP format with fallbacks for better compression');
  console.log('   - Optimize images before committing (use tools like ImageOptim)');
  console.log('');
}

checkImageOptimization();
