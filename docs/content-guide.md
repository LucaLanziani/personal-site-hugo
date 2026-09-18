# Content Guide

All editorial content lives under `content/`. This guide covers every content type on the site.

---

## Blog Posts (`content/posts/`)

Posts are organised by year and month:

```
content/posts/YYYY/MM/slug.md
```

### Creating a new post

```sh
# Preferred: use the Makefile shortcut
make new TITLE="My Post Title"

# With a specific date
make new TITLE="My Post Title" DATE="2026-03-15"

# Hugo directly
hugo new posts/2026/04/my-post-title.md
```

The `make new` command:
1. Derives `YYYY` and `MM` from today's date (or `DATE` if provided)
2. Slugifies the title (lowercase, hyphens, alphanumeric only)
3. Runs `hugo new posts/YYYY/MM/<slug>.md` using the `archetypes/default.md` template

### Frontmatter template

```yaml
---
title: "Title Here"
date: YYYY-MM-DDTHH:MM:SS+02:00
draft: true
category: general
tags: [Tag1, Tag2, Tag3]
email: luca@lanziani.com
description: "Short description for SEO and social sharing"
series: ["Series Name"]        # optional — groups posts together
images:
  - "https://lanziani.com/static/YYYY/image.jpg"  # optional — OG/twitter card image
imageAlt: "Description of the share image"  # optional — used by social previews
---
```

### Publishing checks

- **`<!--more-->`** — place this after the opening paragraph(s) when a longer post needs a deliberate listing excerpt. Check the rendered excerpt before publishing.
- Set `draft: false` (or remove the `draft` key) before publishing.
- Add a useful `description` and check that a share image resolves. The first `images` entry takes priority; page bundles can also use their first image automatically. Otherwise the site portrait is used.

### Post structure (recommended)

1. Hook / opening paragraph
2. `<!--more-->` when a deliberate excerpt helps
3. Context and background
4. Main content with `##` headers and `###` sub-headers
5. Grounded conclusion, question, or practical next step

See [WRITING_GUIDELINES.md](../WRITING_GUIDELINES.md) for voice, tone, and detailed pattern guidance.

---

## Social Posts (`content/social/`)

Short-form posts mirroring social media updates. Organised the same way as blog posts:

```
content/social/YYYY/MM/slug.md
```

### Creating a social post

```sh
hugo new --kind social social/2026/04/my-update.md
```

This uses `archetypes/social.md`:

```yaml
---
title: "My Update"
date: YYYY-MM-DDTHH:MM:SS+02:00
category: social
tags: []
description: ""
draft: true
---

Your social media post content here.

<!--more-->
```

### Social listing page

`content/social/_index.md` sets the section title. The layout at `layouts/social/list.html` paginates all social posts in reverse-chronological order and displays tags.

---

## About Page (`content/about/index.md`)

Single page with `disableSocial: true` in frontmatter (hides social sharing buttons). Edit directly — no special workflow.

---

## Archives Page (`content/archives.md`)

Auto-generated listing of all posts. Uses the theme's built-in archives template. No manual maintenance needed.

---

## Static Assets (`content/static/`)

Images and other static files referenced from posts. Mirrored to the live site under `/static/`.

### Organisation

```
content/static/
├── YYYY/                 # Year-based image folders (e.g., 2025, 2026)
├── devops/               # DevOps-related images
├── monitoring/           # Monitoring/observability images
├── pathtoproduction/     # Path-to-production diagrams
├── local-podcast-recorder.html   # Standalone HTML tool
└── podcast-alpine.html           # Standalone HTML tool
```

### Referencing assets in posts

```markdown
![Alt text](/static/2025/my-image.jpg)
```

Or with a full URL for OG images:

```yaml
images:
  - "https://lanziani.com/static/2025/my-image.jpg"
```

---

## Tools (`content/tools/`)

Interactive, self-contained browser tools. See [tools-section.md](tools-section.md) for the full guide.

---

## Tags and Series

**Tags** are freeform and appear on individual posts and on the social listing. They create taxonomy pages at `/tags/<tag>/`.

**Series** groups posts into a named sequence, creating a page at `/series/<series-name>/`. Referenced by name in the `series` frontmatter array:

```yaml
series: ["Spec Driven Development"]
```

---

## Content Checklist Before Publishing

- [ ] `draft: false` (or key removed)
- [ ] `description` filled in (used for SEO meta + OG tags)
- [ ] Share image checked, with `imageAlt` when the image needs a specific description
- [ ] Listing excerpt checked; add `<!--more-->` if a deliberate break helps
- [ ] Tags added
- [ ] Images uploaded to `content/static/YYYY/` if referenced
- [ ] `series` set if post belongs to a series
