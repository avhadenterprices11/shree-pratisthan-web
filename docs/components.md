# Component Blueprint Library: Shree Prathishthan

This document serves as the structural specification sheet for our master React component library. All implementations should map exactly to these layouts, states, responsiveness rules, and animation properties.

---

## 1. Global Navigation (Navbar)

*   **Layout**: Full-width horizontal flex container, fixed at top. Uses absolute coordinates with CSS variables for dynamic height sizing.
*   **Structure**: Logo (Left), Menu Links (Center), "Join Us" CTA (Right).
*   **States**:
    *   *Rest (Top)*: Transparent background, white text.
    *   *Scrolled (Down)*: Transitions to a glassmorphic sheet (`backdrop-filter: blur(16px)`), height transitions from `90px` to `70px`.
*   **Variants**: Desktop (Flex Row), Mobile (Burger Toggle with slide-over drawer).
*   **Animation Rules**: GSAP staggered opacity fade-in on mount.

---

## 2. Hero Section (`<Hero />`)

*   **Layout**: Min-height `100vh`. Standard two-column desktop grid. Left: Text layout, Display headlines, and primary action triggers. Right: Multi-layered image/3D portal container.
*   **States**: Dynamic parallax translation on scroll.
*   **Variants**:
    *   *Default*: Split grid.
    *   *Festival Landing*: Centered overlay with heavy ambient particle effects.
*   **Animation Rules**: GSAP entrance timeline triggers split-text reveals on page load.

---

## 3. Festival Spotlight Card (`<FestivalCard />`)

*   **Layout**: Grid card with a 16:9 media preview on top and content metadata on bottom.
*   **Structure**:
    ```text
    ┌───────────────────────────┐
    │     Media Container       │
    │     (Hover: Scale Zoom)   │
    ├───────────────────────────┤
    │ Title                     │
    │ Date & Location           │
    │ Action: "Learn More" (→)  │
    └───────────────────────────┘
    ```
*   **States**:
    *   *Default*: Matte border, blurred image backing.
    *   *Hover*: Image zooms inward, borders illuminate with a gold gradient, and the CTA button shifts right by `5px`.
*   **Animation Rules**: GSAP scroll-triggered 3D tilt.

---

## 4. Interactive Timeline (`<Timeline />`)

*   **Layout**: Alternating left/right items arranged along a central progress line that fills dynamically as the user scrolls.
*   **Structure**:
    *   *Center Line*: 2px solid charcoal base, saffron-gold foreground filling on scroll.
    *   *Nodes*: Dynamic points that illuminate on viewport intersection.
*   **Responsive Rules**: On viewports `< 768px`, collapse the line to the left border, shifting all content items to the right side of the track.
*   **Animation Rules**: GSAP ScrollTrigger maps the line's scale-y property directly to the scroll position.

---

## 5. Media Masonry Grid (`<GalleryGrid />`)

*   **Layout**: Dynamic columns (`repeat(auto-fill, minmax(300px, 1fr))`) containing varying height assets (images and video loop snippets).
*   **States**: Hovering reveals descriptions and details via a slide-up matte overlay.
*   **Responsive Rules**: Standard grids collapse to single columns on mobile.
*   **Animation Rules**: ScrollTrigger drives a staggered fade-and-rise entrance effect (`y: 50`, `opacity: 0`).

---

## 6. Dynamic Count-up Stats (`<Stats />`)

*   **Layout**: Horizontal flex-row in a glassmorphic container, spanning the full width of the container.
*   **Structure**: Metric (Display Text), Descriptor (Small uppercase label).
*   **States**: Counts up once from 0 to the target number upon entering the viewport.
*   **Animation Rules**: Uses GSAP target counters:
```typescript
gsap.fromTo(element, { innerText: 0 }, {
  innerText: targetValue,
  duration: 2,
  snap: { innerText: 1 },
  scrollTrigger: { trigger: element, start: "top 80%" }
});
```

---

## 7. Interactive Accordions (`<Accordion />`)

*   **Layout**: Vertical stack of collapsible panels.
*   **Structure**: Header row containing title and indicator (+ / - or caret), followed by collapsible content area.
*   **States**: Active panels expand; other panels collapse automatically.
*   **Accessibility**: Proper ARIA support (`aria-expanded`, `aria-controls`).
*   **Animation Rules**: Uses Tailwind/CSS transitions or Framer Motion (`height: 0` to `height: "auto"`) with an ease curve.

---

## 8. Onboarding Modal Form (`<VolunteerForm />`)

*   **Layout**: Centered, multi-step card overlay with a dark backdrop mask.
*   **Structure**: Personal info step, skill verification step, availability details, and confirmation panel.
*   **States**: Dynamic error states highlighted in crimson (`#FF3333`) with a horizontal shaking animation on invalid submissions.
*   **Animation Rules**: Scale entrance animation (`scale: 0.95` to `scale: 1`) combined with a quick background blur transition.
