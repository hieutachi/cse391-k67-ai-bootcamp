# Lab: a responsive Hero

## Learning objectives
- Combine media queries, mobile-first ordering, fluid type and motion in one Highland Hospital Hero
- Make the same component correct at 375px, 768px and 1440px, fixing what breaks at each width
- Judge the result with a behaviour checklist instead of "it looks fine"

## The lab in one paragraph

In the Chapter 4 lab the Hero was a full-viewport poster with a background photo — one layout, no breakpoints. A responsive Hero is harder: at 375px there is barely any width and the call-to-action must be a full-width, tappable target; at 1440px the same content must not look abandoned in a sea of whitespace. In this lab you rebuild the Hero mobile-first — stacked content on the phone, two columns from 768px, capped and centred from 1200px — drafting with AI, then verifying at the three target widths and fixing what you find.

## Step 1 — the prompt

```text
Context: Highland Hospital landing page. Tokens: teal #0f766e, dark teal #115e56, dark slate #0f172a, pale #0fdfa; system-ui font stack. The Hero sits above the services section and contains: an eyebrow "Highland Hospital", one h1 tagline, one supporting paragraph, a CTA "Book an appointment" linking to #booking, and a real photograph of the reception hall.

Requirement: HTML plus CSS for a responsive Hero correct at 375px, 768px and 1440px.

Constraints: mobile-first. At 375px everything stacks in one column, the CTA is full-width and comfortably tappable, the photo is a 4:3 rounded crop; from 768px text and photo sit side by side with the CTA back to auto width; from 1200px the two columns stop growing and the pair centres with more whitespace; the h1 uses clamp() with rem endpoints; the eyebrow is teal #0f766e; the section background is pale #0fdfa; only the standard breakpoints; the photo uses object-fit so it never distorts; no horizontal scroll at any width. Output code first, then a list of the three viewport states and how each was achieved.
```

## Step 2 — the code, mobile-first

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__content">
    <p class="hero__eyebrow">Highland Hospital</p>
    <h1 id="hero-title">Expert care, close to home</h1>
    <p class="hero__lede">Book an appointment online in under two minutes — or walk in and our team will help you today.</p>
    <a href="#booking" class="btn-cta">Book an appointment</a>
  </div>
  <img class="hero__photo" src="images/reception.jpg" alt="The light-filled reception hall at Highland Hospital">
</section>
```

```css
/* 1. Base = the phone design, finished, not provisional. */
.hero { display: grid; gap: 2rem; padding: 2.5rem 1.25rem; background: #f0fdfa; }

.hero__eyebrow { color: #0f766e; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

.hero h1 {
  color: #0f172a;
  font-size: clamp(2.25rem, 5vw + 1rem, 3.5rem); /* fluid type — Lesson 3 */
  line-height: 1.15;
  max-width: 14ch; /* the headline never grows into a wall of text */
}

.hero__lede { color: #0f172a; max-width: 40ch; }

.btn-cta {
  display: block; width: 100%; /* 375px: a full-width thumb */
  text-align: center;
  padding: 1em 1.5em; border-radius: 10px;
  background: #0f766e; color: #ffffff; font-weight: 600;
  text-decoration: none;
  transition: background-color 200ms ease, transform 200ms ease; /* Lesson 4 */
}

.btn-cta:hover { background: #115e56; transform: translateY(-2px); }

.hero__photo { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 1rem; }

/* 2. 768px — room for two columns. */
@media (min-width: 768px) {
  .hero { grid-template-columns: 1fr 1fr; align-items: center; padding: 4rem 2rem; }
  .hero__photo { aspect-ratio: 3 / 2; }
  .btn-cta { width: auto; } /* the thumb becomes a normal button again */
}

/* 3. 1200px — cap the measure, centre the pair, add air. */
@media (min-width: 1200px) {
  .hero { grid-template-columns: minmax(0, 40rem) minmax(0, 34rem); justify-content: center; padding: 6rem 2rem; }
}

/* Lesson 4: any entrance animation you add must stop for these users. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

`minmax(0, 40rem)` in the final query is the senior move: the text column caps at a readable measure and the photo at a matching width, so at 1440px the pair simply stops growing and stays centred — no stretched headline, no 2000px-wide photo.

## Step 3 — verify at three widths

1. **375px** (DevTools preset, or type the number): one column; CTA spans the content width with a comfortable tap target; the h1 sits at its clamp minimum and never clips; no horizontal scrollbar.
2. **768px**: two columns appear; photo becomes 3:2; CTA narrows to auto width; content vertically centred.
3. **1440px**: the pair is centred on the pale band and has stopped growing; the extra space comes from padding, not from stretched columns.
4. Hover the CTA at each width — smooth darkening and a 2px lift, nothing else moves. Then emulate `prefers-reduced-motion` in DevTools → Rendering and confirm all motion stops.

## Checklist

- [ ] 375px: single column, full-width CTA, unclipped `clamp()` headline, photo 4:3, no horizontal scroll
- [ ] 768px: two columns, CTA back to auto width, photo 3:2, content centred vertically
- [ ] 1440px: pair centred and capped — no column wider than its rem cap — with generous padding
- [ ] Colours only from the palette: teal #0f766e, dark slate #0f172a, pale #0fdfa
- [ ] Photo uses `aspect-ratio` + `object-fit: cover` — never distorted, never letterboxed
- [ ] Motion respects `prefers-reduced-motion`; hover animates only colors and `transform`
- [ ] You can explain each media query out loud: why 768px, why 1200px, why the `minmax` caps

## Practice

- Run the three-width pass above and fix every finding before moving on.
- Swap the Chapter 4 poster-style Hero for this structure and compare the two at 375px: the poster hero clips or squeezes somewhere; this one should not.
- Ask your AI assistant to review for overflow: "Find every element that could push the page wider than the viewport between 320 and 1440px." Fix what you agree with.

## What's next

Your hand-rolled responsive system now works — and in **Installing Bootstrap 5** you will meet the same 576 / 768 / 992 / 1200 breakpoints and fluid grid encoded as a library. Chapter 7 rebuilds the Highland Hospital landing page on Bootstrap's 12-column grid, so you can ship this Hero faster while keeping everything you just learned.
