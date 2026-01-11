# Brainstorm: Weekly Spiritual Journey Recap

**Date:** 2026-01-11
**Project:** Mystic Tarot Web App
**Objective:** Increase daily user retention and emotional bond with the app

---

## Problem Statement

User wants to add a feature that:
1. Attracts users to spend more time in the app
2. Creates daily/weekly return triggers
3. Builds emotional connection (sunk cost effect)
4. Works WITHOUT backend (localStorage/Zustand only)
5. Is a quick win (low complexity)

---

## Discovery Summary

### Current App State
- Journal system exists but passive (users don't revisit)
- Daily streak label shown but not tracked
- Badge system UI exists but lacks progression
- AI-powered readings via Gemini API
- Full 78-card tarot dataset with bilingual support

### User's Core Need
Not just "view history" but create **emotional investment** - users with history become attached and harder to churn.

---

## Approaches Evaluated

### Option 1: Daily Quest System (Rejected)
- Duolingo-style streaks + challenges
- **Pros:** Strong daily return trigger, gamification works
- **Cons:** More complex, requires streak tracking logic, potential user anxiety

### Option 2: Personalized Daily Card (Rejected)
- Rotating "card of the day" based on zodiac + moon
- **Pros:** Curiosity trigger, quick to build
- **Cons:** Less emotional depth, transactional feel

### Option 3: Reading History Timeline (Evolved)
- Initially selected, evolved into something more interactive
- User wanted more than passive journal browsing
- Led to: Journey Recap concept

---

## Final Recommended Solution

### Feature: Weekly Spiritual Journey Recap

**Concept:** Instagram-Wrapped-style weekly summary that appears every Sunday/Monday, showing user's tarot journey through beautiful visual story cards.

### Core Components

| Component | Description |
|-----------|-------------|
| **Trigger** | Auto-modal on first app open after Sunday midnight |
| **Format** | Cosmic-themed visual story cards (screenshot-friendly) |
| **Content 1** | Top 3 most drawn cards this week with images |
| **Content 2** | AI-generated spiritual insight based on week's cards |
| **Empty State** | Encouraging CTA: "No readings this week - let's change that!" |
| **Storage** | LocalStorage via Zustand (no backend) |

### UX Flow

```
User opens app (Mon-Sun)
    ↓
Check: Is this first open of new week?
    ↓
Check: Has recap been shown for this week?
    ↓
If No → Show Weekly Recap Modal
    ↓
Display: Cosmic gradient background
         Top cards with mystical animation
         AI-generated weekly insight
         "Share" button (screenshot UX)
         "Continue to app" CTA
    ↓
Mark recap as shown in localStorage
```

### Visual Design Direction

- Consistent with app's cosmic/mystical theme
- Dark gradient background (purple → indigo → black)
- Card images with subtle glow effects
- Typography: Serif headers, clean body text
- Shareable format (optimized for screenshot)
- Mobile-first (full-screen modal)

### Data Model Extension

```typescript
// Add to Zustand store
weeklyRecap: {
  lastShownWeek: string | null; // e.g., "2026-W02"
}

// Computed from existing journal entries
getWeeklyStats(): {
  cardsDrawn: TarotCard[];
  topCards: { card: TarotCard; count: number }[];
  totalReadings: number;
  weekStart: Date;
  weekEnd: Date;
}
```

### AI Prompt Template

```
Based on this user's tarot readings this week:
- Cards drawn: [list of card names]
- Most frequent: [top 3 cards]

Write a 2-3 sentence mystical weekly insight in [user's language].
Focus on patterns, growth themes, or guidance for next week.
Keep it personal and encouraging.
```

---

## Implementation Considerations

### What Makes This "Quick Win"

1. **Reuses existing data** - Journal already stores readings with timestamps
2. **Reuses existing AI** - Gemini integration already working
3. **Simple trigger logic** - Compare current week to last shown week
4. **Familiar UI patterns** - Modal component likely exists

### Technical Requirements

- Compute week number from date (ISO week)
- Filter journal entries by current week
- Group/count cards drawn
- Call Gemini API for summary
- Store "last shown week" in localStorage
- Full-screen modal component

### Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| User misses recap (opens after Monday) | Show for entire week until dismissed |
| Too many API calls for AI | Cache weekly summary after first generation |
| No readings = boring recap | Encouraging empty state with CTA |
| User wants to see past recaps | Future: Add "Past Recaps" section in Profile |

---

## Success Metrics

1. **Weekly Active Users (WAU)** - Track if Sunday/Monday opens increase
2. **Recap view rate** - % of users who see recap vs dismiss immediately
3. **Post-recap engagement** - Do users do a reading after seeing recap?
4. **Streak improvement** - Does recap correlate with longer streaks?

---

## Validation Criteria

- [ ] Recap appears correctly on first open of new week
- [ ] Top cards calculated accurately from journal data
- [ ] AI generates relevant, personalized insight
- [ ] Empty state shows encouragement for zero readings
- [ ] Modal displays correctly on all screen sizes
- [ ] Recap marked as shown (doesn't repeat same week)

---

## Next Steps

1. Design visual mockups for recap cards
2. Extend Zustand store with recap tracking
3. Build week calculation utility
4. Create recap modal component
5. Integrate Gemini for weekly insight
6. Test across edge cases (no readings, many readings, week boundary)

---

## Decision Log

| Question | Decision | Rationale |
|----------|----------|-----------|
| Feature type | One core feature | Focus over scatter |
| Effort level | Quick wins | Fast to ship, validate impact |
| Backend | None | Keep it simple, localStorage works |
| Feature pick | Journey Recap | Emotional bond > passive features |
| Recap frequency | Weekly | Balance between too frequent and too rare |
| Visual format | Story cards | Shareable, emotional, fits app theme |
| Content | Top cards + AI summary | Personalized without overengineering |
| Trigger | Auto-modal | Ensures users see it |
| Empty state | Encouragement | Turns inactive week into CTA |
