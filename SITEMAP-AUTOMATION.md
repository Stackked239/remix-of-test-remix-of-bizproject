# Automated Sitemap Generation System

## Overview

This project uses a **fully automated sitemap generation system** that reflects all current public routes without manual configuration. The sitemap is automatically updated whenever you run the build process.

## 🎯 How It Works

### 1. Route Discovery (`extract-routes.js`)
- Automatically scans `src/App.tsx` to find all route definitions
- Extracts route paths and saves them to `routes.json`
- No manual route configuration needed!

### 2. Sitemap Generation (`generate-sitemap.js`)
- Reads the extracted routes from `routes.json`
- **Auto-categorizes** routes based on patterns:
  - Blog posts: `/blog/*` → priority 0.7, monthly updates
  - Tools: `/biztools/*` → priority 0.8-0.9, weekly/monthly updates
  - Main pages: homepage, pricing, about → priority 0.9-1.0
  - Auth pages: login, register → priority 0.5
  - Legal pages: privacy, terms → priority 0.3
- **Auto-determines** file modification dates for accurate `<lastmod>`
- Generates valid XML with proper formatting (no BOM, no leading whitespace)
- Validates XML structure

### 3. Build Integration
The sitemap generation runs automatically during builds:

**Unix/Mac/Linux:**
```bash
./build-ssg.sh
```

**Windows:**
```bash
build-ssg.bat
```

**Manual generation only:**
```bash
node generate-sitemap.js
```

## 📁 Files & Directory Structure

```
project-root/
├── generate-sitemap.js      # Automated sitemap generator (ENHANCED)
├── extract-routes.js         # Route discovery from App.tsx
├── routes.json              # Auto-generated list of routes
├── build-ssg.sh             # Build script (includes sitemap generation)
├── build-ssg.bat            # Windows build script
├── public/
│   └── sitemap.xml          # Generated sitemap (served at /sitemap.xml)
└── dist/
    └── sitemap.xml          # Copy for production deployment
```

## 🚀 Adding New Content

### Adding New Pages
Just add routes to `src/App.tsx`:

```tsx
// src/App.tsx
<Routes>
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

**That's it!** The next build will automatically:
1. Detect the new route
2. Add it to `routes.json`
3. Include it in `sitemap.xml`
4. Assign appropriate priority based on the route pattern

### Adding Blog Posts

Create a new blog post file in `src/pages/blog/`:

```tsx
// src/pages/blog/NewPost.tsx
export default function NewPost() {
  return <article>...</article>;
}
```

Add the route to `src/App.tsx`:

```tsx
<Route path="/blog/new-post" element={<NewPost />} />
```

**Automatic behavior:**
- Priority: 0.7
- Changefreq: monthly
- Lastmod: File's actual modification date

### Adding Tools

Create tool pages in `src/pages/tools/` or similar:

```tsx
// src/pages/tools/NewTool.tsx
export default function NewTool() {
  return <div>...</div>;
}
```

Add to `src/App.tsx`:

```tsx
<Route path="/biztools/toolbox/new-tool" element={<NewTool />} />
```

**Automatic behavior:**
- Priority: 0.9 (toolbox pages are high priority)
- Changefreq: monthly
- Lastmod: File's actual modification date

## 🎨 Customizing Route Priorities

If you need custom priorities for specific routes, edit the `getRouteConfig()` function in `generate-sitemap.js`:

```javascript
function getRouteConfig(route) {
  // Add your custom route configuration
  if (route === '/special-page') {
    return { priority: 0.95, changefreq: 'daily' };
  }
  
  // Existing auto-categorization logic continues...
  if (route.startsWith('/blog/')) {
    return { priority: 0.7, changefreq: 'monthly' };
  }
  // ... etc
}
```

## 📊 Priority Guidelines

The system automatically assigns priorities based on SEO best practices:

| Route Type | Priority | Change Frequency | Example |
|------------|----------|------------------|---------|
| Homepage | 1.0 | Weekly | `/` |
| Key pages | 0.9 | Monthly | `/pricing`, `/about` |
| Blog listing | 0.9 | Weekly | `/blog` |
| Tools (toolbox) | 0.9 | Monthly | `/biztools/toolbox/*` |
| Tools (main) | 0.8 | Weekly | `/biztools` |
| Resources | 0.8 | Monthly | `/resources`, `/glossary-of-terms` |
| Blog posts | 0.7 | Monthly | `/blog/*` |
| Contact | 0.7 | Monthly | `/contact` |
| Default pages | 0.6 | Monthly | Any unmatched route |
| Auth pages | 0.5 | Monthly | `/login`, `/register` |
| Legal pages | 0.3 | Yearly | `/privacy`, `/terms` |

## ✅ Validation & Best Practices

### Automatic Validations
The generator ensures:
- ✅ No BOM (Byte Order Mark) in XML
- ✅ No leading whitespace before XML declaration
- ✅ Proper XML structure with correct namespaces
- ✅ Valid date formats (YYYY-MM-DD)
- ✅ Skips dynamic routes with wildcards or parameters

### Serving the Sitemap
The sitemap is automatically available at:
```
https://bizhealth.ai/sitemap.xml
```

### Submitting to Search Engines
After deployment, submit your sitemap to:

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to Sitemaps
4. Submit: `https://bizhealth.ai/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Navigate to Sitemaps
4. Submit: `https://bizhealth.ai/sitemap.xml`

### Robots.txt Integration
Ensure your `public/robots.txt` references the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://bizhealth.ai/sitemap.xml
```

## 🔧 Troubleshooting

### Sitemap not updating?
**Solution:**
```bash
# Clean and rebuild
rm routes.json
rm public/sitemap.xml
./build-ssg.sh
```

### New route not appearing?
**Checklist:**
1. ✅ Route added to `src/App.tsx`?
2. ✅ Route doesn't use wildcards (`*`) or parameters (`:id`)?
3. ✅ Ran the build script after adding the route?
4. ✅ Check `routes.json` to see if route was extracted

### File modification date incorrect?
The system maps routes to source files using these patterns:
- `/page` → `src/pages/Page.tsx`
- `/blog/post-name` → `src/pages/blog/post-name.tsx`
- `/nested/route` → `src/pages/nested/route/index.tsx`

If your file structure differs, update the `getFileLastModified()` function in `generate-sitemap.js`.

### Want to see generation statistics?
Run the generator manually:
```bash
node generate-sitemap.js
```

Output will show:
- Total URLs generated
- Breakdown by category (homepage, blog, tools, etc.)
- File paths
- Helpful tips

## 🔄 Deployment Workflow

### Development
```bash
# 1. Add new routes to src/App.tsx
# 2. Run build
./build-ssg.sh

# 3. Test locally
npm run preview

# 4. Verify sitemap
curl http://localhost:4173/sitemap.xml
```

### Production
The build process automatically:
1. Extracts all routes from App.tsx
2. Generates sitemap.xml with current dates
3. Copies sitemap to both `public/` and `dist/`
4. Deploys everything to production

**No manual steps required!**

## 📈 Monitoring & Maintenance

### Regular Tasks
- **Weekly**: Check Google Search Console for crawl errors
- **Monthly**: Review sitemap coverage in GSC
- **When adding routes**: Verify they appear in `routes.json` and `sitemap.xml`

### Automated Maintenance
The system automatically:
- Updates `lastmod` dates based on file modifications
- Assigns appropriate priorities to new routes
- Maintains valid XML structure
- Skips invalid routes (dynamic, wildcards)

## 🎓 Developer Notes

### Why This Approach?

**Pros:**
- ✅ Zero manual configuration for new routes
- ✅ Accurate modification dates from file system
- ✅ Auto-categorization based on proven SEO patterns
- ✅ Integrated into build process
- ✅ Validates XML to prevent search engine errors
- ✅ Works with static site generation (SSG)

**Alternatives Considered:**
- ❌ Manual sitemap.xml: Requires updates for every route change
- ❌ Dynamic route handler: Not suitable for SSG with Vite
- ❌ Next.js app/sitemap.ts: This project uses Vite + React, not Next.js

### Extending the System

To add new auto-categorization rules:

```javascript
// In generate-sitemap.js, add to getRouteConfig()

// Example: Special handling for case studies
if (route.startsWith('/case-studies/')) {
  return { priority: 0.85, changefreq: 'monthly' };
}

// Example: High priority for landing pages
if (route.match(/^\\/(landing|lp)\\/)) {
  return { priority: 0.95, changefreq: 'weekly' };
}
```

### Testing Changes

```bash
# 1. Modify generate-sitemap.js
# 2. Run generator
node generate-sitemap.js

# 3. Verify output
cat public/sitemap.xml

# 4. Validate XML
xmllint --noout public/sitemap.xml  # If xmllint is installed
```

## 📚 Additional Resources

- [Sitemaps.org Protocol](https://www.sitemaps.org/protocol.html)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [SEO Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

---

**Last Updated:** 2025-12-02  
**Maintained By:** BizHealth.ai Development Team  
**Questions?** Check the build logs or run `node generate-sitemap.js` for detailed output.
