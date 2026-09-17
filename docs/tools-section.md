# Tools Section

The Tools section lives at `/tools/` on the site. Each tool is a self-contained, interactive single-page application embedded directly into the site.

---

## How It Works

The Tools section uses a custom layout pattern that outputs raw HTML rather than wrapping the content in the theme's `baseof.html`. This lets each tool be a complete standalone web page.

```
layouts/tools/
├── list.html     # Theme-wrapped index page listing all tools
└── single.html   # Raw HTML pass-through for individual tool pages
```

### `single.html` — the key piece

```go-html-template
{{ $toolPath := printf "content/%stool.html" .File.Dir }}
{{ if fileExists $toolPath }}
  {{ readFile $toolPath | safeHTML }}
{{ end }}
```

When a visitor navigates to `/tools/my-tool/`, Hugo:
1. Finds the content page at `content/tools/my-tool/index.md`
2. Resolves `.File.Dir` → `tools/my-tool/`
3. Builds the path `content/tools/my-tool/tool.html`
4. Reads that file and outputs it verbatim as the HTTP response

The result: the browser receives a complete HTML document — the tool's own `<html>` page, not the blog theme.

---

## File Structure for Each Tool

```
content/tools/
└── <tool-name>/
    ├── index.md     # Hugo page metadata
    └── tool.html    # Complete standalone HTML page
```

### `index.md`

Only frontmatter is needed:

```yaml
---
title: "My Tool Name"
description: "One-line description shown on the /tools/ index"
---
```

No body content is required — the layout ignores it and reads `tool.html` directly.

### `tool.html`

A complete, self-contained HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Tool</title>
  <style>/* inline CSS */</style>
</head>
<body>
  <!-- tool UI and logic -->
  <script>/* inline JS */</script>
</body>
</html>
```

Keep all CSS and JS inline (or reference CDN URLs) so the tool works without depending on Hugo's asset pipeline.

---

## Adding a New Tool

1. Create the directory:
   ```sh
   mkdir content/tools/my-tool
   ```

2. Create `content/tools/my-tool/index.md`:
   ```yaml
   ---
   title: "My Tool"
   description: "What this tool does in one sentence"
   ---
   ```

3. Create `content/tools/my-tool/tool.html` with the complete HTML for your tool.

4. The tool is immediately accessible at `https://lanziani.com/tools/my-tool/` and listed on `https://lanziani.com/tools/`.

No layout changes are required. The existing `single.html` automatically handles any tool placed under `content/tools/`.

---

## Existing Tools

### LinkedIn Followers Exporter (`content/tools/linkedin-follower/`)

Exports a LinkedIn followers list as a CSV file with names, roles, and profile links.

- `index.md`: frontmatter only
- `tool.html`: standalone HTML page with JS logic for parsing LinkedIn's HTML and generating a CSV download

---

## `tool_html` Shortcode (legacy)

`layouts/shortcodes/tool_html.html` is kept for backward compatibility. It reads `tool.html` from the calling page's directory using the same `readFile` mechanism as `single.html`. New tools do not need to use this shortcode — the `single.html` layout handles it automatically.

---

## Design Constraints

- **No theme chrome**: Tool pages have no nav, header, or footer from the blog theme. This is intentional.
- **Self-contained**: All assets (CSS, JS, fonts) must be inline or loaded from external CDNs.
- **`readFile` paths**: Hugo's `readFile` requires paths relative to the project root. `.File.Dir` provides the correct relative path automatically.
