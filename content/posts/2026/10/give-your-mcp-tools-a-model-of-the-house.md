---
title: "Finding the Right Abstraction for MCP Tools"
date: 2026-10-11T08:00:00+02:00
category: engineering
tags: [AI Engineering, MCP, Architecture, API Design]
description: "MCP tools can inherit an API’s constraints or leave agents interpreting raw database records. Expose useful tasks while keeping domain rules in the service."
draft: true
---

When I added semantic tools to my home-automation MCP, answering “what's the status of the house?” required reconstructing information the dashboard already knew: which addresses belonged to one device, which values were feedback, and which entries were duplicates.

The web interface worked with KNX group addresses. A physical device could have separate command and feedback addresses, plus room aliases. Other addresses represented collective controls or aggregate indicators. The dashboard arranged those signals into controls and room views; an agent reading the same records had to work out those relationships before it could count anything.

That experience made me think about two ways an MCP interface can miss the task. Follow an existing API too closely, and the agent inherits operations designed for another consumer. Follow the database too closely, and the agent gets records whose meaning it has to reconstruct.

I want tools that give the agent room to answer different questions while keeping device identity, state interpretation, and counting rules in the service.

<!--more-->

## Too close to the API: the agent inherits its constraints

Wrapping existing endpoints is a reasonable starting point. But an API designed around a web application may expose exactly what each screen needs, with filters, grouping, and operations chosen for that interface.

Consider a hypothetical room dashboard whose API returns a fixed set of cards for one room. A user asks, “Which lights are still on across the house?” A tool that mirrors that endpoint makes the agent visit each room, extract the lights, and combine the results. If the endpoint omits stale readings because the UI handles them elsewhere, the agent can't recover that missing context by making more calls.

The constraint is the set of questions those operations can answer. Adding more endpoint wrappers may still leave the agent assembling a task from fragments, or unable to request a combination the application never needed.

A task-oriented API may already be a good fit for MCP. I'd reuse it. The question is whether its operations match the work users ask the agent to do, and whether the results carry enough meaning outside the original interface.

## Too close to the database: the agent inherits the interpretation

Exposing records or a general query tool gives the agent more ways to retrieve and combine data. It also gives it more decisions to make before that data can support an answer.

In the house example, a row might describe a command address, a feedback address, a room alias, or a collective control. Counting rows doesn't count physical lights. A boolean value doesn't establish whether a device was told to turn on or was observed to be on.

A flexible query interface could let the agent join those records. It still needs to know which relationships are authoritative, which readings are recent enough, and how unavailable feedback affects the total. If those rules live only in frontend code or someone's knowledge of the installation, query flexibility won't supply them.

This is what I mean by an interface being too loose: the agent must choose rules that should already have a consistent answer. One request might count an alias twice; another might treat missing feedback as off. Both could produce valid queries and misleading summaries.

Database access can be useful for exploration and diagnostics. For a routine house-status question, I'd make those interpretation rules explicit in the service and let the agent inspect the underlying records when needed.

## Expose tasks with clear domain rules

The [MCP tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) defines named tools with descriptions and schemas, and supports structured results. We still choose the level at which those tools operate.

For “which lights are on?”, I want the service to identify physical lights, select their feedback, and report uncertainty. The agent can decide which room to investigate next or how to explain the result to the user.

| Interface choice | What it gives the agent | What can go wrong |
| --- | --- | --- |
| One tool per existing UI endpoint | Operations already used by the application | The available views or filters constrain the question |
| Tools exposing raw records and queries | Flexible retrieval and joins | The agent must reconstruct identity and state rules |
| Tools exposing domain tasks and supporting details | Useful operations with consistent interpretation | A summary can become too narrow or hide evidence unless follow-up reads remain available |

The middle ground needs both useful operations and a way to inspect their results. A single summary with no supporting detail would create another constraint as soon as the user asked a follow-up question.

## Make one physical device count once

I added a semantic registry and tools such as `get_house_summary`, backed by shared classification and aggregation rules. The client can start with a request like this:

```json
{
  "name": "get_house_summary",
  "arguments": {
    "refresh": "stale_only",
    "maxAgeSeconds": 30
  }
}
```

Consider an illustrative mapping: `1/0/7` sends commands to a kitchen light, `1/1/7` reports its state, and a room alias points to that same light. The registry associates all three with one device. A room-wide command is a control for a group, so it contributes no extra light to the count.

For the summary, the service reads the feedback value. Sending “on” to the command address doesn't establish that the light is on. If feedback is unavailable, the light still counts as a known device, but its state remains unknown.

Here is a simplified illustration of the structured result I'd want a client to receive. These field names, values, and addresses demonstrate the contract; they aren't a captured response or the exact schema of my implementation.

```json
{
  "scope": "kitchen lights",
  "assembledAt": "2026-10-11T08:00:00+02:00",
  "maxAgeSeconds": 30,
  "counts": {
    "devices": 2,
    "confirmedOn": 1,
    "confirmedOff": 0,
    "unknown": 1
  },
  "devices": [
    {
      "id": "kitchen_ceiling",
      "state": "on",
      "source": "1/1/7",
      "observedAt": "2026-10-11T07:59:55+02:00",
      "quality": "confirmed"
    },
    {
      "id": "kitchen_counter",
      "state": null,
      "observedAt": null,
      "quality": "unavailable",
      "error": "feedback_read_timeout"
    }
  ]
}
```

The answer supported by this result is “One kitchen light is confirmed on; the other light's state is unavailable.” Reporting “one light on and one off” would turn a failed read into a false observation. The device IDs and source address also give the client a way to investigate the gap through lower-level tools.

## Keep the rules shared and the tools composable

Different consumers can need different representations of the same underlying system. We should keep authoritative identity, permissions, state interpretation, and business rules shared.

One possible arrangement is:

```text
Storage and observations
  -> Shared identity and domain rules
     -> Web views for rendering and interaction
     -> MCP tools for discovery and tasks
```

The browser might need grouping, display order, and data for interactive controls. An MCP client might need a filtered summary, stable IDs for follow-up calls, and reasons why some entries couldn't be interpreted.

The MCP representation can combine records and expose operations at a different level. It should preserve access restrictions and retain enough detail to inspect how a result was assembled.

Where interpretation depends on installation-specific knowledge, declarative configuration makes it reviewable. In my implementation, classification rules and confirmed mappings are data, validated before use. That gives an owner somewhere to record an exception and a test somewhere to verify it.

The same identity and state rules should apply whether the agent requests a house summary, inspects one room, or reads an individual device. That lets it follow a new line of investigation without inventing a new interpretation of the data.

## Carry identity and permissions through every tool

The abstraction also determines where we enforce access. Authentication establishes who is calling; authorization decides which operations and data that caller may access. An agent acting for a user needs a defined grant of authority, which may be narrower than everything that user can do in the web application.

For protected HTTP servers, the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) defines an OAuth-based flow. The server validates access tokens intended for it. Local stdio integrations use a different credential arrangement; the HTTP flow doesn't apply to every MCP connection. In either case, accepting a credential still leaves the application responsible for its domain permissions.

An API wrapper can preserve existing authorization if downstream operations enforce the caller's effective permissions. It can also erase that boundary if every request runs through one powerful service account. The wrapper then has to enforce the user's limits before using that account. Credentials for downstream APIs need their own intended audience and grant; MCP's [security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices#token-passthrough) prohibits simply passing the incoming token through to another service.

Moving closer to the database makes this responsibility more visible. A read-only database account might still read every customer's rows. Flexible queries need enforced row and field restrictions, whether through database policies, restricted views, or the application layer. Asking the model to include a customer filter leaves the boundary dependent on the model remembering it.

Consider a hypothetical guest who may inspect and control the kitchen lights, but cannot access other rooms. A kitchen summary, a device lookup, and a lower-level read must all enforce that same restriction. The server derives the caller's authority from trusted authentication context; a `user_id` or `room_id` supplied in tool arguments cannot grant access by itself.

Aggregation needs the same care. I'd calculate a guest's totals from the devices they are allowed to see and label the scope accordingly. A whole-house total or an error naming a restricted room could disclose information even when individual records are hidden. Shared caches must preserve those access boundaries too.

For writes, permission to read a light's state doesn't imply permission to switch it. The backend checks the requested action and target on every call. A confirmation prompt can help the user review an allowed action, but it cannot grant a permission they don't have. Hiding a tool from discovery is useful for clarity; enforcement still belongs where the operation executes.

That gives the abstraction a concrete boundary: the agent can combine permitted operations, while the service owns the rules for both interpreting and accessing the data.

## Compact results still need evidence and uncertainty

A task-oriented tool can save the agent from repeated discovery, joins, and calculations. It can also hide a failure behind a reassuring total if we compress too aggressively.

“All lights are off” is unsupported if one light never reported. A room temperature average needs the number of sensors with usable readings. Unknown states need to survive aggregation.

In the example, the summary covers two kitchen lights, but only one has a recent, confirmed reading. Its observation time is separate from the time the summary was assembled. Rebuilding a summary must not make old feedback look fresh.

Freshness is another domain decision. A browser can display its last received value while showing a loading indicator. An MCP result needs an explicit contract for cached data, refresh attempts, and failed reads. Sending a command also needs to remain distinguishable from observing its effect.

Sometimes the missing information is classification rather than a failed request. Expose that distinction and let the client ask about relevant unresolved entries. A confident guess shouldn't become durable configuration merely because an agent needed to finish a sentence.

## Test both the question and the follow-up

Start with “which lights are on?” and trace it through the existing endpoint wrappers, the raw records, and the proposed domain tools. Check where the endpoint interface blocks a useful request and where the raw-data interface makes the agent choose a counting or state-selection rule.

Then ask a follow-up: “Which room contains the light whose state you couldn't confirm?” The summary should provide stable device IDs and enough detail for the agent to investigate. Check that aliases count once, group controls add no devices, and stale or unavailable feedback stays visible throughout.

Repeat those questions with different permissions. A guest should see only their permitted scope, and a direct device lookup or lower-level read must not bypass it. Check read and write permissions separately, including cached summaries and errors.

Measure calls, response size, latency, and answer correctness. I haven't presented a measured before-and-after comparison here; that is the evidence needed to evaluate the benefit beyond the clearer contract.

If the agent can't ask a useful follow-up, the tools may be too constrained. If it has to invent the meaning of a record, they may be too loose. I'd start with one room and a missing reading, then adjust the interface until the agent can answer and investigate while the service keeps the domain rules consistent.
