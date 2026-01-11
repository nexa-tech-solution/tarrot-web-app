# Brainstorm: Multi-Card Spread Types

**Date:** 2026-01-11
**Project:** Mystic Tarot Web App
**Objective:** Add Celtic Cross, Yes/No, and Relationship spreads

---

## Problem Statement

Current app only supports 1-card and 3-card (AI chat) readings. User wants to add:
1. **Celtic Cross** - 10-card deep reading (most requested traditional spread)
2. **Yes/No Spread** - Quick binary answer readings
3. **Relationship Spread** - Couples reading (6 cards, 3 per person)

**Priority:** Polished release, all 3 spreads together
**Constraints:** No backend, extend existing ReadingPage, mobile-friendly grid layout

---

## Current Architecture Analysis

### Existing SpreadType Structure
```typescript
type SpreadType = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bg: string;
  border: string;
  color: string;
  dataKey: string;  // Single key for 1-card reading
  question: string;
};
```

**Limitation:** `dataKey` assumes 1 card. Multi-card spreads need position-specific interpretations.

### Current ReadingPage Flow
1. User selects spread from home
2. ReadingPage draws 1 random card
3. Card meaning shown from `dataKey` (overview/love/career/finance)
4. User can save to journal

---

## Proposed Solution: Config-Driven Multi-Card Spreads

### Extended SpreadType Structure

```typescript
type SpreadPosition = {
  id: string;           // e.g., "past", "present", "future"
  name: string;         // Display name: "The Past"
  description: string;  // What this position represents
  gridPosition?: {      // For layout
    row: number;
    col: number;
  };
};

type SpreadType = {
  // Existing fields
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bg: string;
  border: string;
  color: string;
  question: string;

  // New fields for multi-card
  cardCount: number;          // 1, 2, 6, 10, etc.
  positions: SpreadPosition[]; // Array of position configs
  layout: "single" | "grid" | "celtic" | "relationship";
  dataKey?: string;           // Keep for 1-card backward compat
};
```

### Spread Configurations

**Yes/No Spread (2 cards)**
```typescript
{
  id: "yesno",
  title: "Yes or No",
  cardCount: 2,
  layout: "grid",
  positions: [
    { id: "yes", name: "Yes Energy", description: "Forces supporting your question" },
    { id: "no", name: "No Energy", description: "Forces opposing your question" }
  ]
}
```

**Relationship Spread (6 cards)**
```typescript
{
  id: "relationship",
  title: "Relationship Spread",
  cardCount: 6,
  layout: "relationship",
  positions: [
    // Partner 1
    { id: "p1_feelings", name: "Your Feelings", description: "How you feel" },
    { id: "p1_thoughts", name: "Your Thoughts", description: "What you think" },
    { id: "p1_actions", name: "Your Actions", description: "What you do" },
    // Partner 2
    { id: "p2_feelings", name: "Their Feelings", description: "How they feel" },
    { id: "p2_thoughts", name: "Their Thoughts", description: "What they think" },
    { id: "p2_actions", name: "Their Actions", description: "What they do" }
  ]
}
```

**Celtic Cross (10 cards)**
```typescript
{
  id: "celtic",
  title: "Celtic Cross",
  cardCount: 10,
  layout: "celtic",
  positions: [
    { id: "present", name: "Present", description: "Current situation" },
    { id: "challenge", name: "Challenge", description: "Immediate obstacle" },
    { id: "past", name: "Foundation", description: "Basis of the situation" },
    { id: "recent", name: "Recent Past", description: "Recent influences" },
    { id: "crown", name: "Crown", description: "Best possible outcome" },
    { id: "future", name: "Near Future", description: "Coming influences" },
    { id: "self", name: "Self", description: "Your attitude" },
    { id: "environment", name: "Environment", description: "External influences" },
    { id: "hopes", name: "Hopes/Fears", description: "Your hopes and fears" },
    { id: "outcome", name: "Outcome", description: "Final outcome" }
  ]
}
```

---

## UI/UX Design Decisions

### Mobile-First Grid Layouts

**Yes/No (2 cards)**
```
┌─────────┬─────────┐
│   YES   │   NO    │
│  Card   │  Card   │
└─────────┴─────────┘
```

**Relationship (6 cards)**
```
┌─────── YOU ───────┐  ┌───── THEM ──────┐
│ Feel │ Think │ Act │  │ Feel │ Think │ Act │
└──────┴───────┴─────┘  └──────┴───────┴─────┘
```
Mobile: 2 columns × 3 rows

**Celtic Cross (10 cards)**
```
Simplified Mobile Grid (2×5):
┌────┬────┐
│ 1  │ 2  │  Present + Challenge
├────┼────┤
│ 3  │ 4  │  Foundation + Recent
├────┼────┤
│ 5  │ 6  │  Crown + Near Future
├────┼────┤
│ 7  │ 8  │  Self + Environment
├────┼────┤
│ 9  │ 10 │  Hopes + Outcome
└────┴────┘
```

### Reading Flow (Extended)

1. User selects spread from home
2. ReadingPage detects `cardCount`
3. If single card → existing behavior
4. If multi-card:
   - Show all card backs in grid layout
   - User taps to reveal one by one (or "Reveal All")
   - Each card shows position name
   - Tap card to see full meaning modal
5. Summary view shows all cards + interpretation
6. Save all cards to journal (extended JournalEntry)

---

## Data Model Changes

### JournalEntry Extension
```typescript
type JournalEntry = {
  id: string;
  date: string;
  timestamp: number;
  spreadId: string;
  note: string;

  // Change from single to array
  cardIds: string[];           // Was: cardId
  cardPositions?: string[];    // Position IDs for multi-card
};
```

### Backward Compatibility
- Existing journal entries have `cardId` (single)
- Migration: wrap in array `[cardId]`
- Or: keep `cardId` as optional, prefer `cardIds`

---

## Implementation Phases

| Phase | Tasks | Complexity |
|-------|-------|------------|
| 1 | Extend SpreadType with positions config | Low |
| 2 | Add new spread definitions (Yes/No, Relationship, Celtic) | Medium |
| 3 | Build MultiCardGrid component | Medium |
| 4 | Extend ReadingPage for multi-card flow | High |
| 5 | Add position-specific meaning displays | Medium |
| 6 | Extend JournalEntry for multi-card | Low |
| 7 | Update i18n for all new content | Low |
| 8 | Testing all spread combinations | Medium |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| UI complexity for 10 cards on mobile | Poor UX | Use scrollable grid, sequential reveal |
| Position interpretations are complex | Content gap | Use generic position meaning + card general meaning |
| Breaking existing journal entries | Data loss | Keep backward compat, support both formats |
| Performance with many cards | Slow | Lazy load card images |

---

## Success Criteria

1. All 3 new spread types accessible from home
2. Multi-card layout renders correctly on mobile/desktop
3. Each position shows contextual meaning
4. Cards saveable to journal with all positions
5. No regression on existing 1-card spreads
6. Bilingual support (VI/EN) for all new content

---

## Alternatives Considered

### Option A: Separate Pages per Spread (Rejected)
- **Pros:** Optimal UX per spread, no shared complexity
- **Cons:** Code duplication, harder to maintain, inconsistent experience
- **Verdict:** Violates DRY, not chosen

### Option B: Generic Spread Engine (Rejected for now)
- **Pros:** Maximum flexibility, custom spreads possible
- **Cons:** Over-engineering, YAGNI, complex abstraction
- **Verdict:** Premature optimization, defer to future

### Option C: Extend Existing ReadingPage (Chosen)
- **Pros:** Reuse existing code, consistent UX, simpler
- **Cons:** Page becomes more complex
- **Verdict:** Best balance of pragmatism and maintainability

---

## Next Steps

1. Update SpreadType type definition
2. Create spread config for Yes/No, Relationship, Celtic
3. Build MultiCardGrid component
4. Extend ReadingPage with multi-card logic
5. Add position-specific interpretation views
6. Update JournalEntry for multi-card support
7. Add i18n translations
8. Comprehensive testing
