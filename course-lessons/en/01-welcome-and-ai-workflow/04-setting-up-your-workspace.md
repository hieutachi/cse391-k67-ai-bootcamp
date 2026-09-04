# Setting up your workspace

## Learning objectives
- Install VS Code and the Live Server extension
- Create the standard `highland-hospital/` project structure used by every lesson
- Open your first page in the browser and learn the four DevTools tabs you will live in

## Step 1 — Install VS Code and Live Server

1. Download VS Code from the official site and install it like any application.
2. Open the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`), search for **Live Server** (by Ritwick Dey) and install it.
3. Use **File → Open Folder** to open an empty folder. This folder is your project.

Live Server does one crucial thing: it runs a tiny web server on your machine and **reloads the browser automatically every time you save a file**. That matters from day one — and in the chapter on Fetch you will see why opening HTML by double-clicking (`file://`) is not enough. Live Server already solves that for you.

## Step 2 — The project folder structure

Create this structure with the New Folder buttons or your terminal:

```
highland-hospital/
├── index.html          # Landing page — static in chapters 3–8, dynamic in 9–10
├── booking.html        # Booking page — static form in chapter 8, full flow in 11
├── admin.html          # Admin dashboard — chapter 12
├── css/
│   └── style.css       # Your own CSS, loaded after Bootstrap
├── js/
│   ├── data.js         # Shared sample data: doctors, appointments
│   ├── main.js         # Landing page logic
│   └── admin.js        # Dashboard logic
└── assets/
    └── images/         # Doctor photos and banners
```

Every lesson from now on says "add this to file X". Keep the structure stable so your AI prompts can always point at the exact file.

## Step 3 — A minimal page, running live

Create `index.html` inside `highland-hospital/`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Highland Hospital</title>
</head>
<body>
  <h1>Highland Hospital</h1>
  <p>The landing page is under construction.</p>
</body>
</html>
```

Right-click the file name in the explorer and choose **Open with Live Server**. A browser tab opens at `http://127.0.0.1:5500/index.html`. Change the heading text and save — the tab updates itself.

## Step 4 — Get to know Chrome DevTools

Open DevTools with `Cmd+Option+I` (or right-click → Inspect). Four tabs carry you through the whole course:

- **Elements** — the live DOM and the CSS applied to it. Toggle styles off and on to experiment before editing the file.
- **Console** — where JavaScript errors and `console.log` output appear; you can also type JavaScript here directly.
- **Network** — the list of every file and API request the page makes; open it the day you meet `fetch`.
- **Device Toolbar** (`Cmd+Shift+M`) — simulates phones and tablets so you can check responsive behaviour without leaving your desk.

Ask your AI assistant how to make this setup tidier:

```text
Context: I use VS Code with the Live Server extension and just created
the first index.html of the Highland Hospital project.
Task: recommend one free extension that auto-formats HTML and CSS when
I save, and tell me which two DevTools tabs to open to check that the
page loads without errors.
Constraint: free extensions only, and answer in under five bullet points.
```

## Practice

1. Create the complete `highland-hospital/` structure shown above.
2. Write the minimal `index.html` — doctype, a `head` with the viewport meta tag, and one line about Highland Hospital.
3. Open it with Live Server, then use the Device Toolbar to inspect it at 375px and 1440px.
4. Run the prompt above, install what it suggests, and confirm the formatter runs when you save.

## What's next

Your environment is ready — the final lesson of this chapter introduces the project itself: the three Highland Hospital pages and the shared data they all run on.
