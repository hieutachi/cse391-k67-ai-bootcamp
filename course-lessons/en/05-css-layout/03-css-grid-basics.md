# CSS Grid basics

## Learning objectives
- Turn a container into a two-dimensional layout with `display: grid`
- Define tracks with `grid-template-columns`, `grid-template-rows` and the `fr` unit
- Lay out regions with `grid-template-areas` and place items with `grid-column` / `grid-row`
- Structure the full Highland Hospital homepage from named grid areas

## Why grid exists

Flexbox arranges content along one line at a time — a row of services, a column of nav links. A webpage is a whole *plane*: a sidebar beside a content column, stacked on mobile. CSS Grid is the layout system for that plane: name the regions once — header, sidebar, main, footer — and one declaration places every block at once.

## Tracks, lines and the `fr` unit

A grid is built from **tracks** (rows and columns) separated by numbered **lines**: `grid-template-columns: 1fr 2fr` creates two column tracks, with lines 1, 2 and 3 between and around them. The `fr` unit splits leftover space the way `flex-grow` does, but for tracks only — `1fr 2fr` makes the second column twice as wide. Unlike `%`, fractions distribute only the space that remains after fixed tracks: `200px 1fr` gives the sidebar exactly 200px and the content every remaining pixel. Mix `fr` freely with `px`, `rem`, `%` and `minmax()` in one declaration, and add `gap: 1.5rem` to space the tracks without polluting the edges (two values set rows then columns: `gap: 2rem 1rem`).

## Placing items on lines

Auto-placement fills cells row by row; for control, address the numbered lines directly:

```css
.main {
  grid-column: 2;        /* one column: starts and ends on line 2 */
  grid-column: 1 / 3;    /* span from line 1 to line 3: two columns */
  grid-column: 2 / -1;   /* from line 2 to the last line; grid-row takes the same syntax */
}
```

`span` describes the size instead of the end line: `grid-column: span 2` means "occupy two columns", which survives later edits to the template far better than absolute line numbers.

## `grid-template-areas` — the readable way

Line numbers are hard to read. Areas let you draw the layout with ASCII art:

```css
.grid {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    aside"
    "footer  footer  footer";
}
.grid__header { grid-area: header; }
.grid__sidebar { grid-area: sidebar; }
```

Every name in the map must exist as a `grid-area` on exactly one child; `"."` marks an empty cell, and every row must hold the same number of names.

## The Highland Hospital homepage layout

```html
<div class="layout">
  <header class="layout__header">Highland Hospital</header>
  <aside class="layout__sidebar">
    <nav>
      <a href="#services">Services</a>
      <a href="#doctors">Doctors</a>
      <a href="#booking">Book an appointment</a>
    </nav>
  </aside>
  <main class="layout__main">
    <h1>Expert care, close to home</h1>
    <p>Book an appointment online in under two minutes.</p>
    <a href="#booking" class="layout__cta">Book an appointment</a>
  </main>
  <footer class="layout__footer">© 2025 Highland Hospital</footer>
</div>
```

```css
:root {
  --color-primary: #0f766e; /* teal */
  --color-dark: #0f172a;    /* dark slate */
  --color-light: #f0fdfa;   /* light mint */
}
.layout {
  display: grid;
  min-height: 100vh;                 /* the grid fills the viewport */
  grid-template-columns: 220px 1fr;  /* fixed sidebar, fluid content */
  grid-template-rows: auto 1fr auto; /* header/footer hug content, main fills */
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}
.layout__header { grid-area: header; background: var(--color-dark); color: var(--color-light); padding: 1rem 2rem; font-weight: 700; }
.layout__sidebar { grid-area: sidebar; background: var(--color-light); padding: 1.5rem; }
.layout__sidebar nav { display: flex; flex-direction: column; gap: 0.75rem; }
.layout__main { grid-area: main; background: #ffffff; padding: 2rem; }
.layout__cta { display: inline-block; background: var(--color-primary); color: #ffffff; padding: 0.75em 1.5em; border-radius: 8px; text-decoration: none; }
.layout__footer { grid-area: footer; background: var(--color-dark); color: var(--color-light); text-align: center; padding: 1rem; }
```

Track the shapes against the map: the `1fr` column gives the main area every pixel the sidebar does not use, and the `1fr` row lets it stretch so the footer always sits at the bottom. The layout reads like a blueprint because it literally is one — that is the whole point of grid areas.

## Sample prompt — build the shell with grid areas

```text
Build the Highland Hospital homepage shell with pure CSS Grid. Two layouts controlled only by grid-template-areas, no extra HTML: desktop uses "header header / sidebar main / footer footer" with grid-template-columns 220px 1fr and min-height 100vh; a 640px-wide media query switches to "header / main / sidebar / footer" as one column, sidebar under the content. Palette: teal #0f766e, dark slate #0f172a, light #f0fdfa. Explain each grid property you use in one sentence. Output only code plus comments.
```

## Practice

- Build the layout above in your project and confirm in DevTools that header and footer span both columns while sidebar and main share the row beneath.
- Rewrite the template as `"header header header / main main sidebar / footer footer footer"` and watch the regions re-arrange — no HTML changes needed.
- Sketch a doctors page with a left photo rail, centre content and a right booking panel, then implement it with three named areas.

## What's next

In **Flexbox vs Grid** you learn the one-dimensional-versus-two-dimensional decision rule that tells you which tool each Highland Hospital component needs — and you will see the doctor list built both ways.
