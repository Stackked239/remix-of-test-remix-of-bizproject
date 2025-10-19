# SEO Quick Guide

## 🚀 Quick Commands

```bash
# Generate sitemap
node generate-sitemap.js

# Run SEO audit
node seo-audit.js

# Check image optimization
node optimize-images.js

# Full build with SEO
./build-ssg.sh
```

## 📝 Adding SEO to a New Page

### 1. Import Components
```tsx
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
```

### 2. Add SEO Meta Tags
```tsx
<SEO 
  title="Page Title (under 60 chars)"
  description="Page description under 160 characters"
  keywords="keyword1, keyword2, keyword3"
  canonical="https://bizhealth.ai/page-url"
  ogType="website" // or "article" for blog posts
  ogImage="https://bizhealth.ai/og-image.jpg"
/>
```

### 3. Add Structured Data

**For Homepage/Main Pages:**
```tsx
<StructuredData type="organization" />
```

**For Blog Posts:**
```tsx
<StructuredData 
  type="article"
  headline="Article Title"
  description="Article description"
  image={articleImage}
  datePublished="2025-09-12T00:00:00Z"
  author="BizHealth.ai Research Team"
  url="https://bizhealth.ai/blog/post-slug"
/>
```

**For FAQ Pages:**
```tsx
<StructuredData 
  type="faq"
  questions={[
    { 
      question: "What is BizHealth.ai?", 
      answer: "BizHealth.ai is an AI-powered business health assessment platform..." 
    },
    // ... more questions
  ]}
/>
```

## ✅ SEO Checklist for New Pages

- [ ] SEO component added with unique title
- [ ] Meta description under 160 characters
- [ ] Canonical URL specified
- [ ] Open Graph image set
- [ ] Structured data added
- [ ] Single H1 tag on page
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] All images have alt text
- [ ] Images use loading="lazy" (below fold)
- [ ] Internal links to related pages
- [ ] URL is clean and descriptive

## 🖼️ Image Optimization

```tsx
// ✅ Good
<img 
  src={image} 
  alt="Descriptive alt text for SEO and accessibility"
  loading="lazy"
  width={800}
  height={600}
/>

// ❌ Bad
<img src={image} />
```

## 🔍 SEO Best Practices

### Title Tags
- Keep under 60 characters
- Include target keyword
- Make unique for each page
- Format: "Primary Keyword - BizHealth.ai"

### Meta Descriptions
- Keep under 160 characters
- Include target keyword naturally
- Include call-to-action
- Make unique for each page

### Headings
- One H1 per page (main topic)
- Use H2 for major sections
- Use H3 for subsections
- Include keywords naturally

### URLs
- Use clean, readable URLs
- Include target keywords
- Use hyphens (not underscores)
- Keep short and descriptive

## 📊 Testing SEO

### After Making Changes:

1. **Build and verify:**
   ```bash
   ./build-ssg.sh
   node verify-ssg.js
   ```

2. **Check page source:**
   ```bash
   npm run preview
   # Visit page, press Ctrl+U
   # Verify: meta tags, structured data, full content
   ```

3. **Test with tools:**
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Lighthouse (DevTools → Lighthouse)
   - PageSpeed Insights: https://pagespeed.web.dev/

## 🎯 After Deployment

### Immediate (Day 1):
1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Request indexing for homepage
4. Request indexing for key pages

### Week 1:
- Monitor Google Search Console for crawl errors
- Check that pages are being indexed
- Verify structured data is recognized

### Monthly:
- Run Lighthouse audits
- Check search rankings for target keywords
- Review Google Search Console performance
- Update meta descriptions for low CTR pages

## 🛠️ Common Issues

### Issue: Page not indexed
**Solution:** 
- Submit URL to Google Search Console
- Check robots.txt isn't blocking
- Verify sitemap includes the URL
- Ensure page has unique content

### Issue: Wrong title in search results
**Solution:**
- Check title tag is under 60 characters
- Ensure title is unique
- Wait for Google to recrawl (or request)

### Issue: No rich snippets
**Solution:**
- Test with Rich Results Test tool
- Verify structured data is valid JSON-LD
- Ensure all required fields are present
- Wait 1-2 weeks for Google to process

## 📈 Monitoring

### Google Search Console
- Total impressions
- Click-through rate (CTR)
- Average position
- Crawl errors
- Index coverage

### Key Metrics to Track
- Organic traffic (Google Analytics)
- Keyword rankings (Google Search Console)
- Page speed (Lighthouse)
- Core Web Vitals (Search Console)

## 🎉 Quick Wins

1. **Add alt text to all images** - Easy accessibility and SEO boost
2. **Internal linking** - Link related blog posts together
3. **Update old content** - Refresh dates and improve quality
4. **Optimize images** - Compress and use WebP format
5. **Fix broken links** - Run link checker monthly

---

**Remember:** SEO is ongoing. Keep creating quality content, monitor performance, and make improvements based on data!
