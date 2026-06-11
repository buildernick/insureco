# ALO Bag Collection — Full Page Demo Plan

## Overview

A demo page (`AloCollectionPage`) built from multiple ALO source sections. Sections collected so far:
1. **AnnouncementBanner** — Full-width deep burgundy strip at the very top of the page
2. **CollectionHeader** — Page title + large tagline
3. **ProductGrid** — Horizontal 4-up product card row
4. **SectionTabNav** — "Collection | Editorial" tab bar at the bottom

More sections will be appended as they are provided.

---

## Components to Extract

### 0. `AnnouncementBanner`
**File:** `src/components/AnnouncementBanner.jsx` + `AnnouncementBanner.scss`

A full-width sticky strip that sits at the very top of the page, above the nav. Contains a single centered uppercase promotional message.

**Visual spec:**
- Background: deep burgundy (`rgb(132, 23, 47)`) — closest token is `--color-brand-red-80` (#750e13); the original is slightly more saturated/bordeaux. Use `--color-brand-red-80` as the token mapping; accept the minor drift.
- Text: white (`--text-on-color`), centered, uppercase, 14px semibold, `letter-spacing: 0.05em`
- Min-height: 46px, vertically centered via flexbox (not absolute positioning — the transform-based centering in the source HTML is an artifact of the original framework)
- No links, no interactivity

**Props:**
- `message` (string) — the announcement text

**Example:**
```jsx
<AnnouncementBanner message="ENJOY COMPLIMENTARY SHIPPING & RETURNS" />
```

**Token mapping:**
| Property | Token |
|---|---|
| Background | `--color-brand-red-80` (static, not semantic — this is intentionally a fixed brand color) |
| Text color | `--text-on-color` |
| Font size | `--body-sm-size` (14px) |
| Font weight | `--font-weight-semibold` |
| Padding horizontal | `--spacing-05` (16px) |
| Min-height | `46px` (hardcoded — below token scale minimum) |

---

### 1. `CollectionHeader`
**File:** `src/components/CollectionHeader.jsx` + `CollectionHeader.scss`

The eyebrow-style section header. Contains:
- An uppercase H1 label ("The Bag Collection") — small, spaced, medium weight
- A large-body description paragraph (32px, light weight)

**Props:**
- `title` (string) — uppercase heading
- `description` (string) — large tagline text

**Notes:** This is a reusable pattern; could appear on any collection page.

---

### 2. `ProductCard`
**File:** `src/components/ProductCard.jsx` + `ProductCard.scss`

One card in the product grid. Contains:
- **Media slot** — either a `<img>` or `<video>` (autoplay, loop, muted, playsinline), both using an aspect-ratio spacer trick (`padding-top: 109.4%`) to maintain portrait proportion
- **Name link** — uppercase, 24px, links to product URL
- **Blurb** — light-weight short description, constrained width (~175px)
- **Availability** — secondary meta text ("Available in three sizes.")

**Props:**
- `href` (string) — product URL
- `mediaType` (`'image'` | `'video'`) — drives which media element renders
- `mediaSrc` (string) — image src or video src
- `videoPoster` (string, optional) — poster frame for video cards
- `name` (string) — product name
- `description` (string)
- `availability` (string)

**Notes:** The aspect-ratio spacer (`padding-top: 109.4%`) is intentional — it preserves portrait image ratio without needing explicit heights. Keep this pattern as-is.

---

### 3. `ProductGrid`
**File:** `src/components/ProductGrid.jsx` + `ProductGrid.scss`

A horizontal row that renders N `ProductCard` children with equal widths and a consistent gap. Wraps Carbon's `<Grid>` / `<Column>` or a plain flex container.

**Props:**
- `children` — one or more `<ProductCard>` elements

**Notes:** The original uses `display: flex; gap: 24px` (our `--gap-lg`). Carbon's `<Grid>` / `<Column lg={4}>` would also work cleanly for a 4-up layout.

---

### 4. `SectionTabNav`
**File:** `src/components/SectionTabNav.jsx` + `SectionTabNav.scss`

A minimal tab-style switcher at the bottom of the section. Shows the active tab underlined (bold) and inactive tabs as plain links.

**Props:**
- `tabs` — array of `{ label: string, href?: string, active?: boolean }`

**Notes:** The original uses `text-decoration: underline` on the active tab and no underline on the inactive one. Not a full routing tab — more like a filter/toggle nav. Could use Carbon's `ContentSwitcher` if it fits, or a simple custom `<nav>`.

---

## Media Assets

All real media URLs collected from the ALO source HTML for use in the demo:

### Product Images
| Product | URL |
|---|---|
| ALO Voyage | `https://cdn.shopify.com/s/files/1/2185/2813/files/handbag-collection-minis_03_2000x2000.jpg?v=1764523386` |
| ALO Odyssey | `https://cdn.shopify.com/s/files/1/2185/2813/files/FULL_JPG-ALO_061925_HandbagFlats_01-0050_2000x2000.jpg?v=1764870745` |

### Video Poster Frames (used as fallback/preview for video cards)
| Product | Poster URL |
|---|---|
| ALO Tranquility | `https://cdn.shopify.com/s/files/1/2185/2813/files/poster-02.jpg?v=1764978061` |
| ALO Balance | `https://cdn.shopify.com/s/files/1/2185/2813/files/poster-01.jpg?v=1764978061` |

> **Note:** The original `<video>` elements have no `src` attribute in the captured HTML (the actual video files were not included). For the demo, video cards will render as poster-image-only stills. If video files are later provided, add a `mediaSrc` URL to those cards.

### Product Links
| Product | URL |
|---|---|
| ALO Voyage | `https://www.aloyoga.com/products/a1055u-alo-mini-voyage-black` |
| ALO Tranquility | `https://www.aloyoga.com/products/a1050u-alo-tranquility-tote-bordeaux` |
| ALO Odyssey | `https://www.aloyoga.com/products/a1051u-alo-odyssey-espresso` |
| ALO Balance | `https://www.aloyoga.com/products/a1052u-alo-balance-bucket-black` |
| Editorial | `https://www.aloyoga.com/pages/bag-collection` |

---

## Page Assembly: `AloCollectionPage`
**File:** `src/pages/AloCollectionPage.jsx`

Composes all sections in order (top to bottom). More sections will be added here as they are provided.

```jsx
<AloCollectionPage>
  <AnnouncementBanner message="ENJOY COMPLIMENTARY SHIPPING & RETURNS" />

  <CollectionHeader
    title="The Bag Collection"
    description="As the next evolution of our Atelier line, the Bag Collection was designed with intentional living in mind."
  />

  <ProductGrid>
    <ProductCard
      mediaType="image"
      mediaSrc="https://cdn.shopify.com/s/files/1/2185/2813/files/handbag-collection-minis_03_2000x2000.jpg?v=1764523386"
      href="https://www.aloyoga.com/products/a1055u-alo-mini-voyage-black"
      name="ALO Voyage"
      description="A signature bag for every moment of your day."
      availability="Available in three sizes."
    />
    <ProductCard
      mediaType="video"
      videoPoster="https://cdn.shopify.com/s/files/1/2185/2813/files/poster-02.jpg?v=1764978061"
      href="https://www.aloyoga.com/products/a1050u-alo-tranquility-tote-bordeaux"
      name="ALO Tranquility"
      description="A roomy carry-all that goes from day to evening."
      availability="Available in one size."
    />
    <ProductCard
      mediaType="image"
      mediaSrc="https://cdn.shopify.com/s/files/1/2185/2813/files/FULL_JPG-ALO_061925_HandbagFlats_01-0050_2000x2000.jpg?v=1764870745"
      href="https://www.aloyoga.com/products/a1051u-alo-odyssey-espresso"
      name="ALO Odyssey"
      description="A structured silhouette with sporty chic sophistication"
      availability="Available in two sizes."
    />
    <ProductCard
      mediaType="video"
      videoPoster="https://cdn.shopify.com/s/files/1/2185/2813/files/poster-01.jpg?v=1764978061"
      href="https://www.aloyoga.com/products/a1052u-alo-balance-bucket-black"
      name="ALO Balance"
      description="An effortless style with the perfect amount of slouch."
      availability="Available in two sizes."
    />
  </ProductGrid>

  <SectionTabNav
    tabs={[
      { label: 'Collection', active: true },
      { label: 'Editorial', href: 'https://www.aloyoga.com/pages/bag-collection' },
    ]}
  />

  {/* Additional sections to be appended */}
</AloCollectionPage>
```

---

## Token Mapping

### Colors
| Visual element | Token |
|---|---|
| Page background | `--background-primary` (white / dark-adaptive) |
| Heading + body text | `--text-primary` |
| Blurb / availability text | `--text-secondary` |
| Product name links | `--text-primary` (default), `--interactive-primary` on hover |
| Active tab underline | `--text-primary` (or `--interactive-primary`) |
| Tab nav background | `--background-primary` |

### Typography
| Visual element | Token |
|---|---|
| Collection h1 label (small caps) | `--font-weight-medium` + `--body-md-size` + `letter-spacing: 0.07em` (matches 1.12px at 16px) |
| Description tagline (32px) | `--font-size` custom `2rem` — closest to `--heading-h3-size` (28px); use inline or a custom utility |
| Product name (24px uppercase) | `--heading-h4-size` (`1.5rem`) + `--font-weight-regular` |
| Blurb / description (16px light) | `--body-md-size` + `--font-weight-light` |
| Availability text | `--body-md-size` + `--font-weight-light` |
| Tab nav labels (20px) | `--heading-h5-size` (`1.25rem`) + `--font-weight-medium` |

> **Note:** ALO uses `proxima-nova`; this codebase uses `--font-family-sans` (IBM Plex Sans). The visual rhythm is similar, but the exact typeface will differ. Do not override the global font.

### Spacing
| Location | Token |
|---|---|
| Header section padding (top/bottom 48px) | `--spacing-09` |
| Header horizontal padding (16px) | `--spacing-05` |
| Gap between product cards | `--gap-lg` (`--spacing-06`, 24px) |
| Gap within a card (between elements) | `--gap-md` (`--spacing-05`, 16px) + sub-gaps `--spacing-03` |
| Card bottom padding | `--spacing-04` (12px) |
| Tab nav padding (16px all sides) | `--spacing-05` |

### Sizing / Layout
| Location | Token |
|---|---|
| Max-width content container | `--container-2xl` (1536px — closest to original's 1592px) |
| Blurb text constrained width (~175px) | Hardcoded `175px` (no token matches; this is a design-specific width) |

### Radius
| Location | Token |
|---|---|
| Video element border-radius | `--radius-sm` (2px — matches original's `border-radius: 1px`, practically invisible) |
| Image containers | `--radius-none` (no rounding in original) |

### Motion
| Interaction | Value |
|---|---|
| Image hover opacity transition | `0.2s ease-in-out` |
| Link color transition | `0.5s cubic-bezier(0.37, 0.01, 0, 0.98)` |

---

## Theme Considerations

- All color tokens must be semantic (`--background-primary`, `--text-primary`, etc.) — no hardcoded values.
- The original design is white-only. In dark mode, `--background-primary` becomes near-black and `--text-primary` becomes light grey — this will work automatically with the token system.
- Video cards have no extra treatment needed for theming.

---

## What's Custom (Not in Tokens)

| Item | Reason |
|---|---|
| `proxima-nova` font | ALO-specific; this project uses IBM Plex Sans |
| `font-size: 32px` description | Between h3 (28px) and h2 (36px); use `2rem` inline or a local utility |
| `padding-top: 109.4%` aspect spacer | Design-specific aspect ratio hack; keep as-is in SCSS |
| `175px` blurb width | Specific art-direction constraint; no token for this |
| `letter-spacing: 1.12px` on h1 label | Tighter than `--letter-spacing-wider` (0.04em ≈ 0.64px at 16px); use `0.07em` inline |
