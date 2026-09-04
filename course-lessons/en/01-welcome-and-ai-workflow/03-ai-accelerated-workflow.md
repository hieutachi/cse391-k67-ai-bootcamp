# The 4-step AI-Accelerated Workflow

## Learning objectives
- Use one 4-step loop for every lesson in this course
- Separate "drafting with AI" from "understanding the draft" — the step that decides quality
- Run the loop once on a small real task

## One loop for everything

This course never teaches blind copy-paste from AI. Every task runs through the same loop, the **AI-Accelerated Workflow**:

### 1. Define — understand what you are building

Read the design or the description and break it into blocks before AI sees anything: which area is a simple stacked layout, which row is Flexbox, which region is a Grid, which components and states exist (hover, focus, empty, error). Write a three-to-five sentence spec of your own.

### 2. Draft — produce with AI

Turn that spec into a precise prompt — project context, constraints and output format included — and receive a first draft of HTML, CSS or JavaScript. This draft is **not your code yet**. It is material to learn from and to correct.

### 3. Analyze — understand every line

Read the generated code line by line and be able to answer three questions about any part of it: *Why this tag or class? How does this layout work? What is the data and event flow?* If you cannot explain a line, do not keep the line.

### 4. Refine — polish and correct

Adjust breakpoints, fix rendering problems, normalise classes against Bootstrap utilities, extract repeated code into one function. Check several screen sizes, and only then call the task done.

## Why step 3 matters most

AI can generate code in seconds, but it is not the one maintaining that code — you are. A block you do not understand is technical debt you will pay for tomorrow. Understand each line, and the next task gets faster twice over: you write better code yourself, and your prompts get sharper because you know exactly what you need.

Tell the AI how to work with you:

```text
From now on, apply the 4-step workflow to my requests. I define the
requirement and analyse the result myself; you only draft code and
answer my questions about it. Step 1 (Define) and step 3 (Analyze)
are mine — never do them for me.
```

## A sample loop: the doctor list

Say the task is the doctor-list section of the Highland Hospital landing page:

1. **Define** — "Four columns on desktop, two on tablet, one on mobile. Each card shows a photo, the doctor's name, the specialty and a Book button."
2. **Draft** — prompt the AI for the HTML + CSS skeleton of that grid.
3. **Analyze** — ask the AI: "Why is `flex-wrap` here? If a doctor's name wraps to two lines, does the card still align with its neighbours?"
4. **Refine** — "Keep the structure. Add a hover state and protect the card against long names."

## Practice

Take any small UI block you have already built — or a card you like on the web. Run all four steps on it: write the spec yourself, have AI draft it, explain every line out loud, then ask AI for exactly one change of your choice. Time each step. You will find step 3 is slow, and that the next round's step 4 becomes much shorter.

## What's next

The loop needs a place to run — the next lesson sets up VS Code, Live Server and DevTools so every draft has a browser to land in.
