# Implementation Plan: Multi-Card Spread Types

**Date:** 2026-01-11
**Project:** Mystic Tarot Web App
**Brainstorm:** `docs/brainstorm-multi-card-spreads-2026-01-11.md`

---

## Executive Summary

Add three new multi-card spread types to Mystic Tarot: **Celtic Cross** (10 cards), **Yes/No** (2 cards), and **Relationship** (6 cards). Implementation uses config-driven architecture extending existing SpreadType, with mobile-friendly grid layouts and data-driven meanings.

**Constraints:**
- No backend (localStorage/Zustand only)
- Extend existing ReadingPage (no separate pages)
- Polished release (all 3 spreads together)
- Mobile-first responsive layouts

---

## Architecture Overview

### Current State

```
SpreadType (single card)
├── id, title, subtitle, icon, colors
├── dataKey → single meaning key (overview/love/career/finance)
└── question
```

**ReadingPage flow:** Select spread → Draw 1 card → Show meaning from dataKey → Save to journal

### Target State

```
SpreadType (multi-card capable)
├── id, title, subtitle, icon, colors
├── question
├── cardCount: number (1, 2, 6, 10)
├── layout: "single" | "grid" | "celtic" | "relationship"
├── positions: SpreadPosition[] (for multi-card)
└── dataKey?: string (backward compat for single card)

SpreadPosition
├── id, name, description
└── gridPosition?: { row, col }
```

**Extended flow:** Select spread → Detect cardCount → Draw N cards → Grid layout → Position-specific meanings → Save all to journal

---

## Implementation Phases

### Phase 1: Type Definitions
**File:** `src/types/index.type.ts`

Add new types:

```typescript
export type SpreadPosition = {
  id: string;           // e.g., "past", "present", "challenge"
  name: string;         // Display: "The Past"
  description: string;  // What position represents
  gridPosition?: {      // Optional grid placement
    row: number;
    col: number;
  };
};

export type SpreadLayout = "single" | "grid" | "celtic" | "relationship";

// Extend existing SpreadType (backward compatible)
export type SpreadType = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ForwardRefExoticComponent<...>;
  bg: string;
  border: string;
  color: string;
  question: string;

  // New fields for multi-card
  cardCount?: number;           // Default: 1
  positions?: SpreadPosition[]; // Multi-card positions
  layout?: SpreadLayout;        // Default: "single"
  dataKey?: string;             // Keep for 1-card backward compat
};
```

Extend JournalEntry:

```typescript
export type JournalEntry = {
  id: string;
  date: string;
  spreadId: string;
  note: string;
  timestamp: number;

  // Support both single and multi-card
  cardId?: string;              // Legacy single card (backward compat)
  cardIds?: string[];           // Multi-card array
  cardPositions?: string[];     // Position IDs matching cardIds
};
```

---

### Phase 2: Spread Configurations
**Files:** `src/data/index.data.tsx`, `src/data/spreads.data.ts` (new)

Create new spreads config file:

```typescript
// src/data/spreads.data.ts
import type { SpreadPosition } from "@/types/index.type";
import { HelpCircle, Heart, Grid3X3 } from "lucide-react";

// Yes/No Spread (2 cards)
export const YESNO_POSITIONS: SpreadPosition[] = [
  { id: "yes", name: "Yes Energy", description: "Forces supporting your question" },
  { id: "no", name: "No Energy", description: "Forces opposing your question" }
];

// Relationship Spread (6 cards)
export const RELATIONSHIP_POSITIONS: SpreadPosition[] = [
  // Partner 1 (You)
  { id: "p1_feelings", name: "Your Feelings", description: "How you feel", gridPosition: { row: 0, col: 0 } },
  { id: "p1_thoughts", name: "Your Thoughts", description: "What you think", gridPosition: { row: 0, col: 1 } },
  { id: "p1_actions", name: "Your Actions", description: "What you do", gridPosition: { row: 0, col: 2 } },
  // Partner 2 (Them)
  { id: "p2_feelings", name: "Their Feelings", description: "How they feel", gridPosition: { row: 1, col: 0 } },
  { id: "p2_thoughts", name: "Their Thoughts", description: "What they think", gridPosition: { row: 1, col: 1 } },
  { id: "p2_actions", name: "Their Actions", description: "What they do", gridPosition: { row: 1, col: 2 } }
];

// Celtic Cross (10 cards)
export const CELTIC_POSITIONS: SpreadPosition[] = [
  { id: "present", name: "Present", description: "Current situation", gridPosition: { row: 0, col: 0 } },
  { id: "challenge", name: "Challenge", description: "Immediate obstacle", gridPosition: { row: 0, col: 1 } },
  { id: "past", name: "Foundation", description: "Basis of the situation", gridPosition: { row: 1, col: 0 } },
  { id: "recent", name: "Recent Past", description: "Recent influences", gridPosition: { row: 1, col: 1 } },
  { id: "crown", name: "Crown", description: "Best possible outcome", gridPosition: { row: 2, col: 0 } },
  { id: "future", name: "Near Future", description: "Coming influences", gridPosition: { row: 2, col: 1 } },
  { id: "self", name: "Self", description: "Your attitude", gridPosition: { row: 3, col: 0 } },
  { id: "environment", name: "Environment", description: "External influences", gridPosition: { row: 3, col: 1 } },
  { id: "hopes", name: "Hopes/Fears", description: "Your hopes and fears", gridPosition: { row: 4, col: 0 } },
  { id: "outcome", name: "Outcome", description: "Final outcome", gridPosition: { row: 4, col: 1 } }
];
```

Add to `index.data.tsx`:

```typescript
// New multi-card spreads
{
  id: "yesno",
  title: "Yes or No",
  subtitle: "Quick binary answer",
  icon: HelpCircle,
  color: "text-cyan-400",
  bg: "bg-cyan-400/10",
  border: "border-cyan-400/20",
  cardCount: 2,
  layout: "grid",
  positions: YESNO_POSITIONS,
  question: "Ask a yes or no question to the universe"
},
{
  id: "relationship",
  title: "Relationship",
  subtitle: "Love connection reading",
  icon: Heart,
  color: "text-pink-400",
  bg: "bg-pink-400/10",
  border: "border-pink-400/20",
  cardCount: 6,
  layout: "relationship",
  positions: RELATIONSHIP_POSITIONS,
  question: "How does the energy flow between you and your partner?"
},
{
  id: "celtic",
  title: "Celtic Cross",
  subtitle: "Deep 10-card reading",
  icon: Grid3X3,
  color: "text-violet-400",
  bg: "bg-violet-400/10",
  border: "border-violet-400/20",
  cardCount: 10,
  layout: "celtic",
  positions: CELTIC_POSITIONS,
  question: "What deep insights does the universe reveal?"
}
```

---

### Phase 3: Multi-Card Grid Component
**File:** `src/components/multi-card-grid/index.tsx` (new)

Build flexible grid component:

```typescript
interface MultiCardGridProps {
  cards: (TarrotCard | null)[];  // null = not yet drawn
  positions: SpreadPosition[];
  layout: SpreadLayout;
  revealedIndices: number[];     // Which cards are flipped
  onCardClick: (index: number) => void;
  theme: ThemeMode;
}
```

**Layout strategies:**

1. **Grid layout (Yes/No):** Simple 2-column side-by-side
2. **Relationship layout:** 2 rows × 3 columns with labels "You" / "Them"
3. **Celtic layout:** 2 columns × 5 rows (mobile-friendly simplification)

**Card states:**
- Hidden (card back, clickable)
- Revealed (card face, position label)
- Selected (highlighted for detail view)

---

### Phase 4: Extend ReadingPage
**File:** `src/pages/reading/index.tsx`

Major modifications:

1. **Detect multi-card mode:**
```typescript
const isMultiCard = (selectedSpread?.cardCount ?? 1) > 1;
const cardCount = selectedSpread?.cardCount ?? 1;
```

2. **State for multiple cards:**
```typescript
const [cards, setCards] = useState<(TarrotCard | null)[]>([]);
const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
```

3. **Draw multiple unique cards:**
```typescript
const handleDraw = () => {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  const drawnCards = shuffled.slice(0, cardCount);
  setCards(drawnCards);
};
```

4. **Render logic:**
```typescript
{isMultiCard ? (
  <MultiCardGrid
    cards={cards}
    positions={selectedSpread.positions!}
    layout={selectedSpread.layout!}
    revealedIndices={revealedIndices}
    onCardClick={handleCardReveal}
    theme={theme}
  />
) : (
  // Existing single card render
)}
```

5. **Meaning display:** Show position name + generic card meaning (from `overview`)

6. **Reveal All button:** Optional button to reveal all cards at once

---

### Phase 5: Journal Entry Extension
**File:** `src/zustand/index.zustand.ts`

Update `addJournalEntry`:

```typescript
addJournalEntry: (entryData) =>
  set((state) => {
    const now = new Date();
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      date: now.toLocaleDateString("vi-VN"),
      timestamp: now.getTime(),
      ...entryData,
    };
    return { journal: [newEntry, ...state.journal] };
  }),
```

Support both formats:
- Legacy: `{ cardId: "the-fool", spreadId: "daily", note: "..." }`
- Multi: `{ cardIds: ["the-fool", "the-magician"], cardPositions: ["yes", "no"], spreadId: "yesno", note: "..." }`

**Backward compatibility:** Keep `cardId` for old entries, prefer `cardIds` for new.

---

### Phase 6: Position Meaning Display
**File:** `src/components/position-meaning/index.tsx` (new)

Display position-specific interpretation:

```typescript
interface PositionMeaningProps {
  card: TarrotCard;
  position: SpreadPosition;
  onClose: () => void;
}
```

Content formula:
- Position name and description (from SpreadPosition)
- Card name, image, keywords
- Card `overview` meaning (generic interpretation)
- Note input for this specific card

---

### Phase 7: i18n Translations
**Files:** `src/language/en/index.json`, `src/language/vi/index.json`

Add translations:

```json
"spreads": {
  "yesno": {
    "title": "Yes or No",
    "subtitle": "Quick binary answer",
    "question": "Ask a yes or no question to the universe",
    "positions": {
      "yes": { "name": "Yes Energy", "desc": "Forces supporting your question" },
      "no": { "name": "No Energy", "desc": "Forces opposing your question" }
    }
  },
  "relationship": {
    "title": "Relationship",
    "subtitle": "Love connection reading",
    "question": "How does the energy flow between you and your partner?",
    "partner1_label": "You",
    "partner2_label": "Them",
    "positions": { ... }
  },
  "celtic": {
    "title": "Celtic Cross",
    "subtitle": "Deep 10-card reading",
    "question": "What deep insights does the universe reveal?",
    "positions": { ... }
  }
},
"reading": {
  // Add new keys
  "reveal_all": "Reveal All",
  "cards_remaining": "{{count}} cards remaining",
  "position_label": "Position",
  "tap_to_reveal": "Tap cards to reveal"
}
```

---

### Phase 8: Journal Display Update
**File:** `src/pages/journal/index.tsx`

Update journal list to handle multi-card entries:

1. Show spread type badge (Celtic Cross, Yes/No, Relationship)
2. Display card count or mini thumbnails
3. Detail modal shows all cards in grid

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/types/index.type.ts` | Modify | Add SpreadPosition, extend SpreadType, extend JournalEntry |
| `src/data/spreads.data.ts` | Create | Position configs for all new spreads |
| `src/data/index.data.tsx` | Modify | Add 3 new spread definitions |
| `src/components/multi-card-grid/index.tsx` | Create | Grid layout component |
| `src/components/position-meaning/index.tsx` | Create | Position-specific meaning modal |
| `src/pages/reading/index.tsx` | Modify | Multi-card flow logic |
| `src/zustand/index.zustand.ts` | Modify | Support cardIds array in addJournalEntry |
| `src/pages/journal/index.tsx` | Modify | Display multi-card entries |
| `src/language/en/index.json` | Modify | Add spread translations |
| `src/language/vi/index.json` | Modify | Add spread translations |

---

## Implementation Order

1. **Phase 1:** Type definitions (foundation)
2. **Phase 2:** Spread configurations (data)
3. **Phase 7:** i18n translations (parallel with above)
4. **Phase 3:** MultiCardGrid component
5. **Phase 6:** PositionMeaning component
6. **Phase 4:** ReadingPage extension (core logic)
7. **Phase 5:** Journal entry extension
8. **Phase 8:** Journal display update

---

## Testing Checklist

- [ ] Yes/No spread: 2 cards draw, reveal, save
- [ ] Relationship spread: 6 cards in 2×3 grid, both partner labels
- [ ] Celtic Cross: 10 cards in 2×5 mobile grid, all positions
- [ ] Reveal one-by-one and "Reveal All" button
- [ ] Position meaning modal shows correct position info
- [ ] Journal saves all cards with positions
- [ ] Journal displays multi-card entries correctly
- [ ] Backward compat: Existing 1-card spreads unchanged
- [ ] Backward compat: Old journal entries display correctly
- [ ] Mobile responsiveness for all layouts
- [ ] i18n: All content in EN/VI

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| UI complexity for 10 cards on mobile | 2×5 scrollable grid, sequential reveal encouraged |
| Position interpretation depth | Use generic card `overview` + position context |
| Breaking old journal entries | Keep `cardId` support, add `cardIds` as new field |
| Performance with many cards | Cards already preloaded, minimal overhead |

---

## Success Criteria

1. All 3 spreads accessible from home page
2. Multi-card grids render correctly on mobile/desktop
3. Each position shows contextual meaning
4. All cards saved to journal with positions
5. No regression on existing 1-card spreads
6. Bilingual support (VI/EN) for all content
7. Build passes, no TypeScript errors

---

## Notes

- **Interpretation strategy:** Position description + card overview (no AI, data-driven)
- **No separate pages:** All spreads use extended ReadingPage
- **Card uniqueness:** Shuffle and slice, no duplicates in single spread
