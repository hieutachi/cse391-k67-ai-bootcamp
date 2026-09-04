# The AI tool landscape for Frontend

## Learning objectives
- Recognise the four families of AI tools frontend developers actually use
- Match each family to the right kind of task in the Highland Hospital project
- Choose the minimal toolkit you need for this course — and nothing more

## Four families, four kinds of work

### 1. General chat — Gemini, Claude, ChatGPT

The place to **discuss before you write code**: ask whether a doctor row should be Flexbox or Grid, request an explanation of a CSS rule you have never seen, or get a review of a JavaScript function. Because nothing is saved into your files, you can paste code, paste errors and ask follow-up after follow-up with zero risk to what you are working on.

```text
Context: I am building the Highland Hospital landing page in plain
HTML + CSS, no framework yet.
Task: I need to display six service cards, each with an icon, a title
and a two-line description.
Constraint: tell me whether to use Flexbox or CSS Grid, justify your
answer in five sentences, and show minimal code for both.
```

### 2. In-editor assistants — GitHub Copilot, Cursor

These work inside the file you are editing: they suggest the next line, generate a whole block of markup when you type a comment, and can change several places at once. They are **production accelerators** — and precisely because they are fast, they make you *feel* as if you understand the code. For beginners the rule is: use them after you have already written a similar part yourself.

### 3. Design-to-code tools — Figma plugins

Plugins that take a Figma frame and return draft HTML and CSS. They are excellent for a **first pass** — and the first pass almost always needs fixing: class names that do not match your convention, colours taken from the wrong place, missing hover and focus states. Treat design-to-code output as a sketch to analyse, never as the final file.

### 4. Search with sources — Perplexity, documentation chats

When you hit a new API, an unfamiliar attribute or a browser-specific bug, this family answers **with sources**. It protects you from the worst failure mode of general chat: answers that are confident, fluent and wrong because the model trained on outdated information. Prefer answers that cite MDN, caniuse or the official documentation.

## Which tool for which Highland Hospital task

| Task in the project | Tool family | Example prompt |
|---|---|---|
| Decide a layout, understand generated code | General chat | "Explain how this grid behaves at 768px." |
| Type repetitive markup quickly | In-editor | Type `<!-- doctor card -->` and accept a suggestion |
| Turn a Figma frame into a draft | Design-to-code | Export the hero frame as HTML |
| Check a modern API or attribute | Search with sources | "Bootstrap 5 offcanvas — which JS options exist?" |

## The minimal toolkit for this course

You do not need to buy anything. The minimum is: **one chat AI** — the free tier of Gemini is enough for the entire course — plus **VS Code with the Live Server extension** and **Chrome DevTools**. If you already have Copilot or Cursor, great; they are optional. Every lesson in this course works with chat plus a browser.

## Practice

Choose one section of the Highland Hospital landing page (the hero, for instance). Describe it in three sentences, in your own words. Hand that description to a chat AI and ask for a first HTML draft. Then answer honestly: what percentage of the result is usable, and which parts did the AI have to guess because you had not said enough?

## What's next

A map of tools is only useful with a process — the next lesson turns these tools into a repeatable 4-step workflow you will use in every lesson from here on.
