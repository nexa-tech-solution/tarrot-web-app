---
title: "Performance Optimization Phase 2"
description: "Animation optimization, bundle splitting, and dictionary virtualization"
status: pending
priority: P2
effort: 4h
branch: main
tags: [performance, frontend, optimization]
created: 2026-01-12
---

# Performance Optimization Phase 2

## Overview

Continue performance improvements after Phase 1 (completed). Focus on remaining animation optimization, bundle size reduction via dynamic imports, and dictionary page virtualization.

## Phase 1 Recap (Completed)

| Task | Status |
|------|--------|
| Replace GIF with CSS gradient | ✅ Done |
| Move inline styles to index.css | ✅ Done |
| Self-host stardust texture | ✅ Done |
| Add lazy loading to images | ✅ Done |
| Reduced motion support | ✅ Done |
| Remove Compass spin animation | ✅ Done |

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Fix Dictionary Page | Pending | 1h | [phase-01](./phase-01-fix-dictionary.md) |
| 2 | Animation Reduction | Pending | 1h | [phase-02](./phase-02-animation-reduction.md) |
| 3 | Bundle Optimization | Pending | 2h | [phase-03](./phase-03-bundle-optimization.md) |

## Success Metrics

- **Lighthouse Performance:** > 70 (mobile)
- **Dictionary page FPS:** > 50fps
- **Bundle size reduction:** -100KB gzipped
- **LCP:** < 2.5s

## Dependencies

- Phase 1 complete (verified)
- `@tanstack/react-virtual` for virtualization (optional)
