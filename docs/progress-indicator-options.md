# Progress Indicator Options - Preview Page

## Overview

A preview page has been created at `/progress-preview` to showcase 4 different approaches to displaying multi-step progress indicators, specifically designed to solve the mobile scrolling problem.

## The 4 Options

### Option 1: Vertical Progress Indicator
**Type:** Carbon Component (ProgressIndicator with `vertical` prop)

**How it works:** Uses Carbon's built-in ProgressIndicator component in vertical orientation, showing all steps stacked vertically.

**Pros:**
- Standard Carbon component (no custom code)
- Shows all steps for complete context
- Clear visual progress with checkmarks
- No horizontal scrolling on mobile
- Built-in accessibility

**Cons:**
- Takes up significant vertical space
- Still requires vertical scrolling with many steps (6-7+)
- Can feel lengthy in multi-step flows
- Less compact than alternatives

---

### Option 2: Progress Bar with Step Counter
**Type:** Carbon Component (ProgressBar + custom step list)

**How it works:** Combines Carbon's ProgressBar component at the top with a vertical list of all steps below. The bar shows percentage completion while the list shows detailed step status.

**Pros:**
- Visual progress bar shows completion percentage
- Compact bar at top, detailed list below
- Current step clearly highlighted
- Easy to understand at a glance
- Uses standard Carbon ProgressBar component

**Cons:**
- Still shows all steps (vertical scrolling with many steps)
- More complex layout structure
- Takes vertical space for step list
- Some redundant information (bar + list)

---

### Option 3: Tabs as Stepper
**Type:** Carbon Component (Tabs, TabList, Tab components)

**How it works:** Repurposes Carbon's Tabs component as a stepper, with each tab representing a step. Completed steps show checkmarks, current step is selected, and future steps are disabled.

**Pros:**
- Familiar tab interface pattern
- Horizontal layout saves vertical space
- Built-in keyboard navigation
- Can show content inline with tabs
- Good for shorter step counts (3-5 steps)

**Cons:**
- **Horizontal scrolling required on mobile with many steps**
- Tab labels get truncated on small screens
- Not ideal for 6+ steps on mobile
- Tabs semantically meant for content switching, not wizard forms

---

### Option 4: Circular Mini-Stepper (Context-Only)
**Type:** Custom Component ⚠️

**How it works:** A completely custom component that shows only 2-3 steps at a time:
- Previous step (if exists) - small circle with checkmark
- Current step - large circle with pulse animation
- Next step (if exists) - small circle with number

Above the circles shows "Step X of Y" and below shows the current step label.

**Pros:**
- **Most compact** - shows only 2-3 steps at a time
- **No scrolling** - fits on any screen size
- Clear focus on current step
- Shows immediate context (where you've been, where you're going)
- Clean, minimalist design
- Perfect for mobile-first experiences
- Scales well with any number of steps (works great with 6-7+ steps)

**Cons:**
- **Custom component** - requires maintenance
- No overview of all steps at once
- User can't see total progress visually (only numerically)
- Need to implement accessibility from scratch
- Additional CSS and component code
- May feel less informative for users who want full context

---

## Recommendation

### Primary: Option 4 (Circular Mini-Stepper)
For a **mobile-first multi-step form with 6-7+ steps**, Option 4 best solves the scrolling problem. It keeps users focused on the current step without overwhelming them with a long list. While it requires custom code, the UX benefits outweigh the maintenance cost.

### Alternative: Option 2 (Progress Bar + Step List)
If you prefer a Carbon-only solution without custom components, Option 2 provides good visual feedback and uses standard components. However, it still requires vertical scrolling with many steps.

## Implementation

### Files Created
- `src/pages/ProgressIndicatorPreview.jsx` - Preview page component
- `src/pages/ProgressIndicatorPreview.scss` - Styles for all 4 options
- `docs/progress-indicator-options.md` - This documentation

### Route Added
- `/progress-preview` - View the preview page

### Testing
Visit `/progress-preview` in your browser to:
- See all 4 options side by side
- Use the Back/Next buttons to test each option
- Read pros/cons for each approach
- View the recommendation section
- Test in both light and dark themes
- Test on mobile, tablet, and desktop screen sizes

## Custom Component Details (Option 4)

If you choose Option 4, the component is already implemented in the preview page as `CircularMiniStepper`:

```jsx
<CircularMiniStepper 
  steps={steps}        // Array of step objects: [{ label, key }, ...]
  currentIndex={index}  // Current step index (0-based)
  className={className} // Optional additional classes
/>
```

The component can be extracted to `src/components/CircularMiniStepper.jsx` for reuse across the app.

### Accessibility Considerations for Custom Component
If implementing Option 4, ensure:
- Add ARIA labels (`aria-label`, `aria-current`)
- Include screen reader text for step status
- Support keyboard navigation
- Use semantic HTML where possible
- Announce step changes to screen readers

## Next Steps

1. Review the preview page at `/progress-preview`
2. Test all 4 options on various devices
3. Decide which option best fits your needs
4. If choosing Option 4, extract `CircularMiniStepper` to a separate component file
5. Replace existing progress indicators (SignUpPage, AddPropertyPage, etc.)
6. Test accessibility with screen readers
7. Update documentation with your chosen approach

## Related Files

### Current Progress Indicator Usage
- `src/pages/SignUpPage.jsx` - Uses Carbon's ProgressIndicator (horizontal)
- `src/components/StepBreadcrumb.jsx` - Custom horizontal stepper (replacement for Carbon's ProgressIndicator due to theming issues)
- `src/pages/business/AddPropertyPage.jsx` - Uses StepBreadcrumb
- `src/pages/business/AddVehiclePage.jsx` - Uses StepBreadcrumb
- `src/pages/business/FileClaimPage.jsx` - Uses StepBreadcrumb
- `src/pages/business/MakePaymentPage.jsx` - Uses StepBreadcrumb

### Design System Documentation
- `design-system-docs/ProgressIndicator.mdx` - Carbon's ProgressIndicator docs
- `design-system-docs/ProgressBar.mdx` - Carbon's ProgressBar docs
- `design-system-docs/Tabs.mdx` - Carbon's Tabs docs
