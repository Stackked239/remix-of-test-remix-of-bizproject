# Memory: technical/trailing-slash-redirect-lighthouse-fix

Updated: 2026-01-22

## Critical: Universal Trailing Slash Redirect Breaks Lighthouse Plugin

The universal trailing slash redirect rule `/*/ -> /:splat` in `netlify.toml` **MUST NOT BE USED** because it breaks the Netlify Lighthouse plugin, regardless of the `force` setting.

### Root Cause

The pattern `/*/` matches the root path `/` because:
- The root URL `/` technically ends with a slash
- Netlify's redirect engine intercepts this before serving static HTML
- Results in an empty MIME type response
- Causes `NOT_HTML` error: "The page provided is not HTML (served as MIME type )."

### The Fix: Remove Universal Trailing Slash Redirect

Do NOT use this pattern:
```toml
# ❌ WRONG - Breaks Lighthouse (even with force=false)
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = false  # Still breaks!
```

### Alternative Approach

If trailing slash redirects are needed for specific URLs (GSC errors), add them **individually**:
```toml
# ✅ CORRECT - Individual redirects don't affect root path
[[redirects]]
  from = "/blog/"
  to = "/blog"
  status = 301
  force = true

[[redirects]]
  from = "/about/"
  to = "/about"
  status = 301
  force = true
```

### Historical Context

- **Last working deploy:** 7:46pm (individual trailing slash rules)
- **First failure:** 7:53pm (universal rule with `force = true`)
- **Second failure:** After changing to `force = false` - still failed
- **Root cause identified:** The pattern `/*/` matches `/` regardless of force setting
- **Final fix:** Remove universal rule entirely

### Why force=false Didn't Work

The `force` setting only controls whether existing static files are bypassed:
- `force = true`: Always redirect, ignore static files
- `force = false`: Only redirect if no static file exists

The problem is that the **pattern matching** happens before file existence is checked, and the root path `/` matches `/*/ ` during the redirect processing phase, causing the MIME type to be empty during Lighthouse's request.
