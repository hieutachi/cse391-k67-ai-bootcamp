# Media Queries & Breakpoints

## Learning objectives
- Write `@media` rules with `min-width` and `max-width`, and read each condition aloud as a question
- Choose breakpoints from the standard 576 / 768 / 992 / 1200 set and justify each choice
- Turn a plain-English description into media queries with an AI prompt, then verify the result in DevTools responsive mode

## CSS that asks a question

A media query is conditional CSS. The browser evaluates a question about the viewport — "are you at least 768px wide?" — and applies the rules inside the braces only when the answer is yes.

```css
@media (min-width: 768px) {
  .services__list {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

The condition name encodes the direction. `min-width: 768px` reads "from 768px upward": larger viewports get the rule and a phone skips the whole block. `max-width: 767px` reads "from 767px downward". Choosing one direction consistently is a workflow decision — the whole subject of the next lesson. Today, the syntax and the numbers.

## The standard breakpoint set

Nearly every design system — Bootstrap included, which you meet in Chapter 7 — shares the same tiers. Learn them once, use them everywhere:

| Media query | Typical screens | First thing that usually changes |
|---|---|---|
| `min-width: 576px` | large phones in landscape, small tablets | two cards per row become comfortable |
| `min-width: 768px` | tablets, small laptops | stacked content becomes two side-by-side columns |
| `min-width: 992px` | laptops and desktops | four-column rows fit |
| `min-width: 1200px` | wide desktop monitors | content width gets capped, whitespace grows |

Rule of thumb: devices change every year; content does not. Add a breakpoint where the layout actually breaks, not where a new phone appears. These numbers are convenient test points and shared vocabulary with designers and with Bootstrap — but the layout is the boss.

## A first responsive component

Here is the Highland Hospital services row responding across widths. Watch the direction: base styles first, then `min-width` queries that layer on enhancements:

```css
.services__list {
  display: grid;
  grid-template-columns: 1fr;   /* phone: one service per row */
  gap: 1.5rem;
}

@media (min-width: 576px) {
  .services__list { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 992px) {
  .services__list { grid-template-columns: repeat(4, 1fr); }
}
```

A media query does not invent new styles; it adds to the cascade at that width. The card internals — padding, teal icons, headings — live once outside the queries and are inherited at every size. Only the column count changes.

## Sample prompt — from a description to media queries

```text
Context: I maintain the Highland Hospital landing page. Design tokens: teal #0f766e for accents, dark slate #0f172a for headings, pale #f0fdfa for the page background. A services section uses .services__list { display: grid; gap: 1.5rem }, each .service card holding an h3 and a paragraph.

Requirement: write the responsive rules for the services section.

Constraints: mobile-first, base is one card per row; use only the standard breakpoints 576 / 768 / 992 / 1200; show two cards from 576px and four from 992px; cap the section at 1200px and centre it; change no class names and no card-internal rules; add one comment per breakpoint explaining what changed and why. Output only CSS.
```

Audit the answer against the description: the AI should keep the 1 → 2 → 4 progression, add nothing at 768px (no rule for it is a correct answer), and explain each jump.

## Verify in DevTools responsive mode

1. Open `index.html` with Live Server and click the device icon in DevTools (Ctrl+Shift+M on Windows/Linux, Cmd+Shift+M on macOS).
2. The page becomes a resizable viewport with a width label. Drag the edge and watch the grid flip at 576px and 992px. This is real behaviour, not a preview: the toolbar resizes the actual viewport, so media queries respond exactly as on a device.
3. Click the width number and type exact targets from your checklist — 375, 768, 1440.
4. Above the viewport, DevTools shows a media-query ruler. Click a segment to force that query on; the Styles pane greys out rules that do not apply at the current width. "Which rule wins here?" now has a visual answer.

## Practice

- Build the services section into your project and step through 320, 375, 576, 768, 992, 1200 and 1440px. Note every width where the layout changes and justify each change in terms of content, not habit.
- Ask your AI assistant: "List every width between 320 and 1440px where this services layout looks broken, and explain why." Fix the findings you agree with.

## What's next

In **Mobile-First Workflow** you formalise the ordering you just used — base styles for the phone first, `min-width` queries layered upward — and learn why that ordering produces less CSS and fewer bugs than its desktop-first twin.
