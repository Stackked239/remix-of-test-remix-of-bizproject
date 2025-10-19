# Netlify Deployment Checklist

## 🚀 Pre-Deployment

### Local Testing
- [ ] Run `./build-ssg.sh` successfully
- [ ] Run `node verify-ssg.js` - all routes pass
- [ ] Run `npm run preview` - test locally
- [ ] Run `node test-deployment.js http://localhost:4173` - all tests pass
- [ ] Check `dist/` folder structure matches URL structure
- [ ] Verify nested blog posts have their own folders

### Code Review
- [ ] All routes added to `src/App.tsx`
- [ ] SEO component added to all pages
- [ ] Meta tags unique for each page
- [ ] Images have alt tags
- [ ] No console errors in browser
- [ ] Mobile responsive design verified

### Files Check
- [ ] `netlify.toml` exists and configured
- [ ] `_redirects` file present (backup)
- [ ] `_headers` file present (backup)
- [ ] `.nvmrc` specifies Node 18
- [ ] `robots.txt` in public folder
- [ ] `sitemap.xml` in public folder

## 🔧 Netlify Setup

### Initial Configuration
1. [ ] Connect GitHub repository to Netlify
2. [ ] Site name configured (Settings → General → Site details)
3. [ ] Build settings verified:
   - Build command: `chmod +x build-ssg.sh && ./build-ssg.sh`
   - Publish directory: `dist`
   - Node version: 18 (via .nvmrc)

### Environment Variables (if needed)
- [ ] `VITE_SUPABASE_URL` (if using Supabase)
- [ ] `VITE_SUPABASE_ANON_KEY` (if using Supabase)
- [ ] Any other API keys or secrets

### Domain Setup (if applicable)
- [ ] Custom domain added
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] HTTPS redirect enabled
- [ ] www redirect configured (if needed)

## 📦 First Deployment

### Trigger Build
- [ ] Push to main branch OR
- [ ] Manual deploy from Netlify dashboard

### Monitor Build
1. [ ] Check build log for errors
2. [ ] Verify "Building site" step completes
3. [ ] Verify "Prerendering all routes" completes
4. [ ] Check for any Puppeteer errors
5. [ ] Confirm "Site is live" message

### Build Log Checkpoints
```
✅ Extracting routes from App.tsx
✅ Found 47 routes to prerender
✅ Building Vite app
✅ Vite build complete
✅ Prerendering all routes
✅ [47/47] routes prerendered
✅ Site is live
```

## ✅ Post-Deployment Testing

### Visual Check
Visit your site and check:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All pages load without 404s
- [ ] Images display correctly
- [ ] Styles applied correctly
- [ ] Mobile view looks good

### Technical Verification

**View Page Source (Ctrl+U) on:**
- [ ] Homepage: Full HTML visible
- [ ] Blog listing: Full HTML visible
- [ ] Blog post 1: Full HTML visible
- [ ] Blog post 2: Full HTML visible
- [ ] About page: Full HTML visible

**Check for:**
- [ ] Content visible in source (not just empty divs)
- [ ] H1, H2, H3 tags present
- [ ] Meta description tags present
- [ ] Open Graph tags present
- [ ] Structured data (JSON-LD) present

### Navigation Testing
- [ ] Click all navigation links
- [ ] Test browser back button
- [ ] Test browser forward button
- [ ] Refresh on nested page (should work)
- [ ] Test deep link (share blog post URL)
- [ ] Test 404 page (visit non-existent route)

### Performance Testing

**Lighthouse Audit:**
1. [ ] Open DevTools (F12)
2. [ ] Go to Lighthouse tab
3. [ ] Run audit (Mobile + Desktop)
4. [ ] Check scores:
   - Performance: 90+ ✅
   - SEO: 95+ ✅
   - Accessibility: 90+ ✅
   - Best Practices: 90+ ✅

**PageSpeed Insights:**
- [ ] Test on https://pagespeed.web.dev/
- [ ] Mobile score: 90+
- [ ] Desktop score: 95+

### SEO Testing

**Google Search Console:**
1. [ ] Add property (if not already added)
2. [ ] Submit sitemap: `https://your-site.com/sitemap.xml`
3. [ ] Request indexing for homepage
4. [ ] Request indexing for key blog posts

**Meta Tags:**
```bash
# Test with curl
curl -s https://your-site.com/ | grep -i "meta"
```
- [ ] Title tag present and unique
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present

**Robots.txt:**
- [ ] Visit `https://your-site.com/robots.txt`
- [ ] Verify correct content
- [ ] Check sitemap URL listed

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Security Headers
Check headers using: https://securityheaders.com/

- [ ] `X-Frame-Options` present
- [ ] `X-Content-Type-Options` present
- [ ] `X-XSS-Protection` present
- [ ] `Referrer-Policy` present
- [ ] Security score: A or A+

## 🐛 Troubleshooting

### If Build Fails

**Check:**
1. [ ] Build log for specific error
2. [ ] Node version (should be 18)
3. [ ] All dependencies installed
4. [ ] Environment variables set (if needed)
5. [ ] Puppeteer can launch (check for system dependencies)

**Try:**
1. [ ] Clear cache and retry deploy
2. [ ] Check if build works locally
3. [ ] Review recent commits for breaking changes

### If Pages Show Empty Content

**Check:**
1. [ ] Prerender log - did all routes complete?
2. [ ] File structure in deploy - are HTML files present?
3. [ ] View deploy log for warnings

**Try:**
1. [ ] Increase wait time in `prerender.js`
2. [ ] Check for runtime errors in browser console
3. [ ] Verify content doesn't require external API calls

### If 404 on Nested Routes

**Check:**
1. [ ] `netlify.toml` redirects configured
2. [ ] File structure: `/blog/post-name/index.html` exists
3. [ ] Route listed in `routes.json`

**Try:**
1. [ ] Verify locally first
2. [ ] Check deploy log for prerender errors
3. [ ] Test redirect rules manually

## 📊 Monitoring (Post-Launch)

### Week 1
- [ ] Check Google Search Console daily
- [ ] Monitor Netlify Analytics
- [ ] Check for crawl errors
- [ ] Verify pages being indexed

### Ongoing
- [ ] Weekly SEO performance review
- [ ] Monthly Lighthouse audits
- [ ] Monitor uptime
- [ ] Check for broken links
- [ ] Review analytics data

## 🎯 Optimization

### After Initial Launch
- [ ] Set up CDN for images (if not already)
- [ ] Enable Netlify Analytics (paid)
- [ ] Add error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Configure automatic social sharing

### Content Updates
When adding new blog posts:
1. [ ] Add route to `src/App.tsx`
2. [ ] Add SEO component to new page
3. [ ] Build locally and verify
4. [ ] Push to GitHub (triggers deploy)
5. [ ] Verify new page after deploy
6. [ ] Submit new URL to Google Search Console

## ✅ Final Verification

Before marking as complete:
- [ ] All checklist items above completed
- [ ] No errors in Netlify deploy log
- [ ] All pages accessible and render correctly
- [ ] SEO meta tags working
- [ ] Performance scores acceptable
- [ ] Team reviewed and approved
- [ ] Documentation updated
- [ ] Deployment guide shared with team

## 🎉 Launch Complete!

Congratulations! Your SSG site is live on Netlify.

**Next Steps:**
1. Monitor Google Search Console for indexing
2. Share site with stakeholders
3. Begin marketing and promotion
4. Track analytics and performance
5. Plan content updates and improvements

---

**Quick Test Commands:**
```bash
# Test local build
./build-ssg.sh && npm run preview

# Test production deployment
node test-deployment.js https://your-site.netlify.app

# Verify SEO
curl -s https://your-site.netlify.app/ | grep -i "meta name=\"description\""
```
