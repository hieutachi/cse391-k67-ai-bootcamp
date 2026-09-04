# Welcome — why Frontend needs AI

## Learning objectives
- See what changes in a frontend day when AI joins the team
- Recognise the parts of the job AI genuinely accelerates — and the parts it does not
- Know what you will build, and how the whole course feeds one project

## Frontend work is really two different jobs

Every frontend task is a blend of two very different activities. One is **judgement**: deciding how a screen should behave, where a visitor's eye lands first, what a patient sees while a page is still loading. The other is **production**: typing the markup, the utility classes, the event handlers, the fifteenth variant of a service card.

Modern AI is remarkably good at the second activity and, for now, only advisory on the first. That split is the whole idea behind this course: **you keep the judgement, and hand off as much production as you can quickly verify.**

## A realistic day

Here is what the loop looks like once your tools are set up:

- **Morning** — You receive a description for the doctor-list section of the landing page. Instead of hand-writing the grid, you describe the columns, the breakpoints and the colours, and you get a usable first draft in seconds. You spend your time where the description is silent: focus states, unusually long doctor names, and how the row behaves at 320px.
- **Midday** — A card overflows its container, but only inside one section on a phone. You paste the relevant HTML and CSS plus the symptom, and receive three candidate causes ranked by likelihood. You confirm the real one in DevTools.
- **Afternoon** — You move appointment data from a hard-coded array into `localStorage`. The change touches several files, so you draft it with AI and then read every changed line yourself.

None of this removes the need to understand semantic HTML, CSS layout or the DOM. It removes the need to *type* the boring 70 percent.

## What AI does not do for you

Be clear about the limits now — it saves real disappointment later:

- AI does not know your design unless you tell it. Without context it invents colours, spacing and class names.
- AI does not know what patients actually need. It will happily build the wrong feature beautifully.
- AI cannot see your rendered page. It reasons about code, not about pixels — you are the one who opens the browser.
- AI is sometimes confidently wrong, especially on recent APIs and browser-support details.

Every limit has a workaround, and the workarounds are exactly what the next lessons teach.

## The four pillars of this course

1. **Semantic HTML5** — a correct document structure and meaningful tags that help SEO and accessibility, plus modern forms, tables and images.
2. **CSS3 and layout thinking** — the Box Model, Flexbox, Grid, relative units, responsive design, transitions and animations.
3. **Bootstrap 5** — the 12-column grid, the utility system, and ready-made components such as Navbar, Modal, Accordion, Cards and Forms.
4. **JavaScript ES6+ and the DOM** — modern syntax, array methods, DOM manipulation, events, `localStorage`, `fetch` and `async/await`.

## The project you will build: Highland Hospital

Every chapter feeds a single application: **Highland Hospital**, a hospital website where patients browse services, find a doctor by specialty and book an appointment online.

The project is deliberately frontend-only — no server to maintain, no database to provision — yet complex enough to be real: a dynamic doctor list with filters, a multi-step validated booking form, an admin table with search and status updates, and data kept in `localStorage`. In the final chapter you complete the Landing Page and the Admin Dashboard and deploy them.

## Who this is for

You need **no** programming experience. You need a computer with Chrome, an editor (VS Code is recommended) and the willingness to retype code rather than just read it. You do not need prior AI experience — the first two chapters build that skill from zero.

## How to study

Read a lesson, then immediately run its prompts against your own files. One habit pays more than any other: try the task yourself for ten minutes before asking AI. The gap between your version and the generated version is the fastest lesson you can get.

```text
Context: I just started the AI-Accelerated Frontend Developer Bootcamp
and will build a hospital website called Highland Hospital.
Task: in three short paragraphs, explain why each of these four pillars
matters for that project: semantic HTML5, CSS3 layout, Bootstrap 5, and
JavaScript ES6+ with the DOM.
Constraint: write for a complete beginner, explain every term in one
line, keep it under 150 words.
```

Run that prompt now — it gives you a map of what is coming.

## Practice

1. Open a hospital website you like and list five *judgement* decisions the designer made (where your eye lands first, which action is primary) — the decisions AI cannot make for you.
2. Write a one-sentence statement of your current frontend skill level and keep it; re-read it at the end of chapter 2.

## What's next

Next we map the tool landscape — Gemini, Claude, ChatGPT, in-editor assistants and design-to-code tools — and decide which of them belongs in your daily workflow.
