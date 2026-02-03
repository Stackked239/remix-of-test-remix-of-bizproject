# Performance Optimization Guide for BizHealth.ai

## Current Implementation

### Lazy Loading Components

1. **BlogHeroImage Component** (`src/components/BlogHeroImage.tsx`) ⭐ NEW
   - **Use for: Blog post hero images (above-the-fold)**
   - Eager loading with `fetchpriority="high"` for optimal LCP
   - Fixed 16:9 aspect ratio to prevent CLS
   - Automatic preload link injection
   - Fade-in animation on load

2. **LazyBlogImage Component** (`src/components/LazyBlogImage.tsx`) ⭐ NEW
   - **Use for: Images within blog content (below-the-fold)**
   - Lazy loading with `fetchpriority="low"`
   - Configurable aspect ratio and width percentage
   - Prevents CLS with fixed dimensions

3. **OptimizedImage Component** (`src/components/OptimizedImage.tsx`)
   - Automatic lazy loading with `loading="lazy"` attribute
   - `fetchpriority` attribute for LCP optimization
   - Automatic preload link injection for priority images
   - Fade-in animation on load
   - Error state handling
   - Required width/height to prevent CLS

4. **ImagePreloader Component** (`src/components/ImagePreloader.tsx`)
   - Preloads critical images for better LCP
   - Use at the top of pages with important hero images

5. **useImagePreload Hook** (`src/hooks/useImagePreload.ts`)
   - Hook to preload images and track loading state
   - `useImagesPreload` for batch preloading

### Usage Examples

#### Blog Post Hero Image (LCP Critical):
```tsx
import BlogHeroImage from '@/components/BlogHeroImage';

<BlogHeroImage 
  src={heroImage} 
  alt="Description of the hero image"
/>
```

#### Blog Content Image (Below the fold):
```tsx
import LazyBlogImage from '@/components/LazyBlogImage';

<LazyBlogImage 
  src={contentImage} 
  alt="Description"
  widthPercent={85}
  aspectRatio="16/9"
/>
```

#### Above-the-fold (priority) images:
```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage 
  src={heroImage} 
  alt="Description" 
  width={1200} 
  height={630}
  priority // Loads eagerly, adds preload link
/>
```

#### Below-the-fold images:
```tsx
<OptimizedImage 
  src={contentImage} 
  alt="Description" 
  width={800} 
  height={450}
  // priority defaults to false = lazy loading
/>
```

#### For inline images (blog content):
```tsx
import { LazyImage } from '@/components/OptimizedImage';

<LazyImage 
  src={inlineImage} 
  alt="Description" 
  className="w-full h-auto rounded-lg"
/>
```

#### Preloading critical page images:
```tsx
import ImagePreloader from '@/components/ImagePreloader';

<ImagePreloader 
  images={[heroImage, logoImage]} 
  priority="high" 
/>
```

## Critical Performance Issues to Address

### Large Images Requiring Compression

The following images are over 1MB and significantly impact Lighthouse scores:

| Image | Current Size | Target Size | Location |
|-------|--------------|-------------|----------|
| business-health-assessment-guide-2026.png | 2.9MB | <300KB | Blog Strategy |
| financial-stewardship-team-responsibility-smb-optimized.jpg | 1.8MB | <200KB | Blog/Leadership |
| sherpa-mountain-background-optimized.jpg | 1.6MB | <200KB | Sherpas page |
| business-strategy-planning-2026-growth-optimized.jpg | 1.4MB | <200KB | Blog Strategy |
| identifying-smb-leadership-blind-spots-optimized.jpg | 1.4MB | <200KB | Blog Leadership |
| business-blind-spots-assessment.png | 1.4MB | <200KB | Blog/Assessment |
| hidden-costs-manual-processes-smb-optimized.jpg | 1.4MB | <200KB | Blog Operations |
| scaling-operations-without-losing-control-optimized.jpg | 1.4MB | <200KB | Blog Operations |
| small-business-struggles-fixing-wrong-problems-optimized.jpg | 1.4MB | <200KB | Blog |
| confirm-business-weaknesses-without-consultants-optimized.jpg | 1.3MB | <200KB | Blog |

### Recommended Image Optimization Steps

1. **Convert PNGs to WebP or optimized JPEG** for photos
2. **Compress using tools:**
   - [Squoosh.app](https://squoosh.app/) - Browser-based, excellent quality
   - [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
   - ImageOptim (Mac) / FileOptimizer (Windows)

3. **Target dimensions and quality:**
   - Hero images: 1200x630 @ 80% quality
   - Blog thumbnails: 600x340 @ 75% quality
   - Background images: 1920x1080 @ 70% quality

## Vite Build Optimizations

The `vite.config.ts` includes:
- Terser minification with console removal
- Vendor chunk splitting for better caching
- CSS code splitting
- Reduced asset inline limit (2KB)
- Image asset organization in dedicated folder

## index.html Optimizations

- DNS prefetch for Google Tag Manager
- Preconnect for external resources
- Preload hints for critical fonts

## Best Practices Checklist

### For Every New Page:
- [ ] Use `OptimizedImage` for all significant images
- [ ] Set `priority={true}` ONLY for above-the-fold hero images
- [ ] Include width/height to prevent layout shift
- [ ] Ensure images are compressed (<200KB for most, <100KB for thumbnails)

### For Blog Posts:
- [ ] Hero image: `loading="eager"`, `fetchpriority="high"`, `decoding="sync"`
- [ ] Content images: `loading="lazy"`, `decoding="async"`
- [ ] Author icons: `loading="lazy"` (small, below fold)

### For Landing Pages:
- [ ] Use `ImagePreloader` for critical hero assets
- [ ] Lazy load any images below the fold
- [ ] Consider CSS background-image for decorative backgrounds

## Monitoring Performance

1. **Lighthouse Audit**: Run after each deployment
2. **Target Scores**:
   - Performance: 90+
   - LCP: < 2.5s
   - CLS: < 0.1
   - FID: < 100ms

3. **Tools**:
   - Chrome DevTools Lighthouse
   - WebPageTest.org
   - Google PageSpeed Insights
