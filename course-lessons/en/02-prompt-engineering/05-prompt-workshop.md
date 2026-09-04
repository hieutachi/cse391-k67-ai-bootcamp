# Workshop: slicing a design with prompts

## Learning objectives
- Run the full prompt workflow on three real scenarios
- Spot the classic trap of each task type: building, extending and fixing
- Grade your own prompt against a checklist before you send it

Study method for this lesson: **do before you read**. For each scenario, write your own prompt in five minutes and run it, then compare with the suggestion below — the gap between the two versions is the lesson.

## Scenario 1 — Slice a section from a description

**Context**: no Figma yet, only a verbal description. The "Featured services" area shows exactly six service cards in a three-column grid; each card has an icon, the service name and a one-line description.

Write your prompt, then compare:

```text
Context: Highland Hospital landing page, plain HTML5 + CSS, no framework.
Task: build the "Featured services" section — a 3-column grid with
exactly six cells, each with an inline SVG icon, the service name and
a one-line description. Services: General Checkup, Cardiology,
Pediatrics, Lab Testing, Imaging, Rehabilitation.
Constraints: structure is section > h2 + a div using
display: grid; grid-template-columns: repeat(3, 1fr); no framework;
do not add any service beyond the six names above.
Data: section background #f0fdfa; each card white, 1px border #e2e8f0,
12px radius, padding 1.5rem; icons #0f766e; headings #0f172a.
Output: HTML then CSS as two separate blocks.
```

**The classic trap**: dropping the "no extra content" constraint — the AI cheerfully adds a seventh and eighth service; dropping the colour tokens — the AI falls back to a default blue that fights the brand.

## Scenario 2 — Add a feature to code you already have

**Context**: the doctor list already renders through `renderDoctors` (the JavaScript lesson in this chapter). You want a specialty filter dropdown added to the running file.

The golden rule when prompting over existing code: **paste the real, running file**, say exactly where the change goes, and limit the scope — "do not touch what already works":

```text
Here is the complete doctors.js file currently running correctly on
the Highland Hospital landing page: (paste the file).
Task: add a <select id="specialty-filter"> above the list. Options are
generated from the doctors array itself — one option per specialty, no
duplicates, plus an "All" option. When the select changes, re-render
the list using the existing renderDoctors function.
Constraints: keep the existing functions' names and behaviour exactly
as they are; add new code only, never modify renderDoctors; no libraries.
Output: only the new code to insert, with the insertion point named.
```

**The classic trap**: not pasting the real code — the AI writes a differently named function and the paste breaks the page; or asking for "something nicer" — the AI rewrites the parts that were already fine.

## Scenario 3 — Fix a rendering bug

**Context**: at 320px, a long doctor name ("Dr. Alexandra von Hallstein-Mercedes") makes the card text overflow and collide with the line below.

Apply the debug formula from the previous lesson — minimal code, symptom, ranked causes — and remember *"explain before you fix"*:

```text
Code: this is all the CSS affecting the doctor card —
.doctor-card { max-width: 320px; padding: 1rem; }
.doctor-card h3 { font-size: 1.05rem; }
Symptom: at 320px a long doctor name overflows the card and collides
with the line below. From 375px up it is fine.
My ranked causes, analyse in this order:
1. The h3 cannot wrap — missing word-break / overflow-wrap.
2. Padding plus max-width leave the text area too narrow.
3. The h3 line-height is too small.
Explain the cause before giving the fix, and keep the change minimal.
```

**The classic trap**: pasting the whole 300-line stylesheet — the analysis thins out and the fix lands in the wrong rule. The smaller the pasted scope, the better the result.

## Self-evaluation checklist

Grade your prompt before pressing send — it is ready at six out of six:

- [ ] Does it name the Highland Hospital page and file being worked on?
- [ ] Is the task measurable: build / add / fix **what**, **where**?
- [ ] Are there technology constraints (no framework, no libraries, keep existing functions)?
- [ ] Are colours, spacing and data given as concrete values?
- [ ] Is the output format requested (code block, return order)?
- [ ] For follow-up prompts: does each round change exactly one thing?

## Practice

Run all three scenarios against your own files, grading the checklist before each send. Then take the worst prompt you have ever sent an AI and rewrite it until it passes all six items — keep both versions; the difference is your progress.

## What's next

Communication with AI is now a working skill — from the next chapter you build the real thing, starting with standard web document structure and the parts of an HTML page.
