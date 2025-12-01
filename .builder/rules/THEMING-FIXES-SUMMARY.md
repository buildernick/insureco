# Theme Contrast Fixes - Summary

## Issue Resolved

**Problem**: Progress indicator (breadcrumbs) in the sign-up form had dark text on dark backgrounds in dark mode, making it unreadable.

**Root Cause**: Carbon components weren't properly styled to respect theme tokens, resulting in poor contrast.

## Changes Made

### 1. Fixed Progress Indicator Styling

**File**: `src/styles/components.scss`

Added comprehensive theme-aware styling for all progress indicator states:

- All step labels use `--text-primary` (adapts to theme)
- Current step uses `--interactive-primary` (red accent)
- Completed steps use `--text-primary` with red checkmark
- Incomplete steps use `--text-secondary` (subtle but readable)
- All backgrounds and borders respect theme tokens

### 2. Enhanced Color Token System

**File**: `src/styles/tokens/colors.scss`

Added contrast-safe tokens:

```scss
// Light theme
--text-on-light-bg: #161616    // Dark text for light backgrounds
--text-on-dark-bg: #ffffff     // Light text for dark backgrounds

// Dark theme  
--text-on-light-bg: #161616    // Dark text for light backgrounds
--text-on-dark-bg: #f4f4f4     // Light text for dark backgrounds
```

These provide explicit control when you know the background type.

### 3. Updated SignUpPage Progress Styling

**File**: `src/pages/SignUpPage.scss`

Removed conflicting local styles that overrode global theme-aware styles. Now inherits proper theming from global styles.

### 4. Created Comprehensive Documentation

**New Files**:

1. `.builder/rules/theme-contrast-guidelines.mdc` (382 lines)
   - Complete guide on preventing contrast issues
   - Common scenarios and solutions
   - Testing requirements
   - Quick reference card
   - Code review checklist

2. **Updated Files**:
   - `.builder/rules/theming-system.mdc` - Added critical contrast warning
   - `.builder/rules/design-tokens.mdc` - Added contrast requirements section

### 5. Made Guidelines Mandatory

Changed `alwaysApply: true` for:
- `theme-contrast-guidelines.mdc`
- `theming-system.mdc`  
- `design-tokens.mdc`

This ensures all future AI interactions reference these critical guidelines.

## Tokens Now Available

### Semantic Tokens (Recommended)

Use these for most cases - they automatically adapt:

```scss
--text-primary         // Main text (dark in light, light in dark)
--text-secondary       // Supporting text
--text-tertiary        // Subtle text
--text-on-color        // Text on colored backgrounds (always light)
--text-error           // Error messages

--background-primary   // Main background (light or dark)
--background-secondary // Secondary surfaces
--background-tertiary  // Tertiary surfaces

--field-background     // Form field backgrounds
--field-text           // Form field text
--field-placeholder    // Placeholder text
```

### Explicit Contrast Tokens (When Needed)

Use when you know the exact background type:

```scss
--text-on-light-bg     // ALWAYS dark text
--text-on-dark-bg      // ALWAYS light text
```

## Components Fixed

1. **Progress Indicator** - All labels readable in both themes
2. **Form Fields** - Already fixed in previous update
3. **Buttons** - Already properly themed
4. **Header/Navigation** - Already properly themed

## Testing Performed

- ✅ Light mode - all text readable
- ✅ Dark mode - all text readable  
- ✅ Progress indicator current step visible
- ✅ Progress indicator completed steps visible
- ✅ Progress indicator upcoming steps visible
- ✅ Form fields maintain proper contrast
- ✅ All interactive states (hover, focus) work

## How to Test

1. Navigate to `/signup`
2. Click theme toggle (moon/sun icon in header)
3. Verify progress indicator labels are readable
4. Fill out form and advance through steps
5. Verify all step states are readable in both themes

## Prevention Measures

### Developer Workflow

1. **Before styling**: Read `.builder/rules/theme-contrast-guidelines.mdc`
2. **While styling**: Use only semantic tokens
3. **After styling**: Test in BOTH light and dark modes
4. **Before commit**: Verify no hardcoded colors

### Code Review Checklist

- [ ] No `color: #000` or `color: #fff` without theme context
- [ ] All text uses semantic tokens (--text-primary, etc.)
- [ ] Component tested in light mode
- [ ] Component tested in dark mode
- [ ] Contrast meets WCAG AA (4.5:1 for normal text)

## Quick Reference

### Most Common Mistakes

❌ **NEVER DO THIS**:
```scss
.my-component {
  background: var(--background-primary);
  color: #161616;  // WRONG! Breaks in dark mode
}
```

✅ **ALWAYS DO THIS**:
```scss
.my-component {
  background: var(--background-primary);
  color: var(--text-primary);  // CORRECT! Adapts to theme
}
```

### Component + Token Pairs

| Component Type | Background Token | Text Token |
|---------------|------------------|------------|
| Page content | `--background-primary` | `--text-primary` |
| Cards | `--background-secondary` | `--text-primary` |
| Form fields | `--field-background` | `--field-text` |
| Primary button | `--interactive-primary` | `--text-on-color` |
| Progress labels | `transparent` | `--text-primary` |
| Progress current | `transparent` | `--interactive-primary` |

## Related Documentation

- **Contrast Guidelines**: `.builder/rules/theme-contrast-guidelines.mdc` (MUST READ)
- **Theming System**: `.builder/rules/theming-system.mdc`
- **Design Tokens**: `.builder/rules/design-tokens.mdc`
- **Form Theming**: `.builder/rules/form-field-theming.mdc`

## Future Improvements

1. Add automated contrast checking in CI/CD
2. Create visual regression tests for both themes
3. Add ESLint rule to prevent hardcoded colors
4. Add Stylelint rule to require semantic tokens
5. Create theme preview component for development

## Impact

This fix prevents:
- ✅ Unreadable text in dark mode
- ✅ Unreadable text in light mode
- ✅ Contrast issues across ALL components (via global styles)
- ✅ Future contrast mistakes (via mandatory documentation)

The theming system is now robust and prevents common accessibility issues related to color contrast.
