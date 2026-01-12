# Phase 3: Bundle Optimization

## Priority: P3
## Status: Pending
## Effort: 2h

## Overview

Card data files total ~9200 lines (~100-200KB JS). Implement dynamic imports to load only needed language data. Optionally add virtual scrolling for dictionary.

## Current State

```
src/data/playing-cards.en.data.ts  - 4615 lines
src/data/playing-cards.vi.data.ts  - 4586 lines
Total: 9201 lines
```

Both files loaded at app start via `src/data/tarrot.data.tsx`.

## Solution: Dynamic Language-Based Import

### Approach A: Lazy Load by Language (Recommended)

Only load card data for current language. Use React Suspense for loading state.

**Benefits:**
- 50% bundle reduction (one language at a time)
- Simple implementation
- Works with existing i18n

**Drawbacks:**
- Initial language load has brief delay
- Language switch requires new fetch

### Approach B: Keep Both Languages (Current)

No change. Accept larger bundle.

**Benefits:**
- Instant language switching
- No loading states

**Drawbacks:**
- ~200KB always loaded

## Recommended: Approach A

## Related Files

| File | Action | Description |
|------|--------|-------------|
| `src/data/tarrot.data.tsx` | Modify | Add dynamic import logic |
| `src/App.tsx` or root | Modify | Add Suspense boundary if needed |

## Implementation Steps

### Step 1: Modify tarrot.data.tsx for Dynamic Import

**Current implementation:**
```tsx
import i18n from "@/language";
import PLAYING_CARDS_VI from "./playing-cards.vi.data";
import PLAYING_CARDS_EN from "./playing-cards.en.data";

const TARROT_CARDS = i18n.language.startsWith("vi")
  ? PLAYING_CARDS_VI
  : PLAYING_CARDS_EN;

export default TARROT_CARDS;
```

**New implementation:**
```tsx
import i18n from "@/language";
import { lazy, Suspense, useState, useEffect } from "react";

export type TarrotCard = {
  // ... existing type definition
};

// Lazy load functions
const loadViCards = () => import("./playing-cards.vi.data").then(m => m.default);
const loadEnCards = () => import("./playing-cards.en.data").then(m => m.default);

// For sync access (preloaded)
let cachedCards: TarrotCard[] = [];

export const loadCardData = async (): Promise<TarrotCard[]> => {
  if (cachedCards.length > 0) return cachedCards;

  const isVi = i18n.language.startsWith("vi");
  cachedCards = isVi ? await loadViCards() : await loadEnCards();
  return cachedCards;
};

// Hook for components
export const useCardData = () => {
  const [cards, setCards] = useState<TarrotCard[]>(cachedCards);
  const [loading, setLoading] = useState(cachedCards.length === 0);

  useEffect(() => {
    if (cachedCards.length === 0) {
      loadCardData().then(data => {
        setCards(data);
        setLoading(false);
      });
    }
  }, []);

  return { cards, loading };
};

// Legacy export for backward compatibility (sync, uses cache)
export default cachedCards;
```

### Step 2: Update Components to Use Hook

Components that need card data should migrate to `useCardData()`:

```tsx
// Before
import TARROT_CARDS from "@/data/tarrot.data";

// After
import { useCardData } from "@/data/tarrot.data";

const MyComponent = () => {
  const { cards, loading } = useCardData();

  if (loading) return <LoadingSpinner />;

  return cards.map(card => ...);
};
```

### Step 3: Preload Data on App Init

In `App.tsx` or `main.tsx`, preload card data:

```tsx
import { loadCardData } from "@/data/tarrot.data";

// Preload on app start
loadCardData();
```

## Optional: Virtual Scrolling for Dictionary

If dictionary still has performance issues after above changes, implement virtual scrolling:

**Option 1: CSS content-visibility (simplest)**
```tsx
<div className="grid" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
  {cards.map(card => <CardItem key={card.id} />)}
</div>
```

**Option 2: @tanstack/react-virtual (most control)**
```bash
npm install @tanstack/react-virtual
```

## Todo List

- [ ] Refactor tarrot.data.tsx for dynamic imports
- [ ] Create useCardData hook
- [ ] Update dictionary page to use hook
- [ ] Update reading page to use hook
- [ ] Add preload in App.tsx
- [ ] Test language switching still works
- [ ] Verify bundle size reduction
- [ ] (Optional) Add virtual scrolling to dictionary

## Success Criteria

- Bundle size reduced by ~100KB
- Card data loads within 200ms
- No regression in functionality
- Language switching still works

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Loading delay visible | Medium | Preload on app init, show skeleton |
| Language switch issues | Medium | Clear cache on language change |
| Legacy code breaks | High | Keep backward-compat export |

## Testing Checklist

- [ ] Dictionary page loads cards correctly
- [ ] Reading page draws cards correctly
- [ ] Language switch updates card data
- [ ] Bundle analyzer shows reduced size
- [ ] No console errors
