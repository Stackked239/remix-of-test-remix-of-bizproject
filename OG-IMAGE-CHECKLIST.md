# OG Image Standards for Blog Posts

## CRITICAL: OG Image = Hero Image

**For ALL blog posts, the OG image MUST be generated from the hero image at the time of blog post creation.**

This ensures:
- Visual consistency between social sharing and article content
- Automated workflow with no manual OG image creation
- Single source of truth for featured imagery

---

## Quick Reference

### 1. Hero Image First

When creating a new blog post:
1. Create/select the hero image and save to `src/assets/` or `src/assets/images/`
2. Import it in the blog post: `import heroImage from "@/assets/images/your-hero.jpg"`
3. Generate the OG image from the hero image

### 2. OG Image Generation

**Location**: `public/og-images/`
**Naming**: `og-[page-slug].jpg` (e.g., `og-my-new-blog-post.jpg`)
**Dimensions**: 1200x630 pixels (1.91:1 ratio)
**Size**: Under 80KB for optimal loading
**Source**: Generated from the hero image (cropped/resized)
**Style**: NO text overlays - visual preview only

### 3. Path Format (CRITICAL)

✅ **CORRECT**: `/og-images/og-my-post.jpg` (relative path)
❌ **WRONG**: `https://bizhealth.ai/og-images/...` (full URL)
❌ **WRONG**: `../../assets/images/my-post.jpg` (asset path)
❌ **WRONG**: Missing ogImage prop entirely

### 4. SEO Component Usage

```tsx
import SEO from "@/components/SEO";
import heroImage from "@/assets/images/my-blog-hero.jpg";

<SEO
  title="Your Page Title"
  description="Your meta description under 160 characters."
  ogImage="/og-images/og-your-page-slug.jpg"
  ogType="article"
  articlePublishedTime="2026-01-19"
  articleAuthor="BizHealth.ai Research Team"
/>
```

---

## Blog Post Creation Workflow

### Step 1: Create Hero Image
```
Location: src/assets/images/[descriptive-name].jpg
Size: High quality for display (will be compressed for OG)
```

### Step 2: Generate OG Image from Hero
```bash
# Using the generation script (requires sharp)
node scripts/generate-og-images.js

# Or manually using image editing:
# - Crop hero image to 1200x630 (1.91:1 ratio)
# - Save as JPEG under 80KB
# - Place in public/og-images/og-[slug].jpg
```

### Step 3: Create Blog Post Component
```tsx
import SEO from "@/components/SEO";
import BlogHeroSection from "@/components/BlogHeroSection";
import SocialShareButtons from "@/components/SocialShareButtons";
import heroImage from "@/assets/images/my-blog-hero.jpg";

const MyNewBlogPost = () => {
  return (
    <>
      <SEO
        title="My Blog Post Title"
        description="Compelling description for search results."
        ogImage="/og-images/og-my-blog-post.jpg"  // Generated from heroImage
        ogType="article"
        articlePublishedTime="2026-01-19"
        articleAuthor="BizHealth.ai Research Team"
      />
      
      <BlogHeroSection
        title="My Blog Post Title"
        author="BizHealth.ai Research Team"
        publishDate="January 19, 2026"
        readTime="8 min read"
        heroImage={heroImage}  // Same source as OG image
        heroImageAlt="Descriptive alt text"
        categories={[{ label: "Category", href: "/blog/category" }]}
        shareDescription="Description for social sharing."
      />
      
      {/* Content */}
      
      <SocialShareButtons
        title="My Blog Post Title"
        description="Description for sharing."
      />
    </>
  );
};
```

---

## Validation

### Before Publishing
```bash
npm run seo-audit
```

This validates:
- OG image paths use relative format (`/og-images/...`)
- Image files exist in `public/og-images/`
- All blog posts have ogImage props
- No deprecated full URL formats

### After Deployment
Test with social debuggers:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Automation Scripts

### Audit Missing OG Images
```bash
node scripts/audit-og-images.js
```

### Generate OG Images from Hero Images
```bash
# Preview what would be generated
node scripts/generate-og-images.js --dry-run

# Generate missing OG images
node scripts/generate-og-images.js
```

**Requirements**: `npm install sharp`

---

## Common Mistakes to Avoid

1. **Using full URLs**: `https://bizhealth.ai/og-images/...` → Use `/og-images/...`
2. **Forgetting ogImage prop**: Always include it for all blog posts
3. **Text overlays on images**: OG images should be visual previews only
4. **Large file sizes**: Keep under 80KB for fast social card loading
5. **Not matching hero image**: OG image must be generated from the hero image
6. **Not running seo-audit**: Always validate before publishing
7. **Creating OG images separately**: Always derive from hero image

---

## Summary

| Aspect | Standard |
|--------|----------|
| **OG Image Source** | Generated from hero image |
| **Path Format** | Relative: `/og-images/og-[slug].jpg` |
| **Dimensions** | 1200 x 630 pixels |
| **Max File Size** | 80KB |
| **Text Overlays** | None |
| **When Created** | At blog post creation time |
