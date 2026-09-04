# Visual Design System: Shree Prathishthan

This document defines the visual standards, design tokens, responsive rules, and UI utilities for the **Shree Prathishthan** digital ecosystem.

---

## 1. Color Palette (Obsidian & Saffron Glow)

Our color system uses a dark obsidian base accented with glowing warmth. It reflects the atmosphere of an evening festival illuminated by lamps and torches.

```css
:root {
  /* Brand Core Colors */
  --color-obsidian-deep: hsl(240, 6%, 4%);      /* #0B0B0C - Primary Canvas */
  --color-obsidian-card: hsl(240, 5%, 8%);      /* #121214 - Surface Level 1 */
  --color-obsidian-sheet: hsl(240, 5%, 12%);    /* #1D1D20 - Surface Level 2 */
  
  --color-saffron-glowing: hsl(19, 75%, 55%);   /* #E26A36 - Brand Accent Primary */
  --color-gold-metallic: hsl(45, 65%, 53%);     /* #D4AF37 - Brand Accent Secondary */
  --color-gold-glow: rgba(212, 175, 55, 0.15);   /* Glowing drop-shadow */

  /* Neutral Typography Colors */
  --color-alabaster: hsl(0, 0%, 96%);           /* #F4F4F4 - Dominant Text */
  --color-pebble: hsl(240, 3%, 65%);            /* #A1A1A5 - Subtitles / Body */
  --color-coal: hsl(240, 4%, 30%);              /* #4C4C50 - Borders / Placeholders */
  
  /* System States */
  --color-success: hsl(142, 70%, 45%);
  --color-error: hsl(0, 75%, 50%);
}
```

---

## 2. Typography

We prioritize modern sans-serif fonts with distinct weight variations to build hierarchy.

*   **Primary Font (Headers)**: `Syne` (for bold, wide, expressive titles) or `Outfit` (for clean, high-impact numbers).
*   **Secondary Font (Body)**: `Plus Jakarta Sans` or `Inter` (for legibility).

### Font Sizes & Leading Scales
*   **Display 1 (Hero Title)**: `clamp(3rem, 8vw, 7.5rem)` | `line-height: 0.9` | `font-weight: 800`
*   **Headline 1 (Section Title)**: `clamp(2rem, 5vw, 4rem)` | `line-height: 1.1` | `font-weight: 700`
*   **Headline 2 (Cards/Subsections)**: `clamp(1.5rem, 3vw, 2rem)` | `line-height: 1.2` | `font-weight: 600`
*   **Body Leading**: `1rem` (Desktop) / `0.93rem` (Mobile) | `line-height: 1.6` | `font-weight: 400`
*   **Caption/Button Text**: `0.85rem` | `letter-spacing: 0.05em` | `font-weight: 600`

---

## 3. Spacing System

All padding, margins, and gaps follow a standard 8px grid system.

| Token | Value (rem) | Pixels | Description |
| :--- | :--- | :--- | :--- |
| `--space-xs` | `0.5rem` | 8px | Grid gap, label margins, tiny offsets. |
| `--space-sm` | `1.0rem` | 16px | Card internal padding, button margins. |
| `--space-md` | `2.0rem` | 32px | Section gutters, standard card gaps. |
| `--space-lg` | `4.0rem` | 64px | Page gutters, vertical block margins. |
| `--space-xl` | `8.0rem` | 128px | Hero vertical spacing, block separation. |

---

## 4. Containers & Borders

### Responsive Max Widths
*   **Container Desktop**: `1440px` max-width with dynamic padding (`clamp(1.5rem, 5vw, 6rem)`).
*   **Container Compact**: `1024px` for reading layouts and form sheets.

### Border Radius
*   `--radius-pill`: `9999px` (Buttons, tags)
*   `--radius-interactive`: `12px` (Inputs, sliders)
*   `--radius-block`: `24px` (Cards, panels, media wrappers)

### Glassmorphic Spec (Gloss Layer)
To ensure readability over high-contrast glowing elements, glass elements use background filters.
```css
.glass-panel {
  background: rgba(18, 18, 20, 0.65);
  backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

---

## 5. UI Elements

### Interactive Buttons

#### Primary Button (`.btn-glowing-saffron`)
*   *Rest*: Background `var(--color-saffron-glowing)`, Text `var(--color-alabaster)`.
*   *Hover*: Glow filter expansion, translate-y offset by `-2px`, background color shift to soft amber.
*   *Active*: Compression down to scale `0.98`.

#### Secondary Button (`.btn-ghost-border`)
*   *Rest*: Background `transparent`, Border `1px solid var(--color-coal)`, Text `var(--color-pebble)`.
*   *Hover*: Border color shifts to `var(--color-gold-metallic)`, text to `var(--color-alabaster)`.

### Input Forms
*   All forms feature custom styling where active focus triggers a glow transition:
```css
.input-interactive:focus {
  outline: none;
  border-color: var(--color-saffron-glowing);
  box-shadow: 0 0 15px var(--color-gold-glow);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 6. Elevation Hierarchy

*   **Elevation 0 (Base)**: `#0B0B0C` (Primary background canvas).
*   **Elevation 1 (Cards & Lists)**: `#121214` (Floating sheets, navigation menu background).
*   **Elevation 2 (Modals & Tooltips)**: `#1D1D20` with a sharp overlay shadow (`box-shadow: 0 12px 48px rgba(0,0,0,0.6)`).
