# Bonus — Analysing a Figma design with a standard prompt

## Learning objectives
- Read a Figma frame as structured information an LLM can act on, instead of pasting a screenshot with a vague request
- Master the standard design-analysis prompt (layout, grid, components, states, responsive)
- Apply it immediately to a Highland Hospital design

## Why "look at this image" is not enough

Modern LLMs can see images, but to output HTML/Bootstrap you can actually use, they need the decisions you have not stated: which section does this belong to, what is the gap between cards, what happens to the "Book" button on hover, and does a 4-column row stay 4 columns on mobile?

Unstated decisions get invented — and inventions rarely match your design system. The standard prompt below forces you to decompose a design into five groups of information. This is exactly step 1 (Define) of the AI-Accelerated Workflow.

## The standard Figma-analysis prompt

Whenever you have a Figma frame (paste a screenshot, or a Figma link if your tool can read it), use this structure:

```text
You are a UI design analyst. Analyse the frame below into 5 sections.
Answer each with short bullets. DO NOT write any code.

1. OVERALL LAYOUT: what page section is this frame? What sits above and below it?
   What large blocks does it contain, and are they stacked vertically or laid out horizontally?
2. GRID & ALIGNMENT: count the columns in each row; estimate gutters and spacing
   (use multiples of 4px/8px); note left/right margins relative to the container;
   say which elements are centred and which are left-aligned.
3. COMPONENTS: list every repeating component (card, button, input, badge...) and its
   internal structure.
4. STATES: for each interactive component, list the states it needs
   (default, hover, focus, disabled, active, empty, error) and what changes
   in colour or shadow.
5. RESPONSIVE: predict how this layout should reflow at 768px and 375px
   (how many columns remain, which elements hide, which buttons go full-width).

Project context: Highland Hospital, HTML5 semantic + Bootstrap 5.3, Vietnamese UI,
design tokens --hh-primary #0f766e, --hh-dark #0f172a, --hh-light #f0fdfa.
```

## Reading the output

The five-section output is your **slicing spec** — the thing you will paste into the code-generation prompt in the next lesson. Check the three places where AI most often gets it wrong:

- **Column counts**: AI regularly miscounts a 3-column row as 4. Recheck against the frame.
- **Spacing**: without measurements every number is a guess — confirm against your real design tokens.
- **States**: AI usually lists default + hover only. Ask: "What about focus, disabled and empty states?"

## A Highland Hospital example

Say you need to analyse the **quick booking section** of the homepage. Instead of:

> "Build me a booking form like the one in this image"

run the standard prompt. You should end up with a spec roughly like:

- Layout: two columns — left has contact info + phone, right holds the form.
- The form has 4 fields (specialty, doctor, date, time) in a 2-column grid and a full-width submit button.
- States: inputs get `is-invalid` with a message; the button is disabled until the form is complete.
- Responsive: below 768px it becomes one column, fields stack.

## Practice

1. Pick any section of the Highland Hospital homepage (or a design you are working on).
2. Run the standard prompt in Gemini/Claude/ChatGPT with a screenshot.
3. Check the three weak spots above and correct anything AI miscounted or mis-estimated.
4. Keep the resulting spec — the next lesson turns it into Bootstrap code.

## What's next

With a clean spec in hand, the next lesson gives you the standard prompt for generating Bootstrap 5 code straight from that spec — with the constraints that make the output usable on the first pass.
