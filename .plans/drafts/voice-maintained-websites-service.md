# Plan: Add a Voice-Updated Websites service card (and optional hero slide)

- **Value:** medium
- **Priority:** P2
- **Slug:** voice-maintained-websites-service
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** business-rocket-boost-service-card

## Progress
- [ ] Step 1: Owner picks the tagline from the proposals (headline already decided: "Voice-Updated Websites")
- [ ] Step 2: Owner decides on a hero slide (yes/no)
- [ ] Step 3: Add the Voice-Updated Websites card to `services-grid`
- [ ] Step 4: Add the card's `::after` background CSS rule
- [ ] Step 5: Add the cross-link between the Rocket Boost and Voice-Updated cards
- [ ] Step 6: (If approved) Add the hero slide and update the aria-label totals
- [ ] Step 7: Add CHANGELOG.md entry under [Unreleased] (/commit-prep)
- [ ] Step 8: Local preview at 1280px and 390px
- [ ] Step 9: Commit on the feature branch
- [ ] Step 10: Move this plan to review-needed/
- [ ] Done when holds

## Goal
carefreeinv.com offers "Voice-Updated Websites" (voice-/AI-maintained websites) as its own service entry and booking funnel point, cross-linked to Business Rocket Boost.

## Context read
- `index.html` @ `3cc7b7a`: hero slider L1707–L1737 (5 `.hero-slide` items, `aria-label="N of 5"`, dots built by JS from the slides ~L1782, autoplay `setInterval` ~L1825; slide 1 is Business Rocket Boost); Services section L2528–L2591, `services-grid` L2535, card pattern `div.service-card.<modifier>#service-<slug>` > `h3` + `p` + `a.service-link`; card CSS L345–L350, per-card `::after` backgrounds L481–L522, mobile single-column rule L1554–L1556. The existing `web-dev` card (L2548–L2552, "Website Development") is related, but it covers builds, not ongoing voice maintenance.
- `.anchor/templates/plan.md`, `.plans/README.md`, `.grok/skills/commit-prep/SKILL.md`, `CHANGELOG.md` (Keep a Changelog, `## [Unreleased]` → `### Added`).
- `.plans/drafts/business-rocket-boost-service-card.md` (feature branch `feature/business-rocket-boost-service-card`): it defines the `#service-rocket-boost` card, the "Book Your Ignition" CTA, and the booking link `https://calendly.com/carefreeinv/10m`.
- `.plans/drafts/rename-business-optimization-to-business-rocket-boost.md`: earlier rename, already live via `3cc7b7a` (a recorded direct-to-main exception).

**Positioning:** Voice-Updated Websites is a capability that grows out of Business Rocket Boost (AI assistant configuration), offered as its own funnel point. Pitch: low- or zero-maintenance websites that clients update by speaking to their bot or agent, which makes the website changes, while they wait for their coffee; "the era of voice-maintained websites has arrived." This site is proof: the owner has been updating carefreeinv.com by voice through an AI assistant. This proof-point is a factual statement about this site only, not a client testimonial.

**Headline: "Voice-Updated Websites"** (owner-decided Oct 10 2026).

**Tagline PROPOSALS (owner picks one in Step 1; still OPEN):**
- Tagline 1: "The era of voice-maintained websites has arrived."
- Tagline 2: "Update your website by voice while you wait for your coffee."
- Tagline 3: "Low maintenance. Zero hassle. Just say what to change."
- Tagline 4: "Your website, maintained by voice. This one is."

**Target card markup** (`{TAGLINE}` is filled from the Step 1 pick), inserted directly after the `rocket-boost` card from the dependency plan:

```html
                    <div class="service-card voice-websites" id="service-voice-websites">
                        <h3>Voice-Updated Websites</h3>
                        <p>{TAGLINE}</p>
                        <p>Low- or zero-maintenance websites: you speak to your bot or agent, and the agent makes the website changes, while you wait for your coffee. This site is updated the same way. Grows out of our <a href="#service-rocket-boost">Business Rocket Boost</a> accelerator.</p>
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
| 1 | Owner picks the tagline from the proposals (or supplies their own); the headline is already decided as "Voice-Updated Websites" | this plan | Choice recorded in Progress | human |
| 2 | Owner decides whether to add a hero slide | this plan | Choice recorded in Progress | human |
| 3 | Insert the card markup after `#service-rocket-boost` with the headline "Voice-Updated Websites" and the picked tagline | index.html | `grep -c 'id="service-voice-websites"' index.html` = 1; no `{` placeholders in the card | small |
| 4 | Add `.about .service-card.voice-websites::after` using the existing gradient and image (e.g. `images/littletown.jpg` or `images/ai.jpg`) | index.html | grep = 1; the image exists in the repo | small |
| 5 | Cross-link: the Voice card links to `#service-rocket-boost` (already in the markup), and the Rocket Boost card gets a short "Includes Voice-Updated Websites →" link to `#service-voice-websites` | index.html | Both anchors resolve (`grep 'href="#service-voice-websites"'` and `'href="#service-rocket-boost"'`); clicking scrolls to the card | small |
| 6 | If approved in Step 2: add a hero slide AFTER the Rocket Boost slide (slide 2) with the title "Voice-Updated Websites" and the picked tagline and a `cta-button` to `https://calendly.com/carefreeinv/10m`; update every `aria-label` to "N of 6" | index.html | Slide count = 6; aria-labels are consistent; Rocket Boost is still slide 1 and `is-active`. Skip with a note if declined | small |
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
- No `{TAGLINE}`, `{PRICING`, or `{TESTIMONIAL` in index.html; no prices
- The hero's first slide is still Business Rocket Boost; if a slide was added, the aria-labels all read "N of 6"
- CHANGELOG.md has the new [Unreleased] → Added bullet
- The card is visible in local screenshots at 1280px and 390px, with no horizontal overflow
- Live-site check: pending owner /review Approve and Promote
