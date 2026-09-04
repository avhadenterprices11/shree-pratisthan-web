# AI Prompt Library: Shree Prathishthan

This document serves as our master library of structured prompts. Use these prompts with LLMs and generative image models to generate assets, copy, animations, or code that matches the **Shree Prathishthan** brand.

---

## 1. Code Generation Prompts

### A. Homepage Layout Prompt
```text
Act as a senior frontend engineer specialized in high-end design systems. Write a Next.js 16 (App Router) page component for the Shree Prathishthan homepage. The page must use a deep obsidian background (#0B0B0C) and incorporate glowing saffron (#E26A36) and metallic gold (#D4AF37) accents.
Ensure:
1. Complete responsiveness using Tailwind CSS v4.
2. Proper structural markup using HTML5 semantic tags.
3. Call-to-action sections with accessible aria-labels.
4. Clean TypeScript interface definitions for all component props.
```

### B. Interactive Hero Component Prompt
```text
Act as a senior React developer. Write a Client Component named `HeroSection.tsx` for a premium cultural trust website. The component should feature a dual-column layout:
- Left: A high-contrast text block featuring a split-line heading ("Reshaping Community through Cultural Strength").
- Right: A container for an interactive, layered visual card.
Add references to GSAP animations to handle word-by-word reveals on mount.
Ensure the layout is responsive and optimizes typography sizes using CSS clamp properties.
```

### C. GSAP Animation & ScrollTrigger Prompt
```text
Act as a creative developer specialized in GSAP. Write a React hook named `useScrollReveal` that uses GSAP ScrollTrigger to animate children elements of a target container.
Requirements:
1. Target elements with classes `.reveal-item` and fade them in with a slight vertical slide (y: 30 to y: 0) as they enter the viewport.
2. Ensure ScrollTrigger cleanup is run on component unmount to prevent memory leaks.
3. Optimize performance by using CSS transforms and avoiding layout shifts.
```

### D. Custom Cursor & Interactive Trail Prompt
```text
Write a React Client Component for a custom cursor trail effect.
Details:
1. The cursor should consist of an inner pointer dot and an outer trailing glow circle.
2. Use absolute positioning and drive coordinates using a requestAnimationFrame loop linked to pointer events to prevent layout lag.
3. On hovering over elements with a `data-hover="pointer"` attribute, animate the trailing circle to scale up by 2x and change color to saffron.
4. Ensure the custom cursor trail is disabled on mobile viewports (< 768px).
```

---

## 2. Copy & Content Generation Prompts

### A. Core Branding Slogans
```text
Act as an elite copywriter. Write five distinct slogans for "Shree Prathishthan", a public social and cultural trust based in Maharashtra. The slogans should combine Maharashtra's cultural heritage with active social service. The tone should be noble, dignified, and community-focused.
Provide versions in both English and Marathi.
```

### B. Festival & Social Project Descriptions
```text
Write an engaging, three-paragraph description for a festival highlight card showcasing "Shree Ganeshotsav" as organized by Shree Prathishthan. The description should highlight the grand cultural celebration while emphasizing the trust's social welfare initiatives (such as medical checkups and blood donation drives) organized during the festival.
```

---

## 3. Media & Asset Generation Prompts

### A. Midjourney Portrait Photography Prompt
```text
A professional editorial portrait of an Indian volunteer coordinator working at a rural social development camp, warm sunset lighting, soft saffron-gold color accents, captured on a 85mm lens, high-definition details, realistic skin textures, depth of field --ar 16:9 --style raw --v 6.0
```

### B. Midjourney Festival Portal Graphic Prompt
```text
An abstract, high-end digital illustration of a glowing Ganesha silhouette, constructed with golden particle trails and copper light flows on a deep obsidian canvas, premium design aesthetic, clean vector lines, smooth glow effects --ar 1:1 --v 6.0
```
