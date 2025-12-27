# 5 traps of using Agents

You are a developer and you finally decided to try this SDD (Spec Driven Development) thing.

Great! Now let me tell you the 5 ways things WILL go wrong (and how to avoid them).

## You Expect Determinism

If you are like me, you started working with computers because they were predictable. You tell them exactly what to do and they execute your instructions. It's beautiful in its simplicity.

You give the same instructions to someone else and the result is the same. You run the same instructions tomorrow and the result is the same. You run them a thousand times, and you get the same output every single time.

This determinism is comforting. It's what drew many of us to programming in the first place. We could build mental models, understand cause and effect, and debug with confidence.

(I know there are exceptions but let's ignore them for this example.)

### Reality

AI is not predictable. AI is non-deterministic. It's not a bug, it's a feature of the system, and you have to work with it.

The same prompt can yield different results. The model that worked perfectly yesterday might struggle today. The code that generated flawlessly in the morning might produce garbage in the afternoon (seriously, time of day matters due to API load and model behavior).

This isn't your familiar debugging territory. You can't just "fix" the nondeterminism. You need to embrace it, work around it, and build systems that account for it. Set temperature to 0 if you want more consistency, but even then, model updates and other factors will introduce variance.

## You'll Go Full-On with Agents

You see a lot of people shouting that SDD really works, that agents are capable of amazing things, so you expect the models to be wizards. The demos are incredible. The testimonials are glowing. You're ready to delegate everything.

You'll give them every single task, from the trivial to the complex. When they fail, you'll get upset and frustrated. Why isn't this working like in the demos?

You'll go down rabbit holes with them, trying to force them into solving your problem. You'll rewrite the prompt seven different ways. You'll try different tools, different approaches. You'll delete features and try again. You'll switch models mid-task. You'll enable every possible flag and option.

You'll spend 3 hours trying to get the agent to solve a 20-minute problem.

### Reality

Agents are very good with some tasks, some languages, and at some times of the day (go back to the first point about determinism). They excel at boilerplate, standard patterns, and well-trodden paths. They struggle with novel problems, complex business logic, and anything requiring deep domain knowledge (sometimes).

If the model fails a couple of times on the same task, give up momentarily and solve that problem the way the elders used to do:

- Write the code yourself (barbaric, I know).
- Use your own brain to find the bug (excruciating, but effective).
- Actually read the documentation (shocking, I know).

This isn't defeat, it's pragmatism. AI should serve as an accelerant, not replace you. You're still the senior developer in this pair programming session. As of now, HITL (Human In The Loop) is essential. Hey, we even invented an acronym for it!

Know when to let the agent help and when to take over. Your time and sanity are valuable.

## You'll Spend a Lot of Time Tinkering with Models

The hype is strong right now, and it has been like that for the past 2+ years. Every week there's a new model claiming to be the best. You'll start using the auto selector for models, letting the system pick for you. You'll try the free tiers, the cheaper models, the specialized ones.

You'll spend hours comparing outputs between models, convinced that if you just find the right one, everything will click. You'll switch mid-project. You'll A/B test every decision.

The results will be meh, and you won't know if it's the model, the prompt, the problem, or just bad luck.

### Reality

Pick the strongest model you can afford. Period. Don't switch back and forth. Don't model-hop chasing marginal gains.

Yes, it costs more. Yes, it's slower sometimes. But by using the best model you can afford, you eliminate one massive variable from your debugging process. When something goes wrong, you know it's not because you cheaped out on the model.

You'll get more consistent results, better code quality, and fewer "why did it do that?" moments. The time and frustration you save will far outweigh the extra API costs.

Treat it like hiring: you want the best person for the job, not the cheapest one.

## The LGTM Trap

The agent produces code that looks good at first glance. Tests pass, the syntax is correct, and everything seems to work. It even has comments! You're tempted to just hit approve and move on to the next task.

After all, who has time to review every line when the AI is generating code faster than you can read it? The whole point is to go faster, right?

### Reality

Just because the code runs doesn't mean it's good code. Agents can produce working solutions that are:

- Over-engineered for the problem at hand (why is there a factory pattern for a simple function?)
- Missing edge cases you didn't specify (null checks? error handling? anyone?)
- Using patterns inconsistent with your codebase (suddenly everything is a class when you've been using functional patterns)
- Implementing the wrong feature correctly (it works beautifully, but it's not what you actually needed)
- Introducing subtle bugs that won't surface until production (the tests pass, but only because the tests are also wrong)

Always review the code critically. The agent is your pair programmer, not your replacement. You're still responsible for what gets merged.

If something feels off, it probably is—trust your instincts and iterate. Ask the agent to simplify. Request a different approach. Or just rewrite that section yourself.

The "LGTM" button should be earned, not given by default.


## You'll Try Only Once (When You Should Iterate)

I know, I know. I just said you should give up after a couple of failures and do it yourself. But this is different—this is about giving up too early on the *right* tasks.

You'll treat the agent like a oracle. You'll craft what you think is the perfect prompt, run it once, and when the output isn't exactly what you wanted, you'll either accept it as-is or scrap the whole thing and do it manually.

You won't think of it as an iterative process. You won't treat the first output as a draft. You won't use the agent's attempt as a starting point for refinement.

### Reality

For certain tasks, it's not just okay to iterate, it's needed. Some work benefits from a feedback loop:

- Run a code generation once, review the output, then ask for refinements
- Generate a test suite, check coverage, then request additional edge cases
- Create documentation, read it, then ask for clarification on confusing sections
- Scaffold a feature, see what works, then iterate on the structure

This is you learning how to work with the tool, and the tool learning what you actually want.

The difference between "try a couple times then give up" and "iterate until it's right" is knowing which problems benefit from iteration. Generic CRUD operations? Iterate away. Complex algorithmic problems that have failed three times? Time to take over.

Think of it like rubber duck debugging, except the duck occasionally writes code back :wink:.

## One last Think

All of this is obviously a generalization and this is valid for people just starting.

After a couple of months you'll start understanding the dynamics yourself and you can forget about all the above and use your gut feeling to drive your decision. Well done you just became an AI Native Engineer :claps: :clap: :clap: