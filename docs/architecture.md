# Architecture

## Stack

| Layer | Technology |
|-------|-----------|
| Static site generator | [Hugo](https://gohugo.io/) |
| Theme | [Noteworthy](https://github.com/kimcc/hugo-theme-noteworthy) (git submodule) |
| Hosting | Deployed as static files (CNAME: `lanziani.com`) |
| Math rendering | KaTeX (enabled via `params.math = true`) |

---

## Project Structure

```
personal-site-hugo/
├── config.toml               # Main Hugo configuration
├── Makefile                  # Developer shortcuts (dev, build, new, etc.)
├── migrate_linkedin_posts.py # Script to import LinkedIn exports into content/social/
├── WRITING_GUIDELINES.md     # Editorial direction, voice, and format
│
├── archetypes/
│   ├── default.md            # Template for new blog posts
│   └── social.md             # Template for new social posts
│
├── content/                  # All site content (Markdown + assets)
│   ├── about/index.md        # About page
│   ├── archives.md           # Archives listing page
│   ├── posts/                # Blog posts organised by year/month
│   │   └── YYYY/MM/slug.md
│   ├── social/               # Short social media posts
│   │   ├── _index.md
│   │   └── YYYY/MM/slug.md
│   ├── static/               # Images and static assets served under /static/
│   │   ├── 2025/
│   │   ├── devops/
│   │   ├── monitoring/
│   │   ├── pathtoproduction/
│   │   └── *.html            # Standalone HTML pages (podcast tools, etc.)
│   └── tools/                # Interactive browser tools
│       ├── _index.md
│       └── <tool-name>/
│           ├── index.md      # Frontmatter: title, description
│           └── tool.html     # Complete self-contained HTML page
│
├── layouts/                  # Custom layout overrides (take precedence over theme)
│   ├── shortcodes/
│   │   └── tool_html.html    # (legacy) embeds tool.html from shortcode
│   ├── social/
│   │   └── list.html         # Paginated social feed layout
│   └── tools/
│       ├── list.html         # Tools index page
│       └── single.html       # Standalone tool page renderer
│
├── themes/
│   └── noteworthy/           # Minimalist blog theme (git submodule)
│
├── docs/                     # ← you are here
├── _bmad-output/             # BMAD method planning/implementation artifacts
├── linkedin/                 # Raw LinkedIn post drafts and exports
│   ├── export/               # Raw exports from LinkedIn
│   └── toWrite/              # Draft ideas for future posts
└── public/                   # Hugo build output (gitignored in most setups)
```

---

## Theme: Noteworthy

The `noteworthy` theme provides:

- `baseof.html` — base template wrapping every page with `{{ block "main" . }}{{ end }}`
- Navigation sidebar with links defined in `[[menu.main]]`
- Partials: `head`, `header`, `nav`, `footer`, `social`, `math`, `twitter-card`
- Taxonomy support for `tags` and `series`

Any file in `layouts/` overrides the equivalent file from the theme.

---

## Layout System

### Theme-wrapped layouts

Layouts that use `{{ define "main" }}` are wrapped by the theme's `baseof.html` and inherit the full site chrome (nav, header, footer).

```go-html-template
{{ define "main" }}
  <!-- page content here -->
{{ end }}
```

Used by: `layouts/social/list.html`, `layouts/tools/list.html`, all default post layouts.

### Standalone / raw layouts

Layouts that omit `{{ define "main" }}` output raw HTML — the template is the entire HTTP response.

Used by: `layouts/tools/single.html`

This is intentional for the Tools section: each tool is a self-contained single-page application with its own `<html>`, `<head>`, and `<body>` tags.

---

## Taxonomies

| Taxonomy | URL prefix | Usage |
|----------|-----------|-------|
| `tags` | `/tags/` | Freeform topic tags on posts and social entries |
| `series` | `/series/` | Groups of related posts (e.g., "Spec Driven Development") |

---

## Pagination

- Blog posts: paginated by the theme (10 per page, `paginate = 10` in config)
- Social feed: paginated via `.Paginate` in `layouts/social/list.html`

---

## Static Assets

Files placed under `content/static/` are served at `/static/` on the live site (not the Hugo `static/` root). This is a Hugo "content" directory for assets, distinct from the theme's static folder.

Example: `content/static/2025/split_brain.jpg` → `https://lanziani.com/static/2025/split_brain.jpg`
