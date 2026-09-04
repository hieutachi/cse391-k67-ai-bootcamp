# Anatomy of a good prompt

## Learning objectives
- Break a prompt into its five working parts
- Turn a vague request into a specific one
- Use a small-step loop instead of endless "fix everything" rounds

## Why generic prompts produce generic code

"Write a hero section for a hospital website" has roughly a thousand valid answers. The tool picks one — usually the most average one it has seen: invented colours, arbitrary padding, meaningless class names, no states. The prompt was not wrong; it was **underspecified**. Every decision you leave out, the AI makes for you by accident.

The rule that runs through this course: write prompts as if you were briefing a colleague who joined the project this morning.

## The five parts of a working prompt

| # | Part | Answers the question | Example for Highland Hospital |
|---|---|---|---|
| 1 | **Context** | What project, what page, for whom? | "Building the Highland Hospital landing page — plain HTML5 + CSS, no framework yet." |
| 2 | **Task** | What exactly should exist afterwards? | "Build the doctor-list section with six cards." |
| 3 | **Constraints** | Limits on tech, style, content? | "Semantic HTML only, no Bootstrap, class prefix `hh-`." |
| 4 | **Data & interface** | Which tokens or data shape to follow? | "Primary button uses `#0f766e`; each doctor has name, specialty, experience." |
| 5 | **Output format** | How do you want the answer back? | "One code block, then three lines explaining the structure." |

The first four parts are information you must already have. The fifth is how you want the result delivered. Leave any part out, and the AI invents that part.

## Sample prompt — all five parts

```text
Context: Highland Hospital landing page, plain HTML5 + CSS, no
framework. I am building the top of the page.
Task: build a hero section with a headline, a one-sentence description,
a primary button labelled "Book an appointment" linking to booking.html,
and a secondary button "Browse specialties".
Constraints: semantic HTML (section > div > h1/p/a); classes prefixed
hh-; no Bootstrap; do not add content beyond what I listed.
Data: white background; headline #0f172a; body text #475569; primary
button background #0f766e, white text, 8px radius, padding
0.75rem 1.5rem; vertical spacing between hero blocks in multiples of 1rem.
Output: HTML and CSS as two separate code blocks, no long explanation.
```

That prompt takes ninety seconds to write and saves twenty minutes of corrections. The ratio holds surprisingly well across tasks.

## Before you press send

- Is the right file open, and is the design or description you are building from on screen?
- Have you tried the task yourself for about ten minutes first? The gap between your version and the generated one is the fastest lesson available.
- Can you state the goal in one sentence: "What am I asking AI to create so I can use it immediately?"

## After you receive the result

Do not paste code into a file and call it done. Read every line, then run the page in the browser. When something is wrong, name the **location and the symptom** — "the button in the hero is 8px too wide on mobile" — never "it still does not look right". AI cannot see your screen; it can only work from what you describe.

## Iterate in small steps

Nobody writes the perfect prompt first time. The productive loop:

1. Prompt for the smallest useful unit.
2. Read the result and find the *first* thing that is wrong.
3. Ask for that one change, referencing the code you have.
4. Repeat.

Compare two follow-ups: "fix everything that is wrong" — which usually rewrites parts that were fine — versus "keep the markup, change the button colour from `#0f766e` to `#134e4a`". A precise correction preserves what already works, and each round moves you forward one verifiable step.

## When to stop prompting

Prompting has a break-even point. If you have asked three times and what remains is a five-line edit, make the edit yourself. Prompting is a tool for producing and transforming code, not a contest to avoid typing.

## Practice

Take the vague request "build a booking form" and expand it into a full five-part prompt for the Highland Hospital booking page. Before you send it, grade yourself: does the AI know which fields are required, how many steps the form has, and which accent colour to use?

## What's next

The two parts where AI invents most freely — spacing and colour — are exactly what the next lesson tackles with prompts for HTML and CSS.
