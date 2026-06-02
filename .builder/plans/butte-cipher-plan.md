# Builder CMS Custom Components Plan

## Goal
Create 9 registered Builder.io custom components (5 section-level + 4 text primitives) that appear in the Builder visual editor for building new CMS-driven pages.

---

## Section Components

### 1. `HeroSection`
**Source**: `.hero-section` in LandingPage.jsx
**Builder inputs**:
- `backgroundImage` (file) — background image URL
- `headline` (string) — main heading
- `tagline` (string) — subtitle/body text
- `primaryCtaText` (string) — label for primary button
- `primaryCtaUrl` (string) — URL for primary button
- `secondaryCtaText` (string) — label for secondary button
- `secondaryCtaUrl` (string) — URL for secondary button (both CTAs are simple nav links — no modal)

### 2. `BenefitCard`
**Source**: Individual card inside `.features-section` in LandingPage.jsx
**Builder inputs**:
- `title` (string)
- `description` (string)
- `icon` (string enum: Security, CheckmarkFilled, Car, Home)

> A single card. Editors place multiple `BenefitCard` components side-by-side in Builder's column/grid layout.

### 3. `SplitHero`
**Source**: `.product-section` (used twice — car and home) in LandingPage.jsx
**Builder inputs**:
- `heading` (string)
- `description` (string)
- `bullets` (list) — array of `{ text: string }`
- `ctaText` (string)
- `ctaUrl` (string)
- `image` (file) — image URL
- `imageAlt` (string)
- `imagePosition` (string enum: left, right) — controls which column the image appears in
- `background` (string enum: primary, secondary) — background tone

### 4. `TestimonialsSection`
**Source**: `.testimonials-section` in LandingPage.jsx
**Builder inputs**:
- `sectionHeading` (string) — e.g. "What Our Customers Say"
- `testimonials` (list) — array of:
  - `quote` (string)
  - `author` (string)
  - `role` (string)

### 5. `BoldBanner`
**Source**: `.cta-section` in LandingPage.jsx
**Builder inputs**:
- `heading` (string)
- `subtext` (string)
- `ctaText` (string)
- `ctaUrl` (string)

---

## Text Primitive Components

Standard marketing site text hierarchy — all theme-aware, all use design tokens.

### 6. `Heading`
A section or page title with configurable level.
**Builder inputs**:
- `text` (string)
- `level` (string enum: h1, h2, h3, h4) — default `h2`
- `align` (string enum: left, center, right) — default `left`

### 7. `Eyebrow`
Small all-caps label that sits *above* a heading to categorize a section (e.g., "Car Insurance", "Why Choose Us").
**Builder inputs**:
- `text` (string)
- `align` (string enum: left, center, right) — default `left`

### 8. `Subtitle`
Larger lead paragraph text that sits directly *below* a heading (the "subtitle text" in the hero).
**Builder inputs**:
- `text` (string)
- `align` (string enum: left, center, right) — default `left`

### 9. `Body`
Standard paragraph text for general content.
**Builder inputs**:
- `text` (string)
- `align` (string enum: left, center, right) — default `left`

---

## File Structure

```
src/components/builder/
├── HeroSection.jsx + .scss
├── BenefitCard.jsx + .scss
├── SplitHero.jsx + .scss
├── TestimonialsSection.jsx + .scss
├── BoldBanner.jsx + .scss
├── Heading.jsx + .scss       ← text primitives
├── Eyebrow.jsx + .scss
├── Subtitle.jsx + .scss
├── Body.jsx + .scss
└── builderComponents.js      ← exports array of all 9 component definitions
```

## Integration Changes

### `src/pages/BuilderPage.jsx`
- Import `builderComponents` array
- Pass it to `<Content customComponents={builderComponents} />`

### `src/pages/LandingPage.jsx`
- **Left untouched** — the hardcoded landing page remains as-is. New components are for Builder CMS use only.

---

## Styling Approach
- Each component gets its own `.scss` file using `@use '../../styles/tokens' as *`
- Section component styles extracted from `LandingPage.scss` — same tokens, same visual output
- Text primitive styles use typography tokens (`--heading-h1-size`, `--body-lg-size`, etc.)
- All styles use CSS custom properties so they work in both light and dark themes

## Builder Registration Format (gen2 SDK)
The gen2 `@builder.io/sdk-react` SDK registers components via `customComponents` prop on `<Content>`:

```jsx
<Content
  model="page"
  apiKey={BUILDER_API_KEY}
  content={content}
  customComponents={builderComponents}
/>
```

No global `registerComponent()` call needed — this is the correct gen2 approach.
