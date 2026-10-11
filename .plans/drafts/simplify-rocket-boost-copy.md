# Plan: Replace Business Rocket Boost stage jargon with outcome copy (faster velocity, better efficiency)

- **Value:** medium
- **Priority:** P2
- **Slug:** simplify-rocket-boost-copy
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** none

## Progress
- [ ] Step 1: Owner picks copy for each spot (S1–S4) and the CTA label (S5)
- [ ] Step 2: Services intro sentence: replace the stage list
- [ ] Step 3: Rocket Boost card description: replace the stage list
- [ ] Step 4: Booking CTAs (hero slide 1 + card): apply the chosen label
- [ ] Step 5: Confirm the hero tagline and the voice card carry no stage jargon
- [ ] Step 6: Add CHANGELOG.md entry under [Unreleased] (/commit-prep)
- [ ] Step 7: Local preview at 1280px and 390px
- [ ] Step 8: Commit on the feature branch
- [ ] Step 9: Move this plan to review-needed/
- [ ] Done when holds

Progress note: drafted 2026-10-10 from the owner's chat request (8:09 PM CT): "replace the too-technical 'four launch stages' jargon on Business Rocket Boost promos. The client cares about faster velocity & better efficiency, not the specifics." All copy options below are **proposals** pending the owner's pick (Step 1).

## Goal
carefreeinv.com sells Business Rocket Boost on outcomes (faster velocity, better efficiency), with no internal stage names (Ignition / Opening Session, Liftoff, Course Correction, Orbit) on the public page.

## Context read
- `index.html` @ dev `4d32956` (grep `-i 'ignition\|liftoff\|course correction\|orbit\|launch stage\|opening session'`). Stage-jargon hits:
  - **L2560** Services intro: "…through our Business Rocket Boost accelerator, efficiency systems, and marketing services. Business Rocket Boost runs in four stages: Ignition (Opening Session), Liftoff, Course Correction, and Orbit. Founded in 2022…"
  - **L2567** `#service-rocket-boost` card: "A business accelerator built around AI assistant configuration and setup meetings. Four launch stages: Ignition (the Opening Session), Liftoff, Course Correction, and Orbit."
  - **L1735** hero slide 1 CTA: "Book Your Ignition"
  - **L2569** card CTA: "Book Your Ignition →"
  - Not jargon, must stay: the hero tagline (L1734, "Supercharge any business, from day one to dominant."), the voice card (L2575 has no stage names), `<title>` and hidden `<h1>` ("Business Rocket Boost, Efficiency & Marketing"), and the meta description.
  - **False positives, do not touch:** "Orbit" the Starship tracker project (L2675–L2678, `orbit.carefreeinv.workers.dev`, "Try Orbit") and the "Orbital …" article titles/tags (L2025, L2034, L2039, L2088, L2093). The Done when greps below are written to exclude them.
- `CHANGELOG.md` @ `4d32956`: [Unreleased] → Added bullet (L14–L17) names "four launch stages (Ignition, Liftoff, Course Correction, Orbit)"; [Unreleased] → Changed bullet (L57–L58) names "Book Your Ignition". The `Orbit` project bullet (L22–L24) is unrelated.
- `.plans/` inventory: `completed/2026-10-10-business-rocket-boost-service-card.md` and `completed/2026-10-10-voice-maintained-websites-service.md` (both shipped; this plan edits their output but does not depend on any open plan), `drafts/rename-business-optimization-to-business-rocket-boost.md` (shipped via 3cc7b7a; unrelated). Depends on: **none**.
- `.anchor/templates/plan.md`, `.plans/README.md`, `.grok/skills/commit-prep/SKILL.md`.

## Copy proposals (owner picks one per spot; all marked PROPOSAL)

**S1 — Services intro sentence (L2560)**, replaces only "Business Rocket Boost runs in four stages: Ignition (Opening Session), Liftoff, Course Correction, and Orbit."
- S1-A (PROPOSAL): "Business Rocket Boost gets your business moving faster and running leaner, starting in the very first session."
- S1-B (PROPOSAL): "Business Rocket Boost puts an AI assistant to work in your business, so you move faster and waste less."
- S1-C (PROPOSAL): delete the sentence (the preceding sentence already says "run leaner and grow faster").

**S2 — Rocket Boost card description (L2567)**
- S2-A (PROPOSAL): "A business accelerator that sets up an AI assistant to take real work off your plate, so your business moves faster and runs more efficiently. You leave the first session with automations already running."
- S2-B (PROPOSAL): "Faster velocity, better efficiency. We configure an AI assistant around how your business actually runs and keep tuning it as you grow."
- S2-C (PROPOSAL): "Less busywork, more momentum: an accelerator built around your own AI assistant, set up with you in hands-on sessions."
- Note: "You leave the first session with automations already running" (S2-A) is a delivery promise; owner must confirm it is true for every client before shipping, or pick S2-B/S2-C.

**S3 — Hero slide 1 (L1733–L1735):** title "Business Rocket Boost" and tagline "Supercharge any business, from day one to dominant." are outcome language already. **Proposal: keep both; change only the CTA (S5).**

**S4 — Voice-Updated Websites card (L2575):** no stage names. Its "Grows out of our Business Rocket Boost accelerator" link stays. **No change.**

**S5 — Booking CTA label** ("Book Your Ignition" on hero slide 1 and the card; same `https://calendly.com/carefreeinv/10m` link). **OWNER DECISION.**
- S5-A (PROPOSAL): "Book Your Boost" (keeps the rocket theme, drops the stage name)
- S5-B (PROPOSAL): "Book a Free Call" (plainest; **only if the 10-minute Calendly call is in fact free**, owner to confirm)
- S5-C (PROPOSAL): "Get Up to Speed" or "Start Your Boost"
- Apply the same label to both CTAs; the card keeps its trailing " →".

**Stages stay internal.** Ignition / Liftoff / Course Correction / Orbit remain valid in sales docs, call scripts and proposals; this plan removes them from the public page only.

## Constraints
- Plain HTML on GitHub Pages (`.nojekyll`, `CNAME`); no build step. Don't touch CNAME, DNS or deploy settings.
- Copy changes only at S1, S2, S5 (and S3/S4 only if the owner overrides "no change"). No layout, CSS, link-target or slide-count changes; the hero stays 6 slides with Rocket Boost first.
- Don't touch the Orbit project entry, the "Orbital" article data, `<title>`, hidden `<h1>`, or meta description.
- No unconfirmed claims: S2-A's "automations already running" and S5-B's "Free" ship only with owner confirmation.
- Work only on `feature/simplify-rocket-boost-copy`. Never commit to `main` or `dev` directly; they are reached via /review.

## Conventions
Static HTML edited in place in `index.html`; keep existing elements/classes (`p`, `a.cta-button`, `a.service-link`), attributes (`target="_blank"`, `rel="noopener"` on the hero CTA), HTML entities and the `→` arrow. CHANGELOG is Keep a Changelog (`## [Unreleased]` → `### Changed`).

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Owner picks one option for S1, S2, S5 (and confirms S3/S4 "no change", plus any claim flagged above); record picks in Progress | this plan | Picks recorded in Progress | human |
| 2 | Services intro (L2560): replace the stage sentence with the S1 pick (or delete for S1-C); leave the rest of the paragraph unchanged | index.html | `grep -c 'runs in four stages' index.html` = 0; the rest of the paragraph diff-identical | small |
| 3 | Rocket Boost card (L2567): replace the description `<p>` with the S2 pick; keep the tagline `<p>`, the "Includes Voice-Updated Websites →" link and the CTA | index.html | `grep -c 'Four launch stages' index.html` = 0; `grep -c 'id="service-rocket-boost"' index.html` = 1 | small |
| 4 | Replace "Book Your Ignition" with the S5 pick on hero slide 1 (L1735) and the card CTA (L2569); href/target/rel unchanged | index.html | `grep -c 'Book Your Ignition' index.html` = 0; `grep -c '<new label>' index.html` = 2; both hrefs still `calendly.com/carefreeinv/10m` | small |
| 5 | Re-grep hero tagline and voice card for stage terms | none | `grep -nE 'Ignition\|Liftoff\|Course Correction\|Opening Session' index.html` returns nothing | small |
| 6 | /commit-prep: add a `### Changed` bullet under `## [Unreleased]`, e.g. "Reworded Business Rocket Boost copy on the homepage (Services intro, service card, booking buttons) around faster velocity and better efficiency; the stage names are no longer shown." Optionally (owner call) also reword the still-unreleased Added/Changed bullets that name the stages, since CHANGELOG is public. Gate 1: no tests/CI for this static page, skip with a note. Gate 3: no blog | CHANGELOG.md | `git diff CHANGELOG.md` shows the bullet under [Unreleased] → Changed in the existing format | small |
| 7 | Local preview (`python3 -m http.server`), headless screenshots at 1280px and 390px of the hero on load and the Services section; check card heights still align, CTA labels/links, no horizontal overflow (`scrollWidth <= 390`) | none | Screenshots saved; checks pass | mid |
| 8 | Claim → in-progress/ when starting; commit index.html + CHANGELOG.md + this plan on `feature/simplify-rocket-boost-copy` | index.html, CHANGELOG.md, .plans/ | Commit on the feature branch only; main/dev unchanged | small |
| 9 | When Done when holds, move this plan in-progress/ → review-needed/ | .plans/ | File only in `.plans/review-needed/` | small |

## Follow-up (out of scope for this repo plan)
- **Off-site promo `/workspace/ci/business-rocket-booster-pitch.md`** (on the agent box, not in this repo) uses the same jargon: the subhead "From launchpad to orbit, faster.", "'Orbit' is our word for it…", "Stage 1: Ignition (The Opening Session)", and "Stages 2–4: Proposed flight plan" (Liftoff, Course Correction, Orbit, all marked *proposed*). It also calls the service "Business Rocket **Booster**" vs the site's "Business Rocket **Boost**". Suggested follow-up: decide whether it is a client-facing promo (rewrite to outcome language with the same S1/S2/S5 picks, and fix the name) or an internal sales doc (stages can stay; label it internal). Track separately; this plan neither edits nor depends on it.

## Risks
- Generic copy loses the rocket flavour → S5-A/S5-C keep the theme; the title and tagline stay.
- Unconfirmed promises ("automations running", "Free") → flagged; owner confirms or picks another option.
- Over-broad grep removes the Orbit project or article text → Done when uses stage-specific patterns and checks the Orbit project survives.
- Card heights shift with shorter copy → check at 1280px in Step 7.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier (boilerplate/rename/formatting on a frontier route) → downgrade to smaller/local model instead

## Done when
- `grep -cE 'Ignition|Liftoff|Course Correction|Opening Session' index.html` = 0
- `grep -ci 'launch stage\|four stages\|runs in four' index.html` = 0
- `grep -c 'Orbit (the\|Orbit\.\|, and Orbit' index.html` = 0 (stage use of "Orbit")
- The Orbit project survives: `grep -c 'orbit.carefreeinv.workers.dev' index.html` = 1 and `grep -c 'Try Orbit' index.html` = 1
- `grep -c 'id="service-rocket-boost"' index.html` = 1; hero still 6 slides (`aria-label="N of 6"`), Rocket Boost first and `is-active`
- Both booking CTAs use the owner-picked S5 label and still link to `https://calendly.com/carefreeinv/10m`
- No unfilled `PROPOSAL` text or `{…}` placeholders in index.html
- CHANGELOG.md has the new [Unreleased] → Changed bullet
- Local screenshots at 1280px and 390px show the new copy with no horizontal overflow at 390px
- Live-site check: pending owner /review Approve and Promote
