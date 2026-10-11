# Plan: Add a Business Rocket Boost service card to the Services section

- **Value:** medium
- **Priority:** P2
- **Slug:** business-rocket-boost-service-card
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** none

## Progress
- [ ] Step 1: Add the Business Rocket Boost card to `services-grid`
- [ ] Step 2: Add the card's `::after` background CSS rule
- [ ] Step 3: Add CHANGELOG.md entry under [Unreleased] (/commit-prep)
- [ ] Step 4: Local preview at 1280px and 390px, incl. mobile grid check
- [ ] Step 5: Commit on the feature branch
- [ ] Step 6: Move this plan to review-needed/
- [ ] Step 7: Clean up the old rename plan (via /review)
- [ ] Done when holds

## Goal
The carefreeinv.com Services section shows a dedicated "Business Rocket Boost" service card with its tagline, description, and four launch stages.

## Context read
- `index.html` @ `3cc7b7a`: Services section L2528–L2591, `services-grid` L2535, existing cards (`ai-integration` L2536–L2540, `software-dev` L2542–L2546, `real-estate` L2584–L2588); card CSS L345–L350 (`.services-grid`, `auto-fit, minmax(300px, 1fr)`), L429–L522 (`.about .service-card` + per-card `::after` background images), mobile override L1554–L1556 (`grid-template-columns: 1fr` under `@media (max-width: 768px)`).
- `.anchor/templates/plan.md`, `.plans/README.md`, `.grok/skills/commit-prep/SKILL.md`, `CHANGELOG.md` (Keep a Changelog: `## [Unreleased]` → `### Added` bullets).
- Existing plans: `.plans/drafts/rename-business-optimization-to-business-rocket-boost.md` (earlier rename). Its edits already shipped, so this plan does not depend on it, but this plan cleans it up in Step 7.

**Recorded exception:** on Oct 10 2026 the earlier rename was pushed directly to `main` as commit `3cc7b7a` ("Rename Business Optimization to Business Rocket Boost …"), skipping the feature branch → dev → /review flow. The owner chose not to revert it. `dev` was created from `main` at `3cc7b7a` to restore the Anchor branch flow. (An older `develop` branch also exists at `11c47a2`; it is not used here.)

**Current live state (main @ 3cc7b7a):** the `<title>` (L6) and hidden h1 (L1706) say "Business Rocket Boost, Efficiency & Marketing". Hero slide 1 (L1710–L1711) has the title "Business Rocket Boost" and the description "Supercharge any business, from day one to dominant." The Services intro (L2532) mentions "our Business Rocket Boost accelerator" and the four stages. There is **no** Business Rocket Boost card in `services-grid` yet.

**Target card markup**, inserted as the first card right after `<div class="services-grid">` (L2535), before `ai-integration`, following the existing card pattern exactly:

```html
                    <div class="service-card rocket-boost" id="service-rocket-boost">
                        <h3>Business Rocket Boost</h3>
                        <p>Supercharge any business, from day one to dominant.</p>
                        <p>A business accelerator built around AI assistant configuration and setup meetings. Four launch stages: Ignition (the Opening Session), Liftoff, Course Correction, and Orbit.</p>
                        <a href="https://calendly.com/carefreeinv/10m" class="service-link" target="_blank">Book Your Ignition →</a>
                    </div>
```

## Constraints
- Plain HTML on GitHub Pages (`.nojekyll`, `CNAME`). No build step or frameworks.
- Don't touch the CNAME, DNS, or deploy settings.
- Out of scope: leave the "optimization" lines unchanged (L1721, L2538, L2703 AI platform config; L2903 portfolio; L2799 "optimized").
- Don't change the existing hero, title, h1, or Services intro wording (already live).
- Work only on `feature/business-rocket-boost-service-card`. Never commit to `main` or `dev` directly; dev and main are reached only via /review.

## Conventions
Static HTML/CSS edited in place in `index.html`. Reuse the `service-card` + modifier class + `id="service-<slug>"` pattern, plus `h3`, `p`, and `a.service-link`. Reuse the existing `::after` gradient + image rule shape and an existing image in `images/` (e.g. `images/consulting.jpg`). Keep HTML entities and the arrow `→`.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Insert the target card markup as the first child of `services-grid` (L2535) | index.html | `grep -c 'id="service-rocket-boost"' index.html` = 1; `grep -c '<h3>Business Rocket Boost</h3>' index.html` = 1 | small |
| 2 | Add `.about .service-card.rocket-boost::after` with the same gradient as the other cards and an existing image, next to the L481–L522 rules | index.html | `grep -c 'service-card.rocket-boost::after' index.html` = 1; the image path exists in the repo | small |
| 3 | /commit-prep: add an `### Added` bullet under `## [Unreleased]` in CHANGELOG.md, e.g. "Added a Business Rocket Boost service card (`#service-rocket-boost`) to the homepage Services section with its tagline and four launch stages." Gate 1: no tests/CI exist for this static page, so note that and skip. Gate 3: no blog post needed (a single card addition) | CHANGELOG.md | `git diff CHANGELOG.md` shows one bullet under [Unreleased] → Added in the existing format | small |
| 4 | Local preview (`node server.js` or `python3 -m http.server`) and headless screenshots at 1280px and 390px of the Services section. Mobile grid check: at 390px the grid is a single column (L1554 rule), and the card has no overflow or horizontal scroll; at 1280px it sits in the auto-fit grid with the same card height style as its neighbours | none | Screenshots show the card with title, tagline, description, and stages; `document.documentElement.scrollWidth <= 390` at mobile | mid |
| 5 | Commit index.html + CHANGELOG.md + this plan (in in-progress/) on `feature/business-rocket-boost-service-card` | index.html, CHANGELOG.md, .plans/ | Commit is on the feature branch only; `main` and `dev` are unchanged | small |
| 6 | When Done when holds, move this plan in-progress/ → review-needed/ on the feature branch, with Progress checked | .plans/ | The file exists only under `.plans/review-needed/` | small |
| 7 | Old plan cleanup: in `.plans/drafts/rename-business-optimization-to-business-rocket-boost.md`, check off Steps 2–6 (verified live via 3cc7b7a) and add the exception note (pushed straight to main as 3cc7b7a; not reverted per owner). Route it through review-needed/ so the human /review Approve moves it to completed/. Agents never move it to completed/ themselves | .plans/ | The old plan sits in review-needed/ with the exception note; no other copies remain in drafts/ or in-progress/ | small |

## Risks
- The new card has no background image → reuse an existing `images/*.jpg` rather than adding assets.
- An odd card count changes the desktop grid rhythm → check at 1280px; accept or adjust the order only if it clearly looks wrong.
- Duplicated wording between the hero, the Services intro, and the card → acceptable; the card is the canonical service entry.
- Pushing to main deploys immediately → never push to main; promotion happens only via /review.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier (boilerplate/rename/formatting on a frontier route) → downgrade to smaller/local model instead

## Done when
- `grep -c 'id="service-rocket-boost"' index.html` = 1
- `grep -c 'Supercharge any business, from day one to dominant.' index.html` ≥ 2 (hero + card)
- `grep -c 'Ignition' index.html` ≥ 2 and the card names Liftoff, Course Correction, Orbit
- `grep -ci 'business optimization' index.html` = 0
- The out-of-scope "optimization" lines (AI platforms, portfolio) are unchanged versus `3cc7b7a`
- CHANGELOG.md has the new [Unreleased] → Added bullet
- The card is visible in local screenshots at 1280px and 390px, with no horizontal overflow on mobile
- Live-site check: pending owner /review Approve and Promote (not an agent step)
