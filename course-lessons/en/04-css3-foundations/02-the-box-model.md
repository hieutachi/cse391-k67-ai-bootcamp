# The Box Model

## Learning objectives
- Name the four layers of every element: content, padding, border and margin
- Apply `box-sizing: border-box` with a global reset and explain the difference it makes
- Diagnose odd layouts in DevTools — with AI as an explaining partner

## Every element is a box inside a box

Browsers render every element as a rectangular box with four layers, drawn from the inside out:

```
┌─────────────────────────── margin ───────────────────────────┐
│  ┌────────────────────── border ───────────────────────┐     │
│  │  ┌────────────────── padding ───────────────────┐   │     │
│  │  │  ┌──────────────── content ───────────────┐  │   │     │
│  │  │  │   "Book an appointment" (the button    │  │   │     │
│  │  │  │   text lives in the content area)      │  │   │     │
│  │  │  └────────────────────────────────────────┘  │   │     │
│  │  └──────────────────────────────────────────────┘   │     │
│  └─────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

- **content** — the text or image, sized by `width`/`height`.
- **padding** — breathing room *inside* the border; it pushes the content away from the box's edge and shows the background color.
- **border** — a visible (or invisible) rim around the padding.
- **margin** — space *outside* the border that separates this box from its neighbours; it is always transparent.

```css
.service-card {
  width: 320px;
  padding: 24px;      /* space between the text and the card's edge */
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin: 16px;       /* gap between one card and the next */
}
```

## The trap: which width is 320px?

Here is where beginners get ambushed. In the default `content-box` model, `width: 320px` sizes only the *content*. The real rendered width is 320 + 24 + 24 (padding) + 1 + 1 (border) = **370px**. Three cards on a 1024px row quietly overflow the container, and the browser horizontal-scrolls for no reason you can see. Fix the model once, globally:

```css
/* Global reset — the first CSS most projects write */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #1e293b;
}
```

With `border-box`, `width: 320px` means the whole box — content *and* padding *and* border — is 320px. The math becomes predictable, and that predictability is what makes layout thinking possible. Put this reset at the top of your stylesheet in every lab from now on.

## Margin collapse: vertical margins merge

Two stacked boxes — say two service cards — each declare `margin: 24px`. Beginner instinct says the gap is 48px. The browser says 24px: adjacent vertical margins *collapse* into the larger of the two. Horizontal margins never collapse, and padding or a border on either box stops the collapse. It is not a bug; it is a rule you exploit (uniform gaps without double spacing) and must know to explain weird spacing.

## Reading layouts with DevTools + AI

Every "why is this 20px too wide?" question is answered in the Elements panel: select any element and the **Computed** tab shows its actual box — content size, padding, border and margin, with the model drawn to scale. This is the single most reliable way to see the box model in action.

The workflow the course teaches: describe the symptom precisely, read the Computed values yourself, then ask AI to explain.

### Sample prompt — explain an odd layout

```text
Context: I am styling the Highland Hospital services section. Three service cards sit in a row, each 32% wide with padding of 20px and a 1px border, and I expected them to fit side by side — but the third card wraps onto a new line.

Requirement: explain what is happening to the total rendered width of each card, and give me the exact CSS change that makes the row fit.

Constraints: do not reduce the number of cards, do not use flexbox or grid, and do not change the percentage widths. Answer in 4 sentences: 1) why the third card wraps given the default box-sizing; 2) the calculated total width of one card; 3) the fix; 4) how box-sizing: border-box changes the calculation.
```

## Practice

- Add the global reset to a new `style.css` and link it from `index.html`.
- Create a `.service-card` with content, padding, border and margin, and place three of them in a row — then remove `box-sizing: border-box` and watch the third card wrap, exactly as the prompt describes.
- Select a card in DevTools and open the Computed tab. Mouse over the box diagram and verify each layer's pixel value by hand: content width + padding + border should equal the outer width you set.

## What's next

In **Color, Typography & CSS Variables**, we give Highland Hospital a visual identity — a teal medical palette and type scale held in CSS Custom Properties, so the whole site restyles from a single `:root`.
