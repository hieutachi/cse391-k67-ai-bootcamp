# Fluid images & typography

## Learning objectives
- Keep every image inside its container with `max-width: 100%` and `height: auto`
- Crop images predictably with `object-fit` and `object-position` so doctor photos never distort
- Replace fixed heading sizes with `clamp()` so display type scales smoothly between breakpoints

## The overflowing image

An `<img>` is stubborn about its intrinsic size: a photo captured at 1600px wide demands 1600px even when its column is 375px, producing a horizontal scrollbar and pushed-aside content. Two declarations fix that for the entire site:

```css
img {
  max-width: 100%;
  height: auto;
}
```

`max-width: 100%` means "never wider than the parent" — the image shrinks with its column on every screen. `height: auto` preserves the aspect ratio, so nothing is squeezed. Put this rule once, on the global `img` selector, next to your reset; each layout then only decides how wide its images may be. Prefer `max-width` over `width: 100%`: the first caps, the second forces, and a cap is the safer default.

## object-fit: photos that must fit a box

Capping width is not enough for the doctor-card grid: every portrait must be exactly 4:3, whatever the source file, and never distorted.

```css
.doctor-card__photo {
  width: 100%;
  aspect-ratio: 4 / 3;          /* the box keeps its shape at every width */
  object-fit: cover;            /* fill the box, crop the overflow */
  object-position: top center;  /* keep faces in frame */
}
```

- `object-fit: cover` scales the image until the box is filled and crops whatever does not fit — the value you will use almost always.
- `object-fit: contain` shows the whole image, letterboxed — right for logos and screenshots.
- `object-position` chooses which part of the crop stays visible; headshots need `top center`, or the default centre crop slices off faces.
- Background images tell the same story with `background-size: cover` and `background-position`.

Prefer `aspect-ratio` plus `object-fit` over fixed pixel heights: the box reshapes itself as the column width changes, so no media query is needed to "fix" the crop on a phone.

## Fluid type with clamp()

Breakpoint typography — h1 is 2rem under 768px, 3rem above — moves in discrete jumps. `clamp()` scales continuously between a floor and a ceiling:

```css
.hero h1 {
  font-size: clamp(2.25rem, 5vw + 1rem, 4rem);
}
```

Read the three arguments as MIN, PREFERRED, MAX. The middle term, `5vw + 1rem`, grows with the viewport; the result can never drop below 2.25rem (≈36px) nor exceed 4rem (≈64px). Between those walls the headline scales smoothly at every width — most type media queries simply disappear.

Rules of thumb:

- Use `clamp()` for display headings — the `vw` term is the fluid part.
- Keep the min and max in `rem` and mix `+ 1rem` into the middle term so the formula honours the user's font-size preference instead of racing to a fixed pixel value.
- Leave body text in `rem` with a measure around 40–60 characters: a paragraph should not swell because the monitor is wide.

## Sample prompt — fluid images and type

```text
Context: Highland Hospital landing page. The "Meet our doctors" grid shows eight cards, each with an <img> portrait plus the doctor's name and specialty; the hero carries the h1 "Expert care, close to home". Palette: teal #0f766e, dark slate #0f172a, light #f0fdfa.

Requirement: CSS so (1) no image ever overflows its card between 320px and 1920px, (2) every portrait renders as a uniform 4:3 crop that never distorts and keeps faces visible, (3) the hero h1 scales fluidly from small phone to wide monitor.

Constraints: a global img rule with max-width and height:auto; aspect-ratio, object-fit:cover and object-position for the portraits (explain each choice); clamp() with rem-based min/max and a vw middle term for the h1; body copy stays in rem; no media queries and no fixed pixel heights; output CSS with one comment per decision.
```

## Practice

- Add the global `img` rule and re-check your doctor grid at 375px and 1440px: images follow the column and nothing overflows.
- Put a real headshot in a 4:3 card with `object-position: top center`, then swap to `center` and `bottom` — see where faces get clipped.
- Resize the window slowly and watch the h1's computed font-size in DevTools: it moves continuously, then freezes at its clamp walls. Temporarily set a fixed `3rem` and feel the difference.
- Ask your AI assistant which `clamp()` values would keep the same headline between 320px and 1920px with no media queries — then verify its maths at both ends.

## What's next

In **Transitions & Animations** the layout finally stops changing shape, and you add motion: smooth hover states on Highland's buttons and doctor cards, plus keyframe animations that respect users who ask for less movement.
