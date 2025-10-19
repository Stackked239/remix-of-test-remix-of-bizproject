# Deployment Guide for BizHealth.ai

## 🚀 Netlify Deployment

### Prerequisites
- Netlify account connected to your GitHub repository
- Repository pushed to GitHub with all SSG files

### Automatic Deployment

Netlify will automatically:
1. Run `./build-ssg.sh` to generate static HTML files
2. Publish the `dist/` folder
3. Set up redirects for SPA routing
4. Apply security headers

### Manual Deployment

```bash
# 1. Build the site locally
./build-ssg.sh

# 2. Verify the build
node verify-ssg.js

# 3. Deploy to Netlify
netlify deploy --prod --dir=dist
```

## 📋 Netlify Configuration

### Build Settings (via UI or netlify.toml)

- **Build command:** `chmod +x build-ssg.sh && ./build-ssg.sh`
- **Publish directory:** `dist`
- **Node version:** `18`

These are already configured in `netlify.toml` - no manual setup needed!

### Environment Variables

If you need environment variables (API keys, etc.), add them in:
- Netlify Dashboard → Site Settings → Environment Variables

Example:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## ✅ Post-Deployment Verification

### 1. Check Pre-rendered Pages

Visit these URLs and check "View Page Source" (Ctrl+U):

```
https://your-site.netlify.app/
https://your-site.netlify.app/blog/warning-signs-business
https://your-site.netlify.app/blog/financial-health-metrics
https://your-site.netlify.app/about
https://your-site.netlify.app/pricing
```

**Expected:** Full HTML content visible in source, including:
- Complete text content
- H1, H2, H3 headings
- Meta tags (title, description)
- Structured content

**Not expected:** Empty `<div id="root"></div>`

### 2. Test Navigation

- Click through internal links
- Use browser back/forward buttons
- Refresh on any page (should load correctly)
- Test deep links (share a blog post URL)

### 3. Test SEO

**Google Search Console:**
1. Submit sitemap: `https://your-site.netlify.app/sitemap.xml`
2. Request indexing for key pages
3. Monitor crawl status

**Manual Tests:**
```bash
# Test with curl (should return full HTML)
curl https://your-site.netlify.app/blog/warning-signs-business | grep -i "cash flow"

# Test meta tags
curl -s https://your-site.netlify.app/ | grep -i "meta name=\"description\""
```

### 4. Performance Testing

**Lighthouse:**
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: 90+
   - SEO: 95+
   - Accessibility: 90+
   - Best Practices: 90+

**PageSpeed Insights:**
- Visit: https://pagespeed.web.dev/
- Enter your site URL
- Check both mobile and desktop scores

## 🐛 Troubleshooting

### Issue: Build fails on Netlify

**Check build logs:**
1. Netlify Dashboard → Deploys → Failed deploy
2. View deploy log
3. Look for errors in:
   - Route extraction (`extract-routes.js`)
   - Vite build (`npm run build`)
   - Pre-rendering (`prerender.js`)

**Common fixes:**
- Ensure all dependencies are in `package.json` (not just dev)
- Check Node version matches (should be 18)
- Verify Puppeteer can launch (check build logs)

### Issue: Pages show empty content

**Possible causes:**
1. Pre-rendering failed silently
2. JavaScript required for content
3. API calls failing during build

**Fix:**
- Check `prerender.js` logs for errors
- Increase wait time in prerender script
- Ensure content doesn't depend on runtime API calls

### Issue: 404 on nested routes

**Possible causes:**
1. Redirect rules not working
2. File structure incorrect

**Fix:**
- Verify `netlify.toml` redirects are configured
- Check `dist/` folder structure locally
- Ensure each route has `index.html` in correct folder

### Issue: Images not loading

**Possible causes:**
1. Image paths incorrect for production
2. Images not copied to dist folder

**Fix:**
- Use relative paths or absolute paths with domain
- Verify images are in `dist/assets/`
- Check browser console for 404 errors

## 📊 Monitoring

### Analytics

Add to `index.html` if not already present:
- Google Analytics
- Google Search Console verification
- Facebook Pixel (if needed)

### Uptime Monitoring

Consider using:
- UptimeRobot (free tier available)
- Netlify Analytics (built-in, paid)
- Google Search Console (free)

### Error Tracking

Consider adding:
- Sentry (error tracking)
- LogRocket (session replay)
- Hotjar (heatmaps)

## 🔄 Continuous Deployment

Every push to your main branch will:
1. Trigger Netlify build
2. Run SSG pre-rendering
3. Deploy automatically
4. Update live site

### Deploy Previews

Pull requests automatically get preview deployments:
- Test changes before merging
- Share preview links with team
- Verify SSG works correctly

## 🎯 Optimization Tips

### 1. Reduce Build Time

```toml
# In netlify.toml, add build plugins cache
[build]
  command = "chmod +x build-ssg.sh && ./build-ssg.sh"
  publish = "dist"

[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = ["node_modules", ".next/cache"]
```

### 2. Optimize Images

- Use WebP format where possible
- Compress images before committing
- Use CDN for large images

### 3. Split Routes

For very large sites, consider:
- Incremental builds (rebuild only changed pages)
- Separate blog from main site
- Use Netlify's distributed persistent rendering

## 🔗 Resources

- [Netlify Docs](https://docs.netlify.com/)
- [SSG-README.md](./SSG-README.md) - Full SSG documentation
- [SSG-QUICK-START.md](./SSG-QUICK-START.md) - Quick reference

## 📞 Support Checklist

Before asking for help:
- [ ] Build works locally (`./build-ssg.sh`)
- [ ] Verification passes (`node verify-ssg.js`)
- [ ] Preview works locally (`npm run preview`)
- [ ] Git is up to date and pushed
- [ ] Environment variables set in Netlify (if needed)
- [ ] Build logs checked for specific errors
- [ ] Tried clearing Netlify cache and rebuilding

## ✅ Launch Checklist

- [ ] SSG build successful locally
- [ ] All routes verified
- [ ] SEO meta tags on all pages
- [ ] Images optimized
- [ ] Sitemap.xml submitted
- [ ] robots.txt configured
- [ ] Analytics installed
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate active
- [ ] 404 page working
- [ ] Redirects tested
- [ ] Performance audit passed
- [ ] Mobile responsive
- [ ] Browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Social media sharing tested (Open Graph)
