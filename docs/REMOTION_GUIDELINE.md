# Remotion Guideline

How to actually use the `remotion-best-practices` skill installed in this repo without wasting hours on avoidable mistakes.

This document replaces whatever hype-heavy community doc you may have seen. Remotion is a legitimate tool. It is not magic. Treat it like code — because it is code — and it produces good video.

---

## What Remotion actually is

Remotion lets you build videos using React. You write JSX components with animation APIs (`interpolate`, `spring`, `useCurrentFrame`), preview them in a browser-based studio, and render them to MP4.

**What that means in practice:**
- The "code" you write is React components that describe frames
- The studio hot-reloads your changes instantly
- The MP4 render is a separate step and takes real time
- Debugging requires reading React code, not just describing things in natural language

**What it is not:**
- Not "describe a video and get a finished MP4 in seconds"
- Not a replacement for After Effects in every use case (sometimes After Effects is still the right tool)
- Not a skill you can use effectively without at least skim-reading the skill's rule files

---

## Core workflow

Follow this order every time. Skipping steps is where first attempts fail.

### 1. Scaffold before you describe

Your first prompt to Claude Code should be project setup, not video content. Something like:

> Initialize a new Remotion project in `experiments/remotion-recovery-milestone/`. Use the blank template, TypeScript, no Tailwind. I'll describe the actual video after the project boots.

This gets `remotion.config.ts`, `src/Root.tsx`, and the composition structure in place before Claude Code starts generating animation logic. Jumping straight into "build me a recovery series intro" means Claude Code has to guess at project structure AND video content at the same time — more things to go wrong.

### 2. Preview before rendering

Remotion ships with a local studio that runs on `localhost:3000` and hot-reloads as Claude Code edits files. Use it:

```bash
npm start
```

Every change to a component updates the preview in under a second. **Do not render until the preview looks right.** Rendering is minutes. Previewing is instant. Iterate in the preview, render when the preview is final.

### 3. Describe videos as specs, not vibes

Bad prompt:
> Make it look cool, kind of like a recovery update video

Good prompt:
> 15 seconds, 9:16 vertical, 1080x1920, 30fps.
> Scene 1 (0-3s): title "Recovery Update: Month 4" fades in letter-by-letter, 3-frame stagger per character, bottom-center.
> Scene 2 (3-11s): four numbers appear sequentially with 1s spacing — "$34,776 → $29,112 → $23,805 → $18,400" — each number bigger than the last, easing out from scale 0.9 to 1.0.
> Scene 3 (11-15s): text "$16,376 paid. Not done yet." fades in, CTA text @vick in small type at bottom.

Remotion is code. Code needs specs. Treating it like a "write me something cool" prompt loses you the entire advantage of having the skill installed — Claude Code produces cleaner animation code when the spec is specific, and the rendered result actually matches what you pictured.

### 4. Render only when the preview is final

```bash
npx remotion render src/index.tsx MyComposition out/video.mp4
```

Render times for 1080x1920 vertical at 30fps on a Mac:
- 5 seconds → 1-2 minutes
- 15 seconds → 3-8 minutes
- 30 seconds → 6-15 minutes
- 60 seconds → 12-30 minutes

These are real numbers. Budget for them. If you need to iterate after rendering, that's another 3-8 minutes per pass. Get it right in the preview first.

---

## First project: keep it low-stakes

Do **not** make your first Remotion video a client deliverable or something that ships by Friday. Your first project should be a learning exercise — 10 seconds long, any topic, intentionally throwaway.

**Suggested first project:**
- 10 seconds total
- Vertical 9:16, 1080x1920
- Title text "Remotion Test" fading in
- A counter animating from 0 to 100 over 8 seconds
- Nothing else

That's it. What you're learning from this project:
- How long a render actually takes on your Mac
- What the preview-then-render iteration loop feels like
- How Claude Code writes animation components (so you can read them if something breaks)
- Whether this tool is going to be genuinely useful to you or whether it'll sit unused

Ship a low-stakes first project before committing to anything higher-stakes. If the first project feels painful or produces something you don't like, you'll know before it's a deadline.

---

## When Remotion is the right tool

Use Remotion for video formats that programmatic generation does well:

**Good fits for your current pillars:**

1. **Recovery Series milestone videos** — animated numbers, progress bars, comparative data. "$34,776 → $18,400" as a visual arc is exactly what code-driven video excels at.
2. **V-Bucks data visualization** — animated charts, financial concepts shown visually. "Here's what compounding looks like at 7% vs 10% over 30 years" as a chart that builds over 15 seconds.
3. **RentShield product demos** — UI walkthroughs, feature animations. Not frequent, but when you need one for marketing, Remotion beats screen recording for polish.
4. **Series intros and outros** — reusable animated openers you can drop on top of camera footage.

**Bad fits:**

1. **Jay-in-frame content** — your core pillars are camera-first. Remotion cannot replace your face, voice, or on-camera delivery.
2. **Quick-turn reactions** — if it's time-sensitive and you could film it in 10 minutes, film it. Remotion has a minimum time cost (scaffold + spec + preview + render) that doesn't work for fast content.
3. **Hooks that depend on physical presence** — "POV: you just got your first brand deal" needs you on camera.
4. **Anything you could shoot on your phone in 5 minutes** — the overhead of a Remotion project is not worth it for simple handheld content.

The rule: Remotion is for video formats where the viewer's value comes from information, motion, or data — not from *you*.

---

## Debugging when it breaks

When Claude Code writes Remotion code that produces an error, the fix is usually one of:

1. **Composition duration mismatch** — your composition is 300 frames but a `Sequence` starts at frame 400. Tell Claude Code "the durationInFrames is wrong relative to the sequence start times."
2. **Frame rate mismatch** — audio or video asset is 24fps, composition is 30fps. Tell Claude Code "align the fps on all assets to 30."
3. **Missing asset path** — image or audio file path doesn't resolve. Paste the error, Claude Code will trace it.
4. **Interpolate without extrapolate** — animation values spike outside the intended range. Tell Claude Code "add `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'`."
5. **Render times out** — a 60-second 4K video is trying to render on a 16GB Mac. Drop the resolution or length, or split into chunks.

Most errors are fixable in one round-trip with Claude Code if you paste the exact error output from the terminal. Don't describe the error in your own words — copy-paste the full error message.

---

## Render performance tips

Before you start complaining about render times, try these:

- **Lower the concurrency** if rendering is crashing: `npx remotion render --concurrency=2 ...`
- **Preview-only mode for iteration** — don't render, just watch in the studio
- **Render at lower resolution during iteration** — 540x960 instead of 1080x1920 cuts render time by ~4x
- **Use `offthreadVideoCacheSizeInBytes`** if you're embedding other videos — set it in `remotion.config.ts`
- **Skip the preview render** — add `--overwrite` and `--no-open` flags to avoid the post-render player opening

These matter most when you're doing many iterations. For a one-off render, don't overthink it.

---

## Don't force it

If a video idea would be better shot on camera, shoot it on camera. Having Remotion installed does not obligate you to use it. A month from now, if you haven't reached for it once, that's fine — it cost you nothing, it's there for when a real need hits.

The failure mode is installing a tool, feeling productive about the install, and then never touching it. The win condition is having it ready when a specific video calls for it.

---

## Related files in this repo

- `.agents/skills/remotion-best-practices/SKILL.md` — the skill's own entry point, lists available rule files
- `.agents/skills/remotion-best-practices/rules/animations.md` — animation API patterns (spring, interpolate, timing)
- `.agents/skills/remotion-best-practices/rules/audio.md` — audio handling
- `.agents/skills/remotion-best-practices/rules/charts.md` — animated chart patterns (relevant for V-Bucks)
- `.agents/skills/remotion-best-practices/rules/text-animations.md` — text animation patterns (relevant for Recovery Series)
- `.agents/skills/remotion-best-practices/rules/transitions.md` — scene transitions

Claude Code will load the relevant rule file on demand when you're working on a specific video. You don't need to read them all upfront.

---

**Last updated:** April 21, 2026
