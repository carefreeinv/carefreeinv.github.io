# Plan: Add a Voice-Updated Websites service card (and optional hero slide)

- **Value:** medium
- **Priority:** P2
- **Slug:** voice-maintained-websites-service
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** business-rocket-boost-service-card

## Progress
- [x] Step 1: Headline and tagline decided: "Voice-Updated Websites" / "Have your bot update your site while you're tanning on the beach."
- [x] Step 2: Hero slide decided: YES, as slide 2 after Rocket Boost (owner, Oct 10 2026)
- [x] Step 3: Add the Voice-Updated Websites card to `services-grid`
- [x] Step 4: Add the card's `::after` background CSS rule
- [x] Step 5: Add the cross-link between the Rocket Boost and Voice-Updated cards
- [x] Step 6: Add the hero slide (approved) and update the aria-label totals
- [x] Step 7: Add CHANGELOG.md entry under [Unreleased] (/commit-prep)
- [x] Step 8: Local preview at 1280px and 390px
- [x] Step 9: Commit on the feature branch
- [x] Step 10: Move this plan to review-needed/
- [x] Done when holds

Claimed by Grok Bot /work on 2026-10-10 after syncing dev (f637c12) into this branch as 7e434d8; dependency business-rocket-boost-service-card is in completed/ (lease not recorded: no local checkout or Anchor scripts; worked via the GitHub connector).
Step verifies: h3 x1, id x1 (directly after #service-rocket-boost), href="#service-rocket-boost" x1, href="#service-voice-websites" x1, tagline x2 (card + hero), ::after rule x1 (images/littletown.jpg exists), no {PRICING/{TESTIMONIAL, no new prices; 6 slides labelled "N of 6", Rocket Boost slide 1 is-active, Voice slide 2. CHANGELOG [Unreleased] Added bullet. Gate 1 skipped (no tests/CI for this static page); Gate 3 no blog (default per plan). Preview 1280/390: 6 dots, autoplay 1->2->3 (7s), next wraps 6->1, slide-2 CTA calendly.com/carefreeinv/10m target=_blank rel=noopener, card CTA same link target=_blank, both cross-links scroll to their card, 3 cols at 1280 / 1 col at 390, scrollWidth 1280/390.
Done when: live-site item pending owner /review Approve + Promote (not an agent step).
Hero slide 2 CTA text "Book a Session" (plan gave no text; matches the card).

Progress note: Owner decided the headline "Voice-Updated Websites" and the tagline "Have your bot update your site while you're tanning on the beach." on Oct 10 2026. On Oct 10 2026 the owner decided YES to a hero slide, placed as slide 2 after Rocket Boost.

## Goal
carefreeinv.com offers "Voice-Updated Websites" (voice-/AI-maintained websites) as its own service entry and booking funnel point, cross-linked to Business Rocket Boost.

## Context read
- `index.html` @ `3cc7b7a`: hero slider L1707–L1737 (5 `.hero-slide` items, `aria-label="N of 5"`, dots built by JS from the slides ~L1782, autoplay `setInterval` ~L1825; slide 1 is Business Rocket Boost); Services section L2528–L2591, `services-grid` L2535, card pattern `div.service-card.<modifier>#service-<slug>` > `h3` + `p` + `a.service-link`; card CSS L345–L350, per-card `::after` backgrounds L481–L522, mobile single-column rule L1554–L1556. The existing `web-dev` card (L2548–L2552, "Website Development") is related, but it covers builds, not ongoing voice maintenance.
- `.anchor/templates/plan.md`, `.plans/README.md`, `.grok/skills/commit-prep/SKILL.md`, `CHANGELOG.md` (Keep a Changelog, `## [Unreleased]` → `### Added`).
- `.plans/drafts/business-rocket-boost-service-card.md` (feature branch `feature/business-rocket-boost-service-card`): it defines the `#service-rocket-boost` card, the "Book Your Ignition" CTA, and the booking link `https://calendly.com/carefreeinv/10m`.
- `.plans/drafts/rename-business-optimization-to-business-rocket-boost.md`: earlier rename, already live via `3cc7b7a` (a recorded direct-to-main exception).

**Positioning:** Voice-Updated Websites is a capability that grows out of Business Rocket Boost (AI assistant configuration), offered as its own funnel point. Pitch: low- or zero-maintenance websites that clients update by speaking to their bot or agent, which makes the website changes, while they wait for their coffee; "the era of voice-maintained websites has arrived." This site is proof: the owner has been updating carefreeinv.com by voice through an AI assistant. This proof-point is a factual statement about this site only, not a client testimonial.

**Headline: "Voice-Updated Websites"** (owner-decided Oct 10 2026).

**Tagline: "Have your bot update your site while you're tanning on the beach."** (owner-decided Oct 10 2026).

**Target card markup**, inserted directly after the `rocket-boost` card from the dependency plan:

```html
                    <div class="service-card voice-websites" id="service-voice-websites">
                        <h3>Voice-Updated Websites</h3>
                        <p>Have your bot update your site while you're tanning on the beach.</p>
                        <p>Low- or zero-maintenance websites: you speak to your bot or agent, and the agent makes the website changes, whether you're on the beach or waiting for your coffee. This site is updated the same way. Grows out of our <a href="#service-rocket-boost">Business Rocket Boost</a> accelerator.</p>
                        <a href="https://calendly.com/carefreeinv/10m" class="service-link" target="_blank">Book a Session →</a>
                    </div>
```

## Depends on (detail)
- `business-rocket-boost-service-card`: this card reuses its card pattern, position (directly after `#service-rocket-boost`), and booking link, and it cross-links to `#service-rocket-boost`. That anchor exists only once that plan lands on dev. Executing this first would leave a broken cross-link and an unsettled card order.

## Out of scope
- Pricing and packages. Don't invent prices; at most use the placeholder `{PRICING — owner to supply}`, which must not ship.
- Legal claims (guarantees, uptime, "zero maintenance" as a warranty, compliance). Use "low- or zero-maintenance" as descriptive copy only.
- Client testimonials and logos. Placeholder `{TESTIMONIAL — owner to supply}` only, and it must not ship. The "this site is proof" line is the owner's own statement, not a testimonial.
- New pages, forms, or booking tools; the voice-update tooling itself.
- The out-of-scope "optimization" lines (L1721, L2538, L2703, L2903) and the existing `web-dev` card copy.

## Constraints
- Plain HTML on GitHub Pages (`.nojekyll`, `CNAME`). No build step or frameworks. Don't touch the CNAME, DNS, or deploy settings.
- Work only on `feature/voice-maintained-websites-service` (rebase on dev after the dependency merges). Never commit to `main` or `dev`.
- No unfilled `{…}` placeholders in shipped `index.html`.
- The Business Rocket Boost hero slide stays first.

## Conventions
Static HTML/CSS edited in place in `index.html`. Reuse the `service-card` + modifier + `id="service-<slug>"` pattern, plus `h3`, `p`, `a.service-link`, and the `::after` gradient + existing `images/*.jpg` rule shape. Hero slides use `div.hero-slide` > `p.hero-slide-title.serif` + `p` + `a.cta-button` (target `_blank`, rel `noopener`). Keep HTML entities.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Headline and tagline decided by owner: "Voice-Updated Websites" / "Have your bot update your site while you're tanning on the beach." (done Oct 10 2026) | this plan | Recorded in Progress | human |
| 2 | Hero slide: YES, as slide 2 after Rocket Boost (owner-decided Oct 10 2026) | this plan | Recorded in Progress | human |
| 3 | Insert the card markup after `#service-rocket-boost` with the headline "Voice-Updated Websites" and the tagline "Have your bot update your site while you're tanning on the beach." | index.html | `grep -c 'id="service-voice-websites"' index.html` = 1; no `{` placeholders in the card | small |
| 4 | Add `.about .service-card.voice-websites::after` using the existing gradient and image (e.g. `images/littletown.jpg` or `images/ai.jpg`) | index.html | grep = 1; the image exists in the repo | small |
| 5 | Cross-link: the Voice card links to `#service-rocket-boost` (already in the markup), and the Rocket Boost card gets a short "Includes Voice-Updated Websites →" link to `#service-voice-websites` | index.html | Both anchors resolve (`grep 'href="#service-voice-websites"'` and `'href="#service-rocket-boost"'`); clicking scrolls to the card | small |
| 6 | If approved in Step 2: add a hero slide AFTER the Rocket Boost slide (slide 2) with the title "Voice-Updated Websites" and the tagline "Have your bot update your site while you're tanning on the beach." and a `cta-button` to `https://calendly.com/carefreeinv/10m`; update every `aria-label` to "N of 6" | index.html | Slide count = 6; aria-labels are consistent; Rocket Boost is still slide 1 and `is-active`. Skip with a note if declined | small |
| 7 | /commit-prep: `### Added` bullet under `## [Unreleased]`, e.g. "Added a Voice-Updated Websites service card (`#service-voice-websites`) to the homepage Services section, cross-linked with Business Rocket Boost[, plus a hero slide]." No tests/CI exist for this static page, so note that and skip Gate 1. Gate 3: blog post optional (owner call); default none | CHANGELOG.md | `git diff CHANGELOG.md` shows one bullet in the existing format | small |
| 8 | Local preview with headless screenshots at 1280px and 390px: the Services grid with both cards adjacent, the cross-links working, the hero (Rocket Boost first; the new slide second if added; dots match the count; autoplay cycles), the CTA opening the booking link in a new tab, and no horizontal overflow at 390px (`scrollWidth <= 390`) | none | Screenshots saved; checks pass | mid |
| 9 | Move plan to in-progress/ when claimed, then commit index.html + CHANGELOG.md + the plan on `feature/voice-maintained-websites-service` | index.html, CHANGELOG.md, .plans/ | Commit on the feature branch only; main/dev unchanged | small |
| 10 | When Done when holds, move this plan in-progress/ → review-needed/ | .plans/ | File only in `.plans/review-needed/` | small |

## Risks
- Overclaiming ("zero maintenance") reads as a guarantee → keep "low- or zero-maintenance" and avoid warranty language (see Out of scope).
- Overlap with the `web-dev` card confuses visitors → the card copy stresses ongoing voice maintenance; don't edit `web-dev`.
- The cross-link breaks if the dependency hasn't landed → wait for Depends on.
- A sixth hero slide dilutes the Rocket Boost slide → it's optional, and goes second.
- A placeholder ships by accident → Done when greps for `{`.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier (boilerplate/rename/formatting on a frontier route) → downgrade to smaller/local model instead

## Done when
- `grep -c '<h3>Voice-Updated Websites</h3>' index.html` = 1
- `grep -c 'id="service-voice-websites"' index.html` = 1, and it comes right after `id="service-rocket-boost"`
- `grep -c 'href="#service-rocket-boost"' index.html` ≥ 1 and `grep -c 'href="#service-voice-websites"' index.html` ≥ 1
- The card CTA links to `https://calendly.com/carefreeinv/10m`
- `grep -c "Have your bot update your site while you're tanning on the beach." index.html` ≥ 1 (card)
- No `{PRICING`, or `{TESTIMONIAL` in index.html; no prices
- The hero's first slide is still Business Rocket Boost; if a slide was added, the aria-labels all read "N of 6"
- CHANGELOG.md has the new [Unreleased] → Added bullet
- The card is visible in local screenshots at 1280px and 390px, with no horizontal overflow
- Live-site check: pending owner /review Approve and Promote

## Review notes
/review 2026-10-10 — Needs Work (owner Daniel via chat, 7:26 PM CT): the new in-paragraph cross-links ("Includes Voice-Updated Websites →" in #service-rocket-boost, "Business Rocket Boost" in #service-voice-websites) render in the browser default link blue rgb(0,0,238) on the dark card (~1.3:1, fails WCAG 1.4.3). Fix: style `.about .service-card p a` in a light accent, underlined, at ≥ 4.5:1 on the dark card; verify computed contrast; re-preview at 1280/390; amend CHANGELOG if needed.

Re-claimed by Grok Bot /work 2026-10-10 for the Needs Work contrast fix.
Fix: `.about .service-card p a { color:#b8d4f5; underline }` (hover/focus #fff), added after the existing card text rule. Computed color rgb(184,212,245), underline. Contrast vs sampled rendered card background behind each link: worst pixel 6.29:1 (390px), 6.49-6.70:1 (1280px); theoretical worst (white image under the 85% overlay) 4.96:1. Links remain clickable (elementFromPoint = A). Re-preview at 1280/390 (v2-*.png): 6 slides/6 dots, Rocket Boost first, autoplay 1->2->3, wrap 6->1, CTAs correct, cross-links scroll, scrollWidth 1280/390. CHANGELOG bullet amended.

## Handoff
moved to review-needed 2026-10-10 — work commit 9d25f4a; /review Needs Work 2026-10-10 → features/ (link contrast)
moved to review-needed 2026-10-10 after Needs Work fix 9b0b21a; awaiting /review
