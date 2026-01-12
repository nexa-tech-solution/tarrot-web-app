# Performance Optimization Brainstorm

**Date:** 2026-01-12
**Status:** Approved for Implementation
**Approach:** Moderate Refactor

---

## Problem Statement

The tarot web app experiences significant performance issues on mobile devices:
- Slow initial page load (3-5+ seconds)
- UI lag/jank during animations
- Stuttering on card reveals and transitions
- Overall sluggish feel across the app

---

## Root Cause Analysis

### Critical Issues (Ranked by Impact)

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | External GIF background (~2-5MB) | `reading/index.tsx:29-32` | 3-5s delay + constant jank |
| 2 | Inline `<style>` keyframes recreated per render | Multiple components | 50-100ms per render |
| 3 | External texture images | `reading/index.tsx:359`, `multi-card-grid/index.tsx:101` | 100-300ms per card |
| 4 | No lazy loading for card images | All card components | 2-10s initial load |
| 5 | 8+ simultaneous CSS animations | Reading page | 60fps → 15-20fps |
| 6 | ~9000 lines of card data in bundle | `playing-cards.*.data.ts` | +100-200KB JS |

---

## Approved Solution

### Phase 1: Critical Fixes

#### 1.1 Replace GIF with CSS Gradient Animation
**Before:**
```tsx
backgroundImage: "url('https://i.pinimg.com/originals/64/56/a1/...')"
```

**After:** Create animated cosmic gradient in CSS:
```css
.mystical-bg {
  background: linear-gradient(135deg, #090514 0%, #1a1a2e 50%, #090514 100%);
  background-size: 400% 400%;
  animation: cosmic-drift 20s ease infinite;
}
@keyframes cosmic-drift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

Add floating particles via CSS pseudo-elements or a lightweight canvas.

#### 1.2 Move Inline Styles to index.css
Extract all `<style>{...}</style>` blocks from:
- `src/pages/reading/index.tsx` (lines 579-632)
- `src/components/card-item/index.tsx` (lines 92-97)
- `src/components/floating-chat-bot/index.tsx` (lines 93-101)
- `src/components/multi-card-grid/index.tsx` (if any)

Consolidate into `src/index.css`.

#### 1.3 Self-Host Stardust Texture
- Download `stardust.png` from transparenttextures.com
- Convert to WebP (< 5KB)
- Place in `public/textures/stardust.webp`
- Update references:
  ```tsx
  bg-[url('/textures/stardust.webp')]
  ```

#### 1.4 Add Lazy Loading to Images
```tsx
<img
  src={card.image}
  alt={card.name}
  loading="lazy"
  decoding="async"
  className="..."
/>
```

---

### Phase 2: Animation Optimization

#### 2.1 Reduce Concurrent Animations
**Current:** 8+ animations running simultaneously
**Target:** Max 3-4 key animations

Keep:
- Card flip animation (core UX)
- Subtle pulse on interactive elements
- Fade-in for content

Remove/simplify:
- `animate-float-slow` on background
- `animate-spin-slow` on Compass icon
- Multiple `animate-pulse` on decorative elements
- `animate-shimmer` (keep only on hover)

#### 2.2 Use GPU-Accelerated Properties
Replace `top/left` animations with `transform`:
```css
/* Bad */
@keyframes float { 0% { top: 0; } 50% { top: -20px; } }

/* Good */
@keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
```

#### 2.3 Respect Reduced Motion Preference
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Phase 3: Bundle Optimization (Optional)

#### 3.1 Dynamic Import Card Data
```tsx
// src/data/tarrot.data.tsx
const loadCardData = async (lang: string) => {
  const module = await import(`./playing-cards.${lang}.data.ts`);
  return module.default;
};
```

#### 3.2 Virtual Scrolling for Dictionary
If dictionary page shows all 78 cards, implement virtual scrolling using:
- `@tanstack/react-virtual` (recommended, lightweight)
- Or native CSS `content-visibility: auto`

---

## Implementation Priority

| Priority | Task | Estimated Impact |
|----------|------|-----------------|
| P0 | Replace GIF with CSS gradient | -3-5s load time |
| P0 | Move inline styles to CSS | -50-100ms per render |
| P1 | Self-host texture | -100-300ms per card |
| P1 | Add lazy loading | -2-5s dictionary load |
| P2 | Reduce animations | +30-40fps on mobile |
| P2 | Reduced motion support | Accessibility win |
| P3 | Dynamic imports | -100KB bundle size |

---

## Success Metrics

- **LCP (Largest Contentful Paint):** < 2.5s (currently ~5-8s)
- **FPS during animations:** > 50fps (currently ~15-20fps)
- **Total bundle size:** < 300KB gzipped
- **Lighthouse Performance score:** > 70 (mobile)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| CSS gradient looks less "mystical" | Add subtle particle overlay via CSS or canvas |
| Lazy images show placeholders | Use blur-up technique with tiny base64 thumbnails |
| Reduced animations feel static | Keep 2-3 key animations on primary interactive elements |

---

## Files to Modify

1. `src/index.css` - Add consolidated keyframes
2. `src/pages/reading/index.tsx` - Replace GIF, remove inline styles
3. `src/components/card-item/index.tsx` - Remove inline styles, add lazy loading
4. `src/components/multi-card-grid/index.tsx` - Update texture path, add lazy loading
5. `src/components/floating-chat-bot/index.tsx` - Remove inline styles
6. `public/textures/stardust.webp` - New self-hosted texture

---

## Next Steps

1. Create implementation plan via `/plan:fast`
2. Implement Phase 1 (Critical Fixes)
3. Measure with Lighthouse
4. Implement Phase 2 if needed
5. Test on target mobile devices
