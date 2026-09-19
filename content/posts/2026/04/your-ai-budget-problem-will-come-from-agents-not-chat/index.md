---
title: "Your AI Budget Problem Will Come From Agents, Not Chat"
date: 2026-04-26T19:30:00+02:00
draft: true
category: general
tags:
  [
    AI,
    FinOps,
    EngineeringLeadership,
    GitHubCopilot,
    ClaudeCode,
    AgenticWorkflows,
  ]
email: luca@lanziani.com
description: "Why the real AI cost problem for engineering leaders is no longer chat usage, but long-running, tool-using, background agents."
---

I think many companies are still budgeting for AI as if it were a clever assistant sitting next to one employee, answering one question at a time.

That model is already outdated.

<!--more-->

The cost profile changes completely once you move from chat to agents.

An agent does not just answer.

It plans.
It retries.
It reads files.
It calls tools.
It reasons longer when the task gets harder.
It may open a pull request, wait for feedback, revise the work, and run again.

And, increasingly, it does all of that while the human is away doing something else.

That is why I suspect a lot of engineering organizations are about to discover an uncomfortable truth: their first serious AI scaling problem will not be capability.

It will be cost control.

## Chat spend is simple. Agent spend is not.

With chat, the mental model is manageable.

You roughly know:

- how many users you have
- what plan they are on
- how often they use the tool
- which model they default to

That is already not perfect, but it is understandable.

Agents make it much murkier.

Now cost depends on things like:

- how much reasoning effort the model applies
- how much context gets pulled in
- how many retries happen behind the scenes
- how many tools are called in a loop
- how long the task runs before escalation
- whether work is delegated in the background
- whether the system compacts, summarizes, or rehydrates context

At that point, you are no longer paying for "answers."

You are paying for a workflow engine whose bill is partly shaped by model behavior and partly by your own operating discipline.

## The tooling signals are already there

The recent updates from GitHub and Anthropic make this pretty obvious.

GitHub is adding more explicit plan mode, background delegation, repository memory, and richer control over long-running workflows.
Anthropic is adding effort controls, context compaction, larger context windows, and even agent teams.

These are useful features. I am not complaining about them.

But they all push in the same direction: more autonomy, longer sessions, and more hidden work per task.

That means more variance in cost.

It also means the old "per seat" mental model becomes less useful on its own.

Two teams with the same number of users may generate wildly different bills depending on how they route work, what defaults they set, and how much unattended execution they allow.

## This is where AI FinOps starts to matter

I know, I know. "AI FinOps" sounds like the kind of phrase invented in a conference breakout room by people who enjoy dashboards a bit too much.

But I do think some version of it is becoming real.

Not because finance suddenly cares about prompt engineering, but because engineering leaders will need new ways to answer very practical questions:

- Which models are worth their premium cost for which tasks?
- Where should reasoning depth be capped?
- Which tasks justify background execution?
- Where do we need approval gates?
- What is the acceptable cost per merged change, per migration, or per review?
- How do we detect loops, retries, and runaway context growth?

Cloud FinOps taught us that convenience without visibility becomes expensive very quickly.

Agentic AI is going to teach the same lesson again.

## Good governance here is not anti-innovation

There is a predictable failure mode in organizations whenever cost governance shows up.

One side says, "We need complete freedom to experiment."
The other side says, "This is getting expensive, lock it down."

Both instincts are understandable. Neither one is sufficient.

The right answer is to build sensible defaults.

For example:

- cheaper models for simple work
- premium models for long-horizon tasks only
- explicit escalation for expensive workflows
- cost visibility by team and task type
- timeouts for background agents
- approval policies for high-cost or high-risk actions

That is not bureaucracy.

That is just product management for your AI platform.

## The budget conversation should be tied to outcomes

This is the other trap I would avoid.

If leadership only asks, "How much did we spend?" they will get the wrong behavior.

Teams will either hide usage, avoid useful tools, or optimize for cheaper models even when quality drops.

The better question is: what outcome did that spend buy us?

Did it reduce cycle time?
Did it improve migration speed?
Did it catch defects earlier?
Did it cut toil?
Did it increase the number of safe changes we can ship?

If you cannot connect cost to a meaningful engineering outcome, then yes, you probably have a problem.

But if a more expensive workflow replaces weeks of slow, error-prone human effort, the headline token bill may not be the thing to worry about.

## Final take

I do not think the next twelve months will be defined by whether agents become more capable.

They will.

The more interesting question is whether engineering organizations learn to govern them like a platform.

That means model routing, approval policies, context discipline, retry controls, and usage visibility stop being optional nice-to-haves.

They become part of the operating model.

So yes, AI is getting cheaper in some ways.

But if you let autonomous workflows grow without controls, the bill can still surprise you.

The future cost problem is not chat.

It is agents running just long enough to be useful, and just invisibly enough to be expensive.

You can find me here:

[luca@lanziani.com](mailto:luca@lanziani.com) | [Linkedin](https://www.linkedin.com/in/lucalanziani/) | [X](https://x.com/lucalanziani)
