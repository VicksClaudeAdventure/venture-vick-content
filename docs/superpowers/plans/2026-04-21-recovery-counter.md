# Recovery Counter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Remotion project that exports two transparent-background counter overlays per Recovery Series episode — an intro counter (first 4s) and an end-card fraction (last 4s) — ready to composite on top of Jay's B-roll in any video editor.

**Architecture:** Single Remotion TypeScript project at `experiments/remotion-recovery-counter/`. Two reusable components (`RecoveryIntroCard`, `RecoveryEndCard`) live in `src/components/`. Each episode registers thin wrapper compositions in `src/episodes/` that pass hardcoded props. All compositions render to ProRes 4444 `.mov` with alpha channel.

**Tech Stack:** Remotion 4.x (React + TypeScript), `@remotion/google-fonts` (Inter), Vitest (unit tests for pure formatters). No Tailwind, no external CSS framework — inline styles only.

**Spec reference:** [docs/superpowers/specs/2026-04-21-recovery-counter-design.md](../specs/2026-04-21-recovery-counter-design.md)

---

## File Map

Files created by this plan:

```
experiments/remotion-recovery-counter/
├── .gitignore                               # ignore node_modules, out/
├── package.json                             # deps + render scripts
├── remotion.config.ts                       # overwrite output, concurrency
├── tsconfig.json                            # strict TS, remotion-compatible
├── vitest.config.ts                         # unit test config
└── src/
    ├── index.tsx                            # Remotion entry — registers Root
    ├── Root.tsx                             # <Composition> registrations
    ├── format.ts                            # USD formatters (pure)
    ├── format.test.ts                       # vitest unit tests for format.ts
    ├── components/
    │   ├── RecoveryIntroCard.tsx            # reusable intro component
    │   └── RecoveryEndCard.tsx              # reusable end-card component
    └── episodes/
        ├── Day1Intro.tsx                    # thin wrapper, hardcoded props
        ├── Day1End.tsx
        ├── Day3Intro.tsx
        └── Day3End.tsx
```

---

## Task 1: Scaffold the Remotion project

**Files:**
- Create: `experiments/remotion-recovery-counter/package.json`
- Create: `experiments/remotion-recovery-counter/tsconfig.json`
- Create: `experiments/remotion-recovery-counter/remotion.config.ts`
- Create: `experiments/remotion-recovery-counter/.gitignore`
- Create: `experiments/remotion-recovery-counter/src/index.tsx`
- Create: `experiments/remotion-recovery-counter/src/Root.tsx`

- [ ] **Step 1: Create the project directory and initialize**

```bash
mkdir -p experiments/remotion-recovery-counter/src
cd experiments/remotion-recovery-counter
```

- [ ] **Step 2: Write `package.json`**

Create `experiments/remotion-recovery-counter/package.json`:

```json
{
  "name": "remotion-recovery-counter",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "remotion studio",
    "build": "remotion bundle",
    "test": "vitest run",
    "test:watch": "vitest",
    "render": "remotion render src/index.tsx",
    "render:day1-intro": "remotion render src/index.tsx Day1Intro out/day1-intro.mov --codec=prores --prores-profile=4444 --concurrency=4",
    "render:day1-end":   "remotion render src/index.tsx Day1End out/day1-end.mov --codec=prores --prores-profile=4444 --concurrency=4",
    "render:day3-intro": "remotion render src/index.tsx Day3Intro out/day3-intro.mov --codec=prores --prores-profile=4444 --concurrency=4",
    "render:day3-end":   "remotion render src/index.tsx Day3End out/day3-end.mov --codec=prores --prores-profile=4444 --concurrency=4",
    "render:all": "npm run render:day1-intro && npm run render:day1-end && npm run render:day3-intro && npm run render:day3-end"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.0",
    "@remotion/google-fonts": "^4.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "typescript": "^5.4.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 3: Write `tsconfig.json`**

Create `experiments/remotion-recovery-counter/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 4: Write `remotion.config.ts`**

Create `experiments/remotion-recovery-counter/remotion.config.ts`:

```ts
import { Config } from '@remotion/cli/config';

Config.setOverwriteOutput(true);
Config.setConcurrency(4);
```

- [ ] **Step 5: Write `.gitignore` for the Remotion project**

Create `experiments/remotion-recovery-counter/.gitignore`:

```
node_modules/
out/
.remotion/
*.log
```

- [ ] **Step 6: Write a placeholder `src/index.tsx`**

Create `experiments/remotion-recovery-counter/src/index.tsx`:

```tsx
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

- [ ] **Step 7: Write a placeholder `src/Root.tsx` with a smoke-test composition**

Create `experiments/remotion-recovery-counter/src/Root.tsx`:

```tsx
import React from 'react';
import { Composition } from 'remotion';

const Smoke: React.FC = () => (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
    <div style={{ color: '#FFF', fontSize: 48 }}>scaffold ok</div>
  </div>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Smoke"
    component={Smoke}
    durationInFrames={30}
    fps={30}
    width={1080}
    height={1920}
  />
);
```

- [ ] **Step 8: Install dependencies**

Run: `cd experiments/remotion-recovery-counter && npm install`
Expected: deps resolve, `node_modules/` created, no errors.

- [ ] **Step 9: Verify the Remotion Studio boots**

Run: `npm start` (from `experiments/remotion-recovery-counter/`)
Expected: Remotion Studio opens in browser at http://localhost:3000 showing a single `Smoke` composition with "scaffold ok" text.
Stop the studio with Ctrl+C after confirming.

- [ ] **Step 10: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/package.json \
        experiments/remotion-recovery-counter/tsconfig.json \
        experiments/remotion-recovery-counter/remotion.config.ts \
        experiments/remotion-recovery-counter/.gitignore \
        experiments/remotion-recovery-counter/src/index.tsx \
        experiments/remotion-recovery-counter/src/Root.tsx
git commit -m "Scaffold Remotion project for Recovery Counter"
```

Note: do **not** commit `package-lock.json` or `node_modules/`. The project's `.gitignore` covers `node_modules/`; add `experiments/remotion-recovery-counter/package-lock.json` to the root `.gitignore` if npm generates one and you want to exclude it, otherwise commit it for reproducible installs. (Default: commit `package-lock.json`.)

---

## Task 2: Add USD formatters in `format.ts` (TDD)

**Files:**
- Create: `experiments/remotion-recovery-counter/src/format.ts`
- Create: `experiments/remotion-recovery-counter/src/format.test.ts`
- Create: `experiments/remotion-recovery-counter/vitest.config.ts`

- [ ] **Step 1: Write `vitest.config.ts`**

Create `experiments/remotion-recovery-counter/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

- [ ] **Step 2: Write the failing tests**

Create `experiments/remotion-recovery-counter/src/format.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { formatUSDCents, formatUSDWhole, formatDropDelta } from './format';

describe('formatUSDCents', () => {
  it('formats integer dollars with two decimals and commas', () => {
    expect(formatUSDCents(34776.15)).toBe('$34,776.15');
  });
  it('rounds to nearest cent', () => {
    expect(formatUSDCents(34776.149)).toBe('$34,776.15');
  });
  it('formats zero', () => {
    expect(formatUSDCents(0)).toBe('$0.00');
  });
});

describe('formatUSDWhole', () => {
  it('formats whole dollars with commas, no decimals', () => {
    expect(formatUSDWhole(250)).toBe('$250');
  });
  it('rounds to nearest dollar', () => {
    expect(formatUSDWhole(249.9)).toBe('$250');
  });
  it('formats zero', () => {
    expect(formatUSDWhole(0)).toBe('$0');
  });
  it('formats large values with commas', () => {
    expect(formatUSDWhole(34776)).toBe('$34,776');
  });
});

describe('formatDropDelta', () => {
  it('prefixes drop amount with an en-dash (not hyphen)', () => {
    expect(formatDropDelta(34776.15, 34526.15)).toBe('\u2013$250.00');
  });
  it('rounds to cents', () => {
    expect(formatDropDelta(100.005, 0)).toBe('\u2013$100.01');
  });
  it('returns empty string when there is no drop', () => {
    expect(formatDropDelta(100, 100)).toBe('');
  });
  it('returns empty string when the value went up (not a drop)', () => {
    expect(formatDropDelta(100, 200)).toBe('');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test` (from `experiments/remotion-recovery-counter/`)
Expected: FAIL with "Cannot find module './format'" or similar.

- [ ] **Step 4: Write minimal implementation to make tests pass**

Create `experiments/remotion-recovery-counter/src/format.ts`:

```ts
const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usdWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatUSDCents(value: number): string {
  return usdCents.format(value);
}

export function formatUSDWhole(value: number): string {
  return usdWhole.format(value);
}

// Returns "–$XXX.XX" (en-dash) when `to < from`, empty string otherwise.
export function formatDropDelta(from: number, to: number): string {
  if (to >= from) return '';
  return '\u2013' + formatUSDCents(from - to);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 11 test cases green.

- [ ] **Step 6: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/vitest.config.ts \
        experiments/remotion-recovery-counter/src/format.ts \
        experiments/remotion-recovery-counter/src/format.test.ts
git commit -m "Add USD formatters with unit tests"
```

---

## Task 3: Build `RecoveryIntroCard` component

**Files:**
- Create: `experiments/remotion-recovery-counter/src/components/RecoveryIntroCard.tsx`
- Modify: `experiments/remotion-recovery-counter/src/Root.tsx` (add preview composition)

- [ ] **Step 1: Create the component file with full implementation**

Create `experiments/remotion-recovery-counter/src/components/RecoveryIntroCard.tsx`:

```tsx
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { formatUSDCents, formatDropDelta } from '../format';

const { fontFamily } = loadFont();

export type RecoveryIntroCardProps = {
  previousTotal: number | null;
  newTotal: number;
  countUpFrames?: number;
  holdFrames?: number;
};

const TEXT_SHADOW =
  '0 6px 36px rgba(0,0,0,0.75), 0 12px 72px rgba(0,0,0,0.55), 0 0 6px rgba(0,0,0,0.9)';

export const RecoveryIntroCard: React.FC<RecoveryIntroCardProps> = ({
  previousTotal,
  newTotal,
  countUpFrames = 60,
  holdFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const startValue = previousTotal ?? 0;

  // Count-up value animation (ease-out cubic, clamped)
  const value = interpolate(frame, [0, countUpFrames], [startValue, newTotal], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Delta chip shows only on drop episodes (previousTotal provided AND different from newTotal)
  const showChip = previousTotal !== null && previousTotal !== newTotal;
  const chipLabel = showChip ? formatDropDelta(previousTotal as number, newTotal) : '';

  // Chip entrance: starts 6 frames after count ends, 10-frame fade-in
  const chipStart = countUpFrames + 6;
  const chipOpacity = interpolate(frame, [chipStart, chipStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipScale = interpolate(frame, [chipStart, chipStart + 10], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipTranslateY = interpolate(frame, [chipStart, chipStart + 10], [36, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#FFF',
            fontWeight: 800,
            fontSize: 192,
            letterSpacing: '-0.035em',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textShadow: TEXT_SHADOW,
          }}
        >
          {formatUSDCents(value)}
        </div>
        {showChip && (
          <div
            style={{
              marginTop: 96,
              background: '#B91C1C',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 48,
              letterSpacing: '0.02em',
              padding: '30px 66px',
              borderRadius: 999,
              boxShadow: '0 12px 54px rgba(0,0,0,0.45)',
              opacity: chipOpacity,
              transform: `translateY(${chipTranslateY}px) scale(${chipScale})`,
            }}
          >
            {chipLabel}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Register a preview composition in `Root.tsx`**

Replace the contents of `experiments/remotion-recovery-counter/src/Root.tsx` with:

```tsx
import React from 'react';
import { Composition } from 'remotion';
import { RecoveryIntroCard } from './components/RecoveryIntroCard';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="IntroPreview_Static"
      component={RecoveryIntroCard}
      durationInFrames={120}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ previousTotal: null, newTotal: 34776.15 }}
    />
    <Composition
      id="IntroPreview_Drop"
      component={RecoveryIntroCard}
      durationInFrames={120}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ previousTotal: 34776.15, newTotal: 34526.15 }}
    />
  </>
);
```

- [ ] **Step 3: Verify visually in the Remotion Studio**

Run: `npm start`
Expected:
- Two compositions visible: `IntroPreview_Static` and `IntroPreview_Drop`.
- `IntroPreview_Static`: large `$0.00` at frame 0, counts up to `$34,776.15` by frame 60, holds. No chip.
- `IntroPreview_Drop`: large `$34,776.15` at frame 0, counts down to `$34,526.15` by frame 60. Red `–$250.00` chip fades in starting frame 66, fully visible by frame 76, holds.
- Background is transparent (Remotion Studio shows a checkerboard or dark backdrop behind transparent areas).
- Number does not clip horizontally.

Stop the studio with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/src/components/RecoveryIntroCard.tsx \
        experiments/remotion-recovery-counter/src/Root.tsx
git commit -m "Add RecoveryIntroCard component with Studio previews"
```

---

## Task 4: Register `Day1Intro` and `Day3Intro` compositions

**Files:**
- Create: `experiments/remotion-recovery-counter/src/episodes/Day1Intro.tsx`
- Create: `experiments/remotion-recovery-counter/src/episodes/Day3Intro.tsx`
- Modify: `experiments/remotion-recovery-counter/src/Root.tsx`

- [ ] **Step 1: Create `Day1Intro.tsx`**

Create `experiments/remotion-recovery-counter/src/episodes/Day1Intro.tsx`:

```tsx
import React from 'react';
import { RecoveryIntroCard } from '../components/RecoveryIntroCard';

// Day 1: declaration episode — no previous total, count from $0 to $34,776.15.
export const Day1Intro: React.FC = () => (
  <RecoveryIntroCard previousTotal={null} newTotal={34776.15} />
);
```

- [ ] **Step 2: Create `Day3Intro.tsx`**

Create `experiments/remotion-recovery-counter/src/episodes/Day3Intro.tsx`:

```tsx
import React from 'react';
import { RecoveryIntroCard } from '../components/RecoveryIntroCard';

// Day 3: first $250 win — count down from $34,776.15 to $34,526.15, show –$250 chip.
export const Day3Intro: React.FC = () => (
  <RecoveryIntroCard previousTotal={34776.15} newTotal={34526.15} />
);
```

- [ ] **Step 3: Update `Root.tsx` to register the episode compositions**

Replace `experiments/remotion-recovery-counter/src/Root.tsx` with:

```tsx
import React from 'react';
import { Composition } from 'remotion';
import { Day1Intro } from './episodes/Day1Intro';
import { Day3Intro } from './episodes/Day3Intro';

const COMMON = {
  durationInFrames: 120,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Day1Intro" component={Day1Intro} {...COMMON} />
    <Composition id="Day3Intro" component={Day3Intro} {...COMMON} />
  </>
);
```

- [ ] **Step 4: Verify in the Studio**

Run: `npm start`
Expected: two compositions listed — `Day1Intro` (matches prior `IntroPreview_Static`) and `Day3Intro` (matches prior `IntroPreview_Drop`). Scrub through both; behavior is identical to the previews from Task 3.

Stop the studio with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/src/episodes/Day1Intro.tsx \
        experiments/remotion-recovery-counter/src/episodes/Day3Intro.tsx \
        experiments/remotion-recovery-counter/src/Root.tsx
git commit -m "Register Day1Intro and Day3Intro compositions"
```

---

## Task 5: Build `RecoveryEndCard` component

**Files:**
- Create: `experiments/remotion-recovery-counter/src/components/RecoveryEndCard.tsx`
- Modify: `experiments/remotion-recovery-counter/src/Root.tsx` (add preview compositions)

- [ ] **Step 1: Create the component file**

Create `experiments/remotion-recovery-counter/src/components/RecoveryEndCard.tsx`:

```tsx
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { formatUSDCents, formatUSDWhole } from '../format';

const { fontFamily } = loadFont();

export type RecoveryEndCardProps = {
  totalOriginal: number;
  previousPaidBack: number;
  newPaidBack: number;
  countUpFrames?: number;
  holdFrames?: number;
};

const TEXT_SHADOW =
  '0 6px 36px rgba(0,0,0,0.75), 0 12px 72px rgba(0,0,0,0.55), 0 0 6px rgba(0,0,0,0.9)';
const LABEL_SHADOW =
  '0 6px 24px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.9)';

const PEAK_SCALE = 1.35;
const SETTLE_FRAMES = 10;

export const RecoveryEndCard: React.FC<RecoveryEndCardProps> = ({
  totalOriginal,
  previousPaidBack,
  newPaidBack,
  countUpFrames = 60,
  holdFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const todayDelta = newPaidBack - previousPaidBack;
  const hasProgressToday = todayDelta > 0;
  const isChanging = previousPaidBack !== newPaidBack;

  // Numerator value
  const value = interpolate(frame, [0, countUpFrames], [previousPaidBack, newPaidBack], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Numerator scale: 1.0 → PEAK during count, PEAK → 1.0 over SETTLE_FRAMES after count.
  // If the value isn't actually changing (Day 1/2/any no-move day), scale stays at 1.0.
  const scale = isChanging
    ? frame < countUpFrames
      ? interpolate(frame, [0, countUpFrames], [1, PEAK_SCALE], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : interpolate(frame, [countUpFrames, countUpFrames + SETTLE_FRAMES], [PEAK_SCALE, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
    : 1;

  const numeratorColor = hasProgressToday ? '#4ADE80' : '#F87171';

  // Status chip — always shown on end card
  const chipStart = countUpFrames + 6;
  const chipOpacity = interpolate(frame, [chipStart, chipStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipScale = interpolate(frame, [chipStart, chipStart + 10], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const chipTranslateY = interpolate(frame, [chipStart, chipStart + 10], [36, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const chipLabel = hasProgressToday
    ? `+${formatUSDWhole(todayDelta)} TODAY`
    : 'NO CHANGE TODAY';
  const chipBackground = hasProgressToday ? '#15803D' : '#B91C1C';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Fraction */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 30,
            whiteSpace: 'nowrap',
            textShadow: TEXT_SHADOW,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              color: numeratorColor,
              display: 'inline-block',
              transform: `scale(${scale})`,
              transformOrigin: 'center bottom',
            }}
          >
            {formatUSDWhole(value)}
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 600,
              fontSize: 120,
              lineHeight: 1,
            }}
          >
            /
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              fontSize: 120,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            {formatUSDCents(totalOriginal)}
          </span>
        </div>

        {/* PAID BACK label */}
        <div
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 600,
            fontSize: 48,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: 78,
            textShadow: LABEL_SHADOW,
          }}
        >
          PAID BACK
        </div>

        {/* Status chip */}
        <div
          style={{
            marginTop: 78,
            background: chipBackground,
            color: '#FFF',
            fontWeight: 700,
            fontSize: 48,
            letterSpacing: '0.02em',
            padding: '30px 66px',
            borderRadius: 999,
            boxShadow: '0 12px 54px rgba(0,0,0,0.45)',
            opacity: chipOpacity,
            transform: `translateY(${chipTranslateY}px) scale(${chipScale})`,
          }}
        >
          {chipLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Add preview compositions in `Root.tsx`**

Replace `experiments/remotion-recovery-counter/src/Root.tsx` with:

```tsx
import React from 'react';
import { Composition } from 'remotion';
import { Day1Intro } from './episodes/Day1Intro';
import { Day3Intro } from './episodes/Day3Intro';
import { RecoveryEndCard } from './components/RecoveryEndCard';

const COMMON = {
  durationInFrames: 120,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Day1Intro" component={Day1Intro} {...COMMON} />
    <Composition id="Day3Intro" component={Day3Intro} {...COMMON} />
    <Composition
      id="EndPreview_NoProgress"
      component={RecoveryEndCard}
      defaultProps={{ totalOriginal: 34776.15, previousPaidBack: 0, newPaidBack: 0 }}
      {...COMMON}
    />
    <Composition
      id="EndPreview_Progress"
      component={RecoveryEndCard}
      defaultProps={{ totalOriginal: 34776.15, previousPaidBack: 0, newPaidBack: 250 }}
      {...COMMON}
    />
  </>
);
```

- [ ] **Step 3: Verify in the Studio**

Run: `npm start`
Expected:
- Four compositions listed: two intros (from prior tasks) and two end-card previews.
- `EndPreview_NoProgress`: `$0 / $34,776.15` — numerator is red `#F87171`, no scale pulse, `PAID BACK` label below, red `NO CHANGE TODAY` chip fades in at frame 66.
- `EndPreview_Progress`: numerator counts `$0 → $250` in green `#4ADE80`, scales up 1.0 → 1.35 during count, scales back to 1.0 between frames 60–70 (landing flush with denominator size). Green `+$250 TODAY` chip fades in at frame 66.

Stop the studio with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/src/components/RecoveryEndCard.tsx \
        experiments/remotion-recovery-counter/src/Root.tsx
git commit -m "Add RecoveryEndCard component with Studio previews"
```

---

## Task 6: Register `Day1End` and `Day3End` compositions

**Files:**
- Create: `experiments/remotion-recovery-counter/src/episodes/Day1End.tsx`
- Create: `experiments/remotion-recovery-counter/src/episodes/Day3End.tsx`
- Modify: `experiments/remotion-recovery-counter/src/Root.tsx`

- [ ] **Step 1: Create `Day1End.tsx`**

Create `experiments/remotion-recovery-counter/src/episodes/Day1End.tsx`:

```tsx
import React from 'react';
import { RecoveryEndCard } from '../components/RecoveryEndCard';

// Day 1: declaration — $0 paid back so far, $0 today. Red "NO CHANGE TODAY" chip.
export const Day1End: React.FC = () => (
  <RecoveryEndCard totalOriginal={34776.15} previousPaidBack={0} newPaidBack={0} />
);
```

- [ ] **Step 2: Create `Day3End.tsx`**

Create `experiments/remotion-recovery-counter/src/episodes/Day3End.tsx`:

```tsx
import React from 'react';
import { RecoveryEndCard } from '../components/RecoveryEndCard';

// Day 3: first win — $0 → $250 cumulative paid back. Green "+$250 TODAY" chip.
export const Day3End: React.FC = () => (
  <RecoveryEndCard totalOriginal={34776.15} previousPaidBack={0} newPaidBack={250} />
);
```

- [ ] **Step 3: Replace `Root.tsx` — drop preview compositions, register real episodes only**

Replace `experiments/remotion-recovery-counter/src/Root.tsx` with:

```tsx
import React from 'react';
import { Composition } from 'remotion';
import { Day1Intro } from './episodes/Day1Intro';
import { Day1End } from './episodes/Day1End';
import { Day3Intro } from './episodes/Day3Intro';
import { Day3End } from './episodes/Day3End';

const COMMON = {
  durationInFrames: 120,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Day1Intro" component={Day1Intro} {...COMMON} />
    <Composition id="Day1End"   component={Day1End}   {...COMMON} />
    <Composition id="Day3Intro" component={Day3Intro} {...COMMON} />
    <Composition id="Day3End"   component={Day3End}   {...COMMON} />
  </>
);
```

- [ ] **Step 4: Verify in the Studio**

Run: `npm start`
Expected: exactly four compositions — `Day1Intro`, `Day1End`, `Day3Intro`, `Day3End`. All four play correctly per the prior task verifications.

Stop the studio with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/src/episodes/Day1End.tsx \
        experiments/remotion-recovery-counter/src/episodes/Day3End.tsx \
        experiments/remotion-recovery-counter/src/Root.tsx
git commit -m "Register Day1End and Day3End compositions; remove preview comps"
```

---

## Task 7: Render all four compositions and verify alpha

**Files:** no code changes — this task validates the end-to-end pipeline.

- [ ] **Step 1: Run the render-all script**

Run: `cd experiments/remotion-recovery-counter && npm run render:all`
Expected: four files appear in `out/`:
- `out/day1-intro.mov`
- `out/day1-end.mov`
- `out/day3-intro.mov`
- `out/day3-end.mov`
Each 4 seconds at 30fps (120 frames), ProRes 4444 codec. Render time: roughly 3–8 minutes per composition on an M-series Mac per the REMOTION_GUIDELINE estimates.

- [ ] **Step 2: Verify each file has an alpha channel**

Run: `ffprobe -v error -show_streams out/day1-intro.mov 2>&1 | grep -E 'pix_fmt|codec_name'`
Expected: output includes `codec_name=prores` and `pix_fmt=yuva444p10le` (the `a` indicates alpha). Repeat for all four files.

If `ffprobe` isn't installed, open any `.mov` file in QuickTime Player; the transparent regions will appear as the Finder desktop showing through.

- [ ] **Step 3: Verify file sizes are reasonable**

Run: `ls -lh out/`
Expected: each `.mov` is roughly 30–80 MB (ProRes 4444 at 1080×1920, 4s, is verbose by design — this is expected and correct for an editor-friendly master).

- [ ] **Step 4: Copy outputs to Jay's editor workflow (optional — skip if Jay handles manually)**

The outputs live in `experiments/remotion-recovery-counter/out/` which is gitignored by the project-local `.gitignore`. Jay drops them into CapCut / Premiere / DaVinci as overlay tracks on top of the Recovery Series footage.

- [ ] **Step 5: Commit (verification report only — no code changed)**

No commit needed for this task — all verification. If a render failed, go back and fix the relevant component before attempting again.

---

## Task 8: Add a README for the Remotion project

**Files:**
- Create: `experiments/remotion-recovery-counter/README.md`

- [ ] **Step 1: Write the README**

Create `experiments/remotion-recovery-counter/README.md`:

```markdown
# Recovery Counter (Remotion)

Transparent-background counter overlays for the Recovery Series ($34,776.15 recovery journey). Renders two assets per episode — an intro counter and an end card fraction — as ProRes 4444 `.mov` files with alpha. Drop the renders as overlay tracks on top of Jay's B-roll in CapCut / Premiere / DaVinci.

## Quick start

    npm install
    npm start              # open Remotion Studio at http://localhost:3000
    npm run render:all     # render all four current compositions

## Individual renders

    npm run render:day1-intro
    npm run render:day1-end
    npm run render:day3-intro
    npm run render:day3-end

Outputs land in `out/` (gitignored).

## Adding a new episode

1. Create `src/episodes/DayNIntro.tsx` and `src/episodes/DayNEnd.tsx` — one-liner wrappers around `RecoveryIntroCard` and `RecoveryEndCard` with hardcoded props for that episode.
2. Register both compositions in `src/Root.tsx`.
3. Add `render:dayN-intro` and `render:dayN-end` scripts to `package.json` following the existing pattern.
4. Run `npm run render:dayN-intro` and `npm run render:dayN-end`.

## Design spec

`docs/superpowers/specs/2026-04-21-recovery-counter-design.md` is the source of truth for sizes, colors, and animation timing.
```

- [ ] **Step 2: Commit**

```bash
cd /Users/jayvictor/Projects/venture-vick-content/.claude/worktrees/priceless-mahavira-c7fce2
git add experiments/remotion-recovery-counter/README.md
git commit -m "Add README for Recovery Counter Remotion project"
```

---

## Verification summary

After all tasks, you should have:

- [x] `experiments/remotion-recovery-counter/` exists as a self-contained Remotion project
- [x] `npm test` passes (11 unit tests on USD formatters)
- [x] `npm start` opens the Studio with exactly four compositions: `Day1Intro`, `Day1End`, `Day3Intro`, `Day3End`
- [x] Each composition is 1080×1920 @ 30fps × 120 frames (4 seconds)
- [x] `npm run render:all` produces four `.mov` files in `out/` with alpha channel
- [x] Intro: number-only, drop chip only when `previousTotal !== null && previousTotal !== newTotal`
- [x] End card: fraction, green numerator + `+$X TODAY` chip on progress days, red numerator + `NO CHANGE TODAY` chip on static days
- [x] Scale pulse on end-card numerator (1.0 → 1.35 during count, settle back in 10 frames) — only when `previousPaidBack !== newPaidBack`
- [x] Intro number does not scale pulse
- [x] Background is transparent in final outputs (verifiable with `ffprobe` or QuickTime)
