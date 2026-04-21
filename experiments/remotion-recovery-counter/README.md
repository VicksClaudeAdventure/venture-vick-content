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

Outputs land in `out/` (gitignored). Each `.mov` is ProRes 4444 with alpha channel (`pix_fmt=yuva444p10le` / promoted to `yuva444p12le` on Apple Silicon) — drop directly onto an overlay track in your NLE.

## Render pipeline configuration

Codec (ProRes 4444), pixel format (`yuva444p10le`), image format (PNG), and concurrency defaults are configured globally in `remotion.config.ts` — new render scripts don't need `--codec`, `--prores-profile`, or `--pixel-format` flags. That file is the source of truth for render-level settings.

## Adding a new episode

1. Create `src/episodes/DayNIntro.tsx` and `src/episodes/DayNEnd.tsx` — one-liner wrappers around `RecoveryIntroCard` and `RecoveryEndCard` with hardcoded props for that episode.
2. Register both compositions in `src/Root.tsx`.
3. Add `render:dayN-intro` and `render:dayN-end` scripts to `package.json` following the existing pattern (`remotion render src/index.tsx <CompositionId> out/<file>.mov` — no codec flags needed).
4. Run `npm run render:dayN-intro` and `npm run render:dayN-end`.

## Design spec

`docs/superpowers/specs/2026-04-21-recovery-counter-design.md` is the source of truth for sizes, colors, and animation timing.
