# Lab: building a Hero section

## Learning objectives
- Draft the Highland Hospital Hero with a precise prompt, then refine it by hand
- Apply the Box Model, CSS Variables, type scale and viewport units from this chapter in one component
- Explain every declaration of the final CSS line by line — the "Analyze & Deep-Dive" step of the workflow

## The lab in one paragraph

This lesson closes Chapter 4 by building the most important component of the landing page: the Hero — the full-screen first impression that names Highland Hospital and funnels visitors to the booking form. You draft it with AI, then take ownership of the output: restyle it with this chapter's tokens and units, and prove understanding by commenting on every declaration. An AI that drafts a Hero in seconds is useful; a developer who can explain why it works is employable.

## Step 1 — the prompt

```text
Context: I am building the Highland Hospital landing page. The stylesheet already defines tokens --color-primary (teal #0f766e), --color-primary-dark #115e56, --color-white, --color-gray-900 #0f172a, and --font-body (system-ui stack). The Hero sits under a transparent header, above a white services section; its background image is a bright hospital-corridor photo.

Requirement: produce the HTML structure of the Hero plus the complete CSS for it.

Constraints: semantic HTML with one h1 naming the hospital and a short promise, one supporting paragraph, and one call-to-action anchor "Book an appointment" linking to #booking. CSS must: fill the viewport with min-height and a viewport unit; overlay a dark-to-teal gradient on the background image so white text stays readable; vertically centre the content; use only custom-property colors (no raw hex outside :root) and rem font sizes; give the CTA primary-button padding, border-radius and a hover state from the tokens. No media queries yet. Output only code.
```

## Step 2 — the code, annotated line by line

Read it aloud — every comment explains a decision you should be able to reproduce:

```html
<section class="hero">
  <h1>Highland Hospital — expert care, close to home</h1>
  <p class="hero__subtitle">Book an appointment online in under two minutes.</p>
  <a href="#booking" class="btn-primary">Book an appointment</a>
</section>
```

```css
/* 1. Global reset (see "The Box Model"): padding/borders count inside the width. */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* 2. Design tokens (see "Color, Typography & CSS Variables"). */
:root {
  --color-primary: #0f766e;
  --color-primary-dark: #115e56;
  --color-white: #ffffff;
  --color-gray-900: #0f172a;
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

/* 3. Base typography: rem sizes scale with the user's root font size. */
body { font-family: var(--font-body); line-height: 1.6; color: var(--color-gray-900); }

/* 4. The Hero box. min-height (not height) with 100vh lets the section grow
      if the headline wraps, so content is never clipped on narrow phones. */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;   /* vertical centring of the content block */
  align-items: flex-start;   /* text stays left-aligned, CTA under it */
  gap: 1.25rem;              /* uniform rhythm between the three children */
  padding: 2rem;             /* content never touches the screen edges */
  /* Gradient + photo stack on one box; the overlay keeps white text legible. */
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(15, 118, 110, 0.8)),
    url("../images/hospital-corridor.jpg") center / cover no-repeat;
  color: var(--color-white);
}

.hero h1 { font-size: clamp(2.25rem, 6vw, 4rem); line-height: 1.15; max-width: 14ch; }
.hero__subtitle { font-size: 1.25rem; max-width: 40ch; } /* short measure = readable */

/* 5. The CTA — reused later on the booking section; em padding scales with font size. */
.btn-primary {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8em 1.6em;   /* em: breathing room follows the font */
  border-radius: 8px;
  border: 2px solid var(--color-primary); /* declared now, so hover never shifts layout */
}
.btn-primary:hover { background-color: var(--color-primary-dark); }
```

Why the border up front? Adding one only on `:hover` would grow the button by 4px and nudge the layout — declare it always, swap just the background, and the box model stays stable. That is the kind of detail an AI draft routinely gets wrong and a reviewing developer catches.

## Step 3 — compare, refine, verify

1. **Compare** your hand-written attempt, the AI draft and this annotated version; note three differences and decide, with reasons, which is better.
2. **Refine** the AI output to use your tokens, `rem` sizes and `min-height` — reject drafts that hard-code colors or use `height: 100vh`.
3. **Verify** in the browser: resize to 320px and check the headline never clips; in DevTools → Computed on the CTA confirm padding, radius and box model; hover the button and confirm no layout shift.

## Checklist

- [ ] Hero fills at least one viewport (`min-height: 100vh`); content never clipped on narrow screens
- [ ] White text readable over the photo (gradient overlay present)
- [ ] One `<h1>` naming the hospital; one supporting paragraph; one CTA linking to `#booking`
- [ ] Colors only from `:root` tokens; font sizes rem or clamp; line-height 1.5–1.7
- [ ] Button uses em padding, no hover layout shift, with a hover state
- [ ] Every declaration can be explained out loud — no rule you cannot justify

## Practice

- Complete the three steps and save the Hero in your project.
- Ask your AI assistant to review your final CSS as a senior reviewer — "find three ways this Hero could break on a phone or be more maintainable" — and fix the findings you agree with.
- Write a 100-word explanation of why this component uses `min-height`, `clamp()`, `em` and `rem` — that paragraph is your proof of the Analyze step.

## What's next

In **Flexbox basics**, the Hero's one-dimensional layout question — "stack these three items and centre them" — gets a systematic answer, and you will be able to build the services row and doctor cards the Highland Hospital homepage still needs.
