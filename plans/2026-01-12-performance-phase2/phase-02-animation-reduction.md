# Phase 2: Animation Reduction

## Priority: P2
## Status: Pending
## Effort: 1h

## Overview

Reduce remaining decorative animations to improve mobile FPS. Keep only essential UX animations.

## Current Animation Audit

| Animation | Location | Keep? | Reason |
|-----------|----------|-------|--------|
| `animate-pulse` on Sparkles | dictionary:129 | Remove | Decorative only |
| `animate-pulse` on chatbot icon | floating-chat-bot:40 | Keep | Interactive feedback |
| `animate-float` on BrainCircuit | floating-chat-bot:71 | Remove | Constant, not essential |
| `animate-ping` on notification | floating-chat-bot:77 | Keep | User attention |
| Multiple `animate-pulse` | reading page | Audit | Keep interactive only |

## Animation Strategy

**Keep (Core UX):**
- Card flip animation
- Button hover effects
- Modal transitions
- Notification indicators

**Remove/Simplify:**
- Continuous decorative pulses
- Floating animations on static elements
- Multiple concurrent pulses

## Related Files

| File | Action | Description |
|------|--------|-------------|
| `src/pages/dictionary/index.tsx` | Modify | Remove animate-pulse from decorative Sparkles |
| `src/components/floating-chat-bot/index.tsx` | Modify | Remove animate-float from BrainCircuit |

## Implementation Steps

### Step 1: Dictionary Page - Remove Decorative Pulse

**Location:** `src/pages/dictionary/index.tsx:129`

**Before:**
```tsx
<Sparkles size={14} className="text-amber-300 animate-pulse" />
```

**After:**
```tsx
<Sparkles size={14} className="text-amber-300" />
```

### Step 2: Floating Chatbot - Remove Float Animation

**Location:** `src/components/floating-chat-bot/index.tsx:71`

**Before:**
```tsx
<BrainCircuit
  size={28}
  className="text-white group-hover:text-indigo-300 transition-colors animate-float"
/>
```

**After:**
```tsx
<BrainCircuit
  size={28}
  className="text-white group-hover:text-indigo-300 transition-colors"
/>
```

### Step 3: Audit Reading Page Animations

Review `src/pages/reading/index.tsx` for any remaining non-essential animations:
- Check for `animate-pulse` on decorative elements
- Keep only on interactive buttons/indicators

## Todo List

- [ ] Remove animate-pulse from dictionary Sparkles
- [ ] Remove animate-float from BrainCircuit icon
- [ ] Audit reading page for excessive animations
- [ ] Test mobile performance after changes

## Success Criteria

- Concurrent animations reduced to max 3-4
- Mobile FPS during normal use > 50fps
- Visual feedback still present on interactive elements

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| UI feels static | Medium | Keep animations on primary CTAs |
| User misses important elements | Low | Keep notification indicators |
