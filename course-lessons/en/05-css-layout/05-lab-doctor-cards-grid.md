# Lab: the Doctor Cards grid

## Learning objectives
- Draft the four Highland Hospital doctor cards with a precise prompt, then refine by hand
- Make the grid responsive with `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`
- Explain every CSS declaration of the final card grid line by line — the Analyze & Deep-Dive step

## Step 1 — the prompt
```text
Context: I am building the Highland Hospital landing page. Palette: teal #0f766e, dark slate #0f172a, light #f0fdfa, white card background. The section heading "Meet our doctors" and a short intro paragraph already exist; only the grid is missing.
Requirement: produce the HTML for exactly four doctor cards plus the CSS for the grid and one card. Each card: avatar image (a local file in ../images/doctors/), the doctor's name, their specialty, one line of experience, and a "Book appointment" button linking to #booking.
Constraints: the grid must use grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) with gap 1.5rem and no media queries — one line must stay correct from a 320px phone to a desktop. Cards must be equal height with the button pinned to the bottom, the avatar square and undistorted, and colors taken only from the palette. Output only code.
```

That prompt forces the exact pattern this lab is about — and the two details AI drafts routinely miss: `object-fit` on the avatar and `margin-top: auto` on the button.

## Step 2 — the code, annotated line by line
```html
<section class="doctors">
  <div class="doctors__grid">
    <article class="doctor-card">
      <img class="doctor-card__avatar" src="../images/doctors/dr-chen.jpg" alt="Portrait of Dr. Sarah Chen">
      <h3>Dr. Sarah Chen</h3>
      <p class="doctor-card__specialty">Cardiology</p>
      <p class="doctor-card__experience">14 years of experience</p>
      <a class="doctor-card__btn" href="#booking">Book appointment</a>
    </article>
  </div>
</section>
```

Reuse that one `<article>` — copy it for Dr. James Okafor (Neurology), Dr. Amira Hassan (Pediatrics) and Dr. Lucas Meyer (Orthopedics), and add an `h2` "Meet our doctors" above the grid. Then the CSS:

```css
:root {
  --color-primary: #0f766e; /* teal */
  --color-dark: #0f172a;    /* dark slate */
  --color-light: #f0fdfa;   /* light mint */
}
.doctors { padding: 4rem 2rem; background: var(--color-light); }
/* 1. The responsive grid — the heart of the lab. */
.doctors__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
/* 2. One card: grid stretch (the default) gives equal heights; inside,
     a flex column keeps avatar, text and button in order. */
.doctor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
/* 3. The avatar: object-fit crops the photo square, never distorting it. */
.doctor-card__avatar {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
}
.doctor-card h3 { color: var(--color-dark); margin: 1rem 0 0.25rem; }
.doctor-card__specialty { color: var(--color-primary); font-weight: 600; }
.doctor-card__experience { font-size: 0.9rem; color: var(--color-dark); }
/* 4. The button: margin-top auto pins it to the card bottom; the border is
     pre-declared so hover never shifts the layout. */
.doctor-card__btn {
  margin-top: auto;
  background: var(--color-primary);
  color: #ffffff;
  padding: 0.6em 1.4em;
  border-radius: 8px;
  text-decoration: none;
  border: 2px solid var(--color-primary);
}
.doctor-card__btn:hover { filter: brightness(1.1); }
```

## The one-line responsive pattern, decoded

`repeat(auto-fit, minmax(240px, 1fr))` — say it out loud and it explains itself: `repeat(…)` repeats the track definition; `minmax(240px, 1fr)` makes each track at least 240px wide, then lets it grow to share leftover space; `auto-fit` creates **as many of those tracks as fit**, so one rule renders 1 column on a 320px phone, 2 on a tablet and 4 on a wide desktop. Four cards need **zero media queries** — a full row appears exactly when 4 × 240px plus gaps fit. (Its twin `auto-fill` keeps empty placeholder tracks instead; the difference shows only with fewer items than tracks.)

The auto margin does the second half: `margin-top: auto` on the button consumes every free pixel above it inside the card's flex column, so all four buttons share one baseline whatever the name or experience length — outer grid equality plus inner column alignment, two nested tools doing exactly their jobs.

## Step 3 — compare, refine, verify

1. **Compare** your hand-written attempt, the AI draft and this annotated version; note three differences and decide, with reasons, which is better.
2. **Refine** the AI output to the palette tokens, `object-fit: cover` avatars and the `margin-top: auto` button — reject drafts with three media queries or missing `alt` text.
3. **Verify** in the browser: resize from 320px up and confirm the grid moves 1 → 2 → 4 columns; open the grid overlay in DevTools → Layout to *see* the tracks; lengthen one experience line and confirm every button stays aligned.

## Checklist

- [ ] Exactly four semantic `<article>` cards with real names, specialties and experience
- [ ] Grid uses `repeat(auto-fit, minmax(240px, 1fr))` with `gap: 1.5rem` and no media queries
- [ ] All cards equal height; every "Book appointment" button pinned to the bottom; square avatars cropped, never distorted (`object-fit: cover`), with meaningful `alt` text
- [ ] Colors from the tokens only (teal #0f766e, dark slate #0f172a, light #f0fdfa); hover without layout shift; every rule explainable out loud

## Practice

- Save the completed grid in your project, then write the three remaining doctor cards by hand.
- Swap `auto-fit` for `auto-fill` with only two doctors and describe the visible difference; then ask your AI assistant to review the grid as a senior — "find three ways it could break on a small phone" — and fix what you agree with.

## What's next

In **Media Queries & Breakpoints**, the first lesson of the next chapter, you learn when a single auto-fit line is not enough — and how to write deliberate breakpoints that let this homepage flow from phone to widescreen.
