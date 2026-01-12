# Phase 1: Fix Dictionary Page

## Priority: P1
## Status: Pending
## Effort: 1h

## Overview

Dictionary page still uses external stardust texture. Also missing `decoding="async"` on some images. Quick fixes.

## Key Issues

1. External texture URL on line 367: `https://www.transparenttextures.com/patterns/stardust.png`
2. Modal images missing lazy loading attributes

## Related Files

| File | Action | Description |
|------|--------|-------------|
| `src/pages/dictionary/index.tsx` | Modify | Update texture path, add lazy attrs |

## Implementation Steps

### Step 1: Update Stardust Texture Path

**Location:** `src/pages/dictionary/index.tsx:367`

**Before:**
```tsx
<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5" />
```

**After:**
```tsx
<div className="absolute inset-0 bg-[url('/textures/stardust.png')] opacity-5" />
```

### Step 2: Add Lazy Loading to Modal Images

**Location:** `src/pages/dictionary/index.tsx:207-220`

Add `loading="lazy"` and `decoding="async"` to both images in `TarotDetailModal`:

```tsx
// Line 207-210 (blur background)
<img
  src={card.image}
  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125"
  alt=""
  loading="lazy"
  decoding="async"
/>

// Line 216-220 (main image)
<img
  src={card.image}
  alt={card.name}
  className="w-full h-full object-cover"
  loading="lazy"
  decoding="async"
/>
```

## Todo List

- [ ] Update stardust texture path to local
- [ ] Add lazy loading to modal blur background image
- [ ] Add lazy loading to modal main image
- [ ] Verify no external URLs remain

## Success Criteria

- No external texture URLs in dictionary page
- All images have `loading="lazy" decoding="async"`
- Build passes without errors

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| None | Low | Simple path change |
