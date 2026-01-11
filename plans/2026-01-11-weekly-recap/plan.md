# Implementation Plan: Weekly Spiritual Journey Recap

**Date:** 2026-01-11
**Status:** Ready for Implementation
**Estimated Complexity:** Quick Win (Low)
**Backend Required:** No

---

## Overview

Add a weekly recap modal that auto-triggers on first app open of each week, displaying:
1. Top 3 most drawn tarot cards from the week
2. AI-generated spiritual insight based on those cards
3. Encouraging empty state if no readings

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State management | Zustand (existing) | Already in use, persists to localStorage |
| AI provider | Gemini (existing) | Already integrated with fallback |
| Week detection | ISO week standard | Cross-locale consistency |
| Modal trigger | MainLayout useEffect | Runs on every route, single check point |
| i18n | react-i18next (existing) | Already supports VI/EN |

---

## Files to Create/Modify

### New Files
| File | Purpose |
|------|---------|
| `src/utils/weekHelper.ts` | ISO week calculation utilities |
| `src/components/weekly-recap/index.tsx` | Recap modal component |
| `src/utils/recapHelper.ts` | Weekly stats computation + AI call |

### Modified Files
| File | Changes |
|------|---------|
| `src/zustand/index.zustand.ts` | Add `lastShownRecapWeek` state + action |
| `src/types/index.type.ts` | Add `WeeklyRecapData` type |
| `src/pages/main-layout/index.tsx` | Add recap trigger logic + render modal |
| `src/language/en.json` | Add recap translations |
| `src/language/vi.json` | Add recap translations |

---

## Implementation Phases

### Phase 1: Utilities & Types

**File: `src/utils/weekHelper.ts`**
```typescript
// Get ISO week string: "2026-W02"
export const getISOWeek = (date: Date = new Date()): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
};

// Get start/end of current week (Monday-Sunday)
export const getWeekBounds = (date: Date = new Date()): { start: Date; end: Date } => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const start = new Date(d.setDate(diff));
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};
```

**File: `src/types/index.type.ts`** (additions)
```typescript
export type WeeklyRecapData = {
  weekId: string; // "2026-W02"
  totalReadings: number;
  topCards: { cardId: string; count: number }[];
  aiInsight: string | null;
  generatedAt: number;
};
```

---

### Phase 2: Zustand Store Extension

**File: `src/zustand/index.zustand.ts`** (additions)

Add to `AppState` type:
```typescript
// Weekly Recap State
lastShownRecapWeek: string | null;
cachedRecapData: WeeklyRecapData | null;

// Weekly Recap Actions
setLastShownRecapWeek: (weekId: string) => void;
setCachedRecapData: (data: WeeklyRecapData | null) => void;
```

Add to store implementation:
```typescript
lastShownRecapWeek: null,
cachedRecapData: null,

setLastShownRecapWeek: (weekId) => set({ lastShownRecapWeek: weekId }),
setCachedRecapData: (data) => set({ cachedRecapData: data }),
```

---

### Phase 3: Recap Data Helper

**File: `src/utils/recapHelper.ts`**

```typescript
import type { JournalEntry } from "@/types/index.type";
import { getWeekBounds, getISOWeek } from "./weekHelper";
import { TAROT_DECK } from "@/data/index.data";
import { GoogleGenAI } from "@google/genai";

const TEXT_OUT_MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-3-flash"];

export const computeWeeklyStats = (journal: JournalEntry[]) => {
  const { start, end } = getWeekBounds();

  // Filter entries from current week
  const weekEntries = journal.filter(entry => {
    const entryDate = entry.timestamp;
    return entryDate >= start.getTime() && entryDate <= end.getTime();
  });

  // Count card occurrences
  const cardCounts = new Map<string, number>();
  weekEntries.forEach(entry => {
    const current = cardCounts.get(entry.cardId) || 0;
    cardCounts.set(entry.cardId, current + 1);
  });

  // Sort by count, get top 3
  const topCards = Array.from(cardCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cardId, count]) => ({ cardId, count }));

  return {
    weekId: getISOWeek(),
    totalReadings: weekEntries.length,
    topCards,
  };
};

export const generateWeeklyInsight = async (
  topCards: { cardId: string; count: number }[],
  language: string
): Promise<string> => {
  if (topCards.length === 0) return "";

  const cardNames = topCards
    .map(tc => TAROT_DECK.find(c => c.id === tc.cardId)?.name || "Unknown")
    .join(", ");

  const isVi = language === "vi";

  const prompt = isVi
    ? `Bạn là bậc thầy Tarot. Tuần này người dùng đã rút các lá: ${cardNames}.
       Viết 2-3 câu nhận xét tổng quan về tuần của họ và lời khuyên cho tuần tới.
       Phong cách: Huyền bí, truyền cảm hứng, ngắn gọn.`
    : `You are a Tarot master. This week the user drew these cards: ${cardNames}.
       Write 2-3 sentences summarizing their week and advice for next week.
       Style: Mystical, inspiring, concise.`;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  for (const model of TEXT_OUT_MODELS) {
    try {
      const response = await ai.models.generateContent({ model, contents: prompt });
      if (response.text) return response.text;
    } catch (e) {
      continue;
    }
  }

  return isVi
    ? "Các vì sao đang suy ngẫm về hành trình của bạn..."
    : "The stars are contemplating your journey...";
};
```

---

### Phase 4: Weekly Recap Modal Component

**File: `src/components/weekly-recap/index.tsx`**

Structure:
```
WeeklyRecapModal
├── Backdrop (click to dismiss)
├── Modal Container (cosmic gradient bg)
│   ├── Header ("Your Week in Cards")
│   ├── Content Area
│   │   ├── IF hasReadings:
│   │   │   ├── Top Cards Grid (3 cards with images + counts)
│   │   │   ├── AI Insight Box
│   │   │   └── Stats Row (total readings)
│   │   └── ELSE (Empty State):
│   │       ├── Encouraging Icon
│   │       ├── Encouraging Message
│   │       └── CTA Button → Navigate to reading
│   └── Footer
│       ├── "Continue to App" button
│       └── (Optional) Share hint text
```

Key visual specs:
- Full-screen modal on mobile
- Max-width 500px centered on desktop
- Background: `bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a]`
- Card images: 80x120px with golden border glow
- Animations: fade-in + scale-up on mount
- Close: X button top-right + backdrop click

---

### Phase 5: Modal Trigger Integration

**File: `src/pages/main-layout/index.tsx`**

Add to imports:
```typescript
import { getISOWeek } from "@/utils/weekHelper";
import WeeklyRecapModal from "@/components/weekly-recap";
```

Add state:
```typescript
const [showRecap, setShowRecap] = useState(false);
```

Add to existing `useEffect` or create new one:
```typescript
useEffect(() => {
  const currentWeek = getISOWeek();
  const { lastShownRecapWeek } = useAppStore.getState();

  if (lastShownRecapWeek !== currentWeek) {
    setShowRecap(true);
  }
}, []);
```

Add modal render before main content:
```typescript
{showRecap && (
  <WeeklyRecapModal
    onClose={() => {
      setShowRecap(false);
      useAppStore.getState().setLastShownRecapWeek(getISOWeek());
    }}
  />
)}
```

---

### Phase 6: i18n Translations

**English (`src/language/en.json`):**
```json
{
  "recap": {
    "title": "Your Week in Cards",
    "subtitle": "A mystical reflection on your journey",
    "top_cards": "Most Drawn Cards",
    "times_drawn": "drawn {{count}} times",
    "ai_insight_title": "Cosmic Insight",
    "total_readings": "{{count}} readings this week",
    "continue": "Continue to App",
    "empty_title": "A Quiet Week",
    "empty_message": "No readings this week - let's change that!",
    "empty_cta": "Start a Reading"
  }
}
```

**Vietnamese (`src/language/vi.json`):**
```json
{
  "recap": {
    "title": "Tuần Của Bạn Qua Các Lá Bài",
    "subtitle": "Nhìn lại hành trình tâm linh",
    "top_cards": "Lá Bài Xuất Hiện Nhiều Nhất",
    "times_drawn": "rút {{count}} lần",
    "ai_insight_title": "Thông Điệp Vũ Trụ",
    "total_readings": "{{count}} lần đọc bài tuần này",
    "continue": "Tiếp Tục",
    "empty_title": "Một Tuần Yên Tĩnh",
    "empty_message": "Chưa có lần đọc bài nào tuần này - hãy bắt đầu nhé!",
    "empty_cta": "Bắt Đầu Đọc Bài"
  }
}
```

---

## Implementation Order

| Step | Task | Dependencies |
|------|------|--------------|
| 1 | Create `weekHelper.ts` | None |
| 2 | Add types to `index.type.ts` | None |
| 3 | Extend Zustand store | Step 2 |
| 4 | Create `recapHelper.ts` | Steps 1, 2 |
| 5 | Add i18n translations | None |
| 6 | Build `WeeklyRecapModal` component | Steps 1-5 |
| 7 | Integrate trigger in `MainLayout` | Steps 3, 6 |
| 8 | Test all scenarios | All |

---

## Testing Checklist

### Functional Tests
- [ ] Modal shows on first open of new week
- [ ] Modal does NOT show again after dismissal (same week)
- [ ] Modal shows again next week
- [ ] Top cards correctly calculated from journal
- [ ] Cards display correct images and names
- [ ] AI insight generates without error
- [ ] Empty state shows when 0 readings
- [ ] Empty state CTA navigates to home
- [ ] Continue button dismisses modal
- [ ] Backdrop click dismisses modal
- [ ] X button dismisses modal

### Edge Cases
- [ ] User with no journal entries ever
- [ ] User with 1 reading (only 1 top card)
- [ ] User with 2 readings of same card (count = 2)
- [ ] Week boundary: reading on Sunday vs Monday
- [ ] Gemini API failure → fallback message shows
- [ ] Language switch: recap shows in correct language

### Visual Tests
- [ ] Mobile layout (full-screen)
- [ ] Desktop layout (centered modal)
- [ ] Dark theme styling consistent
- [ ] Light theme styling consistent
- [ ] Card images load correctly
- [ ] Animations smooth

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Gemini API rate limit | AI insight fails | Pre-cached fallback message |
| Large journal (performance) | Slow computation | Limit iteration, memoize |
| Week boundary confusion | Wrong week detected | Use ISO standard, test thoroughly |
| Modal blocks navigation | Bad UX | Dismiss on route change |

---

## Future Enhancements (Out of Scope)

1. **Past Recaps History** - Store recaps, view in profile
2. **Share to Social** - Generate shareable image
3. **Monthly/Yearly Recap** - Longer timeframe summaries
4. **Streak Integration** - Show streak count in recap

---

## Success Criteria

1. Recap modal triggers correctly on new week
2. Top cards accurately reflect journal data
3. AI insight is relevant and well-formatted
4. Empty state encourages engagement
5. No regressions to existing functionality
6. Bilingual support works correctly
