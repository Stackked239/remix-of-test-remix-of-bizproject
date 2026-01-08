# Static Site Generation (SSG) for BizHealth.ai

This project uses a custom SSG solution to pre-render all routes, making the site fully crawlable by search engines.

## 🎯 Overview

The SSG system automatically:
1. Extracts all routes from `src/App.tsx`
2. Builds the Vite application
3. Pre-renders each route to static HTML
4. Creates proper folder structure (`/blog/post-name/index.html`)
5. Verifies all files were created correctly

## 📋 Files

- **`extract-routes.js`** - Automatically extracts routes from App.tsx
- **`prerender.js`** - Renders each route to static HTML using Puppeteer
- **`verify-ssg.js`** - Verifies all routes were successfully pre-rendered
- **`build-ssg.sh`** - Build script for Unix/Mac/Linux
- **`build-ssg.bat`** - Build script for Windows
- **`routes.json`** - Generated list of routes (created during build)

## 🚀 Usage

### Full Build with SSG

**Unix/Mac/Linux:**
```bash
chmod +x build-ssg.sh
./build-ssg.sh
```

**Windows:**
```bash
build-ssg.bat
```

### Manual Step-by-Step

```bash
# 1. Extract routes
node extract-routes.js

# 2. Build the app
npm run build

# 3. Pre-render all routes
node prerender.js

# 4. Verify the build
node verify-ssg.js
```

## 📁 Output Structure

After building, your `dist/` folder will look like:

```
dist/
├── index.html                          (root page)
├── about/
│   └── index.html
├── blog/
│   ├── index.html                      (blog listing)
│   ├── warning-signs-business/
│   │   └── index.html
│   ├── financial-health-metrics/
│   │   └── index.html
│   └── ... (all blog posts)
├── pricing/
│   └── index.html
└── ... (all other routes)
```

## 🔍 Verification

The `verify-ssg.js` script checks:
- ✅ All route files exist
- ✅ Files contain actual content (not just skeleton)
- ✅ Files contain proper headings (H1 tags)
- ✅ Files are reasonable size (>5KB)

Run verification:
```bash
node verify-ssg.js
```

## 🐛 Troubleshooting

### Issue: Routes not pre-rendering

**Solution:**
1. Make sure you run `npm run build` first
2. Check that `routes.json` was created
3. Look for errors in the prerender output

### Issue: Nested routes missing

**Solution:**
- The `extract-routes.js` script should automatically find all routes in App.tsx
- If a route is missing, verify it's in the `<Routes>` component
- Routes with wildcards (*) or parameters (:id) are skipped

### Issue: Files exist but show empty content

**Solution:**
- Check if JavaScript is required to render content
- Ensure the `app-rendered` event is fired (see `src/main.tsx`)
- Increase wait time in `prerender.js` if needed

### Issue: Puppeteer fails to launch

**Solution:**
```bash
# Install system dependencies (Ubuntu/Debian)
sudo apt-get install -y chromium-browser

# Or specify Chrome executable
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser node prerender.js
```

## 🔧 Configuration

### Adjust Wait Time

In `prerender.js`, modify the timeout:

```javascript
// Wait longer for heavy pages
await page.waitForTimeout(3000); // Default is 1000ms
```

### Exclude Routes

In `extract-routes.js`, add filtering logic:

```javascript
if (!routePath.includes('*') && 
    !routePath.includes(':') && 
    !routePath.includes('/admin')) {  // Skip admin pages
  routes.push(routePath);
}
```

## 📊 SEO Benefits

After SSG, your pages will:
- ✅ Show full HTML content in "View Page Source"
- ✅ Be fully crawlable by all search engines (Google, Bing, DuckDuckGo)
- ✅ Have proper meta tags (title, description, Open Graph)
- ✅ Display content without JavaScript enabled
- ✅ Load faster with pre-rendered HTML

## 🎨 Adding New Routes

When you add a new route to `src/App.tsx`:

1. The route will be automatically detected during the next build
2. No manual configuration needed
3. Just run `./build-ssg.sh` again

Example:
```tsx
// src/App.tsx
<Route path="/new-page" element={<NewPage />} />
```

The next build will automatically pre-render `/new-page/index.html`

## 📈 Performance Tips

1. **Parallel Rendering**: Adjust `maxConcurrentRoutes` in prerender.js (currently 4)
2. **Caching**: Consider using a CDN to serve pre-rendered pages
3. **Incremental Builds**: Only re-render changed pages (requires custom logic)

## 🔗 Integration with Deployment

Most hosting platforms (Netlify, Vercel, Cloudflare Pages) support static sites:

```bash
# Build command
./build-ssg.sh

# Publish directory
dist
```

## ✅ Best Practices

1. **Always verify builds**: Run `node verify-ssg.js` before deployment
2. **Test locally**: Use `npm run preview` to test the static build
3. **Monitor file sizes**: Large HTML files may need optimization
4. **Update regularly**: Re-build when adding new routes or content
5. **Check 404s**: Ensure all internal links point to existing routes

## 📞 Support

For issues or questions:
- Check the Puppeteer logs during pre-rendering
- Verify routes.json contains all expected routes
- Test routes individually: `http://localhost:3000/your-route`
