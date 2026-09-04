# Transitions & Animations

## Learning objectives
- Declare a transition (property, duration, timing function) and predict exactly which changes animate
- Lift buttons and doctor cards with `transform` and shadow on hover — without moving the layout
- Write a `@keyframes` animation and honour `prefers-reduced-motion`

## transition: animate the change between two states

A transition needs two ingredients: a state change (a `:hover`, a class toggled by JavaScript, a media query flipping a value) and a `transition` declaration on the base rule.

```css
.btn-cta {
  background-color: #0f766e;
  transition: background-color 200ms ease, transform 200ms ease;
}

.btn-cta:hover {
  background-color: #115e56;
  transform: translateY(-2px);
}
```

The shorthand order is `property duration timing-function`, repeated per property with commas. Resist `transition: all` — it animates properties you never intended to move and asks the browser to watch everything. Keep hovers between 150ms and 300ms; anything slower feels laggy.

Timing functions in one line each: `ease` (default) starts and ends gently; `linear` moves at a constant rate — mechanical, good for loops; `ease-out` starts fast and decelerates — the standard for buttons; `ease-in` accelerates — the standard for things leaving; `cubic-bezier(...)` is a hand-tuned curve when the presets are not enough.

## transform: movement without reflow

The hover above used `translateY`, not `top` or `margin-top`. `transform` and `opacity` are handled by the compositor, while animating `width`, `height`, `top` or `margin` forces the browser to re-layout the whole subtree on every frame — visible jank on phones. Rule of thumb: animate `transform`, `opacity`, `box-shadow` and colors; never layout geometry.

The classic card pattern — lift, shadow, and a photo that zooms inside its frame:

```css
.doctor-card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.doctor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
}

.doctor-card__media { overflow: hidden; border-radius: 12px 12px 0 0; }
.doctor-card__media img { transition: transform 300ms ease; }
.doctor-card:hover .doctor-card__media img { transform: scale(1.05); }
```

`overflow: hidden` on the media box creates the window that crops the growing photo. Two cautions: hovers are a desktop affordance — on touch the first tap just triggers the hover state, so keep the real action on the link — and keyboard users need a visible `:focus-visible` ring, never only a hover cue.

## @keyframes: animation that runs on its own

Transitions answer an interaction. Animations run on a timeline whether the user does anything or not:

```css
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0.45); }
  70%  { box-shadow: 0 0 0 14px rgba(15, 118, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0); }
}

.availability-badge {
  animation: pulse-ring 2s ease-out infinite;
}
```

Percentage stops are frames on the timeline; `from` and `to` are shorthand for 0% and 100%. The shorthand reads `animation: name duration timing-function iteration-count`. The badge above draws an expanding teal ring so the "open now" signal is visible from across the waiting room.

## prefers-reduced-motion: respect the visitor

Many people set their operating system to reduce motion, because motion can trigger vestibular disorders. CSS can listen for that preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Treat motion as an enhancement, never as content. Wrap decorative animations behind this guard and keep functional feedback (a pressed button state, a focus ring) intact.

## Sample prompt — motion for the Highland landing page

```text
Context: Highland Hospital landing page (teal #0f766e, dark slate #0f172a, pale #f0fdfa). The hero contains a "Book an appointment" CTA linking to #booking; below it, a grid of doctor cards, each with a photo and the doctor's name.

Requirement: CSS for three motion patterns: CTA hover, card hover, and one entrance animation for the hero text.

Constraints: CTA hover darkens the background from #0f766e to #115e56 and lifts 2px, 200ms ease-out; card hover lifts 4px with a soft shadow while the inner photo scales to 1.05 and nothing else moves; hero text fades in and rises 12px once, 500ms ease-out; every animation and transition must be disabled under prefers-reduced-motion; animate only transform, opacity, box-shadow and background-color; output CSS with comments.
```

## Practice

- Implement the three patterns and verify in DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce": nothing should animate.
- Try animating `margin-top` instead of `transform` on the card hover and compare smoothness on a phone profile — that is the reflow cost made visible.
- Ask your AI assistant for a senior review: "Find three ways this motion could hurt UX or accessibility." Fix what you agree with.

## What's next

In **Lab: a responsive Hero** you assemble everything from this chapter — media queries, mobile-first ordering, fluid type and motion — into the one component that has to be right on every screen.
