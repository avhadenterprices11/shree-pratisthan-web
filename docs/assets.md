# Asset Management & Media Registry: Shree Prathishthan

This document governs the branding assets, media naming conventions, compression guidelines, and loading rules for all resources within the **Shree Prathishthan** ecosystem.

---

## 1. Directory Structure for Assets

Store all static media files within the `/public` workspace directory, organized by category:

```text
public/
├── assets/
│   ├── brand/           # Core logos, watermarks, symbols
│   ├── images/          # Compressed photography, thumbnails
│   ├── videos/          # Background loop clips, video snippets
│   ├── vectors/         # Custom SVG drawings, ornaments
│   ├── fonts/           # Local web fonts (woff2 formats)
│   └── audio/           # Ambient sound effects
```

---

## 2. Media Naming Conventions

All assets must use lowercase, kebab-case naming structures. Names should start with their component or page prefix to keep files organized:

*   **Brand Assets**: `brand-logo-glow.svg`, `brand-icon-saffron.svg`
*   **Hero Headers**: `hero-bg-portal.webp`, `hero-volunteers-action.webp`
*   **Festival Spotlight**: `event-ganeshotsav-2026.webp`, `event-dahi-handi-safety.webp`
*   **Welfare Portals**: `charity-medical-camp.webp`, `charity-school-notebooks.jpg`

---

## 3. Optimization & Compression Limits

To keep our page loads fast and protect our Core Web Vitals, all assets must fit within strict file size budgets:

| Media Type | Recommended Format | Max File Size | Target Parameters |
| :--- | :--- | :--- | :--- |
| **Hero Image** | `.webp` / `.avif` | `150 KB` | Resolution limit: `1920x1080px`, Quality factor: `80%`. |
| **Inline Visuals** | `.webp` | `80 KB` | Resolution limit: `1000x800px`, Quality factor: `75%`. |
| **Brand Vectors** | `.svg` | `15 KB` | Pre-processed using SVGO to strip editor meta tags. |
| **Looping Video** | `.mp4` / `.webm` | `1.5 MB` | Bitrate limit: `800kbps`, muted, loops, stripped audio tracks. |
| **Web Fonts** | `.woff2` | `40 KB` | Sub-setted to include only active character glyphs. |

---

## 4. Fonts Registry

We load typography assets using local self-hosted configurations to prevent layout shifts.

*   **Display Font**: `Syne` (Weights: `800`).
*   **Heading Font**: `Outfit` (Weights: `600`, `700`).
*   **Body Copy Font**: `Plus Jakarta Sans` (Weights: `400`, `500`).
*   *Optimization*: Use CSS declarations like `font-display: swap` in `@font-face` blocks to prevent invisible text loads.

---

## 5. Web Audio Standards

For micro-interaction sounds (e.g. menu toggles or button hovers):
*   **Format**: Highly compressed `.mp3` or `.ogg` files under `15KB`.
*   **Execution**: Audio contexts must remain uninitialized until a visitor interacts with the page, respecting browser autoplay policies.

---

## 6. CDN & Edge Delivery Rules

*   **Caching Strategy**: Static assets inside `/public/assets` must declare immutable cache headers (`Cache-Control: public, max-age=31536000, immutable`) to speed up loading on return visits.
*   **Edge Optimization**: Vercel's Edge network automatically handles resizing and format negotiations for images loaded via the Next.js `<Image />` wrapper.
*   **Video Delivery**: High-definition video content must be hosted on external CDN platforms (such as Vimeo or YouTube Vids) to keep our primary bundle lightweight.
