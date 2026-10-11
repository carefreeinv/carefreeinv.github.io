# Plan: Rename "Business Rocket Boost" to "Business Rocket Booster" on carefreeinv.com

- **Value:** medium
- **Priority:** P2
- **Slug:** rename-rocket-boost-to-booster
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** none

## Progress
- [ ] Step 1: Replace all 7 public "Business Rocket Boost" strings in index.html
- [ ] Step 2: Confirm ids, classes, anchors and CSS stay `rocket-boost`
- [ ] Step 3: Owner decision on the "Book Your Boost" button label (keep by default)
- [ ] Step 4: Add CHANGELOG.md entry under [Unreleased] (/commit-prep)
- [ ] Step 5: Local preview at 1280px and 390px
- [ ] Step 6: Commit on the feature branch
- [ ] Step 7: Move this plan to review-needed/
- [ ] Done when holds

Progress note: drafted 2026-10-10 from the owner's decision (chat, 8:23 PM CT): the official service name is "Business Rocket Booster" (not "Boost"). Kept separate from simplify-rocket-boost-copy, which is completed and live (main 2a67802).

## Goal
carefreeinv.com names the service "Business Rocket Booster" everywhere it is shown publicly, with no remaining "Business Rocket Boost" text and no broken links.

## Context read
- `index.html` @ dev `60166f7` (`grep -n 'Rocket Boost' index.html`): **7** occurrences of "Business Rocket Boost", 0 of "Business Rocket Booster":
  1. L6 `<title>`: "Carefree Investments LLC | Business Rocket Boost, Efficiency & Marketing"
  2. L1729 hidden `<h1 class="visually-hidden">`: "Business Rocket Boost, Efficiency & Marketing"
  3. L1733 hero slide 1 title: `<p class="hero-slide-title serif">Business Rocket Boost</p>`
  4. L2560 Services intro: "…through our Business Rocket Boost accelerator…"
  5. L2560 Services intro: "Business Rocket Boost gets your business moving faster…"
  6. L2565 card heading: `<h3>Business Rocket Boost</h3>`
  7. L2575 Voice-Updated Websites card: "Grows out of our <a href="#service-rocket-boost">Business Rocket Boost</a> accelerator."
- Machine identifiers (not visible text): `id="service-rocket-boost"` (L2564), class `rocket-boost` (L2564), CSS `.about .service-card.rocket-boost::after` (L481), and the cross-link `href="#service-rocket-boost"` (L2575).
- Related but not the name: "Book Your Boost" (hero CTA L1735, card CTA L2569 "Book Your Boost →"). Unrelated "booster" text: article data such as "Space Booster Rollout" (L3883); don't touch.
- No `og:`/`twitter:` meta tags carry the name; the meta description (L7) does not mention it.
- `CHANGELOG.md` @ `60166f7`: [Unreleased] bullets mentioning "Business Rocket Boost" at L10–L11, L14, L57, L61 (history of what shipped).
- `.plans/` inventory: completed `business-rocket-boost-service-card`, `voice-maintained-websites-service`, `simplify-rocket-boost-copy`; drafts `rename-business-optimization-to-business-rocket-boost` (shipped, unrelated). No open plan touches these strings. Depends on: **none**.
- Off-site: `/workspace/ci/business-rocket-booster-pitch-public.md` already uses "Business Rocket Booster" (owner-decided).

## Decision: keep the slug and ids
Keep `id="service-rocket-boost"`, class `rocket-boost`, the `::after` CSS selector, and `href="#service-rocket-boost"` unchanged. Reasons: they aren't visible text; `#service-rocket-boost` deep links may already be shared (the CHANGELOG documents it publicly), and renaming would break them with no visible benefit; and it keeps this a text-only change. Revisit only if the owner wants clean URLs, in which case add the new id and keep a fallback for the old anchor in a separate plan.

## Constraints
- Plain HTML on GitHub Pages (`.nojekyll`, `CNAME`); no build step. Don't touch CNAME, DNS or deploy settings.
- Text-only: change the 7 visible strings; no layout, CSS, link-target, slide-count or copy changes beyond the name.
- Don't edit historical CHANGELOG bullets; add a new bullet instead.
- Work only on `feature/rename-rocket-boost-to-booster`. Never commit to `main` or `dev` directly; they are reached via /review.

## Conventions
Static HTML edited in place in `index.html`; keep elements, classes, entities (`&amp;`) and the `→` arrow. CHANGELOG is Keep a Changelog (`## [Unreleased]` → `### Changed`).

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Replace "Business Rocket Boost" with "Business Rocket Booster" at the 7 spots listed (title, hidden h1, hero title, intro ×2, card h3, voice-card link text) | index.html | `grep -cP 'Business Rocket Boost(?!er)' index.html` = 0; `grep -o 'Business Rocket Booster' index.html \| wc -l` = 7 | small |
| 2 | Leave `service-rocket-boost`, `rocket-boost` and the `::after` selector unchanged; re-check the cross-link still resolves | index.html | `grep -c 'id="service-rocket-boost"' index.html` = 1; `grep -c 'href="#service-rocket-boost"' index.html` = 1; `grep -c 'service-card.rocket-boost::after' index.html` = 1 | small |
| 3 | "Book Your Boost" buttons: **keep by default** (it reads as a verb phrase, not the name). If the owner prefers, change both to "Book Your Booster" / "Book Your Booster →". Record the decision in Progress | index.html (only if changed) | Decision recorded; `grep -c 'Book Your Boost' index.html` = 2 (keep) or `grep -c 'Book Your Booster' index.html` = 2 (change) | human |
| 4 | /commit-prep: add a `### Changed` bullet under `## [Unreleased]`, e.g. "Renamed the Business Rocket Boost service to Business Rocket Booster across the homepage (page title, hero, Services intro and card, voice-card link); the `#service-rocket-boost` anchor is unchanged." Gate 1: no tests/CI for this static page, skip with a note. Gate 3: no blog | CHANGELOG.md | `git diff CHANGELOG.md` shows the bullet under [Unreleased] → Changed; earlier bullets untouched | small |
| 5 | Local preview (`python3 -m http.server`), headless screenshots at 1280px and 390px of the hero on load and the Services section; check the title tag, the hero title wraps cleanly at 390px, card heights, cross-link scroll, no horizontal overflow | none | Screenshots saved; `document.title` contains "Business Rocket Booster"; `scrollWidth <= 390` | mid |
| 6 | Claim → in-progress/ when starting; commit index.html + CHANGELOG.md + this plan on `feature/rename-rocket-boost-to-booster` | index.html, CHANGELOG.md, .plans/ | Commit on the feature branch only; main/dev unchanged | small |
| 7 | When Done when holds, move this plan in-progress/ → review-needed/ | .plans/ | File only in `.plans/review-needed/` | small |

## Risks
- A longer hero title wraps badly on mobile → check at 390px in Step 5.
- Search engines see a title change → small, intentional; "Efficiency & Marketing" stays.
- Accidentally renaming ids or "booster" article text → Steps 1–2 grep the ids and limit replacements to the exact phrase.
- Mixed naming with the button "Book Your Boost" → owner decision in Step 3.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier (boilerplate/rename/formatting on a frontier route) → downgrade to smaller/local model instead

## Done when
- `grep -cP 'Business Rocket Boost(?!er)' index.html` = 0
- `grep -o 'Business Rocket Booster' index.html | wc -l` = 7
- `grep -c '<title>Carefree Investments LLC | Business Rocket Booster, Efficiency & Marketing</title>' index.html` = 1
- `grep -c 'hero-slide-title serif">Business Rocket Booster<' index.html` = 1 and it is still the first, `is-active` slide; hero still 6 slides (`aria-label="N of 6"`)
- `grep -c '<h3>Business Rocket Booster</h3>' index.html` = 1
- `grep -c 'id="service-rocket-boost"' index.html` = 1 and `grep -c 'href="#service-rocket-boost">Business Rocket Booster</a>' index.html` = 1
- Booking buttons match the Step 3 decision and still link to `https://calendly.com/carefreeinv/10m`
- CHANGELOG.md has the new [Unreleased] → Changed bullet; earlier bullets unchanged
- Local screenshots at 1280px and 390px show the new name with no horizontal overflow at 390px
- Live-site check: pending owner /review Approve and Promote
