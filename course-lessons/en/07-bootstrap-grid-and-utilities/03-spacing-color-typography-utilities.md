# Spacing, Color & Typography utilities

## Learning objectives
- Apply the `m-*` / `p-*` spacing scale and center elements with `mx-auto`
- Use `bg-*`, `text-*` and `text-bg-*` color utilities safely
- Show and hide content at breakpoints with display utilities
- Build the Highland Hospital page header from utilities only — no custom CSS

## Utilities: finished answers to one-line problems

A utility is a single-purpose class: `mt-3` is *margin-top: 1rem*, nothing else. Instead of writing `.hero { padding: 3rem 0; }` in a stylesheet, you write `py-5` in the markup. Utilities keep your CSS file tiny, and — crucial for AI work — they give the AI a fixed vocabulary, so generated markup stays predictable.

## The spacing scale

Spacing utilities are built from a scale where `1` = 0.25rem and each step grows: `0` = 0, `1` = 0.25rem, `2` = 0.5rem, `3` = 1rem, `4` = 1.5rem, `5` = 3rem. Combine the property and side letters:

| Class | Meaning |
|---|---|
| `mt-2`, `mb-4`, `ms-3`, `me-5` | margin on top / bottom / start(left) / end(right) |
| `mx-auto` | margin-left **and** right auto → centers a block of fixed width |
| `py-5`, `px-3` | padding on the y-axis (top+bottom) / x-axis (left+right) |
| `p-4`, `m-0` | all four sides at once |

`mx-auto` is the center that flexbox and text-align cannot always give you: it centers any element whose width is less than its parent. `gap-*` adds spacing between flex or grid children — `gap-3` in a `d-flex` row spaces its items evenly without margins on each child.

## Colors: backgrounds and text

Bootstrap defines a semantic palette — `primary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `secondary` — used three ways:

```html
<div class="bg-light p-4">Light section background</div>
<p class="text-danger">This field has an error.</p>
<span class="text-bg-success">Confirmed</span>
```

- `bg-*` sets the background color.
- `text-*` sets the text color (`text-primary`, `text-muted` — renamed `text-body-secondary` in 5.3).
- `text-bg-*` (Bootstrap 5.2+) sets background **and** a readable contrasting text color in one class — prefer it for colored chips and badges.

Caution from experience: light text on `bg-primary` has poor contrast. Use `text-bg-primary`, or pair `bg-light` with `text-dark`, instead of mixing light-on-color manually.

## Display utilities

`d-*` sets the CSS `display` property, and it accepts breakpoints: `d-none d-md-block` means *hidden on phones, shown from 768px up*. This is how you show different content per device — for instance a phone number link on mobile but a plain text number on desktop. `d-flex` is your everyday flexbox switch; combine with `justify-content-between` and `align-items-center` for the classic header row.

```html
<span class="d-none d-md-inline">Call: (555) 010-2030</span>
<a href="tel:5550102030" class="d-md-none">Call us</a>
```

## Typography utilities

Headings, paragraphs and emphasis are all tuneable from the markup:

- `display-1` … `display-6` — oversized headings for hero sections (`.display-4` is a common hero size).
- `lead` — slightly larger, lighter paragraph for the intro sentence under a heading.
- `text-center`, `text-start`, `text-end` — alignment (all breakpoint-aware: `text-md-start`).
- `fw-bold`, `fw-semibold`, `fst-italic`, `text-uppercase` — weight, style, case.
- `fs-1` … `fs-6`, `lh-1`, `lh-lg` — font size and line height.

## The Highland Hospital header, utilities only

```html
<header class="text-bg-primary py-5">
  <div class="container text-center py-4">
    <p class="lead text-uppercase fw-semibold mb-1">Highland Hospital</p>
    <h1 class="display-4 fw-bold mb-3">Care that puts you first</h1>
    <p class="lead mx-auto px-3 mb-4">Book a consultation with a specialist
       in minutes — our care team is here around the clock.</p>
    <button type="button" class="btn btn-light btn-lg">Book an appointment</button>
  </div>
</header>
```

Read it left to right: the header paints itself `text-bg-primary`, the container centers content, the `lead` line becomes an overline label, `display-4 fw-bold` sizes the headline, and the intro is capped by `mx-auto` with generous `py` breathing room. Zero custom CSS.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
Rewrite the header of the Highland Hospital homepage using ONLY Bootstrap 5.3
utility classes (no custom CSS, no inline styles): a teal (use text-bg-primary)
background, white text, a small uppercase overline, a display-4 headline, a
centered lead sentence with capped width, generous vertical padding, and a
large light "Book an appointment" button. Explain each utility you chose in
one short sentence.
```

## Practice

1. Rebuild the header above from memory, then change the palette by editing classes only — no stylesheet.
2. Make the "Call us" phone link show only on phones and the office number only from `md` up, using `d-*` utilities.
3. Ask an AI chat to explain why `text-bg-primary` exists and when you should still use `bg-primary` with a separate `text-*` class; check its answer against the browser.

## What's next

With spacing, color and type under control, the next lesson, Buttons, Badges & Alerts, adds the first interactive-looking pieces — the buttons, status pills and error messages every page needs.
