# Lab: a semantic landing page

## Learning objectives
- Generate the full Highland Hospital homepage skeleton with a single, well-specified prompt
- Read and annotate AI-produced HTML with your own comments until you understand every line
- Verify structure, semantics, headings and forms against a checklist

## The lab in one paragraph

This lesson is the chapter's exam — and it reverses the usual order. You write a precise prompt, the AI drafts the homepage, and then your real work begins: you read the result slowly, annotate it with your own `<!-- -->` comments, fix what the AI got wrong, and verify it against a checklist. Per the course workflow, never commit AI output you have not read line by line. Understanding beats generation.

## Step 1 — draft with a precise prompt

**Context** gives the AI the project and page. **Requirement** names the deliverable and every section. **Constraints** stop the AI from inventing copy, CSS or structure you do not want:

```text
Context: I am building the Highland Hospital landing page, an English website for a general hospital. The page will later be styled with CSS and Bootstrap.

Requirement: produce the complete HTML5 document for the homepage, containing: header with phone bar and nav (Services, Doctors, Book an appointment); a hero section (#hero) with one h1 and a short tagline; a services section (#services) with four articles (General medicine, Cardiology, Paediatrics, Emergency); a doctors section (#doctors) with an unordered list of three doctors (name, specialty, one sentence each — you may invent these); an aside with visiting hours; a booking section (#booking) whose form has full name, email, phone, preferred date, specialty select and a consent checkbox; a footer with contact details and copyright.

Constraints: only HTML5 — no CSS classes, inline styles, CSS files or JavaScript; use semantic tags (header, nav, main, section, article, aside, footer); one h1 only; every form input paired with a label using for/id; correct lang and meta description. Output only the code.
```

Read the output the moment it arrives — do not copy it anywhere yet. You are looking for two things: is every requested section present, and does anything look like invented filler the design never asked for?

## Step 2 — read and annotate every line

Annotation is the habit that turns AI output into understanding. Open the result in your editor and add your own `<!-- -->` comments above each region, in your own words. The act of writing them forces you to notice structure:

```html
<!-- Page header: contact bar + primary navigation, repeated on every page -->
<header>
  <p>Open 24/7 · Emergency: (099) 123-4567</p>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="#services">Services</a></li>
      <li><a href="#doctors">Doctors</a></li>
      <li><a href="#booking">Book an appointment</a></li>
    </ul>
  </nav>
</header>

<main>
  <!-- Hero: the first thing visitors see; exactly one h1 lives here -->
  <section id="hero">
    <h1>Highland Hospital — expert care, close to home</h1>
    <p>Modern medicine with the warmth of a community hospital.</p>
    <a href="#booking">Book an appointment</a>
  </section>

  <!-- Services: 4 self-contained cards, each an <article> with an h3 -->
  <section id="services" aria-labelledby="services-heading">
    <h2 id="services-heading">Our services</h2>
    <!-- article x4 … -->
  </section>
</main>

<footer>
  <!-- Global footer: address + copyright, on every page of the site -->
</footer>
```

While you read, keep asking the chapter's questions: *which regions are semantic tags, and what does each promise? Is there exactly one `<h1>` and does the outline descend without gaps? Does every label have a matching `id`?* Every answer you can state out loud is a skill banked.

## Step 3 — fix what AI got wrong

AI drafts are rarely perfect. Expect at least one of these and fix it yourself:

- **Heading jumps** — a section styled as a subtitle sneaks in as `<h4>` under an `<h2>`. Re-rank it to `<h3>` or an honest lower level.
- **Placeholder copy** — the AI invents an inspiring slogan. Replace it with real Highland Hospital copy you wrote.
- **Missing semantics** — a `<div class="service">` instead of `<article>`, or a `<p>` masquerading as a heading. The prompt demanded semantics — enforce them.
- **Over-engineering** — unnecessary wrapper divs, unused classes or an extra section the design does not have. Delete it.

Use the checklist below as your acceptance test, then run a validator (validator.w3.org) as a second opinion.

## Checklist

- [ ] `<!DOCTYPE html>` is the first line; `<html lang="en">` present
- [ ] `<head>` contains charset, viewport, title and meta description
- [ ] Header, nav, main, section, article, aside and footer used for real regions, in one logical order
- [ ] Exactly one `<h1>`; heading levels descend without skipping; sections have descriptive headings
- [ ] Every form control has a `<label>` connected by `for`/`id`; essential fields are `required`
- [ ] Images carry descriptive `alt` (or `alt=""` when decorative) and explicit `width`/`height`
- [ ] No layout `<table>`; no `<div>` where a semantic tag fits; no leftover CSS or JS
- [ ] Every AI-invented section, class and phrase has been read, understood and justified — or removed

## Practice

- Complete the three steps: prompt → annotate → fix, then save the file as `index.html` in your `highland-hospital/` folder.
- Swap code with another learner (or your AI assistant playing reviewer): exchange pages and find three structural problems in each other's HTML using only the checklist.
- Delete the heading level of one `h2` region and run a heading-outline browser extension to see how quickly the document outline degrades — then restore it.

## What's next

In **CSS Selectors & Specificity**, we stop describing the page and start styling it: you will learn to aim CSS at exactly the right elements and to predict which rule wins when two of them conflict.
