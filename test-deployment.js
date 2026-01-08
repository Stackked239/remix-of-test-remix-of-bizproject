import https from 'https';
import http from 'http';

/**
 * Test deployment by checking if pages are accessible and contain expected content
 */

const TEST_ROUTES = [
  '/',
  '/about',
  '/pricing',
  '/blog',
  '/blog/warning-signs-business',
  '/blog/financial-health-metrics',
  '/blog/ai-business-analytics',
  '/contact'
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function testDeployment(baseUrl) {
  console.log(`\n🧪 Testing deployment at: ${baseUrl}\n`);
  
  let passCount = 0;
  let failCount = 0;
  const issues = [];
  
  for (const route of TEST_ROUTES) {
    const url = `${baseUrl}${route}`;
    process.stdout.write(`Testing ${route}... `);
    
    try {
      const { statusCode, body } = await fetchPage(url);
      
      // Check status code
      if (statusCode !== 200) {
        console.log(`❌ Failed (Status: ${statusCode})`);
        failCount++;
        issues.push({ route, issue: `HTTP ${statusCode}` });
        continue;
      }
      
      // Check if HTML is pre-rendered (not just empty root div)
      const hasContent = body.length > 5000;
      const hasH1 = /<h1[^>]*>/.test(body);
      const notJustSkeleton = !body.includes('<div id="root"></div>') || body.length > 10000;
      const hasMetaDescription = /<meta\s+name=["']description["']/.test(body);
      
      const checks = [];
      if (!hasContent) checks.push('small file');
      if (!hasH1) checks.push('no H1');
      if (!notJustSkeleton) checks.push('skeleton only');
      if (!hasMetaDescription) checks.push('no meta description');
      
      if (checks.length === 0) {
        console.log(`✅ Pass`);
        passCount++;
      } else {
        console.log(`⚠️  Warning: ${checks.join(', ')}`);
        passCount++;
        issues.push({ route, issue: checks.join(', ') });
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      failCount++;
      issues.push({ route, issue: error.message });
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Results:');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passCount}/${TEST_ROUTES.length}`);
  console.log(`❌ Failed: ${failCount}/${TEST_ROUTES.length}`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  Issues found:');
    issues.forEach(({ route, issue }) => {
      console.log(`  ${route}: ${issue}`);
    });
  }
  
  console.log('='.repeat(60) + '\n');
  
  if (failCount > 0) {
    console.error('❌ Deployment test failed');
    process.exit(1);
  } else if (issues.length > 0) {
    console.warn('⚠️  Deployment test passed with warnings');
  } else {
    console.log('✅ All deployment tests passed!');
  }
}

// Get base URL from command line or use localhost
const baseUrl = process.argv[2] || 'http://localhost:4173';

console.log('🌐 Deployment Test Script');
console.log('Usage: node test-deployment.js [url]');
console.log('Example: node test-deployment.js https://your-site.netlify.app');

testDeployment(baseUrl);
