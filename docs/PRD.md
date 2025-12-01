# Product Requirements Document (PRD)

**Project:** InsureCo Website  
**Design System:** IBM Carbon v1.83 (Carbon React)

## 1. Overview

InsureCo is a fictional insurance provider offering car and home insurance. The project includes a marketing website, a multi-step sign-up flow, and a customer dashboard. The entire site must use a custom design system built on top of IBM Carbon v1.83, including full design token sets (colors, typography, spacing, motion, layout) and support for light and dark theme modes.

## 2. Goals & Objectives

Build a modern insurance website with:

- Marketing landing page
- Seven-step sign-up form
- Mock login
- Customer dashboard

Establish a full custom design system based on Carbon v1.83.

Provide a dark and light theme toggle that affects every component and page.

Ensure complete visual and functional consistency across the app.

## 3. Non-Goals

- No backend or user persistence.
- No real authentication.
- No insurance rating logic.
- Carbon should not be overridden in ways that break accessibility or component structure.

## 4. Technology Stack

- **Framework:** React or Next.js (React-based)
- **UI Library:** @carbon/react (v1.83)
- **Theme System:** CSS variables + Carbon theming
- **Routing:** React Router or Next.js routing
- **Design Tokens:** JSON, CSS Variables, or Token Studio format

## 5. Design System Requirements (must be completed first)

This section must be implemented before any pages or flows are built.

### 5.1. Design Token Architecture

Create a full token architecture compatible with Carbon v1.83, including:

#### Token Categories

**Color Tokens**

The color theming should model the color theming of https://oldspice.com/shop-on-old-spice/bundles/ which is mostly reds and greys. Go to that website and browse the site to see how it works.

- Primary brand colors
- Secondary and accent colors
- Semantic colors (success, warning, error, info)
- Backgrounds, surfaces, overlays
- Border colors
- Interactive states (hover, active, selected)

**Typography Tokens**

- Font families (based on IBM Plex)
- Font weights
- Font sizes
- Line heights
- Letter spacing
- Heading/token scale (H1–H6)

**Spacing Tokens**

- 4px grid-based scale (e.g., 2, 4, 8, 12, 16, 24, 32, 48, 64)
- Padding and margin standards
- Layout gaps for grid/stack components

**Sizing Tokens**

- Component size variants (sm, md, lg)
- Input field heights
- Icon sizes
- Button sizes

**Radius Tokens**

- Border radius sizes (e.g., none, sm, md, lg)

**Elevation / Shadow Tokens**

- Light and dark mode elevation rules
- Shadow tokens for cards, modals, menus

**Motion Tokens**

- Durations (fast, normal, slow)
- Easing curves (standard, expressive)
- Motion tokens applied to transitions and animations

**Layout Tokens**

- Grid breakpoints
- Container widths
- Max-width constraints

#### Token Format

Export tokens as:

- JSON
- CSS custom properties (variables) applied via theme root
- Tokens must be consumed by components and pages universally

### 5.2. Theme System (Light + Dark)

A full dual-theme system is required:

#### General Requirements

- Two themes: Light and Dark.
- Toggle switch must appear in the header on every page.
- Theme selection should update:
  - Backgrounds
  - Text colors
  - Border colors
  - Carbon components that respect tokens
  - Cards, modals, tables
  - Form fields
- Use Carbon's theming foundation but override where InsureCo custom tokens differ.
- Use CSS variables to allow instant theme switching.

#### Dark Mode Requirements

- Proper contrast for accessibility (WCAG AA minimum)
- Surfaces, cards, modals, navigation backgrounds should follow Carbon guidance
- Shadows must adjust for dark mode
- Success, warning, error colors must remain visible and accessible

#### Theme Persistence

- Persistence optional; it is acceptable if the theme resets on refresh.
- If implemented, use localStorage.

### 5.3. Branding and Visual Identity

Because InsureCo is a fictional brand:

- Define a Brand Core Palette (primary, secondary, neutrals).
- Ensure harmony with Carbon defaults (gray, blue, cool palette).
- Define a brand logo placeholder and spacing around it.

### 5.4. Component Styling Rulebook

Document styling and behavior for:

- Buttons
- Inputs
- Cards/Tiles
- Navigation/Header
- Tables
- Forms
- Modals
- Tabs
- Progress Indicators
- Notifications/Toasts

This document defines how Carbon components are customized using tokens.

## 6. Website Requirements

After the design system is in place, build the following sections.

### 6.1. Marketing Landing Page

**Goal:** Convert visitors using insurance product marketing.

#### Content

- Hero section with tagline, CTA buttons:
  - Sign Up
  - Get a Demo
- Feature sections (3–4)
- Car insurance summary
- Home insurance summary
- Optional testimonials
- Footer

#### Interactions

- "Sign Up" → Sign-up Step 1
- "Get a Demo" → demo contact modal or page

### 6.2. Sign-Up Flow (7 Steps)

#### Steps

1. Personal Info
2. Address
3. Insurance Type (Car, Home, Both)
4. Car Details
5. Home Details
6. Coverage Preferences
7. Review & Confirm

#### Requirements

- Conditional skipping of steps
- Carbon Progress Indicator
- Back + Next buttons
- Final Confirmation Page with summary
- Button: Go to Dashboard

### 6.3. Login + Dashboard

#### Login Page

- Carbon fields
- Mock authentication
- Any input logs the user in

#### Dashboard

Overview cards for:

- My Claims
- My Policies / Services
- Insurance Cards

Each section uses Carbon components (Tiles, DataTable, Cards)

#### Additional Pages (static)

- Claims list
- My policies
- Insurance card viewer/download
- Profile placeholder
- Billing placeholder

## 7. Accessibility Requirements

- Carbon v1.83 accessibility compliance
- WCAG 2.1 AA
- Focus states visible in both themes
- Screen reader labels for all form fields
- High contrast for dark mode

## 8. Future Enhancements

- Real authentication
- Real data persistence
- Insurance quoting logic
- Claims management features
- Notifications system
- Mobile app version
