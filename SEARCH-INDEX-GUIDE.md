# Search Index Guide - Adding Content to Site Search

This document explains how to ensure new pages, blog posts, tools, and curriculum are searchable via the website Search feature.

## Quick Reference

| Content Type | Where to Add | Automatically Searchable? |
|-------------|--------------|--------------------------|
| Blog Posts | `src/data/blogData.ts` | ✅ Yes |
| Pages | `src/data/searchIndex.ts` → `searchablePages` | ❌ Manual |
| Tools | `src/data/searchIndex.ts` → `searchableTools` | ❌ Manual |
| Curriculum | `src/data/searchIndex.ts` → `searchableCurriculum` | ❌ Manual |
| Playbooks | `src/data/searchIndex.ts` → `searchablePlaybooks` | ❌ Manual |
| FAQs | `src/data/searchIndex.ts` → `searchableFAQs` | ❌ Manual |

## How It Works

1. **Blog Posts** (`blogData.ts`): Automatically indexed! Just add your blog post with comprehensive `keywords` field.

2. **Everything Else** (`searchIndex.ts`): Add an entry to the appropriate array.

## Adding New Content

### For Blog Posts (Automatic)

Add to `src/data/blogData.ts`:

```typescript
{
  title: "Your Blog Title",
  excerpt: "Short description...",
  author: "BizHealth.ai Research Team",
  date: "January 2, 2026",
  readTime: "10 min read",
  category: "Business Strategy",
  slug: "/blog/your-blog-slug",
  altText: "Image description",
  keywords: "keyword1, keyword2, keyword3, related terms, synonyms"
}
```

**Important**: Include comprehensive keywords! Users may search for:
- The exact topic
- Related concepts
- Common misspellings
- Synonyms

### For Pages, Tools, Curriculum, Playbooks

Add to appropriate array in `src/data/searchIndex.ts`:

```typescript
{
  type: "Tool", // or "Page", "Curriculum", "Playbook"
  title: "Your Tool Title",
  excerpt: "Description of what this tool does...",
  url: "/biztools/toolbox/your-tool-url",
  keywords: "keyword1, keyword2, keyword3, synonyms, related terms",
  icon: Wrench // import from lucide-react
}
```

## Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `type` | Content category | "Page", "Tool", "Curriculum", "Playbook" |
| `title` | Display title (include main keyword) | "Free ROI Calculator - Investment Analysis" |
| `excerpt` | 1-2 sentence description | "Calculate return on investment for..." |
| `url` | Full path matching App.tsx route | "/biztools/toolbox/roi-calculator" |
| `keywords` | Comma-separated search terms | "ROI, return on investment, payback period" |
| `icon` | Lucide React icon | `Wrench`, `Target`, `BookOpen`, etc. |

## Keyword Best Practices

1. **Include the obvious**: Main topic, abbreviations, full forms
2. **Add synonyms**: "cash flow" and "cashflow", "ROI" and "return on investment"
3. **Include related terms**: For a pricing tool, include "cost", "fees", "investment"
4. **Consider user intent**: What would someone type to find this?
5. **Add common misspellings**: If relevant

## Checklist When Adding New Content

1. ✅ Add route to `src/App.tsx`
2. ✅ Include `<SEO />` component in the page
3. ✅ **For blogs**: Add entry to `blogData.ts` with keywords
4. ✅ **For other content**: Add entry to `searchIndex.ts`
5. ✅ Run build to verify no errors
6. ✅ Test search functionality with expected keywords

## File Locations

- Blog data: `src/data/blogData.ts`
- Search index: `src/data/searchIndex.ts`
- Search page: `src/pages/Search.tsx`
