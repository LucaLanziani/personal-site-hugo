---
title: "What Agent Requests Can Tell You About Your Product"
date: 2026-10-15T15:53:56+02:00
category: engineering
tags: [AI Engineering, MCP, Product Development, Observability]
description: "MCP requests can reveal missing views and repeated workflows. Capture intent carefully, then turn those signals into product experiments."
draft: true
---

A customer needs a list of European accounts that haven't renewed, with the primary contact for each account. Your product has the data. Getting it onto one screen takes three filters, a trip to another page, and a spreadsheet.

Expose the right capabilities through a Model Context Protocol (MCP) server, and an agent can assemble that view from a request:

> Show me all European accounts that haven't renewed yet, and pull up their primary contacts.

That's a useful interface. It also gives the product team something worth studying: a concrete example of the work a customer wants to complete.

I think this is an underused reason to build an MCP interface. The requests going through it can help us decide what belongs in the product itself. What follows is an approach I'd test, using the renewal request as a hypothetical example.

<!--more-->

## The agent assembles the view your product doesn't offer

A conversational interface lets users describe combinations your team hasn't designed a screen for. The agent can retrieve records, join results, and present the subset that matters to the task, provided the tools expose enough meaning and the user has permission to access the data.

For the renewal request, imagine a sequence like this:

```text
Find European accounts awaiting renewal
  -> Retrieve their primary contacts
  -> Present a renewal follow-up list
```

The customer gets a useful result. The product team gets a hypothesis: perhaps account managers need a renewal workspace with contacts already attached.

If that pattern repeats across customers, it deserves investigation. Leaving the workflow permanently hidden inside conversations would mean missing an opportunity to improve the application.

## Decide which part of the product needs work

A repeated renewal request could justify several different changes. I'd review examples with account managers before deciding which one to try.

| What we learn from customers | Change worth testing | What to check |
| --- | --- | --- |
| They regularly assemble the same list and want to return to it in the application | A saved renewal view with primary contacts | Can they complete follow-up preparation with fewer steps? |
| They prefer working in their agent, but it repeatedly struggles to join accounts and contacts | A combined MCP tool for the renewal list | Does the agent produce a complete, correct list more reliably? |
| The request is occasional and the current agent workflow already works well | Keep the existing interfaces | Is there enough recurring effort or failure to justify maintenance of another feature? |

The same sequence of calls can support any of these interpretations. Ask what the customer was trying to finish, whether the result helped, and where they still had to do manual work. Where users have agreed to the measurement, web interaction evidence can help identify navigation problems too.

An MCP call alone doesn't prove someone gave up on the UI. Some people will start in their agent because that's where they already work. Agent users may also represent a narrow slice of your customer base.

Count distinct users or accounts and completed workflows where you can. Pagination, retries, and one enthusiastic automation can otherwise dominate the apparent demand. A successful tool response also doesn't establish that the customer's overall task succeeded.

This gives the product team a short list of experiments, with a reason for each. The next question is how much of the customer's goal we can actually observe.

## Tool calls preserve the action and lose some of the reason

Your MCP server might receive a call like this:

```json
{
  "name": "get_clients",
  "arguments": {
    "region": "Europe",
    "status": "pending_renewal"
  }
}
```

Those arguments are useful evidence. They show which filters the agent selected. They don't tell you whether the customer was preparing outreach, reviewing revenue risk, or answering a colleague's question.

They might also contain a mistaken interpretation. The model's translation from a sentence into parameters still needs to be checked.

This boundary is part of the [MCP architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture): the host retains the full conversation, while a server receives the context shared with it. An external host doesn't automatically send your server the user's prompt.

Start by recording the operations you can observe: tool names, appropriate parameters, errors, latency, and result counts. Use trusted application context to associate calls with the same customer or task where available. That gives you a baseline even when the server receives no explanation of the goal.

Then consider how to capture the goal behind those operations.

## Optionally capture the goal alongside the calls

One design I'd explore is a dedicated `log_user_intent` tool. It keeps the intent summary separate from the business arguments of tools such as `get_clients` and `export_pdf`.

Here is an illustrative tool definition using MCP's `inputSchema` format:

```json
{
  "name": "log_user_intent",
  "description": "Record a product goal when feedback sharing is enabled.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "user_intent": {
        "type": "string",
        "maxLength": 500,
        "description": "Use the stated goal; omit sensitive or unrelated details."
      }
    },
    "required": ["user_intent"],
    "additionalProperties": false
  }
}
```

A business tool's description could ask the model to call this feedback tool when starting a task. For the renewal example, a useful summary would be “Find European accounts awaiting renewal and their primary contacts.” Inferring “Prevent churn before the quarterly board meeting” would add a motivation the user never supplied.

The backend must enforce the feedback setting, validate the input, and control storage and retention. A sentence in the description doesn't implement those controls. I'd start with a short summary: a full conversation may contain unrelated information about other systems or people. Keep model summaries separate from customer-confirmed explanations.

Tool descriptions also can't guarantee that feedback arrives. The [MCP tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) describes model-controlled tools; an instruction to log intent doesn't enforce exactly one call per task. Clients can omit the tool, models can skip it, and retries can produce duplicates. Tasks that never call your server remain invisible.

If you own the agent application, capture permitted context there and attach a task identifier to the calls. For external clients, test whether summaries arrive and whether you can associate them with the relevant operations. Leave missing context marked as missing, and let the customer's operation proceed without it. A logging failure shouldn't block someone preparing their renewal list.

## Test the renewal view with the people doing the work

Suppose those conversations point to a saved renewal view. Ask account managers to try a version with primary contacts included, using a real follow-up task. Check whether they get the right accounts and contacts, how much manual work remains, and whether they can finish more easily than before.

Include customers who use agents and customers who don't. A drop in MCP usage is ambiguous; customers completing their work more easily is a better reason to keep the change.

Use what you learn to decide whether to expand the view, improve the tool, or leave the workflow as it is.
