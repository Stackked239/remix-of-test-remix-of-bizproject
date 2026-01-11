# OG Image Checklist for New Pages & Blog Posts

## Quick Reference

When creating new pages or blog posts, follow this checklist to ensure proper social sharing:

### 1. Generate OG Image First

Before adding a new page, generate its OG image:
- **Location**: `public/og-images/`
- **Naming**: `og-[page-slug].jpg` (e.g., `og-my-new-blog-post.jpg`)
- **Size**: Under 80KB for optimal loading
- **Dimensions**: 1200x630 pixels (1.91:1 ratio)
- **Style**: Dashboard preview, screenshot, or visual representation - **NO text overlays**

### 2. Add SEO Component with ogImage Prop

```tsx
import SEO from "@/components/SEO";

<SEO
  title="Your Page Title"
  description="Your meta description under 160 characters."
  ogImage="/og-images/og-your-page-slug.jpg"
  // For blog posts, add these:
  ogType="article"
  articlePublishedTime="2026-01-11"
  articleAuthor="BizHealth.ai Research Team"
/>
```

### 3. Correct ogImage Path Format

✅ **CORRECT**: `/og-images/og-my-post.jpg`
❌ **WRONG**: `https://bizhealth.ai/assets/images/my-post.jpg`
❌ **WRONG**: `../../assets/images/my-post.jpg`
❌ **WRONG**: Missing ogImage prop entirely

### 4. Run SEO Audit Before Publishing

```bash
npm run seo-audit
```

This validates:
- OG image paths are correct format
- Image files exist in `public/og-images/`
- All blog posts have ogImage props
- No deprecated URL formats

### 5. Verify After Deployment

Test with Facebook and LinkedIn debuggers:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Blog Post Template

```tsx
import SEO from "@/components/SEO";
import BlogHeroSection from "@/components/BlogHeroSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const MyNewBlogPost = () => {
  return (
    <>
      <SEO
        title="My Blog Post Title"
        description="Compelling description for search results."
        ogImage="/og-images/og-my-blog-post.jpg"
        ogType="article"
        articlePublishedTime="2026-01-11"
        articleAuthor="BizHealth.ai Research Team"
      />
      
      <BlogHeroSection
        title="My Blog Post Title"
        author="BizHealth.ai Research Team"
        publishDate="January 11, 2026"
        readTime="8 min read"
        heroImage={heroImage}
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

## Common Mistakes to Avoid

1. **Using old URL format**: `https://bizhealth.ai/assets/...` → Use `/og-images/...`
2. **Forgetting ogImage prop**: Always include it, especially for blog posts
3. **Text overlays on images**: OG images should be visual previews only
4. **Large file sizes**: Keep under 80KB for fast social card loading
5. **Not running seo-audit**: Always validate before publishing
