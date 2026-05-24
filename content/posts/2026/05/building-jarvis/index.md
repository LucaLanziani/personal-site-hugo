---
title: "Building Jarvis: a personal lab for agents, models, and provider APIs"
date: 2026-05-24T10:00:00+02:00
category: general
tags: [AI, agents, Go, learning]
email: luca@lanziani.com
description: "A private Go project where I learn how agent runtimes, LLM providers, and tool loops actually work."
images:
    - https://lanziani.com/posts/2026/05/building-jarvis/image.png
---

I've been spending evenings on **Jarvis** — a Go-based AI agent that gives a language model a small, controlled toolkit on my machine. It isn't meant to compete with Cursor or Claude Code. It's a private sandbox where I can touch the ideas behind those products: tool loops, provider quirks, session state, safety boundaries, and what "an agent" actually means in code.

<!--more-->

<!-- TODO: add a screenshot of the Jarvis repo or REPL as image.png in this directory -->

![Jarvis — repository overview or REPL session](image.png)

## Why I'm building it

Most of us interact with agents through polished UIs. That's great for productivity, but it hides the mechanics: how a model decides to call a tool, how streaming and tool calls interleave, how OpenAI, Anthropic, and GitHub Copilot differ at the HTTP layer, and where runtime safety belongs (prompt vs. code vs. OS).

Jarvis is my way of closing that gap. Each feature forces a concrete question:

- How do I represent a **multi-turn loop** with a max iteration budget?
- What happens when the model returns **parallel tool calls**?
- How do I **sandbox** file access without breaking legitimate edits?
- When should the human **approve** `shell` or `write_file` instead of trusting the model?
- How do **sub-agents** differ from the supervisor — and why shouldn't they recurse forever?

I'm also dogfooding **[langchain-go](https://github.com/LucaLanziani/langchain-go)** — a small framework I maintain for agents, tools, and providers. Jarvis sits on top of it; building both together keeps the abstractions honest.

## What Jarvis is

At a high level, Jarvis is an LLM with tools, wrapped in a runtime that owns safety and observability instead of leaving everything to the system prompt.

```
You (REPL or Telegram)
  → Jarvis agent loop (tool dispatch, limits, approvals)
  → Provider (OpenAI | Anthropic | GitHub Copilot)
  → Tools (files, shell, sub-agents, skills, …)
```

The repository stays **private** — this is a learning project, not something I'm shipping for others to clone. The goal is depth of understanding, not distribution.

## Current status

The project is past "weekend prototype." There's a **v0.0.1** tag, CI, docs, and a real surface area:

| Area | Status |
|------|--------|
| **Runtimes** | Interactive REPL, Telegram bot, non-interactive pipe / `-prompt` mode |
| **Providers** | OpenAI, Anthropic, GitHub Copilot |
| **Core tools** | `read_file`, `write_file`, `edit_file`, `list_directory`, `shell` |
| **Agent model** | Supervisor + `run_agent` sub-agents (no recursion); sub-agents get `ask_user` instead |
| **Skills** | Agent Skills–compatible `SKILL.md` packages with `activate_skill` |
| **Extensibility** | External tools from `*.tool.json` at startup |
| **Safety** | File tools sandboxed to `WorkDir` (Go 1.25 `os.Root`); runtime modes (`default`, `read-only`, `approval-required`); approval gate for dangerous tools |
| **Sessions** | Save/load, managed REPL sessions, backslash commands (`\new-session`, `\set-mode`, etc.) |
| **Config** | Layered JSON: defaults → `~/.jarvis` / `.jarvis` → CLI flags |
| **UX** | Bubble Tea prompt with arrow-key editing; optional **tmux** layout (interactive + logs + sub-agent panes) |
| **Observability** | Structured logging + OpenTelemetry tracing across supervisor and sub-agent runs |

Recent work includes **skills support**, **config reload** without restarting the REPL, **AFK mode** (routing `ask_user` prompts to Telegram while I'm away), and hardening around shutdown, tool filtering, and bounded history.

So today Jarvis is usable for my own local work: inspect a repo, run bounded shell commands (with approvals if I want), delegate a sub-task to a sub-agent, or chat from Telegram — with the same agent core underneath.

## What I'm still exploring

A long `features/` backlog tracks what's next: git-aware tools, an MCP server bridge, web fetch, an evaluation runner, notebook support, stronger sandbox profiles, and more. Many shipped capabilities started as numbered proposals there; the rest are deliberate experiments in "what should an agent runtime know about?"

There's also a **fixes/** list — the kind of edge cases you only see once you run tool loops for real (discarded tool errors, approval races, history bounds, sub-agent timeouts). That's part of the learning too.

## Design choices I care about

A few decisions reflect what I've learned so far:

**Safety in the runtime, not only in the prompt.** File tools stay inside `WorkDir`. `shell` is intentionally *not* sandboxed — so approvals, deny lists, and container isolation stay honest. The default config on the repo itself even deny-lists `shell` and `write_file` for read-heavy dogfooding.

**Sub-agents are bounded.** They inherit workdir, provider, and tool policy, but they cannot spawn further sub-agents. That keeps delegation understandable and avoids runaway fan-out.

**Two surfaces, one engine.** The REPL and Telegram bot share the same agent and bot packages. Messaging taught me things the REPL didn't: per-conversation serialization, remote approvals, prompt timeouts, cancelling a turn mid-flight.

**Observability from day one.** Tool execution logs and OTEL traces aren't afterthoughts — they're how you debug "why did the model call that?" without guessing.

## Where this is headed

Jarvis will keep growing as a **lab**, not a product pitch. I care about:

- Deeper provider comparisons (streaming, tool schemas, error shapes)
- Richer tool ecosystems (MCP, git, tests) without bloating the core binary
- Repeatable evals so agent behavior doesn't regress silently
- Clearer boundaries between "model reasoning" and "runtime policy"

If you're also trying to understand agents by building one — not just by prompting one — I'd love to hear what you've run into. The Jarvis repo stays private, but the ideas are the same ones showing up everywhere in agentic tooling right now.
