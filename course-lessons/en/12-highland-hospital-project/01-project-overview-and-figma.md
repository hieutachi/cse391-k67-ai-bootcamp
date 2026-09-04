# Project overview & Figma analysis

## Learning objectives
- See the whole Highland Hospital project: three pages, one shared data source, and each page's user goal
- Read a design like a developer: split it into regions, list the components, list every state
- Write a concise slicing spec per region that becomes the input for an AI prompt
- Set up the standard folder structure for the whole project

## What this project is

Highland Hospital is a fictional private hospital. Its Web Portal is **three pages joined by one data source** — exactly like a real product:

| Page | User | Main goal | What it teaches |
|---|---|---|---|
| `index.html` — Landing Page | New patients | Feel impressed, build trust, click "Book" | Semantic HTML, Bootstrap, dynamic rendering |
| `booking.html` — Booking | Patient who picked a doctor | Fill the form, choose specialty + doctor, get a confirmation | Forms, Validation, the data flow |
| `admin.html` — Admin Dashboard | Receptionists / managers | See metrics, manage appointments | Data table, filter, CRUD, `localStorage` |

The key point: **an appointment created on the booking page must appear in the Admin table**, and vice versa. Because this course has no server, both pages read and write the **same** `appointments` array stored in `localStorage` — which is exactly why the `localStorage` lesson went so deep.

## How to read a design

You may receive the design as a Figma file (free view-only plan is enough), a PNG screenshot, or just a written description. Whatever the source, the breakdown always has three steps.

### Step 1 — split each page into regions

The Landing Page's typical regions:

```text
Landing Page
├── 1. Navbar            (logo, menu, "Book appointment" button — fixed to the top)
├── 2. Hero              (headline, intro sentence, CTA buttons, image)
├── 3. Stats / Trust bar (years, patients, doctors)
├── 4. Services          (6 cards: General checkup, Endoscopy, Lab tests…)
├── 5. Doctors           (grid of 4–8 doctors; each card: photo, name, specialty, Book button)
├── 6. Testimonials      (patient reviews — keep them as data so you can render later)
├── 7. CTA band          (colored strip urging the user to book now)
└── 8. Footer            (contact, opening hours, quick links)
```

Tip: each region is usually its own frame in Figma. The frame name is exactly the section `id` you will use for nav anchors — `#services`, `#doctors` — and for future JS hooks.

### Step 2 — list components and their states

Components are the *repeating parts* of the design. Each one must be listed together with its **states**: the design usually draws one state, and the person writing code has to fill in the rest.

```text
Component: Doctor Card
- Doctor photo (design a placeholder for when the photo is missing)
- Name + credentials
- Specialty (colored badge)
- States: Available / Fully booked
- "Book appointment" button
- Interaction states: hover lifts the shadow, focus shows an outline, card dims when booked

Component: Appointment Row (in Admin)
- Patient, specialty, doctor, appointment time
- Status badge: pending (amber) / confirmed (green) / cancelled (red) / completed (grey)
- Actions: "Confirm" / "Cancel" / "Delete" buttons
- State: new, unread rows have a light background; processed rows lose the highlight
```

### Step 3 — write a slicing spec per region

A good spec answers four questions: **what is in this region, where does its data come from, how does it behave, and how does it respond on small screens**. This is a reusable template for every region:

```text
Region: Hero (Landing Page)
- Content: headline + one intro sentence + 2 buttons ("Book now" → #booking,
  "See doctors" → #doctors) + illustration image
- Layout: desktop is 2 columns (text left, image right); mobile (< 768px) stacks
  vertically with the image below and scaled down
- Color: blue gradient background (#0d6efd → #0a58ca), white text
- Spacing: 80px vertical padding on desktop, 48px on mobile
- Data: static HTML (not rendered by JS)
```

## Sample prompt — ask AI to analyze a design

You can show the AI the design image directly (Gemini and ChatGPT accept images) or describe it in detail (works with all three). This normalized prompt works with any tool:

```text
You are a senior frontend developer. I have a design for the homepage of Highland
Hospital, a private hospital (file/image attached). Please analyze it for me:

1. Split it into regions (hero, services, doctors, testimonials, footer…).
2. For each region: state the expected layout (1/2/3 columns), the components
   inside it, and the HTML semantic element you would use (header, main,
   section, article…).
3. List every repeating component (card, button, badge…) with the states that
   need coding (default, hover, focus, disabled, empty).
4. Give the main color palette and fonts, with hex codes and estimated font sizes.
5. Point out anything the design does not specify that I will have to decide
   myself (missing images, overly long text, empty states).

Keep it brief and organized per region — do NOT write code; I will code in a later step.
```

## Project folder structure

Create this tree in your workspace — it is the skeleton you will use for lessons 02 through 06:

```text
highland-hospital/
├── index.html        # Landing Page
├── booking.html      # Booking page
├── admin.html        # Admin Dashboard
├── css/
│   └── style.css     # Bootstrap overrides + Highland color variables
├── js/
│   ├── main.js       # Landing Page logic (render doctors, modal…)
│   ├── booking.js    # Booking page logic
│   ├── admin.js      # Admin Dashboard logic
│   └── data.js       # Seed data: doctors, testimonials, appointments
└── img/              # Project images
```

Naming principle: HTML files by page, JS files by the page they serve — while `data.js` is shared by everyone, because **all three pages read the same data source**.

## Practice

- Take a Figma file (or a screenshot of any hospital website) and break the three Highland pages down using the three steps above; record the result in a `SPEC.md` file in the project folder.
- Create the exact folder tree above (the shell command `mkdir -p highland-hospital/{css,js,img}` does it in one go).
- Install the **Live Server** extension in VS Code if you have not — the next lessons need it to open `index.html`.
- Run the analysis prompt above with the design you chose; compare the AI's answer with your own analysis and note where they differ.
- Write slicing specs for three regions: `services`, `doctors`, `testimonials`.

## What's next

You have the design map and a spec for every region — now build the whole Landing Page with Bootstrap 5: navbar, hero, services grid, doctors grid and footer, in **Building the Landing Page with Bootstrap**.
