---
title: "AI Made Developers Faster. Why Aren't You Shipping More?"
date: 2026-05-15T10:00:00+02:00
category: general
tags: [AI, EngineeringLeadership, ProductLeadership, OrgDesign, AI Engineering]
email: luca@lanziani.com
description: "We cut months of implementation down to eight weeks. Then the pull requests piled up. AI made coding faster, but the rest of delivery still had to catch up."
series: [AI Engineering]
---

I spent years using AI without really believing in it.

I had a chat frontend running on my home server. I used it to write bedtime stories for my kids. I tried it for coding too, but the result was usually too verbose, full of mistakes, and worse than what I would have written myself. It was interesting. It was not useful enough.

That changed for me on October 4, 2025. Claude Sonnet 4.5 had just come out, and I finally had time to test it properly. More importantly, I paired it with spec-driven development.

The combination made something click. The model could follow a substantial piece of work, not just complete a small function. For the first time, I could see it creating real value.

Then we tried the same approach on a real project at NearForm.

<!--more-->

## We did get faster

The piece of work had originally been estimated at five or six months. We delivered it in eight weeks.

I joked at the time that the formula was simple: take a senior engineer, add a good spec and a capable model, and you get roughly three times the output.

It worked, but the conditions matter.

The project had already been running for two years. The engineers knew the codebase inside out. Stories and designs were ready. The scope was clear. Most of the remaining work was implementation, which is exactly where the current models are strongest.

That is a good result. It is also close to an ideal case, and most work does not arrive in that shape.

When the scope is vague, the architecture is unsettled, or getting to production is the hard part, faster code only helps so much.

## The pull requests caught up with us

The first two weeks felt almost silly. Three developers were moving faster than the four-person team we would normally have used. At points, implementation looked five times faster.

Then the pull requests started piling up.

Code review had not become five times faster. Neither had QA, integration, release coordination, or the conversations needed to resolve an unclear requirement. We had to stop and breathe.

This is the bit that gets lost in productivity claims. Producing code is one part of delivery.

```text
Intent
  -> Discovery
  -> Design
  -> Specification
  -> Implementation
  -> Review
  -> Test
  -> Deployment
  -> Operation
```

Most coding tools concentrate on implementation and, increasingly, testing and review. They do not remove the rest of the chain.

Speeding up one box can even make the next box worse. Review queues grow. QA receives more changes than it can test. Product runs out of ready stories. Design discovers decisions after they have been coded. Marketing and legal hear about a release too late to do much about it.

The company is not necessarily broken. It was built around one delivery pace, and that pace changed.

## Specs helped people too

One of the more useful lessons from that project came from QA.

Our QA engineer found that spec-driven development made her job easier because the stories were finally clear. The specs were written to give the model better context, but humans benefited from the same context.

That seems obvious in hindsight. Models expose weak requirements quickly, but they did not invent the problem. People have always struggled with vague stories too.

AI was also very good at generating end-to-end tests. We used it with Playwright and pushed automated coverage to around 90% much faster than we would have before.

Manual testing did not disappear. Some deep flows still needed a person who understood the product and knew where it usually broke. The useful change was that QA could spend less time on routine coverage and more time on those flows.

Quality still belonged to the team. We had simply moved more of the repetitive work into automation.

## The roles are getting blurrier

There is a lot of talk about product managers, designers, and developers becoming interchangeable. I think that overstates it. Very few people are good at all three jobs.

The boundaries are moving, though.

A designer who understands a little code can now move beyond Figma and build a working prototype. A product manager can turn a large PRD into smaller milestones and test an idea before handing it to engineering. A developer can explore an interaction without waiting for a finished design.

At NearForm, we are already using AI during discovery. We can transcribe a workshop, extract themes, move into clickable prototypes, and start producing component libraries, Storybook examples, and specs. The handoffs are still there, but they are shorter and everyone has something concrete to react to.

We sometimes call these people T-shaped builders. They still have a deep specialty, but they can work far enough into a neighbouring discipline to keep things moving.

As generation gets cheaper, taste becomes more important. I mean taste in the practical sense: can you look at what the model produced and tell whether it is useful, maintainable, and good for the people who will use it?

Knowing how to generate something is not the same as knowing whether it should ship.

## More output creates more responsibility

If teams ship more experiments, SRE and operations inherit more things to observe, support, and recover. Product consistency gets harder. A small implementation team can produce a surprising amount of operational surface area.

Observability tools are adding AI too, but I do not think we have solved this. Generating an application quickly is much easier than keeping it reliable for years.

The same tension shows up in code review. Some people argue that humans should stop reading generated code and review only the behaviour. I land somewhere in the middle.

The right level of review depends on the system and the evidence around it. It also depends on who carries the responsibility. If a developer or tech lead is going to wake up when the service fails at 3 a.m., they will probably want to understand the code.

Tests, static analysis, previews, and AI-assisted review can reduce how much code a person needs to inspect. They do not make accountability disappear.

## The rest of delivery has to change

Slowing engineering down is one way to clear the queues, but it wastes the capability we just gained. I would rather change the system around it.

That starts earlier than coding. PMs need to break large ideas into smaller milestones. Designers need ways to test working prototypes sooner. Specs need to carry intent from discovery into implementation and QA. Frameworks such as BMAD can help move from product brief to architecture, stories, and implementation, although I am still testing how well that loop scales across a team.

The later stages need work too. Review has to rely more on automated evidence. QA needs to be involved while specs are written. Platform teams need to make deployment, observability, and rollback the easy path. Marketing, legal, and support need enough visibility to prepare before a release appears.

This does not mean inviting the whole company to an engineering standup. It means looking at every handoff and asking whether it still makes sense when implementation takes days instead of months.

In other words: be agile. Actually agile, not just busy inside two-week sprints.

We proved that AI can compress months of coding into weeks. We also learned that the saved time does not automatically become faster delivery.

The bottleneck moved. Now the organization has to move with it.

## Related reading

- [I Was Highly Skeptical, But Now I'm a Believer](/posts/2025/10/skeptical-to-believer/): what changed my mind about coding with AI
- [Testing the BMAD Method](/posts/2025/10/testing-bmad/): my first experiment with spec-driven development
- [AI Engineering](/posts/2026/06/ai-engineering/): the workflows, platforms, and quality systems around AI-assisted development
