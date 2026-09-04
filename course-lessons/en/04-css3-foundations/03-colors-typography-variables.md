# Color, Typography & CSS Variables

## Learning objectives
- Write colors as hex, rgb and hsl and choose which format fits the job
- Build a type system from system font stacks, `rem` sizes and a comfortable `line-height`
- Define Highland Hospital's medical color tokens once in `:root` and reuse them with `var()`

## Three ways to say "teal"

```css
:root {
  --color-primary: #0f766e;              /* hex — compact, copy-pasted from design tools */
  --color-primary-rgb: 15, 118, 110;     /* channels kept separately for translucent tints */
}
/* rgb: reads naturally when tweaking values; hsl: keep hue at 175, raise lightness for a paler teal */
```

**Hex** is what Figma hands you — copy it. **rgb** reads naturally when you tweak values. **hsl** is the thinking designer's format: keep the hue fixed at `175` and raise the lightness for a lighter teal. For one-off translucency, `rgb(15 118 110 / 0.15)` beats hunting for a hex-with-alpha; declaring the channels as `--color-primary-rgb` lets you derive tints from a solid token:

```css
.hero { background: rgb(var(--color-primary-rgb) / 0.12); }
```

## Typography: system stacks and rhythm

A hospital site must be *readable* first. Custom web fonts cost a network round trip and layout shift; most projects never need one. A **system font stack** uses the fonts every OS already ships — no downloads, instant render:

```css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;   /* 16px, the browser default — respect it */
  line-height: 1.6;  /* roughly 26px of breathing room per text line */
}
h1, h2, h3 { line-height: 1.2; color: #0f172a; }
```

`line-height` between 1.5 and 1.7 does more for body-text readability than any font choice; headings tighten to about 1.2. Size everything in `rem`: `1rem` is the root font size (16px by default), so `1.5rem` is 24px. If a user's browser demands larger text, rem-based sizes scale with it — pixel sizes do not. Body: 1rem. Section headings: 1.75–2rem. The Hero `h1`: 2.5rem and up. Never mix fixed `px` font sizes into that scale.

## Design tokens with CSS Custom Properties

Hard-coding `#0f766e` in thirty places means thirty edits when marketing picks a new teal. **Custom properties** — variables — declare the value once and reference it everywhere:

```css
:root {
  /* Highland Hospital medical color tokens */
  --color-primary: #0f766e;      /* teal — trust, calm, medical */
  --color-primary-dark: #115e56;
  --color-primary-light: #ccfbf1;
  --color-white: #ffffff;
  --color-gray-50: #f8fafc;      /* page background */
  --color-gray-100: #f1f5f9;     /* card background */
  --color-gray-500: #64748b;     /* secondary text */
  --color-gray-900: #0f172a;     /* headings */
  --color-danger: #b91c1c;       /* errors, urgent flags */
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --space-card: 1.5rem;
}
```

Why this palette? Teal is the deliberate choice for a medical brand: calm and clinical without the alarm of pure red or the cold of hospital green, and it clears contrast checks against white for body text. The grays do the quiet work — backgrounds, borders, secondary text — so the teal stays the voice. Consume the tokens with `var()`:

```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
}
.btn-primary:hover { background-color: var(--color-primary-dark); }
```

Change the identity of the whole site by editing the lines in `:root` — nothing else moves. That is the payoff of tokenizing early, and exactly what the design-token workflow in later chapters builds on.

### Sample prompt — a token set and type scale

```text
Context: I am styling the Highland Hospital landing page. Brand color teal #0f766e; white and neutral grays elsewhere; body text dark slate. The page has a Hero with one h1, section headings, a booking form, and a doctor cards grid to come in later lessons.

Requirement: write a :root block for this project with 1) custom properties for a complete medical palette — primary teal #0f766e, a darker hover shade, a very light teal tint, white, and a gray ramp from page background to heading text; 2) a --font-body system font stack and a --space-* scale; 3) a body rule (font, rem font-size, line-height 1.5–1.7, text color from a token); 4) h1–h3 rules in rem with tightened line-height.

Constraints: no raw hex outside :root — every color referenced via a custom property; no custom web fonts; then explain in two short sentences why hsl/rgb is not needed for this token set.
```

## Practice

- Replace the ad-hoc colors in your `style.css` with the token set above, then restyle the nav, hero and buttons using only `var()` references.
- Tune the brand: change `--color-primary` to a light blue and reload — the whole page should shift with one edit.
- Check contrast in DevTools on a gray-500 paragraph; ask your AI assistant which gray tokens would fail WCAG AA for small text, and adjust until all pass.

## What's next

In **CSS units**, we zoom out from pixels to relative measures — `rem`, `em`, `%`, `vh`, `vw` — so the Highland Hospital Hero fills exactly one screen and the whole layout scales with the user's settings.
