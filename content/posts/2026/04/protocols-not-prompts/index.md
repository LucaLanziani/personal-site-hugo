---
title: "Protocols, Not Prompts: The Next AI Platform War"
date: 2026-04-26T19:15:00+02:00
draft: true
category: general
tags: [AI, A2A, MCP, Architecture, EngineeringLeadership, Interoperability]
email: luca@lanziani.com
description: "Why engineering leaders should pay more attention to protocols like MCP and A2A than to prompt tips or one-off model benchmarks."
---

For a while, the AI conversation was about prompts.

Then it became about models.

Now I think the real conversation is shifting again, this time toward protocols.

<!--more-->

I was reading Google's recent guide to AI agent protocols, plus the push around A2A under the Linux Foundation, and it made something click for me.

The long-term value in this space will not come from whichever model wins this week's benchmark.

It will come from how easily your agents can:

- connect to tools
- discover other agents
- exchange structured context
- act under policy
- stream results into products people actually use

That is not a prompt problem.

That is an architecture problem.

## We are moving from isolated assistants to connected systems

A lot of AI adoption still happens in a very local way.

One user. One interface. One model. One task.

That can deliver value quickly, but it does not scale into an enterprise operating model on its own.

As soon as you want agents to do real work across systems, the cracks show up:

- every tool needs a custom integration
- every vendor speaks a different language
- every workflow invents its own context format
- every product team rebuilds the same glue code
- every governance discussion starts from scratch

This is exactly why protocols matter.

MCP gives a standard way for agents to connect to tools and data.
A2A gives a standard way for agents to discover and talk to other agents.
And once you start seeing it through that lens, the landscape becomes much easier to understand.

The question is no longer "which assistant do we like?"

The question becomes: what kind of agent ecosystem are we building, and how portable is it?

## This is an engineering leadership issue, not just a developer trend

It is tempting to see protocol work as deeply technical and therefore not very strategic.

I think that is a mistake.

For C-level leaders and Heads of Engineering, protocols sit right in the middle of some very expensive decisions:

- vendor lock-in
- integration cost
- platform strategy
- security boundaries
- identity and delegation
- auditability
- long-term maintainability

If your AI stack only works when everything comes from one vendor, through one interface, with one orchestration model, you do not really have a platform.

You have a bundle.

Bundles are convenient, but they become expensive the moment your needs diversify.

That is why the Linux Foundation move around A2A is worth paying attention to. Neutral governance is not just nice for press releases. It is what makes interoperability credible.

If multiple major vendors are willing to show up around a common layer, that is usually a signal that the market is trying to standardize before fragmentation becomes painful.

## Prompts still matter, but they are not the moat

Do not get me wrong. Good prompts are still useful.

So is model choice.

But I do not think either of those will be the durable differentiator for serious engineering organizations.

Prompting is a technique.
Protocols are infrastructure.

And infrastructure is where scale lives.

The teams that move first here will not necessarily be the ones with the cleverest demos. They will be the ones that reduce custom integration work, lower switching costs, and create clearer seams between capabilities.

That matters because agent systems are going to get messy very quickly.

Without standards, every new workflow becomes a special case.
With standards, at least you have a chance to compose things cleanly.

## The next architecture diagrams will look different

I suspect that, a year from now, a lot of enterprise architecture diagrams will need new boxes and arrows.

Not because microservices are going away, but because there is a new coordination layer emerging on top of them.

Teams will need to model:

- how agents discover capabilities
- which tools they can access
- what identity they act under
- which decisions require approval
- how inter-agent communication is secured
- what gets logged and audited

This is where protocol choices start to matter a lot.

Once those patterns are part of your operating model, changing them later is not trivial.

That is another reason I think leaders should care early. The lock-in risk is not just at the model layer. It is at the orchestration and interoperability layer too.

## Final take

The more I look at the current wave of announcements, the more I think the real AI platform war is not about who has the smartest chatbot.

It is about who defines the interfaces.

Because the interface layer decides whether your future AI estate is composable or brittle.

If I were advising an engineering leadership team right now, I would spend less time debating prompt frameworks and more time understanding the protocol stack that is forming underneath the market.

Prompts help people talk to models.
Protocols help systems work together.

And in the enterprise, the second one tends to matter for longer.

You can find me here:

[luca@lanziani.com](mailto:luca@lanziani.com) | [Linkedin](https://www.linkedin.com/in/lucalanziani/) | [X](https://x.com/lucalanziani)
