# Memory: style/gradient-divider-related-articles-standard

Updated: 2026-01-22

## Standard Pattern: GradientDivider Above RelatedArticles

All blog posts MUST include a `<GradientDivider />` component immediately above the `<RelatedArticles />` section to improve visual separation and UX consistency.

### Implementation

```tsx
import GradientDivider from "@/components/GradientDivider";
import RelatedArticles from "@/components/RelatedArticles";

// ... blog post content ...

{/* Gradient divider before related articles */}
<GradientDivider variant="green-gold" />

{/* Related Articles Section */}
<RelatedArticles articles={relatedArticles} />
```

### Required Props

- **variant**: Use `"green-gold"` for the brand-consistent BizGreen-BizGold gradient
- **className** (optional): Use `"mb-0"` if spacing adjustment is needed

### Purpose

- Creates a clear visual transition between blog content and related articles
- Maintains brand consistency with the BizGreen-BizGold color palette
- Improves content hierarchy and reader navigation

### Checklist for New Blog Posts

1. Import `GradientDivider` component
2. Place `<GradientDivider variant="green-gold" />` directly above `<RelatedArticles />`
3. Ensure no duplicate dividers exist
