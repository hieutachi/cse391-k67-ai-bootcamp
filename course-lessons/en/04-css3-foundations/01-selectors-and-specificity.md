# CSS Selectors & Specificity

## Learning objectives
- Aim CSS at the right elements with element, class, id, attribute and combinators
- Use pseudo-classes such as `:hover`, `:focus` and `:first-child` for states and positions
- Calculate specificity and explain why a blanket `!important` is a code smell

## Selectors: the targeting language

CSS is a list of rules, and every rule begins with "apply this to…". A selector you understand precisely keeps your stylesheet small — you style the right elements instead of compensating with extra rules later.

```css
/* element selector — every <a> in the whole page */
a { color: teal; }

/* class selector — every element carrying class="btn" */
.btn { font-weight: 600; }

/* id selector — the single element with id="hero" */
#hero { padding: 4rem 2rem; }

/* attribute selector — external links (href starting with http) */
a[href^="http"] { text-decoration: none; }

/* descendant combinator — .btn elements inside <header> only */
header .btn { padding: 0.75rem 1.5rem; }

/* child combinator — list items that are DIRECT children of the nav list */
nav > ul > li { display: inline-block; }

/* group selector — one rule, several targets */
h1, h2, h3 { font-family: var(--font-heading); }
```

Prefer **classes** for anything reusable — a button style, a card — because a class can appear many times. Reserve **ids** for one-of-a-kind regions such as `#hero`, and use them sparingly for styling: their high specificity makes them hard to override later.

## Pseudo-classes: states and positions

A pseudo-class selects an element in a particular *state* or *position*, not by name:

```css
.btn:hover { background-color: #115e56; }           /* mouse pointing at the button */
.nav-link:focus-visible { outline: 3px solid #0f766e; outline-offset: 2px; }  /* keyboard tab */
.doctor-card:first-child { border-left: 4px solid #0f766e; }  /* first card of the grid */
tbody tr:nth-child(even) { background-color: #f8fafc; }       /* zebra-striped price table */
```

`:hover` is mouse-only. `:focus` fires on click *or* Tab; `:focus-visible` fires only for keyboard navigation, so you can show the outline without flashing it at every click. Removing `outline: none` from focus styles is a classic accessibility bug in generated code — when you see it in AI output, delete it.

## Specificity: which rule wins?

When two rules target the same property of the same element, the browser applies the higher specificity. Score each selector in four columns — **inline styles, ids, classes/attributes/pseudo-classes, elements/pseudo-elements** — and compare left to right:

```css
.btn { background-color: #0f766e; }        /* 0-0-1-0 (one class) */
.navbar .btn { background-color: #134e4a; } /* 0-0-2-0 — wins over the line above */
#cta-btn { background-color: #b91c1c; }     /* 0-1-0-0 — one id beats any class count */
```

An id always beats classes, no matter how many. Two rules of equal specificity fall back to source order — the later one wins. When a tie is unclear, score the selector at [specificity.keegan.st](https://specificity.keegan.st/) or ask your AI assistant.

## Why you should avoid `!important`

`!important` overrides the specificity system entirely. Rarely — say, to beat an unstoppable third-party widget — it is a tool. As a habit it inverts the cascade: your future rules need their own `!important` to win, and soon every declaration is shouting. If you need `!important` to fight your own stylesheet, the real fix is a more specific selector or a flatter structure, not a louder one.

### Sample prompt — pick the right selectors

```text
Context: I am styling the Highland Hospital landing page. The nav has a teal background, the hero has a dark overlay, and the price table should alternate row colors.

Requirement: write the CSS selectors and declarations for these targets:
1) every link inside the <nav> becomes white text, no underline;
2) the first service card in the #services section gets a teal left border;
3) a footer link pointing to another website (href starting with http) is styled as external, no underline;
4) table rows alternate white / #f8fafc without styling the header row.

Constraints: classes and structural pseudo-classes only — no ids, no !important, no inline styles; give links a visible teal :focus-visible outline. For each rule, state its specificity in 0-0-0-0 format and justify the selector choice in one sentence.
```

## Practice

- Style your section headings with an element selector, the nav links with a class, and the submit button with a `.btn` class — then check all three in the browser.
- Add `:hover` and `:focus-visible` styles to the nav links and walk the page with Tab: you should see a visible outline at every stop.
- In DevTools Elements, select the first service card and open the Styles tab: every matching rule is listed with its specificity, losers struck out. Ask your AI assistant to explain any winner you did not expect.

## What's next

In **The Box Model**, we look inside every element — content, padding, border and margin — and learn why the same CSS can look broken until you flip on `box-sizing: border-box`.
