# Writing Guidelines

Use these guidelines when drafting or editing content for Luca Lanziani's site.

## Positioning

Write from the perspective of an AI Engineering and Platform Engineering leader who cares about reliable software delivery.

The core idea to reinforce:

> AI can make coding faster, but teams only ship faster when the surrounding delivery system improves too.

AI should not be presented as magic, a replacement for engineering judgment, or a generic productivity trend. Frame it as a powerful tool that needs specs, platforms, review systems, automation, governance, and ownership to become useful in real organizations.

## Voice

Use a practical, first-person engineering voice.

The writing should feel:

- Direct
- Experienced
- Curious
- Skeptical of hype
- Comfortable with unfinished experiments
- Grounded in production realities
- Clear enough for engineering leaders and senior engineers

It is fine to say "I use this", "I wondered", "I tried", "I don't think", or "this is where it gets interesting". Luca's existing posts often work because they show the thought process behind a conclusion.

Write as if explaining the work to a colleague. Use contractions and direct address when they sound natural. Use "I" for personal experience and opinions, and "we" for genuinely shared work or experience. Admit uncertainty rather than smoothing it away. Light self-deprecating humor, understated irony, and occasional parenthetical asides can help when they arise from the story; do not add them by formula.

Avoid:

- Influencer-style certainty
- Generic AI optimism
- Abstract thought leadership without concrete systems
- Over-polished corporate language
- Fear-based language like "you will be left behind"
- Claims that AI removes the need for engineering discipline
- Stock catchphrases, rhetorical questions, or emoji added just to make a draft sound conversational

Never use contrastive reframes like "This is not X, it's Y" or "It's not about X; it's about Y." State the point directly.

## Tone

Prefer calm conviction over hype.

Good tone:

> AI can turn a vague request into a large diff quickly. That is impressive, but it also exposes the weaknesses many teams already had.

Avoid tone like:

> AI is revolutionizing everything and every organization must transform immediately.

Be willing to acknowledge tradeoffs. If a tool is useful but risky, say both. If something is not production-grade yet, say so. If the point is based on an experiment, frame it as an experiment.

## Article Shape

Most posts should follow this structure:

1. Start with a concrete observation or problem.
2. State the tension clearly.
3. Explain why the obvious answer is incomplete.
4. Walk through the system around the problem.
5. Give practical criteria, examples, lists, or workflow diagrams.
6. End with a grounded conclusion, question, or next step.

Useful opening patterns:

- "AI has made many developers faster at producing code. That does not automatically make engineering organizations faster at shipping reliable software."
- "I use agentic tools every day, but most of what happens is behind a UI."
- "It wasn't the first time I used LLMs. I'd been testing them since 2022."
- "You may have heard of X. In recent years, a new term has emerged called Y."

Avoid opening with long background, definitions, or broad market commentary unless it immediately connects to a delivery problem.

Adapt the shape to the post:

- **Technical posts:** Show the problem and the earlier state, then walk through the solution with working examples and the reasons behind decisions. Explain the outcome and remaining limits.
- **Tutorials:** State the goal, give ordered steps and annotated commands or code, and keep the prose focused on what the reader needs to do.
- **Personal stories and experiments:** Use specific scenes, choices, mistakes, and results. Connect the experience to a broader lesson only when the connection is earned.
- **Series posts:** Link to earlier parts and make the next step clear when there is one. Keep terminology and structure consistent across the series.

Use descriptive `##` headings and `###` subheadings where they help readers follow longer posts. A question or a sparingly used emoji can work as a heading when it fits the piece.

## Paragraphs and Rhythm

Use short paragraphs. One idea per paragraph.

Mix:

- Short declarative sentences for emphasis.
- Longer explanatory paragraphs when walking through context.
- Lists when there are more than three related points.
- Tables when comparing status, capabilities, or tradeoffs.
- Simple text diagrams for workflows.

It is acceptable to use standalone sentences:

> The gap is delivery.

> The new bottleneck is after code generation.

> Shell does not pretend to be safe.

These work when they clarify the argument, not when used as empty drama.

## Technical Depth

Be concrete about systems.

Prefer naming the actual moving parts:

- Specs
- Acceptance criteria
- Pull requests
- CI/CD
- Sandboxed environments
- Secrets
- Permissions
- Tests
- Deployment
- Observability
- Human approval
- Production ownership
- Agent tool calls
- Provider quirks
- Runtime limits
- Review evidence

When writing about AI Engineering, connect model behavior to delivery systems. Do not stop at prompting, model choice, or local developer experience.

## Evidence Style

Use lived experience and concrete experiments as evidence.

Good evidence:

- A private project used to understand tool loops and provider behavior
- A weekend test of BMAD or spec-driven development
- A delivery bottleneck seen across teams
- A concrete CI/CD or platform capability
- A specific failure mode in review, testing, or deployment

Avoid pretending to have broad quantitative proof unless the post actually includes data. Use phrases like "in my experience", "I suspect", "I found", or "this made me realize" when appropriate.

Use specific numbers, dates, and versions when they help readers understand or reproduce a result. Name the tool or version when its behavior matters. Link to original documentation for technical claims and quote definitions only when their exact wording matters.

## Hype Control

When discussing AI, keep the message pragmatic.

Use framing like:

- "This is useful, but it shifts the bottleneck."
- "The model is only one component."
- "The platform determines whether this can move responsibly."
- "The human still owns the result."
- "The goal is to reduce ambiguity."

Avoid:

- "AI will replace developers"
- "AI changes everything"
- "The future of work"
- "10x productivity" unless critically examined
- "Autonomous agents will solve delivery"

## AI Engineering Pillars

Future AI Engineering content should usually connect to at least one of these pillars:

1. AI-native SDLC
   - Spec-driven development
   - Human-agent collaboration
   - Issue-to-PR workflows
   - Acceptance criteria
   - AI-generated code review

2. Platform Engineering for AI
   - Golden paths
   - Sandboxed agent environments
   - Secrets and permissions
   - CI/CD for generated code
   - Observability for agent workflows

3. Delivery and Organization
   - Why coding speed is not delivery speed
   - Review and integration bottlenecks
   - Governance and accountability
   - Team ownership
   - Measuring AI impact correctly

4. Practical AI Engineering
   - Reference architectures
   - Templates
   - Checklists
   - Workflow examples
   - Tool experiments
   - Implementation notes

## Other Site Topics

The same practical voice applies beyond AI Engineering:

- **DevOps and infrastructure:** Start from a real operational problem, show how the solution evolved, and include configuration or commands when they make the lesson usable. Address scaling and ownership where relevant.
- **Monitoring and observability:** Explain which decision a signal supports and why it matters. Use concrete requirements or examples rather than a feature inventory.
- **Personal development:** Share specific memories, setbacks, and changes in perspective. Let the broader lesson follow from the experience.

## Titles

Prefer titles that state the tension or practical problem.

Good title patterns:

- "AI Made Developers Faster. Why Aren't You Shipping More?"
- "The Platform Engineering Layer for AI-Native Teams"
- "Spec-Driven Development Is the Missing Interface for AI Agents"
- "How to Review AI-Generated Code in Production Teams"
- "Building Jarvis"

Avoid vague titles:

- "The Future of AI"
- "AI Transformation"
- "Why AI Matters"
- "Thoughts on Innovation"

## Headings

Headings should move the argument forward.

Good headings:

- "The New Bottleneck Is After Code Generation"
- "Coding Speed Is Local. Delivery Speed Is Systemic."
- "Specs Become the Interface"
- "Review Has to Change"
- "Platform Engineering Is the Missing Layer"
- "Things I Settled On"
- "Still on the List"

Avoid headings that only label generic sections:

- "Overview"
- "Introduction"
- "Benefits"
- "Conclusion" unless the post really needs it.

## Lists

Use lists for practical inspection.

Good list uses:

- Weaknesses exposed by AI-generated code
- Review questions
- Platform capabilities
- Governance checks
- Requirements for a useful dashboard or workflow
- Things still unresolved

Keep list items parallel and specific. Avoid vague list items like "improve productivity" or "drive innovation".

## Publishing and Technical Format

Follow the post frontmatter and content workflow in [the content guide](docs/content-guide.md). Give published posts a useful description and relevant tags; add series metadata and images when applicable. Check image paths and write descriptive alt text.

For longer posts, place `<!--more-->` after the introduction when you want to control the listing excerpt. Check the rendered excerpt before publishing. Short posts may work without a manual break.

For technical examples:

- Mark fenced code blocks with the appropriate language and explain non-obvious commands or configuration.
- Prefer complete, working examples when readers are expected to follow along. Use comments where they clarify a step.
- Put long outputs or secondary details in `<details><summary>` blocks when that keeps the main argument readable.
- Use inline code for commands, filenames, and identifiers. Use bold or italics sparingly for emphasis.
- Link related posts and use the site's Hugo shortcodes for supported embeds when they improve the explanation.

## Diagrams and Artifacts

Use simple diagrams when explaining workflows.

Text diagrams are acceptable and often fit the existing style:

```text
Intent
  -> Spec
  -> Plan
  -> Agent task
  -> Generated change
  -> Automated evidence
  -> Human review
  -> Deployment
  -> Production feedback
```

Prefer diagrams, checklists, templates, and tables over abstract explanations when the topic is operational.

## Calls to Action

End with a practical continuation, not a sales pitch.

Good endings:

- A question to practitioners
- A link to a related article or series
- A concrete next experiment
- A useful checklist or template

Avoid generic CTAs like:

- "Contact me to transform your business"
- "The future is now"
- "Don't get left behind"

## Editing Checklist

Before publishing, check that the draft:

- Makes the central problem or observation clear early.
- Grounds the point in a concrete example or experience.
- Connects AI to specs, platforms, review, governance, or shipping when relevant.
- Uses Luca's practical first-person voice where appropriate.
- Avoids hype-heavy language.
- Includes concrete examples, lists, diagrams, or artifacts.
- Uses an excerpt break when a longer post needs a deliberate listing preview.
- Checks code examples, links, image paths, and alt text where applicable.
- Has a clear title and meta description.
- Includes relevant tags and series metadata.
- Links to `/posts/2026/06/ai-engineering/` or related posts when useful.
- Does not overstate certainty beyond the evidence in the post.
