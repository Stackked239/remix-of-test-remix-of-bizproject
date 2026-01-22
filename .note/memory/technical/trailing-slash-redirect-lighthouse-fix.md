# Memory: technical/trailing-slash-redirect-lighthouse-fix

Updated: 2026-01-22

## Critical: Universal Trailing Slash Redirect Must Use force=false

The universal trailing slash redirect rule in `netlify.toml` **MUST** use `force = false` to prevent breaking the Netlify Lighthouse plugin.

### Correct Configuration

```toml
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = false  # CRITICAL: Must be false for Lighthouse
```

### Why force=true Breaks Lighthouse

When `force = true`:
- ALL requests ending in `/` are redirected BEFORE static files can be served
- The root path `/` effectively ends in a slash
- Lighthouse plugin requests `/` and receives an empty MIME type response
- Results in `NOT_HTML` error: "The page provided is not HTML (served as MIME type )."

### Why force=false Works

When `force = false`:
- Static HTML files are served first if they exist
- Redirect only applies to non-existent paths
- Root path `/` serves `index.html` with proper `Content-Type: text/html`
- Lighthouse receives valid HTML and generates scores

### Historical Context

- **Last working deploy:** 7:46pm (individual trailing slash rules)
- **First failure:** 7:53pm (universal rule with `force = true`)
- **Fix applied:** Changed to `force = false`

### Never Do This

```toml
# ❌ WRONG - Breaks Lighthouse
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = true
```
