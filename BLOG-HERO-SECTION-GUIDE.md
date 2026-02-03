# BlogHeroSection Component Guide

Use the `BlogHeroSection` component for all new blog posts to ensure consistent hero styling.

## Usage

```tsx
import BlogHeroSection from "@/components/BlogHeroSection";
import heroImage from "@/assets/images/your-hero-image.jpg";

<BlogHeroSection
  title="Your Blog Post Title"
  author="BizHealth.ai Research Team"
  publishDate="January 7, 2026"
  readTime="10 min read"
  heroImage={heroImage}
  heroImageAlt="Descriptive alt text for accessibility and SEO"
  categories={[
    { label: "Technology", href: "/blog/technology" },
    { label: "Operations", href: "/blog/operations" },
    { label: "Business Strategy", href: "/blog/business-strategy" },
  ]}
  shareDescription="Brief description for social sharing."
/>
```

## Features

- **Consistent spacing**: `pt-40 pb-16` padding
- **Back to Blog link**: Built-in navigation
- **Category badges**: biz-green styled, linked to category pages
- **Meta info with icons**: Author, date, read time with Lucide icons
- **Hero image**: Constrained `max-h-96` with rounded corners
- **Social share buttons**: Integrated automatically

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Blog post title (H1) |
| `author` | string | Yes | Author name |
| `publishDate` | string | Yes | Formatted date (e.g., "January 7, 2026") |
| `readTime` | string | Yes | Read time (e.g., "10 min read") |
| `heroImage` | string | Yes | Imported hero image |
| `heroImageAlt` | string | Yes | Alt text for hero image |
| `categories` | CategoryBadge[] | Yes | Array of `{ label, href }` objects |
| `shareDescription` | string | No | Description for social sharing (defaults to title) |

## Custom Knowledge Entry

Copy and paste this into Project Settings → Manage Knowledge:

```
BLOG POST STANDARD: BlogHeroSection Component

When creating new blog posts, use the BlogHeroSection component for the hero section:

import BlogHeroSection from "@/components/BlogHeroSection";

<BlogHeroSection
  title="Post Title"
  author="BizHealth.ai Research Team"
  publishDate="Month Day, Year"
  readTime="X min read"
  heroImage={heroImage}
  heroImageAlt="Descriptive alt text"
  categories={[
    { label: "Category", href: "/blog/category-slug" },
  ]}
  shareDescription="Brief sharing description."
/>

This ensures consistent styling with biz-green category badges, proper spacing, and integrated social share buttons.
```
