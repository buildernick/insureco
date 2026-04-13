# Skill: Page Component Review

## When to invoke
Use this skill when a user asks to "review a page", "audit a page's components", "check what's custom on this page", or similar requests about component provenance on a given page or route.

---

## What to do

When invoked, examine the target page's JSX and produce a structured report with **three sections**:

---

### Section 1 — Standard Components

List every component on the page that comes from one of the two approved sources:

**A. Carbon Design System (`@carbon/react` and `@carbon/icons-react`)**
Examples: `Button`, `Grid`, `Column`, `Modal`, `TextInput`, `TextArea`, `Stack`, `Accordion`, `Tile`, `Tag`, and any icon from `@carbon/icons-react`.

**B. The InsureCo Component Gallery (`/component-gallery` route — `src/pages/ComponentGallery.jsx`)**
These are the project's established custom components and inline patterns. As of the current codebase, they include:

| Name | Type | Source |
|---|---|---|
| StepBreadcrumb | Reusable Component | `src/components/StepBreadcrumb.jsx` |
| ThemeToggle | Reusable Component | `src/components/ThemeToggle.jsx` |
| Hero Section | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Eyebrow Pill | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Ghost Button (hero) | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Scroll Hint Indicator | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Announcement Banner | Inline Pattern | `src/pages/LandingPage.jsx` |
| Benefit Cards | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Stats Bar | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Plan / Pricing Cards | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| FAQ Accordion | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Parallax Quote Banner | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Vet Feature List | Inline Pattern | `src/pages/PetInsurancePage.jsx` |
| Footer | Inline Pattern | `src/pages/LandingPage.jsx` + `src/pages/PetInsurancePage.jsx` |

For this section, report the component name and which source it comes from (Carbon or Gallery).

---

### Section 2 — New Components

List every UI element on the page that is **not** from Carbon and **not** documented in the Component Gallery. These are net-new, undocumented patterns introduced by this page.

For each new component, report:
- **Name** — a short descriptive name for it
- **Where it appears** — the JSX element(s) and CSS class(es) that define it
- **What it does** — one sentence describing its role in the UI

If every component on the page is already standard, say so explicitly.

---

### Section 3 — Recommendations for Standardization

For each new component identified in Section 2, provide a concrete recommendation. Structure each recommendation as:

**[Component Name]**
- **Preferred approach**: Does a Carbon component already solve this need? (e.g., Carbon `Accordion` for a custom FAQ, Carbon `Tile` for a custom card). If so, recommend replacing with the Carbon component and note any props to use.
- **If no Carbon equivalent**: Recommend extracting it into a reusable component in `src/components/` and adding it to the Component Gallery page (`src/pages/ComponentGallery.jsx`) so it becomes a documented standard.
- **Effort**: Low / Medium / High — based on how much JSX and SCSS would need to change.
- **Theme risk**: Note if the current implementation uses hardcoded colors or styles that would break in light or dark mode.

Always check `src/pages/ComponentGallery.jsx` for the current list of documented patterns before classifying something as "new" — the gallery is the source of truth for what is established.

---

## Output format

Return the report in plain markdown with the three sections clearly labelled. Keep it scannable — use tables and short bullet points. Do not make any code changes during a review unless the user explicitly asks for them after seeing the report.
