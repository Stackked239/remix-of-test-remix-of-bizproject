# Blog Post Checklist & Standards

This document outlines the required components and best practices for all blog posts on BizHealth.ai.

## Required Components

Every blog post **MUST** include the following:

### 1. Imports (Required)

```tsx
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShareButtons from "@/components/SocialShareButtons";
```

### 2. SEO Component

```tsx
<SEO 
  title="Your Blog Title | BizHealth.ai"
  description="Meta description under 160 characters with target keyword."
  keywords="keyword1, keyword2, keyword3"
  canonical="https://bizhealth.ai/blog/your-slug"
  ogType="article"
  ogImage="/og-images/og-your-slug.jpg"
  articlePublishedTime="2025-MM-DD"
  articleModifiedTime="2025-MM-DD"
  articleAuthor="BizHealth.ai Research Team"
/>
```

**SEO Requirements:**
- Title: Under 60 characters, include main keyword
- Description: Under 160 characters, include target keyword naturally
- Keywords: 5-10 relevant terms
- Canonical: Full production URL
- OG Image: Create a unique 1200x630 image in `/public/og-images/`

### 3. StructuredData Component

```tsx
<StructuredData 
  type="blogPosting"
  headline="Full Article Headline"
  description="Article description for search engines"
  image="https://bizhealth.ai/og-images/og-your-slug.jpg"
  datePublished="2025-MM-DD"
  dateModified="2025-MM-DD"
  author="BizHealth.ai Research Team"
  url="https://bizhealth.ai/blog/your-slug"
  keywords={["keyword1", "keyword2", "keyword3"]}
/>
```

### 4. SocialShareButtons Component

Place after the article header/meta information (author, date, read time):

```tsx
{/* Social Share Buttons */}
<SocialShareButtons 
  title="Your Full Article Title"
  description="Brief compelling description for email shares."
  className="mb-8"
/>
```

**Placement Guidelines:**
- Place after author/date metadata
- Before the hero image
- Use `className="mb-8"` for consistent spacing

### 5. Article Structure

```tsx
<article>
  {/* Breadcrumb Navigation */}
  <nav>...</nav>
  
  {/* Categories/Tags */}
  <div className="flex flex-wrap gap-2">...</div>
  
  {/* Title (H1) */}
  <h1>Single H1 with main keyword</h1>
  
  {/* Meta Info: Author, Date, Read Time */}
  <div>...</div>
  
  {/* Social Share Buttons */}
  <SocialShareButtons ... />
  
  {/* Hero Image with alt text */}
  <figure>
    <img alt="Descriptive alt with keywords" />
  </figure>
  
  {/* Article Content with semantic HTML */}
  <div className="prose prose-lg">
    <p>Opening paragraph...</p>
    <h2>Section headings</h2>
    ...
  </div>
</article>
```

### 6. RelatedArticles Component

Place at the bottom of the article, before the footer:

```tsx
<RelatedArticles 
  articles={[
    {
      title: "Related Article Title",
      slug: "related-article-slug",
      category: "Category Name",
      excerpt: "Brief description."
    },
    // ... 2-3 related articles
  ]}
/>
```

### 7. GlobalFooter Component

```tsx
<GlobalFooter />
```

## Hero Image Requirements

- **Format:** JPG or WebP preferred
- **Location:** Save in `src/assets/`
- **Alt text:** Descriptive, include relevant keywords
- **Loading:** `loading="eager"` for hero images
- **Responsive:** Full width with proper aspect ratio

## OG Image Requirements

- **Dimensions:** 1200x630 pixels
- **Format:** JPG
- **Location:** `/public/og-images/og-{slug}.jpg`
- **Content:** Include article title, branding, relevant imagery

## File Naming Convention

- **Component file:** `src/pages/blog/YourArticleTitle.tsx`
- **Use PascalCase** for file names
- **Hero image:** `your-article-keyword-optimized.jpg`
- **OG image:** `og-your-slug.jpg`

## Route Registration

Add route to `src/App.tsx`:

```tsx
<Route path="/blog/your-slug" element={<YourArticleTitle />} />
```

## BlogPostTemplate (Alternative)

For simpler posts, use the `BlogPostTemplate` component:

```tsx
import BlogPostTemplate from "@/components/blog/BlogPostTemplate";

const YourBlogPost = () => {
  return (
    <BlogPostTemplate
      title="Your Blog Title"
      description="Meta description"
      publishedDate="2025-MM-DD"
      author="BizHealth.ai Research Team"
      heroImage={heroImageImport}
      heroImageAlt="Descriptive alt text"
      category="Business Strategy"
      readTime="10 min read"
      canonical="https://bizhealth.ai/blog/your-slug"
      ogImage="/og-images/og-your-slug.jpg"
      keywords={["keyword1", "keyword2"]}
    >
      {/* Article content goes here */}
    </BlogPostTemplate>
  );
};
```

## Pre-Publish Checklist

Before publishing, verify:

- [ ] SEO component with all required props
- [ ] StructuredData component configured
- [ ] SocialShareButtons added after header
- [ ] Hero image with descriptive alt text
- [ ] OG image created and placed in `/public/og-images/`
- [ ] Canonical URL points to production domain
- [ ] RelatedArticles with 2-3 relevant posts
- [ ] Single H1 tag with main keyword
- [ ] Semantic HTML structure (sections, figures, etc.)
- [ ] Route added to App.tsx
- [ ] Test LinkedIn/Twitter share preview with production URL
- [ ] Full build runs without errors (`npm run build`)

## Testing Social Shares

After deploying to production:

1. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/

These tools help verify OG tags are being read correctly.

## Common Issues

### LinkedIn/Facebook/X showing "Cannot display preview"
- **Root cause:** Social media crawlers don't execute JavaScript
- **Solution:** Pages MUST be pre-rendered with SSG so OG tags are in the static HTML
- Run the full SSG build: `npm run build` (or `./build-ssg.sh`)
- The prerender script uses Puppeteer to generate static HTML with OG tags embedded
- After deploying, use the debug tools to clear cached previews

### LinkedIn not showing image/title
- LinkedIn only reads OG meta tags from the URL
- Ensure `ogImage` is an absolute URL (e.g., `https://bizhealth.ai/og-images/og-slug.jpg`)
- Use LinkedIn Post Inspector to refresh cache
- If still failing, the page may not have SSG-generated HTML deployed

### Share buttons not appearing
- Verify SocialShareButtons import is present
- Check component is placed within the article JSX
- Confirm className doesn't hide the component

### Build errors after adding post
- Check all imports are correct
- Verify image paths exist
- Run `npm run build` locally to catch errors

## Critical: SSG Requirement for Social Sharing

**Social media platforms (LinkedIn, Facebook, Twitter/X) do NOT execute JavaScript.** They only read the raw HTML response from your URL.

For social sharing to work:
1. OG meta tags must be present in the **static HTML** returned by the server
2. This requires running the SSG pre-render build before deploying
3. The `prerender.js` script uses Puppeteer to:
   - Load each page in a headless browser
   - Wait for React and react-helmet-async to inject OG tags
   - Save the complete HTML including the `<head>` section
4. After deploying, always test with the debug tools to verify

**SSG Build Process:**
```bash
npm run build  # Full SSG build including prerender
```

This generates static HTML files in `dist/` with OG tags embedded for each route.
