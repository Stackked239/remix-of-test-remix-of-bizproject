import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * SEO Audit Script
 * Checks for common SEO issues in the codebase including OG image validation
 */
function seoAudit() {
  console.log('🔍 Running SEO Audit...\n');
  
  const issues = [];
  const recommendations = [];
  const ogImageIssues = [];
  
  // Get list of available OG images
  const ogImagesDir = path.join(__dirname, 'public', 'og-images');
  const availableOgImages = new Set();
  
  if (fs.existsSync(ogImagesDir)) {
    fs.readdirSync(ogImagesDir).forEach(file => {
      availableOgImages.add(file);
    });
    console.log(`✅ Found ${availableOgImages.size} OG images in public/og-images/`);
  } else {
    issues.push('OG images directory not found at public/og-images/');
  }
  
  // Check if SEO component is used
  console.log('📊 Checking SEO implementation...\n');
  
  const pagesDir = path.join(__dirname, 'src', 'pages');
  const seoComponentPath = path.join(__dirname, 'src', 'components', 'SEO.tsx');
  
  if (!fs.existsSync(seoComponentPath)) {
    issues.push('SEO component not found at src/components/SEO.tsx');
  } else {
    console.log('✅ SEO component exists');
  }
  
  // Check pages for SEO component usage
  let pagesChecked = 0;
  let pagesWithSEO = 0;
  let pagesWithOgImage = 0;
  let pagesWithValidOgImage = 0;
  
  function checkPage(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = filePath.replace(__dirname + '/', '');
    
    pagesChecked++;
    
    if (content.includes('from "@/components/SEO"') || content.includes('<SEO ')) {
      pagesWithSEO++;
      
      // Check for ogImage prop
      const ogImageMatch = content.match(/ogImage\s*=\s*["'`]([^"'`]+)["'`]/);
      
      if (ogImageMatch) {
        pagesWithOgImage++;
        const ogImagePath = ogImageMatch[1];
        
        // Validate OG image path format
        if (ogImagePath.startsWith('https://bizhealth.ai/assets/')) {
          ogImageIssues.push(`❌ ${relPath}: Uses old URL format (https://bizhealth.ai/assets/...) - should use /og-images/filename.jpg`);
        } else if (ogImagePath.startsWith('http') && !ogImagePath.includes('/og-images/')) {
          ogImageIssues.push(`⚠️ ${relPath}: Uses external URL without /og-images/ path - may not work for social sharing`);
        } else if (ogImagePath.startsWith('/og-images/')) {
          // Check if file exists
          const filename = ogImagePath.replace('/og-images/', '');
          if (availableOgImages.has(filename)) {
            pagesWithValidOgImage++;
          } else {
            ogImageIssues.push(`❌ ${relPath}: OG image file not found: ${filename}`);
          }
        } else if (!ogImagePath.startsWith('/') && !ogImagePath.startsWith('http')) {
          ogImageIssues.push(`⚠️ ${relPath}: Relative OG image path may not work: ${ogImagePath}`);
        }
      } else {
        // Check if it's a blog post (should definitely have ogImage)
        if (relPath.includes('/blog/')) {
          ogImageIssues.push(`❌ ${relPath}: Blog post missing ogImage prop - REQUIRED for social sharing`);
        } else {
          recommendations.push(`Add ogImage prop to SEO component in ${relPath}`);
        }
      }
    } else {
      recommendations.push(`Add SEO component to ${relPath}`);
    }
    
    // Check for H1 tags
    if (!/<h1[^>]*>/.test(content)) {
      recommendations.push(`Add H1 heading to ${relPath}`);
    }
    
    // Check for duplicate H1s
    const h1Matches = content.match(/<h1[^>]*>/g);
    if (h1Matches && h1Matches.length > 1) {
      issues.push(`Multiple H1 tags found in ${relPath} - should only have one`);
    }
  }
  
  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.tsx') && !file.startsWith('_')) {
        checkPage(filePath);
      }
    }
  }
  
  walkDir(pagesDir);
  
  console.log(`\n📈 SEO Coverage: ${pagesWithSEO}/${pagesChecked} pages have SEO meta tags`);
  
  // Check sitemap
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    console.log('✅ sitemap.xml exists');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    console.log(`   → Contains ${urlCount} URLs`);
  } else {
    issues.push('sitemap.xml not found in public folder');
  }
  
  // Check robots.txt
  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    console.log('✅ robots.txt exists');
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    if (robotsContent.includes('Sitemap:')) {
      console.log('   → Contains sitemap reference');
    } else {
      recommendations.push('Add Sitemap reference to robots.txt');
    }
  } else {
    issues.push('robots.txt not found in public folder');
  }
  
  // Check structured data
  const structuredDataPath = path.join(__dirname, 'src', 'components', 'StructuredData.tsx');
  if (fs.existsSync(structuredDataPath)) {
    console.log('✅ StructuredData component exists');
  } else {
    recommendations.push('Create StructuredData component for rich snippets');
  }
  
  // Print results
  console.log('\n' + '='.repeat(60));
  console.log('📋 SEO Audit Results');
  console.log('='.repeat(60));
  
  if (issues.length === 0) {
    console.log('\n✅ No critical issues found!');
  } else {
    console.log(`\n❌ Critical Issues (${issues.length}):`);
    issues.forEach((issue, i) => {
      console.log(`   ${i + 1}. ${issue}`);
    });
  }
  
  // OG Image Section
  console.log('\n' + '='.repeat(60));
  console.log('🖼️  OG Image Audit');
  console.log('='.repeat(60));
  console.log(`\n📊 OG Image Coverage: ${pagesWithOgImage}/${pagesWithSEO} pages with SEO have ogImage prop`);
  console.log(`✅ Valid OG Images: ${pagesWithValidOgImage}/${pagesWithOgImage} have correct paths`);
  
  if (ogImageIssues.length === 0) {
    console.log('\n✅ All OG images are properly configured!');
  } else {
    console.log(`\n⚠️  OG Image Issues (${ogImageIssues.length}):`);
    ogImageIssues.forEach((issue) => {
      console.log(`   ${issue}`);
    });
  }
  
  if (recommendations.length === 0) {
    console.log('\n✨ No recommendations - SEO is fully optimized!');
  } else {
    console.log(`\n💡 Recommendations (${recommendations.length}):`);
    recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📚 SEO Best Practices Checklist:');
  console.log('='.repeat(60));
  console.log('✓ Unique title tags (under 60 characters)');
  console.log('✓ Unique meta descriptions (under 160 characters)');
  console.log('✓ Single H1 per page with target keywords');
  console.log('✓ Proper heading hierarchy (H1 → H2 → H3)');
  console.log('✓ Alt text on all images');
  console.log('✓ Internal linking between related pages');
  console.log('✓ Clean, descriptive URLs');
  console.log('✓ Mobile responsive design');
  console.log('✓ Fast page load times (Lighthouse 90+)');
  console.log('✓ HTTPS enabled');
  console.log('✓ Sitemap submitted to search engines');
  console.log('✓ Structured data for rich snippets');
  
  console.log('\n' + '='.repeat(60));
  console.log('🖼️  OG Image Requirements:');
  console.log('='.repeat(60));
  console.log('✓ Use /og-images/filename.jpg format for ogImage prop');
  console.log('✓ Image file must exist in public/og-images/');
  console.log('✓ Images should be under 80KB for fast loading');
  console.log('✓ Recommended size: 1200x630 pixels (1.91:1 ratio)');
  console.log('✓ No text overlays on OG images');
  console.log('✓ Run `npm run seo-audit` before publishing new pages');
  console.log('='.repeat(60) + '\n');
  
  // Return exit code for CI/CD integration
  const hasBlockingIssues = issues.length > 0 || ogImageIssues.some(i => i.startsWith('❌'));
  if (hasBlockingIssues) {
    console.log('⛔ Audit failed - fix issues before deploying\n');
    process.exit(1);
  } else {
    console.log('✅ Audit passed\n');
    process.exit(0);
  }
}

seoAudit();
