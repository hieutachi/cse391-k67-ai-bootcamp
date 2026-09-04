# Prompts for HTML & CSS

## Learning objectives
- Ask for semantic HTML with the exact structure you want
- Pass spacing and colour as real numbers: rem, hex codes, tokens
- Block the three places AI invents most: spacing, fonts and class names

## AI invents spacing and colour first

AI cannot see your screen. When you ask for something "nicer", a padding of `80px` and a padding of `8px` are equally valid to it. So the first rule for HTML and CSS prompts is: **wherever you do not say the number, the AI decides it** — and you will be fixing that later. Speak in numbers.

## The Highland Hospital design tokens

So every prompt and every section agree, the course uses one shared set of tokens (chapter 4 shows how to declare them as CSS variables):

| Token | Value | Use for |
|---|---|---|
| `hh-teal` | `#0f766e` | primary buttons, accents, links — medical blue-green |
| `hh-teal-dark` | `#134e4a` | hover states, footer |
| `hh-bg-soft` | `#f0fdfa` | alternating section backgrounds |
| `hh-slate` | `#0f172a` | headings |
| `hh-gray` | `#475569` | body text — muted |
| `hh-border` | `#e2e8f0` | borders and hairlines |
| Spacing rhythm | multiples of `0.5rem` | padding, gaps, margins |

In your prompts, name both the token *and* its hex value. If the brand changes later, you fix one place instead of every prompt.

## How to ask for semantic HTML

Do not say "a block with a picture". Name the structure and the meaning of each region:

- Name the exact tags: `section`, `article`, `figure`, and `ul/li` for repeating groups.
- Ask for meaningful, consistent class names — this course uses the `hh-` prefix: `hh-doctor-card`, `hh-btn-primary`.
- When you need full control, add *"do not add any element beyond the ones I listed"* — AI is generous and will cheerfully insert content you never asked for.

## Sample prompt: a Hero section

```text
Context: Highland Hospital landing page (hospital website with online
booking), plain HTML5 + CSS, no framework.
Task: build the hero — a headline, one short supporting sentence, a
primary button "Book an appointment" linking to booking.html, and an
illustrative image.
Constraints: semantic HTML (section > div > h1/p/a); classes prefixed
hh-; no Bootstrap; no content beyond what I describe.
Data: white background; headline #0f172a (hh-slate); body #475569
(hh-gray); primary button background #0f766e (hh-teal), white text,
8px radius, padding 0.75rem 1.5rem; hero padding 4rem 0; spacing
between hero blocks in multiples of 1rem.
Output: HTML first, then CSS, in two separate code blocks, brief
explanation only.
```

A correct result resembles this — read every line before using it:

```html
<section class="hh-hero">
  <div class="hh-hero__content">
    <h1>Proactive healthcare, close to home</h1>
    <p>Experienced specialists and appointments booked in under two minutes.</p>
    <a class="hh-btn hh-btn--primary" href="booking.html">Book an appointment</a>
  </div>
  <figure class="hh-hero__media">
    <img src="assets/images/hero-doctor.jpg"
         alt="A Highland doctor consulting with a patient"
         width="640" height="420">
  </figure>
</section>
```

Note the buttons: actions that navigate to another page are `<a>` tags styled as buttons. A `<button>` element is reserved for in-page actions such as opening a modal or submitting a form.

## Blocking invented spacing inside the prompt

Append whichever constraint fits the moment:

- "Use rem only; every spacing value is a multiple of 0.5rem."
- "Do not add margin or padding to anything I did not ask about."
- "Do not add a custom font-family; keep the system font stack."

## Practice

Rewrite the hero prompt above in your own words, but for the **Services section**: six services (General Checkup, Cardiology, Pediatrics, Lab Testing, Imaging, Rehabilitation) in a three-column grid, each cell with an icon, a name and a one-line description. Run the prompt, then open the browser: are the column gaps even, as you asked? Did the AI add a seventh service?

## What's next

Structure and visuals are under control — behaviour is next: prompts for JavaScript, where the failure mode is not styling but data shapes that do not match yours.
