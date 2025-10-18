# Pre-rendering Configuration

## Overview

This site uses **react-snap** for pre-rendering to generate static HTML for all pages at build time. This significantly improves SEO and social media sharing by ensuring that search engines and social media crawlers receive fully-rendered HTML with all meta tags and content.

## How It Works

### Build Process

Pre-rendering happens automatically as a post-build step:

1. **Build the React application** - Run `npm run build` which first compiles with Vite
2. **react-snap runs automatically** - After Vite build completes, react-snap:
   - Starts a local server serving the built app
   - Uses Puppeteer to visit each configured route
   - Captures the fully-rendered HTML for each page
   - Replaces the `index.html` in each route folder with pre-rendered content
3. **Static HTML generated** - Each route gets its own folder with a complete `index.html`

### Runtime Behavior

When a user visits your site:

1. **Server sends pre-rendered HTML** - The visitor immediately receives the full HTML with all content and meta tags
2. **React hydrates** - React takes over the static HTML and makes it interactive
3. **App runs normally** - All client-side functionality works as expected

## Configured Routes

All 50+ routes are pre-rendered, including:

- **Main pages**: Home, About, Contact, Pricing, How It Works, Resources, Blog, FAQs
- **Product pages**: BizGuides, BizTools, BizLeader, BizGrowth
- **Legal pages**: Privacy Policy, Terms, Disclaimer
- **Auth pages**: Login, Register, Portal, Onboarding, Checkout
- **All 22 blog posts**: Each blog article has its own pre-rendered HTML

## Benefits

### SEO Improvements

✅ **Search engines see full content** - Google, Bing, and other crawlers receive complete HTML with all text and metadata

✅ **Meta tags are visible** - Title, description, keywords, and structured data are in the initial HTML

✅ **Faster indexing** - Crawlers don't need to execute JavaScript to see your content

### Social Media Sharing

✅ **Rich previews work** - Facebook, Twitter, LinkedIn can read Open Graph and Twitter Card tags

✅ **Correct images and descriptions** - Social cards display properly with your custom meta tags

✅ **No more generic previews** - Each page has its unique preview

### Performance

✅ **Faster First Contentful Paint** - Users see content before JavaScript loads

✅ **Better Core Web Vitals** - Improved LCP (Largest Contentful Paint) scores

✅ **Works without JavaScript** - Basic content is readable even if JS fails to load

## Technical Details

### Hydration

The app uses React's `hydrateRoot` instead of `createRoot` when it detects pre-rendered content. This allows React to attach event listeners and make the page interactive without re-rendering the entire DOM.

```typescript
// In main.tsx
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
```

### Build Configuration

Pre-rendering is configured in `reactSnap.config.json` and runs automatically after production builds. The configuration includes:

- **include**: List of all routes to pre-render (50+ routes)
- **skipThirdPartyRequests**: Speeds up crawling by skipping external resources
- **minifyHtml**: Reduces file size by removing comments and whitespace
- **puppeteerArgs**: Configuration for headless Chrome

## Adding New Routes

To pre-render a new page:

1. **Create the page component** in `src/pages/`
2. **Add the route** to `src/App.tsx`
3. **Add the route path** to the `include` array in `reactSnap.config.json`

Example:
```json
{
  "include": [
    "/",
    "/new-page",
    ...
  ]
}
```

## Troubleshooting

### Build takes longer

Pre-rendering all 50+ pages adds time to the build process. This is normal and expected. Each page needs to be rendered individually.

### Dynamic content

Pre-rendered pages contain the content as it existed at build time. For dynamic data that changes frequently:
- Consider using client-side fetching
- Re-build and deploy when content changes
- Use a CMS with webhook triggers to rebuild

### Authentication pages

Auth-protected pages (Portal, Onboarding) are pre-rendered in their logged-out state. This is fine because:
- They redirect logged-in users appropriately
- The pre-rendered version shows login prompts to search engines
- React hydration handles the authentication state on the client

## Deployment

When you deploy to Lovable or any hosting platform:

1. **Build your app**: `npm run build`
2. **All HTML files are generated** in the `dist` folder
3. **Deploy the dist folder** - Your host serves the pre-rendered HTML
4. **Crawlers get full HTML** - SEO and social sharing work perfectly

## Testing

To test pre-rendering locally:

1. **Build the app**: `npm run build`
2. **Serve the build**: `npm run preview` or use any static server
3. **View page source**: Right-click → View Page Source to see the full HTML
4. **Check specific pages**: Visit different routes and inspect their HTML

You should see all your content, meta tags, and structured data in the HTML source.

## Maintenance

The pre-rendering configuration requires minimal maintenance:

- **Add new routes** when you create new pages
- **Keep dependencies updated** for security and performance
- **Monitor build times** if you add many new pages

## Resources

- [react-snap Documentation](https://github.com/stereobooster/react-snap)
- [React Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [SEO Best Practices](https://developers.google.com/search/docs)
