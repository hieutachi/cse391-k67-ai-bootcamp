# Standard web document structure

## Learning objectives
- Recognise the four parts every HTML document must have: `<!DOCTYPE html>`, `<html lang>`, `<head>` and `<body>`
- Explain what each head tag does — charset, viewport, title and description
- Write a minimal, valid HTML5 document for the Highland Hospital landing page

## Why the skeleton comes first

Before a browser paints a single pixel it has to answer four questions: *Is this file HTML? What language is it written in? What metadata should I read? Where does the visible content start?* Your answers live in a fixed arrangement of tags that is identical for a blog post, a dashboard or a hospital homepage. Get this part right once, and every page of the project starts from the same clean base.

## The skeleton every page shares

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Highland Hospital | Expert care, close to home</title>
  <meta name="description" content="Highland Hospital offers specialist care, 24/7 emergency services and online appointment booking. Book a visit with our doctors today.">
</head>
<body>
  <!-- Everything the visitor sees will be written here -->
</body>
</html>
```

Reading it top to bottom:

- `<!DOCTYPE html>` — not an HTML tag but an instruction that switches the browser into standards mode instead of the quirks mode of the 1990s. It must be the very first thing in the file, with nothing before it.
- `<html lang="en">` — declares the document language. Screen readers pick the correct pronunciation profile, translation tools detect the language, and search engines stop guessing.
- `<head>` — holds metadata, none of which is drawn on screen.
- `<body>` — the only part the visitor ever sees.

## What the head tags do

- `<meta charset="UTF-8">` — declares the text encoding. UTF-8 covers every alphabet and symbol, so it should be the first child of `<head>`.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — the tag that makes responsive design possible. Without it, a phone browser assumes your page is about 980px wide, renders it at that desktop width and shrinks the result, leaving your Hero text unreadably tiny. With it, the layout matches the device's real width at 100% zoom.
- `<title>` — the browser tab text and the clickable headline in search results. Keep it under roughly 60 characters.
- `<meta name="description">` — the grey summary line under search results (around 150 characters). "Expert care, close to home" earns more clicks than an empty field.

## Why this document is "valid"

A free validator (validator.w3.org) checks nesting, required attributes and character rules. Two habits keep you out of trouble from day one: close every tag you open, and never mix head-only tags into `<body>` or vice versa.

### Sample prompt — scaffold a clean document

```text
Context: I am building the Highland Hospital landing page, an English website for a general hospital.

Requirement: write the minimal, valid HTML5 document skeleton for this page.

Constraints: start with <!DOCTYPE html>; set <html lang="en">; in <head> place meta charset, the responsive viewport meta, a <title> under 60 characters containing "Highland Hospital", and a meta description under 155 characters summarising the hospital's services; leave <body> empty except for an HTML comment marking where the header will go. Output only the code, no explanation.
```

## Practice

- Create a project folder `highland-hospital/` and save the skeleton above as `index.html` — type it by hand rather than copy-pasting.
- Open it with Live Server, then press `F12` → Elements: you should see the same skeleton with nothing added by the browser.
- Delete the viewport meta tag, reload, and switch DevTools to a phone preset (for example iPhone 14). Compare the text size with and without the viewport meta — that visible difference is the reason responsive design exists.

## What's next

In **Semantic elements & SEO**, we replace the empty `<body>` with tags that name each region of the Highland Hospital homepage — `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` — so search engines and screen readers understand the page's structure.
