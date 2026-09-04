# Mobile-First Workflow

## Learning objectives
- Write phone-first base CSS, then layer layout enhancements upward with `min-width` queries
- Explain why that ordering wins: fewer overrides, forced prioritisation, and a simpler cascade
- Convert a desktop-first snippet to mobile-first with an AI prompt, then audit the result

## Two directions, one page

Every responsive page can be built in either order. **Desktop-first** styles the wide layout, then uses `max-width` queries to dismantle it for smaller screens. **Mobile-first** styles the phone first, then uses `min-width` queries to build upward. Same page, opposite direction — and noticeably different quality of CSS.

Mobile-first, applied to the Highland Hospital Hero:

```css
/* BASE — the phone. This must work at 320px with no help from queries. */
.hero {
  display: grid;
  gap: 2rem;
  padding: 2.5rem 1.25rem;
}

.hero__photo {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 1rem;
}

.btn-cta {
  display: block;
  width: 100%;              /* a full-width thumb on mobile — easy to tap */
  text-align: center;
}

/* Tablet and up: there is room for two columns. */
@media (min-width: 768px) {
  .hero {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 4rem 2rem;
  }
  .btn-cta { width: auto; }   /* the thumb becomes a normal-sized button */
}
```

Notice what the wide rule does *not* do: it never overrides the narrow layout; it only adds the two declarations the phone never set. Base CSS is not "mobile styles to be corrected later" — it is the finished phone design.

## Why this ordering wins

- **Less undoing.** Desktop-first spends rules cancelling earlier rules. Compare the two versions of the same services grid:

```css
/* Desktop-first: style wide, then undo. */
.services { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
@media (max-width: 991px) { .services { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px) { .services { grid-template-columns: 1fr; } }
```

```css
/* Mobile-first: each rule adds; none undoes. */
.services { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
@media (min-width: 576px) { .services { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 992px) { .services { grid-template-columns: repeat(4, 1fr); } }
```

On a phone, the desktop-first version applies the four-column rule and then cancels it twice — wasted work, and every `max-width` block exists only to undo an earlier decision. The mobile-first version has no seams: base covers 0–575px, and each query hands over at exactly 576px and 992px.

- **It forces prioritisation.** If the base must work at 320px, you decide what is essential first; wide-screen layout becomes a bonus, not the default you trim down.
- **A simpler cascade.** Fewer competing declarations on the same property means the "which rule wins?" question from Lesson 1 almost never needs debugging.
- **It matches content flow.** A phone column reads top-to-bottom; adding columns only when space allows is the same progressive-enhancement philosophy as the fluid images of Lesson 3.

## Sample prompt — converting desktop-first to mobile-first

```text
Context: I maintain the Highland Hospital landing page (palette: teal #0f766e, dark slate #0f172a, light #f0fdfa). The doctor-card grid is currently desktop-first:

.services { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
@media (max-width: 991px) { .services { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px) { .services { grid-template-columns: 1fr; } }

Requirement: rewrite it mobile-first with min-width queries. The layout at 375px, 768px and 1440px must stay visually identical.

Constraints: keep the same HTML and class names; base is one column; do not invent extra breakpoints or rules; after the CSS, list every rule you deleted and explain in one sentence why mobile-first no longer needs it. Output the rewritten CSS first, then that list.
```

Audit the AI's rewrite: the tell-tale of a lazy conversion is a leftover `max-width` block, a base that still assumes four columns, or an invented 991px. Accept only the clean 1 → 2 → 4 progression.

## Practice

- Convert every `max-width` rule in your project to mobile-first. Count the rules before and after: fewer rules for the same three viewports is the win.
- Open DevTools at 375px and read the Styles pane top-down: you should see the base rules first, with no greyed-out "undo" rules stacked above them.
- Ask your AI assistant to review the result: "Are there any remaining undo patterns in this CSS? Show me each one and the minimal fix."

## What's next

In **Fluid images & typography** you stop fighting the last two rigid things in a responsive page — bitmaps that overflow their column and headings that jump between fixed sizes — so your mobile-first layout bends smoothly at every width.
