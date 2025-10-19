# SSG Quick Start Guide

## 🚀 Build Static Site

**Unix/Mac/Linux:**
```bash
chmod +x build-ssg.sh && ./build-ssg.sh
```

**Windows:**
```bash
build-ssg.bat
```

## ✅ Verify Build

```bash
node verify-ssg.js
```

## 🔍 Check Specific Route

1. Build the site
2. Open: `dist/blog/your-post-name/index.html`
3. Search for content (should see full HTML)

## 📊 What You'll See

```
🔍 Extracting routes from App.tsx...
Found 47 routes to prerender

📦 Building Vite app...
✅ Vite build complete!

🎨 Prerendering all routes...
[1/47] Prerendering: /
  ✅ Success: dist/index.html (45.23 KB)
[2/47] Prerendering: /blog/warning-signs-business
  ✅ Success: dist/blog/warning-signs-business/index.html (38.91 KB)
...
```

## 🎯 Expected Output Structure

```
dist/
├── index.html
├── blog/
│   ├── warning-signs-business/
│   │   └── index.html       ← Full HTML with content
│   ├── financial-health-metrics/
│   │   └── index.html       ← Full HTML with content
│   └── ...
```

## ⚡ Quick Checks

### Check if SSG worked:

```bash
# 1. File exists?
ls dist/blog/warning-signs-business/index.html

# 2. Contains content?
grep -i "cash flow" dist/blog/warning-signs-business/index.html

# 3. Has proper structure?
grep -i "<h1" dist/blog/warning-signs-business/index.html
```

### Test locally:

```bash
npm run preview
# Open http://localhost:4173
# View Page Source (Ctrl+U)
# Should see full HTML, not empty <div id="root">
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| `routes.json not found` | Run `node extract-routes.js` first |
| `dist/ folder not found` | Run `npm run build` first |
| Files are empty | Check prerender logs for errors |
| Puppeteer won't launch | Install Chromium: `sudo apt install chromium-browser` |

## 📝 Adding New Pages

1. Add route in `src/App.tsx`
2. Run `./build-ssg.sh`
3. Done! New route is automatically pre-rendered

## 🔗 Resources

- Full docs: `SSG-README.md`
- Route extraction: `extract-routes.js`
- Pre-rendering: `prerender.js`
- Verification: `verify-ssg.js`
