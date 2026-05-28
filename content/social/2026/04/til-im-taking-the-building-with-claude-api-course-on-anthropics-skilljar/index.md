---
title: "TIL: I’m taking the \"Building with Claude API\" course on Anthropic’s Skilljar an"
date: 2026-04-26T22:34:59+02:00
category: general
tags: []
email: luca@lanziani.com
description: "TIL: I’m taking the \"Building with Claude API\" course on Anthropic’s Skilljar an"
---
TIL: I’m taking the "Building with Claude API" course on Anthropic’s Skilljar and just learned a nice trick: using assistant messages and stop_sequences to extract structured data.

<!--more-->

TL;DR: Inject an assistant message with "```python" to force the model down a path  and set a stop sequence to "```" to extract the code.

