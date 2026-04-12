# Jay Victor — Project Context & History

## Who Jay Is

Solo entrepreneur building multiple AI-powered products and a personal brand. No technical co-founder, no traditional team. Uses AI tools (Claude, Claude Code) as core working partners across development and content.

**Brand:** "Vick's Venture" — documenting the entrepreneurial journey toward 100k followers
**Platforms:** TikTok and Instagram under username "vick"
**Location:** Philadelphia area
**Property:** First rental property in Philly (renovation complete/in progress)
**Active interests:** Pokémon TCG, personal finance, real estate investing

## Active Projects

### 1. RentShield (Product)
AI-powered lease analysis app for tenants. Live in production. See `CLAUDE.md` at repo root for full technical details.

- Built in ~2 weeks (Mar 9–23, 2026)
- Total build cost: ~$37.68
- Current status: 4 users, 6 analyses, 0 paying customers → pivoted to content-first GTM
- All 21 build phases complete

### 2. Content Creation Business (Brand)
Short-form video content targeting finance, self-improvement, and entrepreneurship audiences.

**3 Content Pillars:**
- 🚀 **Vick's Venture** — Building in public, RentShield journey, day-by-day
- 💰 **V-Bucks** — Finance tips, money management, budgeting
- 🎓 **Authoritative** — Self-improvement, discipline, habits

**Content Series:**
- 3 Friends, 1 House — Philly property renovation + investment journey (6 scripts written, none posted)
- $34,776.15 Recovery — Day counter series (scripted, 1 video posted)
- Reddit Pipeline — Automated housing story videos (daily, running)

### 3. Content Pipeline (Automated)
Automated TikTok/Reels video generation: scrapes Reddit housing stories → rewrites with Claude → TTS narration → renders video → uploads to Google Drive.

- Repo: `rentshield-content-pipeline`
- Currently runs on VPS (migrating to GitHub Actions)
- Subreddits: landlord, TenantHelp, Tenant, badroommates, RentalHorrorStories, renters, PropertyManagement, legaladvice, AmItheAsshole, tifu, TrueOffMyChest
- TTS: Edge TTS (en-US-GuyNeural voice)
- AI: Claude Sonnet 4 for script rewriting
- Upload target: `gdrive:RentShield/Content Creation/`

## Key Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| Next.js + FastAPI (not monolith) | Separate frontend/backend for independent scaling + Vercel free tier |
| Postgres over SQLite | Production persistence, Supabase integration, Railway hosting |
| Claude Sonnet over Opus for analysis | Cost: 5.6 cents vs ~50+ cents per analysis. Sonnet accuracy is sufficient |
| PA landlord-tenant statutes as anchor | Jay's property is in Philly. Specific > generic |
| Temperature 0 for scoring | Determinism — same lease → same score every time |
| Content-first GTM | Product is ready but early results showed content quality is the bottleneck |
| No LLC yet | Waiting for actual revenue before paying for entity |
| Edge TTS over paid TTS | Free, good enough quality for MVP |
| Scripts one-at-a-time (not batch) | Fresh research per script. Need 20-30 posted before building hook scoring system |

## 90-Day Milestones (from Mar 9 kickoff)

- Week 3 (Mar 30): 25 signups, 1st customer — MISSED
- Week 4 (Apr 6): 50 signups, $200 MRR — content pivot in progress
- Day 60: $1K MRR
- Day 90: $10K MRR

## Infrastructure

### API Dependencies (reconnection priority)
1. 🔴 Postgres → backend won't start without it
2. 🔴 Anthropic API → no AI features
3. 🔴 Stripe → payments broken
4. 🔴 Resend → email verification broken
5. 🟢 Google Drive (rclone) → content uploads
6. 🟢 Airtable → Pokémon/YGO card inventory only

### Airtable Inventory
- Base ID: app6j3HTI7cqOEkAV
- Table: Inventory (tblSE1k9mpKyCciGn)
- Fields: SKU, Product Name, Category, Set, Card Number, Rarity, Variant, Condition, Quantity, Market Price, List Price, Cost Paid, Listing Tier, Listing Status, etc.
- Listing Tiers: Tier 1 ($10+), Tier 2 ($3-10), Tier 3 ($1-3), Tier 4 (Bulk Lot), Sealed Product

## Planned / Not Yet Started

- Hook scoring system (need 20-30 videos posted first)
- Airbnb pricing research for World Cup (June 2026) — Philly property
- Formal property appraisal
- Refinance from 6.625% → low 5% range (after appraisal)
- Content scheduling tool (currently posting manually)
- Reddit OAuth or source swap for content pipeline
