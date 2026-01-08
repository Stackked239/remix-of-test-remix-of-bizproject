# SSG Requirements - BizHealth.ai

## 🚨 CRITICAL: Static Site Generation is MANDATORY

This project **MUST** maintain Static Site Generation (SSG) for all pages to ensure search engine crawlability. This is a **non-negotiable requirement** for the BizHealth.ai platform.

---

## Core SSG Architecture

### Current Implementation
- **Route Extraction**: `extract-routes.js` automatically extracts all routes from `src/App.tsx`
- **Prerendering**: `prerender.js` uses Puppeteer to generate static HTML for all routes
- **Build Process**: `build-ssg.sh` / `build-ssg.bat` orchestrates the full SSG build
- **Sitemap Generation**: `generate-sitemap.js` creates `sitemap.xml` from routes
- **Post-Build**: `post-build.js` copies critical files to `dist/`

### Build Flow
```
1. extract-routes.js → Generates routes.json from App.tsx
2. generate-sitemap.js → Creates sitemap.xml from routes.json
3. npm run build → Vite builds the app
4. post-build.js → Copies _redirects, _headers, sitemap, robots.txt
5. prerender.js → Generates static HTML for all routes
```

---

## ✅ Requirements for ALL Future Updates

### 1. Route Management
**When adding ANY new page or route:**
- ✅ Add route to `src/App.tsx` (automatic extraction)
- ✅ Verify route appears in `routes.json` after build
- ✅ Confirm static HTML file generated in `dist/` folder
- ✅ Test "View Page Source" shows full HTML content
- ✅ Update sitemap priority in `generate-sitemap.js` if needed

**Example: Adding a new route**
```tsx
// src/App.tsx
<Route path="/new-page" element={<NewPage />} />
```
Then run: `node extract-routes.js` to verify extraction.

---

### 2. SEO Standards (MANDATORY for ALL Pages)

Every page **MUST** include:

```tsx
import SEO from '@/components/SEO';

<SEO
  title="Page Title - Under 60 Characters"
  description="Page description under 160 characters with target keywords"
  keywords="keyword1, keyword2, keyword3"
  canonical="https://bizhealth.ai/page-url"
  ogImage="https://bizhealth.ai/og-image.jpg"
/>
```

**Required Elements:**
- ✅ Unique `<title>` tag (50-60 characters)
- ✅ Unique meta description (150-160 characters)
- ✅ Single `<h1>` tag with main keyword
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- ✅ Alt text on ALL images
- ✅ Internal links to related pages
- ✅ Proper heading hierarchy (H1 → H2 → H3)

---

### 3. Structured Data (JSON-LD)

Use `StructuredData` component for rich search results:

```tsx
import StructuredData from '@/components/StructuredData';

// Organization (Homepage)
<StructuredData
  type="organization"
  name="BizHealth.ai"
  description="AI-Powered Business Health Assessment"
  url="https://bizhealth.ai"
  logo="https://bizhealth.ai/logo.jpg"
/>

// Article (Blog Posts)
<StructuredData
  type="article"
  headline="Article Title"
  description="Article description"
  author="Author Name"
  datePublished="2025-01-15"
  dateModified="2025-01-20"
  image="https://bizhealth.ai/article-image.jpg"
/>

// Service Pages
<StructuredData
  type="service"
  name="Service Name"
  description="Service description"
  provider="BizHealth.ai"
  areaServed="United States"
/>

// FAQ Pages
<StructuredData
  type="faq"
  questions={[
    { question: "Question?", answer: "Answer..." }
  ]}
/>
```

---

### 4. Build Configuration (DO NOT MODIFY)

**Critical Files - Changes Require Verification:**
- `prerender.js` - Puppeteer prerendering script
- `extract-routes.js` - Route extraction from App.tsx
- `generate-sitemap.js` - Sitemap generation
- `build-ssg.sh` / `build-ssg.bat` - Build orchestration
- `vite.config.ts` - Build optimization settings
- `netlify.toml` - Deployment configuration

**Build Commands:**
```bash
# Full SSG Build
npm run build  # or: bun run build

# Individual Steps (for testing)
node extract-routes.js
node generate-sitemap.js
npm run build
node post-build.js
node prerender.js

# Test Deployment
npm run preview
node test-deployment.js
```

---

### 5. Testing Protocol (Run After EVERY Update)

**Before Committing ANY Changes:**

1. **Build Test**
   ```bash
   npm run build
   ```
   ✅ No errors during build
   ✅ `dist/` folder created

2. **Route Verification**
   ```bash
   node extract-routes.js
   cat routes.json
   ```
   ✅ All routes present in `routes.json`
   ✅ New routes included

3. **Static HTML Verification**
   ```bash
   # Check that HTML files exist
   ls -R dist/
   ```
   ✅ `dist/index.html` exists
   ✅ `dist/about/index.html` exists
   ✅ `dist/blog/article-name/index.html` exists

4. **Content Verification**
   ```bash
   npm run preview
   # Visit http://localhost:4173
   ```
   ✅ Right-click → "View Page Source"
   ✅ See full HTML content (not empty divs)
   ✅ Meta tags visible in source
   ✅ Page content visible in source

5. **SEO Verification**
   ```bash
   node seo-audit.js
   node optimize-images.js
   ```
   ✅ All pages have titles
   ✅ All pages have descriptions
   ✅ Images have alt text

6. **Deployment Test**
   ```bash
   node test-deployment.js http://localhost:4173
   ```
   ✅ All routes return 200
   ✅ Content length > 1KB
   ✅ H1 tags present
   ✅ Meta descriptions present

---

### 6. File Structure Requirements

```
project-root/
├── prerender.js              # Puppeteer-based prerendering
├── extract-routes.js         # Route extraction from App.tsx
├── generate-sitemap.js       # Sitemap generation
├── build-ssg.sh / .bat       # Build orchestration
├── post-build.js             # Copy files to dist
├── test-deployment.js        # Deployment testing
├── seo-audit.js              # SEO validation
├── optimize-images.js        # Image optimization check
├── routes.json               # Generated route list
├── netlify.toml              # Netlify config
├── _redirects                # SPA redirects
├── _headers                  # Security headers
├── public/
│   ├── sitemap.xml           # Generated sitemap
│   └── robots.txt            # Search engine instructions
├── src/
│   ├── App.tsx               # Route definitions
│   ├── components/
│   │   ├── SEO.tsx           # SEO meta tags
│   │   └── StructuredData.tsx # JSON-LD schemas
│   └── pages/                # All page components
└── dist/                     # Generated static site
    ├── index.html
    ├── about/index.html
    ├── blog/
    │   └── article/index.html
    └── assets/
```

---

## 🚫 NEVER DO THIS

1. ❌ Remove or disable `prerender.js`
2. ❌ Change build command to skip prerendering
3. ❌ Add routes without updating `App.tsx`
4. ❌ Create pages without SEO meta tags
5. ❌ Skip testing after route changes
6. ❌ Rely on client-side rendering for initial content
7. ❌ Forget to add alt text to images
8. ❌ Use empty or duplicate meta descriptions
9. ❌ Break heading hierarchy (skip H2, go to H3)
10. ❌ Deploy without verifying static HTML generation

---

## ✅ Always Do This

1. ✅ Add routes to `src/App.tsx`
2. ✅ Run `node extract-routes.js` to verify
3. ✅ Include `<SEO />` component on every page
4. ✅ Add `<StructuredData />` for rich results
5. ✅ Test with `npm run build` before committing
6. ✅ Verify static HTML with "View Page Source"
7. ✅ Check `dist/` folder for HTML files
8. ✅ Run SEO audit: `node seo-audit.js`
9. ✅ Update sitemap priorities in `generate-sitemap.js`
10. ✅ Test deployment with `node test-deployment.js`

---

## 🔍 Quick Reference: Adding a New Page

```bash
# 1. Create page component
# src/pages/NewPage.tsx

import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';

const NewPage = () => {
  return (
    <>
      <SEO
        title="New Page Title"
        description="Page description under 160 characters"
        canonical="https://bizhealth.ai/new-page"
      />
      <StructuredData
        type="service"
        name="Service Name"
        description="Service description"
      />
      
      <main>
        <h1>Main Page Heading</h1>
        {/* Content */}
      </main>
    </>
  );
};

# 2. Add route to App.tsx
<Route path="/new-page" element={<NewPage />} />

# 3. Verify and build
node extract-routes.js
npm run build

# 4. Test
npm run preview
# Visit http://localhost:4173/new-page
# Right-click → "View Page Source" → Verify HTML content

# 5. Run audits
node seo-audit.js
node test-deployment.js http://localhost:4173
```

---

## 📊 SEO Monitoring

**Tools to Use Regularly:**
- `node seo-audit.js` - Check meta tags and structure
- `node optimize-images.js` - Verify image optimization
- `node test-deployment.js` - Test all routes
- Google Search Console - Monitor indexing
- Google PageSpeed Insights - Check performance
- Google Rich Results Test - Verify structured data

---

## 🆘 Troubleshooting

### Issue: Route not in routes.json
**Solution:** Run `node extract-routes.js` and check `App.tsx` route definition

### Issue: No HTML file in dist/
**Solution:** Run full build: `npm run build`, check for errors in `prerender.js`

### Issue: Empty HTML in "View Page Source"
**Solution:** Content is client-rendered. Check that prerendering completed successfully.

### Issue: Sitemap missing new routes
**Solution:** Run `node generate-sitemap.js` after extracting routes

### Issue: Build fails
**Solution:** Check console output, verify all dependencies installed, check Node version

---

## 📚 Related Documentation

- `SEO-OPTIMIZATION-SUMMARY.md` - Complete SEO implementation guide
- `SEO-QUICK-GUIDE.md` - Quick reference for SEO standards
- `DEPLOYMENT-SUMMARY.md` - Deployment configuration details
- `NETLIFY-DEPLOY-INSTRUCTIONS.md` - Step-by-step deployment guide

---

## ⚠️ Final Reminder

**SSG is NOT optional. It is a core requirement.**

Every page, every route, every update must maintain static HTML generation. If you're unsure whether a change affects SSG, test it locally before deploying.

**When in doubt:**
1. Build the project: `npm run build`
2. Check `dist/` folder for HTML files
3. Test with "View Page Source"
4. Run `node test-deployment.js`

If static HTML isn't generating, **STOP** and debug before proceeding.

---

Last Updated: 2025-10-19
