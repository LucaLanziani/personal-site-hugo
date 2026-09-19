---
title: "The Engineer's New Job Is Harness Engineering"
date: 2026-04-26T19:00:00+02:00
draft: true
category: general
tags:
  [
    AI,
    EngineeringLeadership,
    Codex,
    AgenticWorkflows,
    SoftwareEngineering,
    DevEx,
  ]
email: luca@lanziani.com
description: "Why engineering leaders should stop focusing only on whether AI writes code and start focusing on the environment, guardrails, and feedback loops that make agents reliable."
---

For the last two years, we have been asking whether AI can write code.

That is still interesting, of course. But I think it is no longer the most important question.

<!--more-->

The more important question is this: can your engineering environment make good work likely?

That was my main takeaway from OpenAI's recent piece on "harness engineering." Not the million lines of code. Not the provocative "no manually written code" angle. And not the predictable wave of hot takes that followed.

What stood out to me was something much more pragmatic: the real leverage came from turning architecture, validation, documentation, observability, and review into something the agent could actually see and use.

That is a very different conversation from "look, the model built a feature."

## The code is not the bottleneck anymore

If an agent can generate code, tests, configs, scripts, and even docs at a pace no human team can match, then the constraint moves.

It moves to:

- how clear the task is
- how legible the codebase is
- how strong the guardrails are
- how fast the system can validate itself
- how much institutional knowledge is trapped outside the repo

In other words, the bottleneck becomes the operating environment.

That is why I think "harness engineering" is a useful phrase. It forces us to admit that the engineer's job is moving up a layer of abstraction.

Less time goes into typing the implementation line by line.
More time goes into designing the system that makes good implementations repeatable.

I do not think this means engineers stop engineering. Quite the opposite.

It means the engineering work shifts toward structure, clarity, and control.

## The new leverage is in the scaffolding

There is a sentence in that OpenAI article that stayed with me: humans steer, agents execute.

That sounds simple, but if you take it seriously, it has consequences.

If agents execute, then leadership teams need to care much more about the things we used to treat as supporting material:

- architectural boundaries
- repository docs
- testing discipline
- observability in local and CI environments
- repeatable review loops
- permission models
- quality rules encoded as tooling, not tribal knowledge

This is where a lot of teams will struggle.

Many engineering organizations are still operating on a very human-native model. The real rules live in Slack. The architectural compromises live in people's heads. The acceptance criteria live in a Jira ticket and three meetings. The documentation is either missing or decorative.

Humans can survive that. Agents cannot.

From an agent's point of view, if something is not in the repo, not exposed through tools, and not encoded into checks, it may as well not exist.

That is uncomfortable, but also useful. It exposes how much of our delivery system is built on memory and goodwill.

## This changes what good engineering leadership looks like

If I were a CTO or Head of Engineering trying to prepare a team for this shift, I would not start by asking which coding agent to buy.

I would start with these questions instead:

- Can a newcomer understand our system from the repo alone?
- Are our boundaries explicit, or just socially enforced?
- Do our tests validate outcomes, or just exercise code paths?
- Can logs, metrics, and traces help a machine debug, not just a human?
- Do our docs explain the why, or only the what?
- Where does important knowledge still live outside version control?

Those are not AI questions on the surface.

They are engineering maturity questions.

The difference now is that the payoff for answering them well is much larger. You are not just helping humans move faster. You are increasing the amount of work an agent can do safely without supervision.

And once you have that, the throughput conversation changes completely.

## The hidden risk: speed without shape

There is, of course, a trap here.

If agents accelerate output but the surrounding system is weak, you do not get engineering leverage.

You get very fast entropy.

That is the part that people still underestimate. A team can feel wildly productive while silently filling its codebase with drift, duplication, vague abstractions, weak validation, and local optimizations that make future work harder.

The OpenAI article hints at this too. Once throughput went up, they had to invest more in architecture, doc quality, custom linters, and recurring cleanup.

That makes sense to me.

When code becomes cheap, coherence becomes expensive.

So I do not read harness engineering as "we don't need good engineers anymore."

I read it as the opposite.

We need engineers who can design systems where reliability compounds.

## Final take

I think many teams are still obsessing over the wrong milestone.

The breakthrough is not that AI can write code.

The breakthrough is that, under the right conditions, AI can participate in a disciplined software delivery system with surprisingly high autonomy.

Those conditions do not appear by magic. They have to be engineered.

That is why I suspect the highest-leverage engineers over the next few years will not just be the best prompt writers or the fastest coders.

They will be the people who can make a codebase legible, a workflow measurable, and a delivery loop enforceable.

In other words, the people who know how to build the harness.

You can find me here:

[luca@lanziani.com](mailto:luca@lanziani.com) | [Linkedin](https://www.linkedin.com/in/lucalanziani/) | [X](https://x.com/lucalanziani)
