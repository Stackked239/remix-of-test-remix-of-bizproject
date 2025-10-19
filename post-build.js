import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Post-build script to copy backup files to dist
 */
async function postBuild() {
  console.log('\n📦 Running post-build tasks...\n');
  
  const filesToCopy = [
    { src: '_redirects', dest: 'dist/_redirects' },
    { src: '_headers', dest: 'dist/_headers' }
  ];
  
  for (const { src, dest } of filesToCopy) {
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(__dirname, dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied ${src} → ${dest}`);
    } else {
      console.warn(`⚠️  Warning: ${src} not found, skipping`);
    }
  }
  
  console.log('\n✅ Post-build tasks complete!\n');
}

postBuild().catch(error => {
  console.error('❌ Post-build failed:', error);
  process.exit(1);
});
