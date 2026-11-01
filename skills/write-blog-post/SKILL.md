---
name: write-blog-post
description: Draft, revise, and validate blog posts for Luca Lanziani's personal Hugo site. Use when asked to write or edit an article for this blog, turn notes into a post, or prepare an existing post for publication.
---

# Write Blog Post

Produce a complete, reviewable blog post in the site's voice, with accurate claims,
correct Hugo metadata, and evidence that it renders properly. Follow the user's
explicit brief; this skill supplies the site workflow rather than a fixed article
template. English is the default unless the user requests another language.

## Locate the site and read its guides

Resolve the real path of this skill directory, including any global symlink. The
site root is two directories above it. On this machine the checkout is
`/home/coding/code/personal-site-hugo`. Verify that the root contains `config.toml`,
`WRITING_GUIDELINES.md`, and `content/posts/` before writing, and run site commands
from that root. When invoked from another workspace, write to this site checkout,
not the caller's repository. If the checkout cannot be found, ask for its location.

Read the site's `AGENTS.md` and these canonical guides before drafting or editing:

- [WRITING_GUIDELINES.md](../../WRITING_GUIDELINES.md): voice, editorial direction,
  article patterns, evidence, and editing checklist.
- [docs/content-guide.md](../../docs/content-guide.md): Blog Posts, Static Assets,
  Tags and Series, and Content Checklist Before Publishing.

Read [docs/architecture.md](../../docs/architecture.md) before any structural,
layout, or content-workflow change. Ordinary post writing should use the existing
publishing conventions. Keep conventions in the canonical guides rather than
duplicating them in this skill.

## Establish the brief and evidence

- Read the supplied notes, source material, and any existing target post. Check
  `git status --short` so unrelated drafts and assets remain intact.
- Establish the central point, intended reader, post type, and desired outcome.
  Ask only for missing information that materially affects the article; do not
  require approval of an outline when the user has already requested a draft.
- Inspect a few relevant posts for terminology, tags, series, related links, and
  voice. Existing prose is context; the current writing guide governs new prose.
- Verify technical and time-sensitive claims against original documentation or
  other primary sources. Link supporting sources near the claims. Check commands
  and examples against the relevant versions where feasible; distinguish static
  checks, local experiments, and actual production results.
- Do not invent Luca's experiences, quotations, measurements, or outcomes. Use
  first-person experience only when supported by the user's material. Qualify or
  omit uncertain claims and report remaining questions in the handoff.

## Draft or revise the post

Start with the concrete observation or problem, then develop the argument using
the article shape appropriate to the brief. Use the guide's practical engineering
voice, specific examples, and grounded ending. Avoid hype and contrastive reframes
such as "This is not X, it's Y." Diagrams, tables, code, and lists should clarify
the subject; do not add them by formula or force an AI theme onto other topics.

For new posts:

- Use `content/posts/YYYY/MM/slug.md`. From the site root, create the draft with
  `make new TITLE="My Post Title"` or add `DATE="2026-10-11"` for an explicit date.
  This uses `archetypes/default.md`; replace its generated title as needed.
- `DATE` selects the directory, but does not set the archetype's timestamp. Ensure
  frontmatter matches the intended date and directory, with the correct timezone
  offset. Default to today's date in Europe/Rome when no date is supplied.
- Keep `draft: true` unless the user's request explicitly includes publication.
  Fill in the title, useful description, relevant tags, and appropriate category.
  Add series metadata only when applicable and reuse an existing series name.

For existing posts, edit in place, preserve their file or page-bundle structure,
and preserve date, slug, and publication status unless the user requests a change.

Place `<!--more-->` after the introduction when a longer post benefits from a
deliberate excerpt. Short posts need no artificial break. Verify the actual listing
text; some layouts prefer `description` over the Markdown summary.

Put new shared images in `content/static/YYYY/` and reference them as
`/static/YYYY/filename`. Preserve existing bundle-relative assets when revising a
page bundle. Add descriptive alt text; set `images` and `imageAlt` when selecting a
share image. An explicit image is optional because the site has a fallback.

Use language-labelled code fences and explain non-obvious commands. Link related
posts when useful, checking their actual paths rather than guessing URLs.

## Review and validate

Apply the writing guide's editing checklist and the content guide's metadata and
asset checks. Check that the title and opening communicate the central point,
examples support the argument, and certainty matches the evidence.

Build with drafts included, from the site root:

```sh
HUGO_CACHEDIR=/tmp/write-blog-post-cache hugo --buildDrafts --gc --minify --destination /tmp/write-blog-post-preview
git diff --check
```

Inspect the generated article and listing text, metadata, internal links, image
paths, and code rendering. Check source changes too: newly created untracked files
are not covered by `git diff --check`.

Use the existing local preview when available (see the repository README and
`bin/servicectl`), or start a temporary draft-inclusive Hugo server on an available
loopback port. Wait for rendering and assets to finish, then perform browser checks
at desktop and mobile widths. Verify heading hierarchy, readable paragraphs,
tables/code overflow, images, scrolling, links, and the listing excerpt. Report
unavailable checks rather than claiming they passed.

Finish with the post path, a brief account of the article or revision, validation
performed, and unresolved factual or rendering issues. Writing a post does not
authorize committing, pushing, deploying, or publishing it; follow the user's
existing authorization for those actions.
