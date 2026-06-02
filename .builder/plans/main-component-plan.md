# Builder Design Tokens Registration Plan

## Goal
Expose InsureCo's existing design tokens (colors, typography, spacing, radius) inside the Builder visual editor so content editors can pick from branded values instead of typing raw CSS or hex codes.

---

## How It Works

The gen2 SDK exports a `register(type, info)` function. Calling it with `type = 'editor.settings'` and a `designTokens` payload communicates the token catalog to the Builder editor. The editor then surfaces those values as named swatches and dropdown options in its style panel.

This call must happen at **module initialization time** (before React renders) so the editor receives the registration as soon as it loads the preview.

---

## File to Create

### `src/components/builder/builderTokens.js`

Calls `register('editor.settings', { designTokens: { ... } })` with four token categories:

#### Colors
A flat list of named `{ name, value }` entries organized as:
- **Brand Red scale** — 10 steps (`#fff1f1` → `#2d0709`)
- **Brand Blue scale** — 10 steps (`#edf5ff` → `#001141`)
- **Semantic** — Success, Warning, Error, Info (primary value each)
- **Semantic UI** — Interactive Primary, Text Primary, Background Primary, etc. (light-theme resolved values with names that match the CSS var name)

> Theme-aware tokens (those that change between light/dark) are registered with their **light-theme values** since the Builder editor shows one theme at a time. The CSS variable still applies at runtime, keeping theme-awareness intact in published pages.

#### Font Families
Three entries: IBM Plex Sans, IBM Plex Serif, IBM Plex Mono — matching `--font-family-sans/serif/mono`.

#### Font Sizes
Named entries for every heading and body scale:
- H1 (3rem) through H6 (1.125rem)
- Body LG (1.125rem), MD (1rem), SM (0.875rem), XS (0.75rem)

#### Spacing
Named entries for all 13 steps:
- `spacing-01` (2px) through `spacing-13` (160px)
- Plus the semantic gaps: `gap-xs` (4px) through `gap-2xl` (48px)

#### Border Radius
Named entries: none, sm, md, lg, xl, 2xl, full.

---

## File to Modify

### `src/main.jsx`
Import and call `registerBuilderTokens()` once at the top of the module, before `ReactDOM.createRoot`. This ensures registration runs before any Builder editor communication begins.

```js
import { registerBuilderTokens } from './components/builder/builderTokens';
registerBuilderTokens();
```

---

## What Does NOT Change

- `builderComponents.js` — no changes needed; design tokens are a separate editor concern
- `BuilderPage.jsx` — no changes; token registration is space-level, not per-page
- All SCSS token files — source of truth stays in SCSS; `builderTokens.js` reads the same values (hard-coded to match) so there's one canonical file to update when tokens change

---

## Result in Builder Editor

Once this is wired up and the preview URL is configured on the page model:
- **Color picker** shows named InsureCo swatches (Brand Red 60, Interactive Primary, etc.)
- **Font family field** offers IBM Plex Sans / Serif / Mono
- **Font size field** shows the heading and body scale by name
- **Spacing / margin / padding fields** offer the 13-step spacing scale
- **Border radius field** shows the radius scale

---

## Limitations

- **Theme-aware colors**: Tokens like `--text-primary` change value in dark mode. The swatch in Builder shows the light-mode value (`#161616`), but at runtime the CSS variable resolves correctly in both themes.
- **No admin API needed**: This entire registration happens client-side via the SDK's postMessage mechanism — no Builder private key required.
- **Preview URL prerequisite**: Token registration communicates through the editor's preview iframe. The page model must have a preview URL set for it to take effect (same requirement as custom components).
