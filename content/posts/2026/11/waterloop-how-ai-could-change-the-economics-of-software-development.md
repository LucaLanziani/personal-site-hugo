---
title: "Waterloop: How AI Could Change the Economics of Software Development"
date: 2026-11-01T12:00:00+01:00
draft: true
category: technology
tags: [AI, Software Engineering, Architecture, Agile]
email: luca@lanziani.com
description: "Waterloop is a hypothesis about combining upfront architectural intent with continuous, AI-assisted reconciliation as the cost of software change evolves."
---

I've been seeing more people dismiss spec-driven development as "waterfall again."

I understand the comparison. Write the requirements, define the architecture, then ask an agent to implement it. It can look a lot like the process we spent years trying to move away from.

But it made me wonder whether we're assuming the same cost of going back.

If agents can help us revisit the spec, design, code, and tests together, could we afford more upfront structure without treating those decisions as final?

That's the idea I started calling **Waterloop**.

<!--more-->

Waterloop is a hypothesis, not a validated methodology. It combines explicit architectural planning with continuous feedback and AI-assisted reconciliation between what a team intends to build and what it actually ships.

## The cost of going back

Waterfall organizes development into sequential stages: requirements, design, implementation, testing, and delivery. Structure gives teams a way to reason about a system, but closing decisions too early becomes expensive when assumptions change. Customers may need to see working software before they can explain what they need; implementation may expose a constraint the design missed.

Agile responds to this uncertainty with frequent delivery and feedback. Its [principles](https://agilemanifesto.org/principles.html) explicitly welcome changing requirements and encourage working software at regular intervals. Agile also addresses collaboration and discovering value, so it would be too simple to say it exists only because code is expensive to change.

Still, the economics matter. If a change costs weeks, a team has a strong reason to limit the amount of unvalidated work it builds before seeking feedback. If parts of that change become cheaper, the balance between planning and iteration may shift.

## Reversible design up front

I find the idea of *reversible design up front* useful here. Start with enough architectural clarity to understand the system: its domain, boundaries, interfaces, data flows, security constraints, and intended behavior. Record important decisions and the assumptions behind them. Then treat those decisions as hypotheses that can be revisited when evidence changes.

AI could help a team trace a proposed change across those artifacts, suggest alternatives, update code and tests, and identify documentation that needs review. A blueprint becomes useful when it helps explain the consequences of a change and stays close enough to the implementation to be trusted.

That last condition is difficult. A model can confidently miss a dependency, update a document to match an incorrect implementation, or generate tests that repeat the same mistake as the code. A living specification needs explicit ownership, traceability, automated checks where possible, and human review. Generating matching documents is not proof that the system meets its intent.

Some decisions also remain costly to reverse: a database migration with production data, a public API used by customers, a security boundary, or a dependency shared across teams. Faster code changes don't remove the need for compatibility plans, coordination, and rollback.

## A loop between intent and implementation

Waterloop organizes work around five connected activities:

1. **Define:** Describe the desired outcome, requirements, constraints, and acceptance criteria.
2. **Design:** Document the relevant architecture, interfaces, and decisions, including their assumptions.
3. **Build:** Implement a small enough change to inspect and integrate.
4. **Validate:** Check behavior, security, quality, and alignment with the intended outcome.
5. **Reconcile:** Use feedback to revisit requirements, design, code, tests, and documentation together.

These activities have a logical order, but they aren't gates that close permanently. A test can challenge the design; a prototype can reveal a product question; production feedback can invalidate an acceptance criterion. AI can help find affected artifacts and propose changes, while the people responsible for the system decide what to accept.

Consider an order service designed around a single delivery address per order. Later, a customer needs items sent to different addresses. An agent could identify the schema, API, validation rules, tests, and documentation that refer to the original assumption, then propose a migration and implementation. The team still needs to establish what happens to existing orders, agree on API compatibility with consumers, test the migration against representative data, review security and privacy implications, and plan deployment and rollback.

The agent's impact analysis is a starting point for review, not an exhaustive dependency map. The change is complete only when the behavior, design records, tests, and operational plan agree—and the customer need has been checked.

## Measure the whole change

The economic claim can be expressed as:

```text
Cost of change = analysis + redesign + implementation + testing
               + coordination + deployment + risk
```

AI may reduce effort in analysis, implementation, test creation, and documentation, but it can also add review and correction work. Risk isn't simply another number on a timesheet: a rare production failure can outweigh many quick changes.

We shouldn't assume a productivity gain. In [METR's randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), experienced open-source developers working on familiar repositories took longer on average when allowed to use the early-2025 tools studied. That result describes a particular group, task set, and tool generation; it doesn't settle the question for every team or newer tool. It does show why perceived speed is a poor substitute for measurement.

A useful Waterloop experiment would compare similar changes with and without an AI-assisted reconciliation workflow, or track a baseline before adopting it. Record the starting conditions and include:

- Time from the change request to a reviewed, deployed result, including coordination and migration work.
- Time spent reviewing and correcting generated analysis, code, tests, and documentation.
- Defects, failed deployments, and follow-up work observed over a defined period.
- Whether the architecture and acceptance criteria were updated, reviewed, and still match the delivered behavior.
- The nature of each change and its dependencies, so unlike tasks aren't treated as equivalent.

A small team won't get a clean scientific result from a few changes. It can still learn where the workflow saves time, where it adds work, and which checks catch problems before release. If review queues grow or incidents rise while implementation gets faster, the delivery system has moved the cost rather than removed it.

## Planning still needs feedback

Waterloop doesn't make Agile obsolete. Customer feedback, frequent delivery, and collaboration remain essential because producing a technically coherent system faster doesn't establish that it solves the right problem. Upfront architecture can itself become waste if a team designs far beyond what it can validate. The right amount of detail depends on the uncertainty and the consequences of getting a decision wrong.

The proposal is to make architectural intent explicit enough to guide changes, keep decisions revisable where practical, and use AI to help reconcile the artifacts as the system evolves. That requires the surrounding delivery system—tests, review, deployment controls, observability, and ownership—to work too. I explored that broader gap between coding speed and delivery in [AI Engineering](/posts/2026/06/ai-engineering/).

The next step is to try this on real changes and measure the complete path to production. If the total cost of rework falls without compromising quality, more upfront design may become worthwhile. If it doesn't, the experiment should tell us where the apparent savings went.
