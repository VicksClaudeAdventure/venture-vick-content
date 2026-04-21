# Recovery Counter — Remotion Design Spec

**Date:** 2026-04-21
**Context:** The Recovery Series ($34,776.15) needs a reusable animated counter treatment that overlays on top of Jay's B-roll. Each episode gets two renders — an intro counter (shown over the first seconds of the video) and an end card (shown over the last seconds). Both are produced from a single Remotion project and composited as alpha-channel overlays in Jay's video editor.

## Goal

Build a Remotion project that exports **transparent-background** counter animations for the Recovery Series. Two component variants (intro + end card), per-episode compositions, PNG-sequence or ProRes-4444 `.mov` output with alpha.

## Canvas

- **Dimensions:** 1080 × 1920 (9:16 vertical)
- **Frame rate:** 30 fps
- **Duration:** 120 frames (4 s) = 60 frames count + 60 frames hold
- **Background:** fully transparent — real export has no black backdrop
- **Font:** Inter (loaded via `@remotion/google-fonts/Inter`), weights 600 and 800, with `fontVariantNumeric: 'tabular-nums'` to prevent digit jitter during counts

## Variant 1 — Intro counter

Shown at the **beginning** of the Recovery video. Establishes the current total owed, and on episodes where Jay made money back, shows the drop.

### Layout

- Single centered number — no other labels
- Optional red **delta chip** fades in below during the hold phase, only on drop episodes
- Number vertically centered in the safe zone (~center of canvas)

### Visuals

- **Number**: Inter 800, **192 px**, white `#FFFFFF`, letter-spacing `-0.035em`, `tabular-nums`, no-wrap
- **Text-shadow stack for B-roll legibility**:
  `0 6px 36px rgba(0,0,0,0.75), 0 12px 72px rgba(0,0,0,0.55), 0 0 6px rgba(0,0,0,0.9)`
  (mock uses `0 2px 12px / 0 4px 24px / 0 0 2px` at 360-wide mock scale — multiply the blur/offset by 3x for the 1080 canvas)
- **Delta chip** (drop episodes only):
  - Background `#B91C1C` (red-700)
  - White text, Inter 700, **48 px**, letter-spacing `0.02em`
  - Padding `30px 66px`, border-radius `999px`, drop shadow `0 12px 54px rgba(0,0,0,0.45)`
  - Copy: `–$250.00` (en-dash, not hyphen), formatted as `–` + USD with two decimals
  - Position: `96 px` below the number

### Animation

- **Count** (frames 0–60, 2 s):
  - `interpolate(frame, [0, 60], [startValue, newTotal], { easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp' })`
  - `startValue = previousTotal ?? 0`
  - Formatted every frame via `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })`
  - **No scale/pulse** on the number — static size throughout
- **Hold** (frames 60–120, 2 s): number holds at `newTotal`
- **Delta chip entrance** (drop episodes only):
  - Appears starting frame 66 (approximately 6 frames after count ends)
  - Over 10 frames: opacity `0 → 1`, scale `0.92 → 1.0`, translateY `+36px → 0` (scale/translate blur from `0 → 0` via spring or ease-out)

### Component API

```tsx
type RecoveryIntroCardProps = {
  previousTotal: number | null;  // null = count from $0 (declaration/static episodes)
  newTotal: number;              // final value to hold
  countUpFrames?: number;        // default 60
  holdFrames?: number;           // default 60
};
```

Chip visibility rule: `previousTotal !== null && previousTotal !== newTotal`.

Chip label (when shown): `–${usd.format(previousTotal - newTotal)}`.

## Variant 2 — End card

Shown at the **end** of the Recovery video. Shows cumulative progress as a fraction and signals via color whether today moved the counter.

### Layout

- Fraction centered: `[numerator]  /  [denominator]`
- `PAID BACK` label ~66 px below the fraction
- Status chip ~66 px below `PAID BACK`

### Visuals

- **Numerator** (the paid-back amount):
  - Inter 800, **base size 120 px** (matches denominator at rest), letter-spacing `-0.02em`, `tabular-nums`
  - `transform-origin: center bottom` so it grows upward while keeping its baseline aligned with the denominator during pulse
  - Color:
    - **Green** `#4ADE80` when `newPaidBack > previousPaidBack` (progress today)
    - **Red** `#F87171` when `newPaidBack === previousPaidBack` (no progress today)
- **Slash**: Inter 600, 120 px, white at 55 % opacity
- **Denominator** (always `$34,776.15`): Inter 600, 120 px, white at 85 % opacity, `tabular-nums`, letter-spacing `-0.02em`
- **`PAID BACK` label**: Inter 600, 48 px, letter-spacing `0.22em`, uppercase, white at 95 % opacity, margin-top `78 px` from fraction
- **Status chip**: same dimensions as intro delta chip (white text, Inter 700, 48 px, pill, shadow)
  - **Green** `#15803D` with copy `+$250 TODAY` (whole-dollar USD) when progress today
  - **Red** `#B91C1C` with copy `NO CHANGE TODAY` when no progress today
- **Text-shadow stack**: same layered shadow as intro for legibility over B-roll

### Animation

- **Numerator count** (frames 0–60, 2 s):
  - Value: `interpolate(frame, [0, 60], [previousPaidBack, newPaidBack], { easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp' })`
  - Formatted as whole-dollar USD (no cents): `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })`
- **Numerator scale pulse** (only when `newPaidBack !== previousPaidBack`):
  - Frames 0–60 (count): scale grows `1.0 → 1.35` via `interpolate(frame, [0, 60], [1.0, 1.35], { easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp' })`
  - Frames 60–70 (settle): scale eases `1.35 → 1.0` over 10 frames via `interpolate(frame, [60, 70], [1.35, 1.0], { easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })`
  - Peak scale `1.35` was tuned at v7 (previously `1.70`, halved). At 120 px base, peak is `~162 px` during count, settles back to exactly match the 120 px denominator afterward
  - If `previousPaidBack === newPaidBack` (no-change day): **no scale pulse**. Numerator stays at base size throughout
- **Denominator, slash, label**: static from frame 0
- **Status chip entrance** (always shown on end card): same timing and animation as intro delta chip (starts ~frame 66, 10-frame fade-in with translateY/scale)

### Component API

```tsx
type RecoveryEndCardProps = {
  totalOriginal: number;      // $34,776.15 — the starting debt figure, shown as denominator
  previousPaidBack: number;   // cumulative paid-back amount before this episode (0 on Day 1)
  newPaidBack: number;        // cumulative paid-back amount after this episode
  countUpFrames?: number;     // default 60
  holdFrames?: number;        // default 60
};
```

Derived values:
- `todayDelta = newPaidBack - previousPaidBack`
- Numerator color: `todayDelta > 0` → green, else red
- Status chip: `todayDelta > 0` → green `+$${todayDelta} TODAY`, else red `NO CHANGE TODAY`

## Project structure

```
experiments/remotion-recovery-counter/
├── package.json
├── remotion.config.ts
├── tsconfig.json
└── src/
    ├── index.tsx                      # entry — registers Root
    ├── Root.tsx                       # registers all compositions
    ├── components/
    │   ├── RecoveryIntroCard.tsx      # reusable intro component
    │   └── RecoveryEndCard.tsx        # reusable end-card component
    ├── format.ts                      # USD formatter helpers (cents, whole)
    └── episodes/
        ├── Day1Intro.tsx              # thin wrapper, hardcoded props
        ├── Day1End.tsx
        ├── Day3Intro.tsx
        └── Day3End.tsx
```

- Each `episodes/DayNXxx.tsx` is a ~5-line file that passes hardcoded props to the shared component.
- Adding a new episode = copy + modify two files (intro + end) and register both in `Root.tsx`.

## Episode prop values

| Composition | `previousTotal` / `previousPaidBack` | `newTotal` / `newPaidBack` |
|---|---|---|
| `Day1Intro` | `null` | `34776.15` |
| `Day1End` | `0` (previousPaidBack) | `0` (newPaidBack) — no progress yet |
| `Day3Intro` | `34776.15` | `34526.15` |
| `Day3End` | `0` (previousPaidBack) | `250` (newPaidBack — first win) |

Day 2 (no money moved) would be identical-shaped to Day 1 but with different episode number. Not required until Jay decides to produce a Day 2 episode.

## Render workflow

```bash
npm start                         # preview all compositions in the Remotion Studio
npm run render Day1Intro          # → out/day1-intro.mov (ProRes 4444 with alpha)
npm run render Day1End            # → out/day1-end.mov
npm run render Day3Intro          # → out/day3-intro.mov
npm run render Day3End            # → out/day3-end.mov
```

`package.json` scripts wrap `remotion render src/index.tsx <CompositionId> out/<id>.mov --codec=prores --prores-profile=4444 --concurrency=4` — `prores 4444` preserves the alpha channel for overlay use in CapCut / Premiere / DaVinci.

(Alternative: PNG sequence via `--sequence` flag if the editor prefers a frame folder. ProRes is the default because it's a single file and every major NLE accepts it.)

## Non-goals

- No audio baked into the component. The Recovery episode already has Jay's voiceover on the main track.
- No progress bar. The fraction conveys "tiny numerator vs. huge denominator" sufficiently.
- No episode-number overlay (e.g., `DAY 3`). The episode is clear from the video itself.
- No series branding line (`@vick`) on the card. TikTok and Instagram already show the handle.
- No Tailwind or external CSS framework. Inline styles only.

## Open items to confirm during implementation

- Exact text-shadow values at 3x scale (mock was tuned at 360-wide preview; real canvas is 1080-wide). The Remotion preview is the source of truth — adjust shadow blur in the component if it looks weak at full resolution.
- Chip copy for no-change days: spec says `NO CHANGE TODAY`. Jay may prefer `STILL OWED` or `DAY N` for specific episodes — add an optional `statusChipLabel` prop if that flexibility is needed later, but default behavior ships first.
- Exact font-weight for the slash and denominator (600 in spec). If they read too heavy at full size, drop to 500.

## Mockup reference

The visual design above was validated against a browser mockup (v7) served via the `superpowers:brainstorming` visual companion. The mockup confirmed: transparent overlay legibility across bright / dark / face / mixed B-roll, fraction layout at rest, numerator peak scale at 1.35x, and numerator/denominator equal-weight resting state.

The mockup files live under `.superpowers/brainstorm/` in the worktree during brainstorming but should not be committed — `.superpowers/` should be added to `.gitignore` if it isn't already. If the mockup needs to be re-viewed later, restart the visual companion server and push the v7 HTML back to the screen directory.
