# Flexbox basics

## Learning objectives

- Turn any container into a flex layout with `display: flex` and name its two axes
- Align and distribute items with `justify-content`, `align-items` and `gap`
- Control direction and wrapping with `flex-direction` and `flex-wrap`
- Build two Highland Hospital components — the top navbar and the CTA button row

## Why flexbox exists

Before flexbox, lining things up meant `float` hacks, `inline-block` gaps and manual margins — every trick broke the moment content changed. Flexbox is the first layout model that treats a **row or column of items as one group**: declare `display: flex` on the parent and its direct children (the *flex items*) align, space out and wrap almost by themselves.

## The two axes

Every flex container has two axes:

- **Main axis** — the direction the items flow in (left → right by default).
- **Cross axis** — the perpendicular direction (top → bottom by default).

The twist that trips beginners: the axes are named by direction, not by position. Set `flex-direction: column` and the main axis becomes top → bottom while the cross axis becomes left → right.

## `justify-content` — placement on the main axis

Distributes items **along the main axis**: `flex-start` (default) packs them at the start, `flex-end` at the end, `center` groups them in the middle, `space-between` pushes the first and last items to the edges, and `space-evenly` adds equal space everywhere including the edges.

## `align-items` — placement on the cross axis

Positions items **across the cross axis**. The default is `stretch`, so items fill the container's height — exactly what makes equal-height card rows possible in the next lesson. `align-items: center` is the value you will use constantly for vertical centring.

`gap` adds space **between** items only: no half-gaps at the edges, no negative margins, no last-child selectors.

## Direction and wrapping

`flex-direction` picks which axis is the main axis — `row` (default), `column`, or the `*-reverse` variants. `flex-wrap: wrap` lets items flow onto new lines when the container runs out of room, instead of squashing everything into one crowded line.

## Example 1 — the Highland Hospital navbar

```html
<nav class="nav">
  <a class="nav__brand" href="/">Highland Hospital</a>
  <a href="#services">Services</a>
  <a href="#doctors">Doctors</a>
  <a href="#booking">Book</a>
</nav>
```

```css
:root {
  --color-primary: #0f766e; /* teal */
  --color-dark: #0f172a;    /* dark slate */
  --color-light: #f0fdfa;   /* light mint */
}
.nav {
  display: flex;        /* the children become flex items */
  align-items: center;  /* brand and links share one vertical centre line */
  gap: 1.5rem;          /* even spacing between the four links */
  padding: 1rem 2rem;
  background: var(--color-dark);
}
.nav a { color: var(--color-light); text-decoration: none; }
.nav__brand { font-weight: 700; }
```

One alignment task on one axis — pure flexbox territory: the links sit vertically centred with a consistent 1.5rem between them.

## Example 2 — the CTA button row

Under the Hero headline the visitor must choose an action without the buttons drifting apart or overflowing on a phone:

```html
<div class="cta-row">
  <a class="btn btn--primary" href="#booking">Book an appointment</a>
  <a class="btn btn--ghost" href="tel:+15550123">Call the clinic</a>
</div>
```

```css
.cta-row {
  display: flex;
  flex-wrap: wrap;   /* on a 320px screen the buttons stack, not overflow */
  gap: 1rem;
}
.btn { padding: 0.75em 1.5em; border-radius: 8px; text-decoration: none; }
.btn--primary { background: var(--color-primary); color: #ffffff; }
.btn--ghost { border: 1px solid var(--color-primary); color: var(--color-primary); }
```

## Sample prompt — diagnose my flexbox symptoms

Paste this into Gemini, Claude or ChatGPT:

```text
I am styling the Highland Hospital landing page with the palette teal #0f766e, dark slate #0f172a and light mint #f0fdfa. Three flexbox containers misbehave: (1) the navbar links stretch to unequal heights; (2) the CTA buttons do not space evenly between themselves and the hero text; (3) the whole button row overflows on a 360px phone. For each symptom tell me which of justify-content, align-items, gap or flex-wrap fixes it, why that property fits, and show the one-line fix. Diagnose — do not rewrite my whole stylesheet.
```

## Practice

- Rebuild the two examples by hand, then resize the window: the button row should collapse to one column below ~400px while the navbar stays on one line.
- On a strip of five colored divs, run `justify-content` through every value — predict each result first, then verify in the browser.
- Rebuild the navbar with `flex-direction: column` and `align-items: flex-start` to feel how the two axes swap.

## What's next

In **Advanced Flexbox**, items learn to negotiate space with `flex-grow`, `flex-shrink` and `flex-basis`, and you will pin the "Book an appointment" button to the far right of this navbar — the first step toward the doctors section.
