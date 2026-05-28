---
title: "AI Engineering"
date: 2026-06-01T08:00:00+02:00
publishDate: 2026-06-01T08:00:00+02:00
category: general
tags: [AI Engineering, Platform Engineering, DevOps, AI-native SDLC, Spec Driven Development]
email: luca@lanziani.com
description: "AI Engineering is the design of workflows, platforms, quality systems, evaluations, governance, and delivery practices that make AI-assisted development useful in real organizations."
series: [AI Engineering]
---

AI Engineering is not just prompting or model selection. It is the design of workflows, platforms, quality systems, evaluations, governance, and delivery practices that make AI-assisted development useful in real organizations.

My angle is practical: AI makes coding faster, but organizations still need better specs, platforms, review systems, automation, governance, and delivery ownership to actually ship faster.

<!--more-->

## What I Mean by AI Engineering

AI Engineering is the discipline of turning AI-assisted work into reliable shipped software. It covers how teams describe work, how agents receive context, where automation runs, which permissions are allowed, how output is reviewed, how evidence is collected, and who owns the result in production.

For software organizations, that means AI Engineering sits close to Platform Engineering, DevOps, security, quality, and engineering leadership. The model is only one component. The surrounding system determines whether the work is useful.

## Why Coding Speed Is Not Delivery Speed

AI can produce code faster than most teams can review, integrate, test, secure, and release it. That creates a new bottleneck: the organization around the code.

The critical questions become:

- Was the task specified well enough?
- Did the agent work inside the right boundaries?
- Is there evidence that the behavior is correct?
- Are security, dependency, and operational risks visible?
- Can the team deploy and own the change?

I wrote the longer version in [AI Made Developers Faster. Why Aren't You Shipping More?](/posts/2026/05/ai-made-developers-faster-why-arent-you-shipping-more/).

## The AI-Native SDLC {#ai-native-sdlc}

An AI-native SDLC treats agents as part of the delivery workflow, not as an isolated coding tool.

```text
Intent
  -> Spec
  -> Plan
  -> Agent task
  -> Generated change
  -> Automated evidence
  -> Human review
  -> Integration
  -> Deployment
  -> Production feedback
```

The important design choice is to make every handoff explicit. Specs define intent. Plans define approach. CI produces evidence. Review validates behavior and risk. Deployment closes the loop.

## Agentic Delivery Workflow {#agentic-delivery-workflow}

A practical agentic workflow should start from a tracked work item and end in a reviewable change:

```text
Issue
  -> Spec and acceptance criteria
  -> Bounded agent session
  -> Branch and pull request
  -> Tests, linters, security checks, and previews
  -> Human review against the spec
  -> Merge and deploy
```

The agent should not be a side channel. It should operate inside the same delivery system the team already trusts.

## Platform Requirements for AI-Assisted Teams

AI-assisted teams need a platform layer that makes the right path easy and the risky path visible.

Useful platform capabilities include:

- Golden paths for common work types
- Ephemeral environments for agent execution
- Repository and filesystem permission boundaries
- Secrets isolation and approval gates
- CI/CD checks tuned for generated code
- Observability for tool calls, agent runs, and review evidence
- Clear escalation paths when agents get stuck

This is where DevOps and Platform Engineering experience matters. AI adoption fails when it only optimizes typing speed and ignores the delivery system.

## Governance, Quality, and Review

AI-generated code should be reviewed against intent and evidence, not just line-level style.

Reviewers should ask:

- Does the change satisfy the spec and acceptance criteria?
- Are tests meaningful and connected to the requested behavior?
- Did the agent change anything outside the task boundary?
- Are security, privacy, dependency, and permission risks understood?
- Is the code maintainable by the team after the agent is gone?
- Is deployment and rollback ownership clear?

Governance should be built into workflow design: approved tools, model usage boundaries, data handling rules, audit trails, and human-in-the-loop checkpoints for high-risk changes.

## Spec Template {#spec-template}

A useful AI task spec should include:

- Problem statement
- User or business outcome
- Scope and non-goals
- Constraints and assumptions
- Acceptance criteria
- Relevant files, APIs, services, or documents
- Test strategy
- Security and operational considerations
- Definition of done

The goal is not bureaucracy. The goal is to reduce ambiguity before the agent starts moving fast.

## AI Code Review Checklist {#ai-code-review-checklist}

Use this checklist when reviewing AI-assisted changes:

- Compare the implementation with the original spec
- Inspect the diff for unrelated or unexplained changes
- Validate tests, not just their existence
- Check failure modes, edge cases, and permissions
- Review dependencies, generated code, and copied patterns
- Confirm observability, deployment, and rollback impact
- Ask for evidence when behavior is hard to inspect manually

## Platform Readiness Assessment {#platform-readiness-assessment}

Before scaling AI-assisted development, assess whether your platform can support it:

- Can agents work in isolated environments?
- Can permissions be scoped per repository, task, and tool?
- Are secrets protected from prompts, logs, and generated output?
- Are tests and checks fast enough to support iteration?
- Can reviewers see what the agent did and why?
- Are generated changes traceable to a work item and spec?
- Do teams have ownership for production impact?

## Governance Checklist {#governance-checklist}

Minimum governance for AI-assisted delivery:

- Approved tools and account boundaries
- Data classification rules for prompts and context
- Human approval for production-impacting changes
- Audit trail for agent runs and generated changes
- Security checks for dependencies, secrets, and permissions
- Clear accountability for merged code
- Periodic review of model, tool, and workflow effectiveness

## Recommended Reading

- [AI Made Developers Faster. Why Aren't You Shipping More?](/posts/2026/05/ai-made-developers-faster-why-arent-you-shipping-more/)
- [Building Jarvis](/posts/2026/05/building-jarvis/)
- [I Was Highly Skeptical, But Now I'm a Believer](/posts/2025/10/skeptical-to-believer/)
- [Testing the BMAD Method](/posts/2025/10/testing-bmad/)
- [Spec-Driven Development series](/series/spec-driven-development/)

## Resources

Useful starting points:

- [AI Made Developers Faster. Why Aren't You Shipping More?](/posts/2026/05/ai-made-developers-faster-why-arent-you-shipping-more/)
- [Building Jarvis](/posts/2026/05/building-jarvis/)
- [Spec-Driven Development series](/series/spec-driven-development/)
- [LinkedIn and GitHub profile copy](/resources/profile-copy/)
