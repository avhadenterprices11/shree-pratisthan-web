# Global UI Rules & Constraints: Shree Prathishthan

This document establishes the rigid layout rules, contrast parameters, accessibility requirements, and component patterns that govern our frontend codebase. Developers and AI models must strictly adhere to these visual guidelines.

---

## 1. Spacing Rules & Constraints

*   **Vertical Section Margins**: All top-level page sections must use a standard vertical spacing of `clamp(4rem, 10vw, 8rem)` (`--space-lg` to `--space-xl`) to provide adequate layout breathing room.
*   **Grid Column Gaps**: Desktop grid spacing is fixed at `var(--space-md)` (32px), collapsing to `var(--space-sm)` (16px) on viewports `< 768px`.
*   **Layout Alignment**: All pages must align to a 12-column grid layout on desktop, using standard left/right margin limits of `clamp(1.5rem, 5vw, 6rem)`.

---

## 2. Color Application Guidelines

*   **Background Canvas Constraint**: Do not use solid black `#000000`. Use the obsidian dark variant `#0B0B0C` as it provides a softer background for bright glowing accents.
*   **Contrast Safeguards**:
    *   Body text (`var(--color-pebble)`) must remain at a minimum of `rgba(255, 255, 255, 0.65)` opacity.
    *   Do not overlay dark text directly on dark container backgrounds. Secondary details must reside on Level 1 or Level 2 cards (`#121214` or `#1D1D20`).
*   **Accent Color Usage**: Keep accents restrained. Apply the primary saffron glow `#E26A36` to CTAs, active states, and focal metrics. Use the gold accent `#D4AF37` for structural borders, badges, and decorative symbols.

---

## 3. Typography Hierarchy Rules

*   **Heading Line-height Limits**: To keep bold typography tight, display headers must have line-height values between `0.9` and `1.1`.
*   **Font Weights**:
    *   Display/Page Titles: `800` (Extra Bold)
    *   Section Subheaders: `600` (Semi Bold)
    *   Body Copy: `400` (Regular)
*   **Case Conventions**: Use uppercase styling with increased letter spacing (`letter-spacing: 0.1em`) for category tags, dates, statistics labels, and navigation buttons.

---

## 4. Borders & Corner Radii

*   **Corner Radii Conventions**:
    *   Outer Card wrappers, grids, and image frames must use `--radius-block` (24px).
    *   Form input fields, dropdown containers, and tabs must use `--radius-interactive` (12px).
    *   Active button elements, tags, and badges must use `--radius-pill` (9999px).
*   **Border Weight Rules**: Maintain clean visual lines by limiting standard border weights to `1px`. Use a subtle white border opacity (`rgba(255, 255, 255, 0.08)`) on dark containers to preserve depth.

---

## 5. Iconography Guidelines

*   **Library**: Standardize on **Lucide Icons** (`lucide-react`).
*   **Visual Balance**: Keep icons aligned with adjacent text elements, using standard sizing constraints of `16px` to `20px` to maintain a clean layout balance.
*   **Color Matching**: Icons must match their parent text's color properties. In highlighted states, transition icon colors to saffron (`var(--color-saffron-glowing)`) or gold (`var(--color-gold-metallic)`).

---

## 6. Standard Interactive Hover & Loading States

### Hover Animation Rules
*   Every interactive component (buttons, cards, links) must react immediately on hover.
*   Hover states should feature a slight vertical lift (`transform: translateY(-2px)`) and a transition duration of `0.3s` using ease-out easing (`cubic-bezier(0.16, 1, 0.3, 1)`).

### Loading Skeleton Conventions
*   Avoid loading screens that block the viewport. Use structural skeleton cards instead.
*   Skeletons must match the dimensions of their target cards, using a dark gray pulse effect:
```css
@keyframes skeleton-pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}
.skeleton-layer {
  background: var(--color-obsidian-sheet);
  animation: skeleton-pulse 1.8s infinite ease-in-out;
}
```

---

## 7. Accessibility Safeguards (WCAG AA)

*   **Keyboard Navigation**: All interactive elements must focus via standard tab keys, showing a clear border focus indicator.
*   **ARIA Labelling**: Complex widgets like slide-out panels, form inputs, and accordion drawers must include descriptive ARIA labels.
*   **Screen Reader Navigation**: Images must use descriptive alt texts, and layout headers must follow a logical nesting order (`h1` -> `h2` -> `h3`).
