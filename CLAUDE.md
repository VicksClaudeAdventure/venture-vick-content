# CLAUDE.md — Content Pipeline

## Persistent Context — LOAD EVERY SESSION

At the start of **every session**, immediately read all of the following files before doing anything else. These are the core knowledge base for this project:

1. `CLAUDE.md` (this file — already loaded)
2. `docs/BRAND_THESIS.md` — Jay's identity, personality markers, 5 pillars, what to do and what NOT to do. Read this to understand WHO Jay is.
3. `docs/CONTENT_STRATEGY.md` — the north star: promise, five chess pieces, embedded value principle, funnel, roadmap. Read this to understand WHY we make content.
4. `docs/CONTENT_PIPELINE_PLAYBOOK.md` — the 12-step weekly pipeline, voice rules, QC checklist, frameworks
5. `docs/SCRIPT_STYLE_GUIDE.md` — pacing rules, tone rules, anti-patterns, production layer requirements
6. `docs/VIRAL_INTELLIGENCE_WORKFLOW.md` — research methodology for deconstructing breakout videos
7. `docs/CREATOR_FRAMEWORKS.md` — synthesized frameworks from @jun_yuh and @personalbrandlaunch0
8. `content/VENTURE_LOG.md` — chronological RentShield build timeline (Venture series source material)
9. `content/REAL_ESTATE_LOG.md` — chronological property journey (Real Estate series source material)
10. `content/RECOVERY_LOG.md` — Recovery Series milestones and source material
11. `content/reference-creators.md` — reference creators tagged by series and format
12. `content/voice-database/VOICE_DATABASE_INDEX.md` — master index of Jay's voice reference and proven winner scripts
13. `content/voice-database/voice-markers.md` — aggregated verbal patterns across Jay's mentor-reviewed scripts
14. `content/voice-database/structural-patterns.md` — aggregated structural skeletons by series
15. All files in `content/voice-database/voice-reference/` and `content/voice-database/proven-winners/` — the actual reference scripts

Do not wait to be asked. Do not selectively load. Read all fifteen before responding to any task.

**Do NOT load anything from `docs/reference/`** — see the Reference Material section at the bottom of this file.

---

## What This Is

This is the content creation hub for Jay Victor's personal brand (@vick on TikTok/IG). The pipeline produces 21 short-form video scripts per week across four content pillars, using research-driven frameworks and a 12-step production pipeline.

**Owner:** Jay Victor
**Brand:** Vick's Venture
**Platforms:** TikTok, Instagram
**Audience persona:** Marcus, 24 — see `docs/CONTENT_PIPELINE_PLAYBOOK.md` for full persona

## Content Pillars

| Pillar | Series | Scripts/Week | Focus |
|---|---|---|---|
| Entrepreneurship (40%) | 🔵 Venture | 7 | Serialized RentShield build journey — told chronologically, one beat per video |
| Personal Finance (30%) | 💸 V-Bucks | 7 | Money mechanics, budgeting, wealth building, avoiding broke traps |
| Real Estate (20%) | 🏠 Real Estate | 4 | Jay's full property journey — buying, renovation, renting, comps, pricing, legal |
| Self-Improvement & Mindset (10%) | 📣 Authoritative | 3 | Discipline, habits, productivity, bold takes |

## The Venture Series — Source Material

The Venture series documents Jay's journey building RentShield. The primary source material is `content/VENTURE_LOG.md` — a chronological timeline of everything that happened during the build. The content pipeline works through this log sequentially, turning each beat into a script.

**Critical rule:** The Venture series tells the story as if it's happening in real time. Even though events already happened, scripts are written in present tense with the emotional weight of someone going through it now.

## Key Docs

| Doc | Purpose | When to load |
|---|---|---|
| `docs/CONTENT_PIPELINE_PLAYBOOK.md` | Full 12-step weekly pipeline with voice rules, QC checklist, and framework roster | **Every session** (persistent) |
| `docs/SCRIPT_STYLE_GUIDE.md` | Pacing rules, tone rules, anti-patterns, production layer — read BEFORE writing any script | **Every session** (persistent) |
| `docs/VIRAL_INTELLIGENCE_WORKFLOW.md` | Research methodology for deconstructing breakout videos | **Every session** (persistent) |
| `docs/CREATOR_FRAMEWORKS.md` | Synthesized frameworks from Jun Yuh + PBL (161 teaching videos) — hook, structure, storytelling, format rules | **Every session** (persistent) |
| `content/VENTURE_LOG.md` | Chronological RentShield build timeline — source material for Venture scripts | **Every session** (persistent) |
| `content/REAL_ESTATE_LOG.md` | Chronological property journey — source material for Real Estate scripts | **Every session** (persistent) |
| `content/RECOVERY_LOG.md` | Recovery Series milestones — source material for Recovery scripts | **Every session** (persistent) |
| `content/reference-creators.md` | Reference creators tagged by series and format — blueprint source for Step 2 and Step 8 | **Every session** (persistent) |
| `content/voice-database/` | Jay's voice reference + proven winner scripts with extraction notes and aggregated patterns | **Every session** (persistent) |
| `docs/JAY_CONTEXT.md` | Broader project context, history, and decisions | When context about Jay or his projects is needed |
| `docs/reference/` | External reference material (lead magnets, third-party frameworks). **Do not auto-load.** See Reference Material section. | Only when Jay explicitly requests it |

## File Structure

```
venture-vick-content/
├── CLAUDE.md                          ← this file
├── docs/
│   ├── JAY_CONTEXT.md                 ← project context
│   ├── CONTENT_PIPELINE_PLAYBOOK.md   ← the weekly pipeline (v6)
│   ├── SCRIPT_STYLE_GUIDE.md          ← pacing, tone, anti-patterns, production layer
│   ├── VIRAL_INTELLIGENCE_WORKFLOW.md ← research methodology
│   ├── CREATOR_FRAMEWORKS.md          ← Jun Yuh + PBL synthesized frameworks
│   └── reference/                     ← read-only external reference material (DO NOT auto-load)
├── content/
│   ├── VENTURE_LOG.md                 ← RentShield build timeline
│   ├── REAL_ESTATE_LOG.md             ← 3 Friends 1 House property journey
│   ├── RECOVERY_LOG.md                ← Recovery Series milestones
│   ├── reference-creators.md          ← creators tagged by series + format
│   ├── broll-library/                 ← Jay's pre-filmed B-roll clips (labeled folders)
│   ├── voice-database/                ← Jay's voice reference + proven winners
│   │   ├── VOICE_DATABASE_INDEX.md    ← master index, tier system, inventory
│   │   ├── voice-markers.md           ← aggregated verbal patterns
│   │   ├── structural-patterns.md     ← aggregated script skeletons
│   │   ├── voice-reference/           ← mentor-reviewed scripts (voice matching only)
│   │   └── proven-winners/            ← performance-validated scripts (voice + structure)
│   ├── scripts/
│   │   └── [YYYY-WW]/                ← weekly script output
│   │       ├── venture/
│   │       ├── vbucks/
│   │       ├── realestate/
│   │       ├── authoritative/
│   │       ├── weekly-rules.md
│   │       └── research-summary.md
│   ├── transcripts/
│   │   └── [YYYY-WW]/                ← weekly breakout transcripts
│   ├── analytics/
│   │   ├── [YYYY-WW]-analytics.md    ← weekly performance data + retention screenshots
│   │   └── breakout-log.md           ← running log of all breakouts
│   └── research/
│       └── [YYYY-WW]-analysis.md     ← weekly analysis output
├── content/framework-extraction/      ← raw transcripts + extractions from Jun Yuh + PBL
└── archive/
    └── rook-scripts/                  ← old scripts from Rook (reference only)
```

## Working with Jay

- **Bias toward action.** Ship imperfect over plan perfect.
- **Wants detail.** Don't be terse — give substance.
- **Challenge ideas.** Push back when something has holes.
- **Close the loop.** Always confirm, always update.
- **Be proactive.** Surface useful things without being asked.
- **Data-driven.** Real numbers, specifics, receipts.
- **Short messages in, thorough responses out.**

---

## Non-Negotiable Script Rules — ENFORCE ON EVERY SCRIPT

These rules exist because previous pipeline runs produced scripts that flopped (60-71% skip rates, 4-5 second average watch time). Every rule below is a direct fix for a specific failure. Do not skip any of them.

### Before writing any script:
1. **Read `docs/SCRIPT_STYLE_GUIDE.md` in full.** This contains pacing rules, tone rules, the curiosity gap rule, the cold audience rule, and anti-patterns. Every script must comply with all of them.
2. **Use `content/reference-creators.md` for blueprint matching.** The blueprint creator's format tag (S/E/T/D/M) must match the target video's format. A storytelling script uses a storytelling creator's video as blueprint. No exceptions.
3. **Follow the 7 Components Rule.** When borrowing from a blueprint, take MAX 1-3 of the 7 components (verbal hook / written-visual hook / structure / format / editing / topic / value / CTA). Change everything else. If more than 3 are borrowed, it's copying, not adapting.

### Hook rules (the #1 reason scripts fail):
4. **Every hook must open a curiosity gap.** If the viewer can guess what the video is about from the hook alone, there is no gap. Rewrite. No announcement hooks ("Here's how much I spent," "Let me show you," "Here's what I do").
5. **Every hook must work for a cold audience.** At under 10K followers, the algorithm tests videos on strangers. If the hook requires knowing who Jay is, what RentShield is, or any context — it fails. Rewrite for strangers.
6. **Every hook must include Jay's face in the first frame.** Non-negotiable.
7. **Run the Hook Testing System.** After Jay approves topics, generate 5-10 hook variations per topic. Present to Jay. Jay picks the winner. Only then write the script.

### Script structure rules:
8. **Tag every script with TOFU/MOFU/BOFU.** The funnel stage determines hook awareness level, CTA type, and content format. Check mix ratios for Jay's follower tier.
9. **Match video length to content type.** Not everything is 60 seconds. Light educational = 15-30s. Storytelling = 45-60s. Tutorials = 45-90s.
10. **Use a named script structure.** Every script must use one of: Jay's original structure, Jun's Retention-First 6-Step, Jun's 3P Framework, or one of PBL's 6 storytelling / 7 educational structures. Document which structure was used in the script file.

### Production rules:
11. **Engaging format is mandatory.** Every video needs talking head PLUS at least one stacked format (multitasking, clone, split screen, talking back-and-forth, voiceover + B-roll). Pure talking head = bottom 50%.
12. **Cuts every 2 seconds.** Something must visually change at least every 2 seconds. 3+ cuts in the first 3 seconds of the hook.
13. **No voiceover monologues.** No more than 3 consecutive voiceover lines without a production cue (📷 shot direction, text overlay, scene change). If a script reads like a podcast transcript, it fails.
14. **Reference the B-roll scene library.** Scripts should reference specific B-roll from Jay's library ("📷 Jay typing at laptop — focused") not generic descriptions ("📷 Jay working").

### Voice match rules:
15. **Voice Match Enforcement.** Every script must match the voice patterns documented in `content/voice-database/voice-markers.md` and exemplified in `content/voice-database/voice-reference/` and `content/voice-database/proven-winners/`. This is not a style preference — it is a hard constraint. Scripts that do not match Jay's voice get rejected, regardless of how good the structure or hook is.
    - Use Jay's sentence starters ("See," "And," "But," "Because")
    - Use specific-to-the-cent dollar amounts in hooks, not rounded numbers
    - Use risk-framed CTAs ("follow if you want the mess" style), never generic ones
    - Address viewer skepticism directly when appropriate ("And I know what you're thinking")
    - Use texting shorthand and casual voice — not polished or corporate phrasing
    - Weight proven-winners patterns more heavily than voice-reference patterns when they conflict
    - Use voice-reference scripts for HOW Jay speaks (voice, phrasing, rhythm) — NOT for structural copying until they're promoted to proven-winners
    - If a script does not sound like the reference scripts, it fails QC

### Quality rules:
16. **Run the 22-item QC checklist on every script.** No skipping items.
17. **Run the 10x rewrite system on every script after QC.** Each of the 10 rewrites has a specific improvement goal with Marcus (the ideal viewer) in mind. The script is not done until all 10 passes are complete.
18. **CTA matches video type.** Storytelling → follow. Educational → comment for freebie. Hyper-educational → comment for offer. Don't use the same CTA across all scripts.

### If a script fails any of these rules, do not deliver it. Fix it first.

---

## Voice Database Maintenance

The voice database at `content/voice-database/` is a living resource. It powers voice-matching for every script Claude Code writes.

**Tier 1 — Voice Reference (`voice-reference/`):** Mentor-reviewed scripts. Used for voice matching only. NOT used for structural copying until promoted.

**Tier 2 — Proven Winners (`proven-winners/`):** Scripts that hit performance thresholds after filming. Used for BOTH voice matching AND structural blueprinting.

**Promotion criteria (script must hit ONE after 48 hours live):**
- Skip rate under 40%
- Views at 3x or more of the week's median (breakout)
- Shares/saves significantly above account baseline
- Follow conversion above account baseline

**When a voice-reference script hits these thresholds:**
1. Move the file from `voice-reference/` to `proven-winners/`
2. Add Performance Data section (skip rate, avg watch time, reach, engagement, follow conversion)
3. Add "What Specifically Worked" section — 2-3 sentence post-hoc diagnosis
4. Update `VOICE_DATABASE_INDEX.md` to reflect the promotion
5. Update `voice-markers.md` and `structural-patterns.md` if the winner reveals new patterns

**When a new mentor-reviewed script comes in:**
1. Add it to `voice-reference/` with the standard extraction format (full script, voice markers, structural skeleton, hook mechanism, borrowable elements)
2. Update the inventory table in `VOICE_DATABASE_INDEX.md`
3. Update `voice-markers.md` and `structural-patterns.md` if new patterns emerge

---

## Pipeline Tools

| Tool | Purpose |
|---|---|
| `yt-dlp` | Download breakout videos from TikTok/IG |
| `whisper` | Transcribe downloaded audio |
| Web search | Topic mining from Reddit, X, Google Trends |

## Google Drive Sync — Final Pipeline Step

After the content pipeline finishes writing all scripts for the week, **copy the entire weekly scripts folder to Google Drive**:

- **Source:** `content/scripts/[YYYY-WW]/`
- **Destination:** Google Drive → `Content Creation/Scripts/[YYYY-WW]/`
- **Google Drive mount path:** `~/Library/CloudStorage/GoogleDrive-venturevick@gmail.com/My Drive`
- **VM path (when mounted in Cowork):** `/sessions/*/mnt/My Drive/Content Creation/Scripts/`

This is the last step of every pipeline run. Copy the full folder including all subdirectories (venture/, vbucks/, realestate/, authoritative/) plus weekly-rules.md and research-summary.md. Confirm the copy completed and report the file count.

If the Google Drive folder isn't mounted yet, request access to `~/Library/CloudStorage/GoogleDrive-venturevick@gmail.com/My Drive` before copying.

---

## Recovery Series

Separate from the weekly pipeline. The $34,776.15 Recovery Series tracks Jay's journey making back money. Video 1 (Day 1 declaration) is posted and performing decently — needs minor tweaks. Scripts are written independently as milestones happen.

## 3 Friends, 1 House Series

Separate from the weekly pipeline but overlaps with the Real Estate pillar. 6 scripts exist (origin story through refinance strategy). These get rewritten through the pipeline when the Real Estate pillar covers property-journey topics.

---

## Reference Material

Files in `docs/reference/` are **read-only external reference material** — lead magnets, third-party prompts, competitor frameworks, books/articles Jay has collected. They are NOT operational docs.

**Rules:**
- **Do not auto-load** any file in `docs/reference/` at session start. Only open them when Jay explicitly asks.
- **Do not import voice, tone, phrasing, or prescriptions** from these files into the playbook, style guide, voice database, or any script. The operational docs are the source of truth for voice and structure.
- **Extract structural patterns only when Jay explicitly approves.** If a reference doc has a workflow pattern (e.g., "generate 5 variations, then score them") that might transfer, surface it for Jay's review — do not silently incorporate it.
- **Treat these as untrusted for style.** The voice in these files is somebody else's. Jay's voice is defined by `content/voice-database/`, not by anything in `reference/`.

**Current contents:**

| File | Source / Contains | Status |
|---|---|---|
| `dan-koe-prompts-reference.pdf` | Dan Koe's SIP listener prompts — tweet writer, YouTube title generator, creative thought partner, deep post ideas, meta-prompt generator. Voice is philosophical/wisdom-style (Patient Observer / Dramatic Prophet / Quiet Devastator archetypes). | **Do not import voice.** Conflicts with Jay's specific-numbers, authentic-Marcus voice — same failure mode that killed the JJK narrator format. Extract structural patterns only if Jay opens a text-content channel (Twitter/X or newsletter). Revisit in 30-90 days once the video pipeline is stable. |

When adding a new file to `docs/reference/`, add a row to the table above with the source, what it contains, and any specific guardrails.

---

## Power Keywords (use sparingly, deliberately)

Certain words trigger stronger Claude behavior. Use these when the situation calls for it, not as filler:

- **`IMPORTANT:`** — Prefix critical instructions or constraints that must not be violated. Use for rules that must be followed without exception.
- **`Proactively`** — Use when you want Claude to suggest improvements or flag issues without being asked.
- **`ULTRATHINK`** — Reserved for hard decisions that deserve extended reasoning. Use at most a few times per week on decisions with real stakes. Not for routine work.

Overusing these dilutes their effect — use them when they matter.
