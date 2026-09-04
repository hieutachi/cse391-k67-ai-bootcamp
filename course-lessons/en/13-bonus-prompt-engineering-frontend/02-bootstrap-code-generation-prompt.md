# Bonus — Generating Bootstrap 5 code from a Figma spec

## Learning objectives
- Turn a design spec into usable Bootstrap 5 code with one standard prompt
- Enforce the constraints that stop AI from inventing its own system (tokens, grid, semantics)
- Tell apart a prompt that produces good code from one that produces code needing heavy edits

## From spec to code

In the previous lesson you produced a five-part spec. This lesson shows how to feed that spec into a code-generation prompt whose constraints keep the AI honest.

## The standard Bootstrap code-generation prompt

```text
You are a Senior Frontend Developer. Using the SPEC below, generate complete HTML
for one section with Bootstrap 5.3 (CDN). Follow these rules strictly:

1. SEMANTICS: pick the right tag for each role (section/article/header/footer...);
   keep heading levels correct (h2 for the section, h3 for cards inside it).
2. GRID: container → row → col; mobile-first: col-12 by default, then col-md-*, col-lg-*;
   use g-* gutters; no inline styles.
3. DESIGN TOKENS: colours from --hh-primary #0f766e, --hh-dark #0f172a,
   --hh-light #f0fdfa, --hh-border #e2e8f0, --hh-muted #475569; apply them with
   Bootstrap classes (text-*, bg-*, border-*) or CSS variables only when necessary.
4. NO CUSTOM CSS: if an override is unavoidable, mark it with a "CUSTOM" comment
   and one line explaining why.
5. STATES: cover hover/focus/disabled; inputs get is-invalid + invalid-feedback.
6. CONTENT: use realistic Vietnamese sample content for a hospital; images use
   https://placehold.co/600x400/0f766e/white?text=... placeholders with descriptive alt text.
7. OUTPUT: return only the section's HTML with HTML comments marking each block;
   no explanations, no surrounding prose.

SPEC:
[paste the 5-section analysis from lesson 01, or your own detailed section description]
```

## Example: generating the Doctors section

Spec: *"Doctors section on --hh-light background. Four columns on desktop; each card has photo, name, specialty, experience badge and a full-width Book button. On hover the card lifts slightly and the button darkens."*

Paste the standard prompt plus that spec, and AI typically returns:

```html
<!-- ===== DOCTORS SECTION ===== -->
<section class="py-5 bg-light" id="doctors">
  <div class="container">
    <h2 class="text-center mb-4">Our doctors</h2>
    <div class="row g-4">
      <!-- Doctor card -->
      <div class="col-12 col-md-6 col-xl-3">
        <article class="card h-100 shadow-sm border-0">
          <img src="https://placehold.co/600x400/0f766e/white?text=Dr.+Nguyen+Van+An" class="card-img-top" alt="Dr. Nguyen Van An">
          <div class="card-body text-center">
            <h3 class="h5 card-title">Dr. Nguyen Van An</h3>
            <p class="card-text text-muted mb-2">Internal medicine</p>
            <span class="badge text-bg-primary mb-3">12 years experience</span>
            <div class="d-grid">
              <a href="booking.html" class="btn btn-primary">Book now</a>
            </div>
          </div>
        </article>
      </div>
      <!-- ...repeat for the other doctors... -->
    </div>
  </div>
</section>
```

### The four things to check in that output

1. **Column count**: a 4-column row needs `col-xl-3` or `col-lg-3` (12 ÷ 4). If AI returned `col-lg-4` that is 3 columns — wrong.
2. **`h-100`**: present on the card so every card matches the tallest one even when names differ in length.
3. **`d-grid`**: wraps the button to make it full-width without custom CSS.
4. **`text-bg-primary` badge**: the utility guarantees contrast — don't hand-recolour it.

If any of the four is missing, don't hand-edit yet — ask for a targeted fix (the Refine step):

```text
Keep the whole structure. Fix two things: (1) the card row must be exactly 4 columns
on desktop, so use col-xl-3; (2) add h-100 to the card and d-grid around the Book button.
Return only the corrected part.
```

## Practice

1. Take the spec you wrote in lesson 01 (or write a 3-sentence spec for any section).
2. Paste the standard prompt plus your spec into your AI tool and receive the HTML.
3. Check the output against the four points above; if something is off, ask for a targeted fix instead of a rewrite.
4. Paste the HTML into a page that already loads the Bootstrap CDN and view it at 375px/768px/1440px in Live Server.

## What's next

The module's final lesson is a full lab: slice a complete page section from design to working HTML using only the two standard prompts, with checklists to grade both your prompt and the AI's output.
