#!/usr/bin/env node

/**
 * Deployment Verification Script for BizHealth.ai
 * 
 * This script checks if the site renders content properly after deployment.
 * It verifies that the page has actual content (not a white/blank page).
 * 
 * Usage:
 *   node verify-deployment.js [url]
 * 
 * Examples:
 *   node verify-deployment.js                          # Tests https://bizhealth.ai
 *   node verify-deployment.js https://staging.bizhealth.ai  # Tests staging
 *   node verify-deployment.js http://localhost:8080    # Tests local dev
 */

const puppeteer = require('puppeteer');

const DEFAULT_URL = 'https://bizhealth.ai';
const TIMEOUT_MS = 30000;
const CONTENT_WAIT_MS = 5000;

// Critical elements that should exist on a properly rendered page
const CRITICAL_SELECTORS = [
  '#root',           // React root element
  'nav',             // Navigation
  'main, section',   // Main content area
  'h1',              // Main heading
];

// Text patterns that indicate the page rendered properly
const EXPECTED_CONTENT_PATTERNS = [
  /BizHealth/i,
  /business/i,
  /assessment/i,
];

async function verifyDeployment(url = DEFAULT_URL) {
  console.log('🔍 Deployment Verification Script');
  console.log('================================');
  console.log(`Testing URL: ${url}`);
  console.log('');

  let browser;
  const results = {
    url,
    timestamp: new Date().toISOString(),
    passed: true,
    checks: [],
    errors: [],
    warnings: [],
  };

  try {
    // Launch browser
    console.log('🚀 Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Track console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Track page errors
    const pageErrors = [];
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    // Navigate to page
    console.log('📄 Loading page...');
    const response = await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT_MS,
    });

    // Check HTTP status
    const status = response.status();
    const statusCheck = {
      name: 'HTTP Status',
      passed: status === 200,
      message: `Status code: ${status}`,
    };
    results.checks.push(statusCheck);
    console.log(`${statusCheck.passed ? '✅' : '❌'} ${statusCheck.name}: ${statusCheck.message}`);

    if (status !== 200) {
      results.passed = false;
      results.errors.push(`Page returned status ${status}`);
    }

    // Wait for content to render
    console.log(`⏳ Waiting ${CONTENT_WAIT_MS / 1000}s for content to render...`);
    await new Promise(resolve => setTimeout(resolve, CONTENT_WAIT_MS));

    // Check for critical elements
    console.log('🔎 Checking critical elements...');
    for (const selector of CRITICAL_SELECTORS) {
      const element = await page.$(selector);
      const elementCheck = {
        name: `Element: ${selector}`,
        passed: !!element,
        message: element ? 'Found' : 'Not found',
      };
      results.checks.push(elementCheck);
      console.log(`${elementCheck.passed ? '✅' : '❌'} ${elementCheck.name}: ${elementCheck.message}`);
      
      if (!element) {
        results.passed = false;
      }
    }

    // Check page content
    console.log('📝 Checking page content...');
    const pageContent = await page.content();
    const textContent = await page.evaluate(() => document.body?.innerText || '');

    // Check for blank page (white screen of death)
    const isBlankPage = textContent.trim().length < 50;
    const blankCheck = {
      name: 'Content Present',
      passed: !isBlankPage,
      message: isBlankPage ? 'Page appears blank!' : `Found ${textContent.length} characters of content`,
    };
    results.checks.push(blankCheck);
    console.log(`${blankCheck.passed ? '✅' : '❌'} ${blankCheck.name}: ${blankCheck.message}`);

    if (isBlankPage) {
      results.passed = false;
      results.errors.push('Page appears to be blank (white screen)');
    }

    // Check for expected content patterns
    console.log('🔤 Checking expected content patterns...');
    for (const pattern of EXPECTED_CONTENT_PATTERNS) {
      const found = pattern.test(textContent);
      const patternCheck = {
        name: `Content Pattern: ${pattern.source}`,
        passed: found,
        message: found ? 'Found' : 'Not found',
      };
      results.checks.push(patternCheck);
      console.log(`${patternCheck.passed ? '✅' : '⚠️'} ${patternCheck.name}: ${patternCheck.message}`);
      
      if (!found) {
        results.warnings.push(`Expected content pattern not found: ${pattern.source}`);
      }
    }

    // Check for JavaScript errors
    console.log('🐛 Checking for JavaScript errors...');
    const hasJsErrors = pageErrors.length > 0 || consoleErrors.length > 0;
    const jsErrorCheck = {
      name: 'No JavaScript Errors',
      passed: !hasJsErrors,
      message: hasJsErrors 
        ? `Found ${pageErrors.length} page errors and ${consoleErrors.length} console errors`
        : 'No errors detected',
    };
    results.checks.push(jsErrorCheck);
    console.log(`${jsErrorCheck.passed ? '✅' : '⚠️'} ${jsErrorCheck.name}: ${jsErrorCheck.message}`);

    if (hasJsErrors) {
      results.warnings.push(...pageErrors.map(e => `Page error: ${e}`));
      results.warnings.push(...consoleErrors.map(e => `Console error: ${e}`));
    }

    // Check for First Contentful Paint indicator
    console.log('🎨 Checking First Contentful Paint...');
    const fcp = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');
      return fcpEntry ? fcpEntry.startTime : null;
    });

    const fcpCheck = {
      name: 'First Contentful Paint',
      passed: fcp !== null && fcp < 3000,
      message: fcp !== null ? `${Math.round(fcp)}ms` : 'Not detected',
    };
    results.checks.push(fcpCheck);
    console.log(`${fcpCheck.passed ? '✅' : '⚠️'} ${fcpCheck.name}: ${fcpCheck.message}`);

    // Take screenshot for debugging
    const screenshotPath = 'deployment-verification-screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

  } catch (error) {
    results.passed = false;
    results.errors.push(`Fatal error: ${error.message}`);
    console.error(`❌ Fatal error: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Print summary
  console.log('');
  console.log('================================');
  console.log('📊 Verification Summary');
  console.log('================================');
  console.log(`Status: ${results.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Checks: ${results.checks.filter(c => c.passed).length}/${results.checks.length} passed`);
  
  if (results.errors.length > 0) {
    console.log('');
    console.log('❌ Errors:');
    results.errors.forEach(e => console.log(`   - ${e}`));
  }
  
  if (results.warnings.length > 0) {
    console.log('');
    console.log('⚠️ Warnings:');
    results.warnings.slice(0, 5).forEach(w => console.log(`   - ${w}`));
    if (results.warnings.length > 5) {
      console.log(`   ... and ${results.warnings.length - 5} more`);
    }
  }

  console.log('');
  console.log(`Timestamp: ${results.timestamp}`);

  // Exit with appropriate code
  process.exit(results.passed ? 0 : 1);
}

// Get URL from command line args or use default
const targetUrl = process.argv[2] || DEFAULT_URL;
verifyDeployment(targetUrl);
