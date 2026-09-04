# Motion System & Interaction Guide: Shree Prathishthan

This document governs all animations, scroll behaviors, interactive transitions, and performance optimizations inside the **Shree Prathishthan** frontend workspace.

---

## 1. Smooth Scroll Setup (Lenis)

We use Lenis for unified, performance-oriented smooth scrolling across all devices.

### Initialization Configuration
Place this config within a custom provider or layout wrapper (e.g., `components/providers/ScrollProvider.tsx`):

```typescript
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

## 2. GSAP Entrance Timeline (Hero Animation)

When a visitor lands on the home page, an elegant entrance timeline is triggered to reveal key components sequentially without causing cumulative layout shift.

### Sequence Details
1.  **Loader Fade-Out**: A black overlay curtains outwards.
2.  **Hero Heading Reveal**: The heading split-text is animated upwards.
3.  **Visual Background Glow**: Ambient copper lights ease into visibility.
4.  **Header On-boarding**: Navigation links and social icons slide down.

### GSAP Code Implementation
```typescript
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function useHeroEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate lines/letters up
      tl.from('.hero-reveal-line', {
        yPercent: 100,
        stagger: 0.15,
        duration: 1.4,
      })
      .from('.hero-ambient-glow', {
        opacity: 0,
        scale: 0.8,
        duration: 2.0,
      }, '-=1.0')
      .from('.header-nav-item', {
        y: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
      }, '-=1.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
```

---

## 3. Scroll-Triggered Text Reveal (Split-Text Effect)

Sections use staggered scroll reveals to dynamically fade text into view as it is scrolled into the viewport.

### Implementation Blueprint
Using `gsap/dist/ScrollTrigger`:
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal(element: HTMLElement) {
  gsap.fromTo(
    element.querySelectorAll('.char-reveal'),
    { opacity: 0.1, y: 15 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      duration: 1.0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: true,
      },
    }
  );
}
```

---

## 4. Interactive Card Extensions (Hover Skews)

Cards feature micro-animations on mouse movements, adjusting their 3D skew to create depth.

### Code Pattern
```typescript
import { useState } from 'react';

export function InteractiveCard({ children }: { children: React.ReactNode }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt intensity limit
    setRotate({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="glass-panel rounded-block p-md"
    >
      {children}
    </div>
  );
}
```

---

## 5. Cursor Effects & Mouse Interaction

We implement a refined cursor trail effect that expands when hovering over interactive elements.

*   **Default State**: A clean 6px dot surrounded by a 24px soft glow ring (`rgba(226, 106, 54, 0.3)`).
*   **Hover State**: The outer ring scales up to `50px` and changes border color to `var(--color-gold-metallic)`, while the dot expands to `10px`.
*   **Performance Constraint**: Handled in a raw requestAnimationFrame callback loop to avoid React rerender lags on pointerMove.

---

## 6. Performance & Animation Rules

1.  **Hardware Acceleration**: Apply `will-change: transform` to complex moving elements.
2.  **ScrollTrigger Cleanup**: Always execute `ScrollTrigger.getAll().forEach(t => t.kill())` inside component unmount phases to prevent memory leaks.
3.  **Media Query Limits**: Disable CPU-heavy particle systems and cursor trails on devices with screen widths below `768px` (Mobile) or when battery saver is active.
