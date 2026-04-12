# Research Skill — Steps 1-5

**Purpose:** Find what's working in the market, download and transcribe breakout videos, deconstruct why they work, and generate this week's directional insights. This skill runs every Monday.

**Reference docs:** `docs/VIRAL_INTELLIGENCE_WORKFLOW.md` for deconstruction frameworks, triggers, and narrative structures.

---

## Step 1 — Topic Mining

**Goal:** 10-20 trending topics that inform which creators to prioritize and which topics to generate.

**Sources:**
- Reddit (Primary): r/landlord, r/tenanthelp, r/realestateinvesting, r/personalfinance, r/povertyfinance, r/startups, r/SaaS, r/EntrepreneurRideAlong
- X/Twitter (Secondary): Trending hashtags in #realestate, #personalfinance, #entrepreneur, #landlord. Posts with 500+ engagements from accounts under 50K followers.
- Google Trends (Supplemental): Confirm Reddit trends have broader search volume.

**Filter criteria:**
1. 500+ upvotes on Reddit
2. Scroll-stopper test: Can it be expressed as a hook in ≤15 words that makes Marcus stop scrolling? If not, the topic isn't ready.
3. Maps to one of the 4 pillars (Entrepreneurship / Personal Finance / Real Estate / Self-Improvement)
4. Not covered in last 30 days of content
5. **Jay's life check:** Can Jay speak to this from personal experience? Flag it if not.

**Output per topic:**
```
Topic: [1-sentence description]
Source: [subreddit + post title + upvote count]
Hook angle: [1-sentence scroll-stopper test]
Pillar: [Entrepreneurship / Personal Finance / Real Estate / Self-Improvement & Mindset]
Jay connection: [How this connects to Jay's life — be specific]
Heat score: [1-10]
```

---

## Step 2 — Creator Pull + Breakout Identification

**Source:** `content/reference-creators.md` (tagged by series — only use creators tagged for the relevant format as blueprint sources)

**Pull protocol:** Pull the latest ~15 posts from each of the 25 reference creators. Log: views, likes, comments, date posted, rough topic.

**Breakout identification — use BOTH methods:**

| Method | Formula | What it tells you |
|---|---|---|
| **Baseline Breakout** | Views ≥ 3x creator's recent median (last 15 posts) | What *content* is working |
| **5x Rule** | Views ÷ followers ≥ 5x | What *formats* are working regardless of audience size |

**Target: 25 breakout videos.** If the curated list doesn't produce 25, search for additional creators in the same niches (10K-100K followers hitting the 5x rule). Add strong new finds to `content/reference-creators.md`.

**Creator diversity cap:** Max 3-5 videos from the same creator. Spread across different creators for format diversity.

**Cross-reference with Step 1:** Videos hitting BOTH a breakout threshold AND a trending topic = 🔥 PRIORITY. The final 25 should mix both identification methods.

---

## Step 3 — Download + Transcribe

**Audio-first research. Non-negotiable.**

**Tools:** `yt-dlp` (download) + `whisper --model base` (transcribe)

```bash
# TikTok
yt-dlp -x --audio-format mp3 -o "%(uploader)s_%(id)s.%(ext)s" [URL]

# Instagram
yt-dlp --cookies-from-browser chrome -x --audio-format mp3 -o "%(uploader)s_%(id)s.%(ext)s" [URL]

# Transcribe
whisper [file.mp3] --model base --output_format txt
```

**Metrics per video:**

| Metric | How to Measure | Target for Jay |
|---|---|---|
| WPM | Word count ÷ duration in minutes | 160-185 |
| Total word count | Count words in transcript | ~150 for 60s |
| Hook length | Words in first sentence | Under 15 |
| Hook duration | First 3 seconds | Must land by 0:03 |
| CTA position | Timestamp + exact words | Last 5-10 seconds |

Save transcripts to `content/transcripts/[YYYY-WW]/`

---

## Step 4 — Full Analysis

**One comprehensive pass per video.** For each of the 25 transcribed videos:

**4A — 7-Component Deconstruction** (see `VIRAL_INTELLIGENCE_WORKFLOW.md` for full framework):
Hook, Problem/Stakes, Credibility Signal, Core Content, Proof/Evidence, Psychological Trigger, CTA

**4B — Pattern Mining** (3+ video threshold — one-offs are noise):
Hook structures, topics, pacing patterns, CTA formats appearing across breakouts

**4C — Psychological Trigger Mapping:**
Primary and secondary triggers per video. Which is dominant this week, which is underused but high-potential.

**4D — Narrative Structure Analysis:**
Which of the 6 structures each video uses. Which are dominating breakouts this week.

**4E — Format Tracking:**
Check breakouts against the framework roster. Flag new format candidates (3+ appearances) for promotion. Flag absent formats for potential demotion.

**Each analysis sheet includes a Blueprint Summary:**
```
BLUEPRINT SUMMARY — [@creator, "title", views]
Exact hook: [word-for-word hook from the video]
Hook mechanism: [WHY this hook stops the scroll]
Video format: [storytelling / tutorial / talking-head / documentary / comparison / challenge / other]
Borrowable section order: [e.g., number reveal → breakdown → surprise → lesson]
Borrowable pacing: [e.g., insight in first 15 seconds, CTA at 50s]
Borrowable CTA style: [exact CTA approach]
Best fit for: [which Jay pillar/series — must be FORMAT MATCH, not just topic match]
```

Save analysis to `content/research/[YYYY-WW]-analysis.md`

---

## Step 5 — Generate Rules

**Output: 3-5 directional insights for THIS WEEK's scripts.** Not hard constraints — insights with guidance on where they apply best and where to skip them.

```
INSIGHT 1: [Specific pattern observed]
Source: [Which videos + what pattern]
Where it fits best: [Which pillars, series, or format types]
Where to skip it: [Contexts where forcing this would hurt]
```

**Good insights:** "Dollar-amount hooks in first 5 words appeared in 4/10 breakouts. Consider for V-Bucks where topic supports it. Skip on Story Hooks where emotional setup matters more."

**Bad insights:** "Be authentic" / "Use good hooks" / "Keep it short"

Save to `content/scripts/[YYYY-WW]/weekly-rules.md`
