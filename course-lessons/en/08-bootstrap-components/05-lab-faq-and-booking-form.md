# Lab: FAQ & a static booking form

## Learning objectives
- Combine the FAQ accordion and the validated booking form into one real `booking.html` page
- Structure the page for a later JavaScript upgrade: distinct ids, no logic in markup yet
- Review AI output the way a senior would: structure first, then classes, then wording

## The brief

Highland Hospital needs `booking.html` — the page the whole site's "Book appointment" buttons point to. It must contain: a short page header, the booking form from Bootstrap Forms & Validation (name, email, phone, date, specialty), and a four-item FAQ accordion (insurance, walk-ins, parking, rescheduling) from Modal, Offcanvas & Accordion. This is the *static* version: submitting the form will not send or save anything yet — real submission arrives with JavaScript in Chapter 11. What matters now is correct structure, correct classes, and markup that will not need rewriting later.

## Step 1 — Decide the page structure

Layout judgment first, then code. A two-column arrangement suits the content: the form is the primary action, so it takes the wider column; the FAQ sits beside it as support. But on phones the FAQ must drop *below* the form — long forms should never be pushed out of sight. That maps to `col-lg-7` (form) + `col-lg-5` (FAQ) inside one `row g-5`.

Each field already carries an `id` (`#name`, `#email`, `#phone`, `#date`, `#specialty`) — keep them, because Chapter 10's JavaScript will read exactly those ids. No inline `onsubmit`, no stray scripts: a static page must stay static until you add behavior deliberately.

## Step 2 — Draft with AI

```text
Create booking.html for Highland Hospital with Bootstrap 5.3 (CSS and JS bundle
via CDN, plus the Bootstrap Icons CDN). One <main class="container py-5"> with:
(1) a page header — display-6 title and a one-line lead; (2) a two-column row:
the booking form in col-lg-7 and a 4-item FAQ accordion in col-lg-5; the form
has name, email, phone (+84 prefix via input-group), preferred date, a
specialty form-select, and a submit button, all fields required with
needs-validation/novalidate and an invalid-feedback message under each;
(3) the FAQ uses the accordion with data-bs-parent, first item open. Realistic
placeholder copy for a hospital — ask me before inventing any factual claim
about insurance or pricing. Give every form control a stable id and do not add
any JavaScript of your own.
```

Compare this prompt with the earlier labs: it names the page, the sections, the exact column split, the form fields and their validation mode, the accordion behavior — and it tells the AI where its authority ends (the insurance facts). That last clause is the difference between a believable hospital FAQ and invented policy.

## Step 3 — Analyze the AI's output

Walk the generated page top to bottom and check it like a reviewer:

- **The two-column wrap** — is the row `g-5` so the columns never touch? Do the columns collapse in the right order (`col-lg-7` then `col-lg-5`, not two half-widths)?
- **The form** — every control has `form-label` + id + `required`, each sits in `col-md-6` where the field is short (name, email, phone, date) and `col-12` where it is wide (the specialty select and the button row). Is the submit button a full-width block on mobile? That is fine — but on desktop a right-aligned button (`d-flex justify-content-end`) usually reads better. Adjust if the AI chose otherwise.
- **The FAQ** — accordion items use `accordion-button`, `data-bs-toggle="collapse"` matches each `data-bs-target`, every body carries `data-bs-parent="#faqAccordion"`, and exactly one item has `show`. Click through each question in the browser.
- **No surprises** — no custom CSS file, no inline styles, no `<script>` of its own, and the `bootstrap.bundle.min.js` script tag is present at the end of `<body>` (the accordion and the validation both depend on it).

If any link or id is mismatched, fix the mismatch yourself and note *why* — that note is the lesson.

## The essential page skeleton

Whatever the AI returns, the load-bearing structure is this:

```html
<main class="container py-5">
  <header class="mb-5 text-center">
    <h1 class="display-6 fw-bold">Book an appointment</h1>
    <p class="lead text-body-secondary mx-auto" style="max-width: 560px;">
      Tell us when you would like to visit and which specialty you need.
    </p>
  </header>

  <div class="row g-5">
    <div class="col-lg-7">
      <form class="row g-3 needs-validation" novalidate> … </form>
    </div>

    <aside class="col-lg-5">
      <h2 class="h5 mb-3">Frequently asked questions</h2>
      <div class="accordion" id="faqAccordion"> … </div>
    </aside>
  </div>
</main>
```

The FAQ is genuinely auxiliary content, so it is an `<aside>` inside the grid — semantic HTML from Chapter 3 still applies inside Bootstrap. The header uses the display-6 and lead utilities from Spacing, Color & Typography utilities. Nothing here is throwaway: Chapter 11 will attach the submit handler to this exact `<form>` and read these exact field ids.

## Sample prompt — when reviewing feels overwhelming

```text
Review this booking.html page (paste it). List only the issues that would
matter to a real user or to the next developer: broken ids or data-bs-target
links, missing required attributes, accordion items that do not collapse, and
form fields without labels. Rank the issues by severity and skip cosmetic
opinions.
```

Run that review, then fix the top issues yourself — never paste fixes back blindly.

## Practice

1. Produce `booking.html` with the prompt above, then walk the Analyze checklist and fix at least two things the AI got wrong.
2. Click every FAQ item and confirm only one panel is open at a time; then submit the empty form and confirm every field shows its `invalid-feedback`.
3. Ask an AI chat to explain what would need to change to make the form *actually submit* (look ahead to Chapter 11 — Fetch and events), and summarize the answer in your own words.

## What's next

You have now built real screens with Bootstrap components — next chapter switches languages, starting with let/const & Template Literals, where JavaScript turns these static pages interactive.
