---
title: "Hear me out... AI Skills should include tools. 🛠️"
date: 2026-01-26T17:29:17+02:00
category: general
tags: [AI, SoftwareArchitecture, LLMs]
email: luca@lanziani.com
description: "Hear me out... AI Skills should include tools. 🛠️"
---

Hear me out... AI Skills should include tools. 🛠️

<!--more-->

Right now, most architecture associates tools directly with Agents. You define an agent, then you attach a laundry list of tools to it.
But honestly? This kills composability.
Think about it: If I have a Frontend Agent and a Backend Agent, I currently have to explain to both of them how to run e2e tests or linting. Then, I have to manually give both of them access to the specific tools needed to do it.
It creates unnecessary friction and redundancy.
We should flip the model: Allow Skills to expose the tools.
A Skill shouldn't just describe how to do a task, it should also bundle the tools needed to actually get it done. The logic is simple: if the Agent has the Skill, it automatically gets the Tools.
Better modularity, less repetition.
