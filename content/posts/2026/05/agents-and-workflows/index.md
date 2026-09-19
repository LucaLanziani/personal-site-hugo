---
title: "Workflows and Agents: when to use one over the other"
date: 2026-05-01T22:41:00+02:00
draft: true
category: general
tags: ["AI", "workflows", "agents"]
email: luca@lanziani.com
description: "A practical guide to choosing workflows vs. agents: trade-offs, patterns, and a simple decision checklist."
---

"Just use an agent for everything, you just need a markdown file with a set of instructions."

If you build AI systems, you keep bumping into two families of solutions: workflows and agents. They overlap, they can nest, and they can even run each other. But they are not interchangeable. Choosing the wrong one leads to brittle systems, runaway costs, and sad dashboards.

<!--more-->

In this post I'll break down the differences, show where each one shines, and give you a simple checklist I use to decide. At the end of the day, though, the best systems combine both in a boring, reliable way.

## Working Definitions

- Workflows: Deterministic(ish) sequences of steps with explicit control flow, data contracts, and strong guarantees (retries, timeouts, idempotency). Think GitHub Actions, Airflow/Dagster, Temporal, Prefect, or a LangGraph with explicit edges and typed state.
- Agents: Goal-driven loops that perceive → plan → act, with tools and memory. They choose what to do next at runtime, often with LLMs in the loop. Think coding assistants, triage bots, dynamic research helpers.

Both can call tools, both can branch, both can use LLMs. The difference is where the intelligence sits: in the graph you design (workflow) versus in the loop that decides the next action (agent).

## How They Differ (in practice)

- Determinism: Workflows are explicit and repeatable; agents are adaptive and probabilistic.
- Guarantees: Workflows prioritize SLAs (retries, backoff, idempotency, versioned deployments). Agents prioritize utility under uncertainty (reasoning, exploration, tool choice).
- Observability: Workflows emit traces per step with stable names. Agents need richer telemetry (thoughts, tools, state diffs) to be debuggable.
- Cost/Latency: Workflows shine when steps are predictable and cached. Agents add planning overhead; amortize it when the task benefits from autonomy.
- Change Surface: Workflows evolve via code/config changes. Agents evolve via prompts, tools, and memory; faster, but also riskier.
- Human-in-the-loop: Workflows insert approvals at known gates. Agents request help contextually (e.g., “I’m stuck; show diff to human?”).

## When to Use a Workflow

Use a workflow when you need:

- Clear start/end with predictable steps and SLAs
- Strong guarantees: retries, timeouts, idempotency, exactly-once or at-least-once semantics
- Compliance/auditability with stable step names and artifacts
- Parallelism and scheduling (cron, event triggers)
- Low variance in inputs, high volume throughput

Common cases:

- CI/CD pipelines with policy checks and deployments
- ETL/data pipelines with schema contracts and backfills
- Content moderation pipelines (batch) with deterministic fallbacks
- “Prepare context → call LLM → post-process → ship” tasks with strict envelopes

A tiny example (pseudo-YAML):

```yaml
jobs:
	nightly-report:
		steps:
			- fetch_data: {retry: 3, timeout: 60s}
			- summarize_llm: {model: gpt-x, temperature: 0.2, budget: $0.05}
			- redact_pii: {policy: strict}
			- publish: {destination: s3://reports/}
```

## When to Use an Agent

Use an agent when you need:

- Open‑ended goals with ambiguous paths (“find root cause”, “draft options”, “triage issues”)
- Tool selection and adaptive planning at runtime
- Iterative discovery, exploration, or negotiation
- Local memory of context while pursuing a goal
- Decomposing big goals into subgoals on the fly

Common cases:

- Support triage and routing (classify → ask for info → resolve or escalate)
- Research assistants that browse, extract, compare, and summarize
- Coding assistants that read, edit, run, and propose changes
- Incident copilots that explore hypotheses before paging a human

A tiny example (pseudo-Python):

```python
while not done(goal):
		observation = perceive()
		plan = llm.plan(goal, observation, tools)
		action = choose_tool(plan)
		result = action.run()
		memory.update(observation, action, result)
		if over_budget() or stuck():
				request_handoff(summary())
```

## The Boring Hybrid That Actually Works

Most production systems are hybrids:

- Workflow as the backbone: scheduling, budgets, retries, audit trails
- Agent as a step: used where adaptation creates value (e.g., “decide extraction schema”, “write the first draft”, “propose remediation”)
- Guardrails: hard time/budget caps, safe tool sets, and explicit handoff points

Three patterns I use a lot:

- Agent-in-a-step: The agent returns a structured output your workflow validates and persists. If invalid, fallback path.
- Supervisor workflow: The workflow loops with bounded attempts, calling the agent each turn and deciding to continue/stop.
- Agent spawns workflows: The agent requests “create backfill_job X with params Y” via a broker; ops remains deterministic.

## Decision Checklist

If you answer “yes” to most of these, prefer a workflow:

- Do you need strict SLAs and predictable runtime?
- Do you require auditability and deterministic replays?
- Is the path well-known and stable across runs?
- Would variance increase cost or risk without adding value?

If you answer “yes” to most of these, prefer an agent:

- Is the goal open-ended with incomplete information?
- Does tool selection/ordering depend on what you find?
- Will iterative exploration likely improve outcomes?
- Do you want to learn/adapt across runs quickly?

If you’re split: start with a workflow and put the agent behind one bounded step with a clear contract and a strong fallback.

## Anti‑Patterns to Avoid

- Agent-for-everything: You’ll pay planning tax where a `for` loop would do.
- Workflow spaghetti: Over-branching because you’re afraid of LLMs—use one agent step instead of 17 tiny prompts.
- Hallucinating orchestrators: Let the agent think; make the workflow enforce policy.
- No observability: For agents, record thoughts/tools/state deltas; for workflows, standardize step names and artifacts.
- Unbounded autonomy: Always set budgets, timeouts, and stop conditions.

## Practical Build Tips

- Contracts first: Define the schema that crosses boundaries (JSON Schema, Pydantic, Protobuf). Agents must return to contract.
- Test data, not vibes: Build golden datasets for representative tasks; run them nightly.
- Observability: Trace every call; for agents, store plans, tool invocations, and summaries for later diffing.
- Fallbacks: For every agent step, define a deterministic backup.
- Cost control: Cache embeddings/responses where safe; keep temperature low for ops tasks; cap turns.

## TL;DR

- Workflows make things reliable and repeatable.
- Agents make things adaptive and capable.
- Put agents inside workflows with budgets and contracts. Wish me luck 😅

---

You want to talk about this? You can find me on [Twitter](https://twitter.com/lucalanziani), [LinkedIn](https://www.linkedin.com/in/lucalanziani/), or [Mastodon](https://mastodon.social/@lucalanziani).
