
# Fix: Commodity Trap Blog Post Preview Image

## Problem Identified

The Commodity Trap blog post is showing the wrong preview image on the `/blog` page. The root cause:

1. **Blog.tsx uses an `imageMap`** (lines 95-176) to map blog post slugs to imported images
2. **The new blog post is missing from this map**
3. **Fallback behavior** (line 190): `imageMap[post.slug] || businessAnalystImage` defaults to a generic image when no mapping exists

The hero image **exists** and is correctly used on the blog post page itself, but it's not being used on the blog listing page.

## Solution

Add the Commodity Trap hero image to `Blog.tsx`:

1. **Add import statement** for the hero image (around line 93):
   ```typescript
   import commodityTrapImage from "@/assets/images/commodity-trap-price-competition-hero.jpg";
   ```

2. **Add entry to imageMap** (after line 96):
   ```typescript
   "/blog/commodity-trap-price-competition": commodityTrapImage,
   ```

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Blog.tsx` | Add import for hero image and add mapping to `imageMap` |

## Technical Details

- The `imageMap` object at line 95 maps blog post slug paths to imported image modules
- When a blog post is rendered as a card in the grid, it looks up the image from this map
- Without the mapping, the default `businessAnalystImage` is used as a fallback
- Adding the import and mapping entry will ensure the correct hero image appears in blog listings

## Expected Result

After this fix:
- The Commodity Trap blog post will display its hero image on the `/blog` page preview card
- The image will match the hero image shown on the actual blog post page
