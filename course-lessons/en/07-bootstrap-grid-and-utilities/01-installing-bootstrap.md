# Installing Bootstrap 5

## Learning objectives
- Add Bootstrap 5.3 to a plain HTML page with the official CDN snippet
- Explain why the CSS link goes in `<head>` while the JS bundle goes at the end of `<body>`
- Verify that Bootstrap actually loaded, and place your own CSS so it can override Bootstrap

## One link tag replaces chapters of CSS

In the CSS chapters you wrote layout, spacing and buttons by hand — the right way to learn. Bootstrap 5 is what a working developer reaches for next: one battle-tested CSS file plus a small JavaScript bundle that give you a 12-column grid, ready-made components (navbar, cards, modals) and hundreds of utility classes. A single link tag replaces most of the CSS you were typing yourself.

## Bootstrap ships in two files

Bootstrap is two downloads, and the order matters:

1. **The CSS** (`bootstrap.min.css`) goes in the `<head>`. The browser must load it before the body renders, or your page flashes unstyled.
2. **The JavaScript** (`bootstrap.bundle.min.js`) goes at the very end of `<body>`. It powers interactive components — the collapsing hamburger menu, modals, alerts, accordions. The *bundle* name means it already includes Popper, the small library that positions dropdowns and tooltips, so you never add Popper yourself.

Install from a CDN — a free, public content network. We pin a real version (`bootstrap@5.3.3`) instead of `latest`, because "latest" can silently change under you mid-course.

## The minimal Bootstrap page

This is the complete starter page we use for the rest of Chapter 7 and 8:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Highland Hospital</title>

  <!-- 1. Bootstrap CSS — always first -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- 2. Your custom CSS — AFTER Bootstrap, so it wins the cascade -->
  <link href="css/highland.css" rel="stylesheet">
</head>
<body>
  <main class="container py-5">
    <h1 class="display-5 fw-bold">Welcome to Highland Hospital</h1>
    <p class="lead">This page already uses the Bootstrap grid, typography and buttons.</p>
    <button type="button" class="btn btn-primary">Book an appointment</button>
  </main>

  <!-- 3. Bootstrap JS bundle — at the END of the body -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

Save it, open it with Live Server, and you should see a styled heading, a grey lead paragraph and a solid indigo button.

## Verify it really loaded

Three quick checks, in increasing order of certainty:

- The button looks like a Bootstrap button (rounded corners, indigo background, hover state).
- In Chrome DevTools → **Elements**, click the button and confirm the styles panel shows rules from `bootstrap.min.css` (for example `.btn` and `.btn-primary`).
- In the DevTools **Console**, type `typeof bootstrap` and press Enter. You get `"object"`. Even better, `bootstrap.Tooltip.VERSION` prints `"5.3.3"` — that proves the JS bundle loaded too.

## Why CDN for this course

We use the CDN because this course runs plain HTML files with Live Server — no Node, no build step, no package manager. The CDN is fast, free, and cached in the browser, so every lesson shares one copy of Bootstrap. The trade-off is that the page needs internet, and you must remember the version number. When you deploy a real product you can download the same files and host them yourself; the markup does not change at all.

## Your custom CSS comes after Bootstrap

Bootstrap is your base, not your prison. Because plain CSS gives later rules higher priority, a stylesheet placed *after* Bootstrap's link overrides it naturally. So `css/highland.css` looks like:

```css
/* Loaded AFTER Bootstrap on purpose — these rules win */
.navbar-brand {
  font-weight: 700;
  letter-spacing: 0.4px;
}

.btn-primary {
  background-color: #0b5e4f; /* Highland teal */
  border-color: #0b5e4f;
}
```

Rule of thumb: reach for a Bootstrap utility or component class first; only write custom CSS when the design genuinely needs something Bootstrap cannot express. Keep this file small.

## Sample prompt — paste into Gemini / Claude / ChatGPT

```text
I am starting the Highland Hospital website and pasted the official Bootstrap 5.3
CDN starter page, but nothing looks styled yet. Explain in order: (a) why the CSS
<link> must be in the <head>, (b) why the JS bundle must be at the end of <body>,
and (c) two ways to confirm in Chrome DevTools that Bootstrap really loaded.
Keep it beginner-friendly and under 150 words.
```

Run the check you just learned *before* trusting the answer — does the answer match what the browser shows?

## Practice

1. Create the minimal page above with your own `css/highland.css`, and confirm in the console that `bootstrap.Tooltip.VERSION` reports `5.3.3`.
2. Temporarily move the Bootstrap CSS `<link>` below your custom stylesheet and reload — observe what breaks in the cascade, then fix it.
3. Ask an AI chat to explain the difference between `bootstrap.min.css` and `bootstrap.bundle.min.js`, then verify its claims against this lesson.

## What's next

With Bootstrap on the page, the next lesson, The 12-column grid system, shows you how to lay out the Highland Hospital homepage in rows and columns without writing a single media query.
