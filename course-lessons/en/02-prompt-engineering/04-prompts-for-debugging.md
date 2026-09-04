# Prompts for debugging

## Learning objectives
- Write debug prompts from the formula: code + symptom + ranked causes
- Make AI explain before it fixes, so you never patch blind
- Verify the real cause in DevTools before applying any fix

## "It is broken, fix it" is the worst prompt

Sending your whole file with "it is broken, please fix" makes the AI guess. Sometimes it lands, sometimes it repairs the wrong spot and introduces a new bug. Effective debugging starts with you describing the **symptom** — the symptom is the input for every judgement that follows, the AI's and yours alike.

## The three-part debug prompt

1. **Minimal code** — paste only what is relevant: the modal's HTML, its CSS, the line that initialises it. Not the whole project. If the fault is spread across files, say so: "this is file A; the rest lives in file B around line 12."
2. **The symptom** — describe what you *see* and what you have *tried*. For example: "On a 375px phone, the modal opens shifted off-screen to the right and the close button is unreachable. Desktop is fine."
3. **Ranked candidate causes** — list two or three suspicions in order of likelihood and demand the analysis follow that same order. This forces you to think before asking, and it keeps the AI's answer on target instead of wandering.

Always close with: *"Before giving me the fix, explain the cause in two or three sentences."* If the explanation does not match the symptom you see, do not apply the fix.

## Sample prompt: a modal that breaks on mobile

```text
Code: Bootstrap 5 via CDN. The "cancel appointment" modal lives inside
a <section> of the Admin page whose CSS sets overflow-x: hidden. The
modal markup follows Bootstrap exactly (data-bs-toggle, data-bs-target).
Symptom: at 480px and below, opening the modal shifts the overlay and
dialog sideways, the content cannot scroll and the Close button is
off-screen. Desktop is fine.
My ranked candidate causes, analyse in this order:
1. The modal is trapped inside a parent with overflow/transform, so it
   gets clipped or positioned wrongly.
2. My own style.css overrides .modal position or width.
3. JavaScript never initialised because an error fires elsewhere.
Requirement: work through the causes in order, identify the most
likely one, explain it briefly, then give the minimal fix.
```

Cause 1 is the classic culprit. Bootstrap modals use `position: fixed`, but when the modal sits inside an ancestor with `transform`, `filter`, `overflow` or `contain`, it becomes trapped in that ancestor and the layout breaks. The standard fix is to move the modal to be a direct child of `<body>`:

```html
<body>
  <!-- the whole Admin page markup -->

  <!-- modal placed directly under <body>, inside no other element -->
  <div class="modal fade" id="cancelModal" tabindex="-1"
       aria-labelledby="cancelModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="cancelModalLabel">Cancel this appointment?</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          The patient's appointment will be removed. This cannot be undone.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keep it</button>
          <button type="button" class="btn btn-danger" id="confirmCancel">Yes, cancel</button>
        </div>
      </div>
    </div>
  </div>
</body>
```

If it still misbehaves, move to causes 2 and 3 and check them in DevTools: in the Elements tab select `.modal` and inspect whether `position` is still `fixed`; in the Console look for red errors that appear before the modal opens.

## Tip: bisect to narrow the field

A "whole page is broken" bug does not need AI analysing five hundred lines. Halve the problem yourself first: comment out half the file, see whether the fault remains, and paste only the half that still fails. A short, focused prompt beats a long, vague one every time.

## Practice

Break the "Confirm booking" modal on purpose: wrap it in a `<div style="transform: translateX(0)">`. Open it in mobile device mode (DevTools, phone icon), note the symptom, then write a three-part debug prompt and compare the AI's fix with the one above.

## What's next

You now have prompts for building new things and for fixing broken ones — the final lesson of this chapter, the prompt workshop, makes you practise all three kinds against three real scenarios.
