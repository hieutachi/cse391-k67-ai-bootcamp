# Bonus — Lab: From Figma to Bootstrap in one session

## Learning objectives
- Run the two standard prompts (design analysis → Bootstrap code) as one seamless workflow
- Grade the quality of both your prompts and the AI's code
- Ship one complete Highland Hospital section from design to working HTML

## The task

Pick **one** of these homepage sections:

1. **Hero** — gradient or photo background, big heading, description, two CTA buttons.
2. **Services** — 6 service cards with icon, title, description.
3. **Testimonials** — 3 patient reviews (photo, name, stars, quote).

Use a real Figma design if you have one; otherwise write a detailed spec yourself (you may ask AI to help draft the description first).

## The 5-step workflow

### Step 1 — Analyse (standard prompt from lesson 01)
Paste the screenshot/description plus the 5-section analysis prompt. **Check** column counts, spacing and states; correct whatever AI guessed wrong.

### Step 2 — Generate (standard prompt from lesson 02)
Paste the corrected spec plus the Bootstrap code-generation prompt. Receive the section HTML.

### Step 3 — Analyse the code (workflow step 3)
For every line you received, be able to answer:
- Why `col-md-6` and not `col-6`? *(two cramped columns on a narrow phone)*
- Why `h-100` on the card? *(equal heights when content lengths differ)*
- Why is the primary CTA an `<a>` to booking.html and not a `<button>`? *(it navigates)*
- Spot an unfamiliar class? Ask AI to explain it before you keep it.

### Step 4 — Refine
Check 375px/768px/1440px in the Device Toolbar. List at most **3** priority issues and ask AI to fix each with a targeted prompt — never "fix everything".

### Step 5 — Save your winning prompts
Append the final working prompt to `templates/prompt-templates.md` (or your notes). This is the asset you keep after the course.

## Grading your prompt

| Criterion | Ask yourself |
|---|---|
| Context | Does it name Highland Hospital + the stack (Bootstrap 5.3, Vietnamese UI)? |
| Specificity | Does it give design tokens / column counts / breakpoints / states instead of letting AI guess? |
| Constraints | Does it ban custom CSS and inline styles, and demand semantic tags + correct heading levels? |
| Output format | Does it request "return only the section HTML, no explanations"? |
| Fix loop | When wrong, do you ask for a targeted fix rather than a full rewrite? |

Answer "no" to two or more, and rewriting the prompt is your fastest learning moment — do it and rerun.

## Grading the AI's code

The output passes when:
- No inline styles and no throwaway custom CSS (except clearly-reasoned `CUSTOM` marks).
- The grid is mobile-first with the right breakpoints; cards use `h-100`; images have `alt`.
- Heading levels are correct; CTAs use `<a>` or `<button>` for the right role.
- In Live Server it matches the design at all three widths with no horizontal overflow.

## If you get stuck

- **Output is far off** → go back to Step 1: your spec is not specific enough. Add column counts, spacing and states before blaming the AI.
- **Don't know a Bootstrap class** → ask with context: "I need [describe it]; which Bootstrap 5 class fits? Give two options with examples."
- **Runs but looks wrong** → don't edit blindly. Screenshot it and ask: "Compared with the spec, what is off? Make the smallest change to match."

## Module wrap-up

You just ran a complete **Figma-to-Bootstrap session** using the course's four-step workflow: Define (analysis) → Draft (code generation) → Analyze (read every line) → Refine (targeted fixes). Repeat it section by section and you can slice the whole Highland Hospital homepage quickly while still understanding every line — that is how a senior frontend developer works with AI.
