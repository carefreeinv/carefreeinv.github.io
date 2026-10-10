# Plan: Rename "Business Optimization" service to "Business Rocket Boost" on carefreeinv.com

- **Value:** medium
- **Priority:** P2
- **Slug:** rename-business-optimization-to-business-rocket-boost
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** none

## Progress
- [x] Step 1: Confirm final wording with owner — Owner approved wording and subheading by voice, Oct 10 2026.
- [ ] Step 2: Update page title and hidden H1
- [ ] Step 3: Update hero slide title
- [ ] Step 4: Update Services section intro paragraph
- [ ] Step 5: Add short service description with the four launch stages
- [ ] Step 6: Verify locally and on live site
- [ ] Done when holds

## Goal
carefreeinv.com presents the business optimization service under its new name, "Business Rocket Boost", with the same description and four launch stages: Ignition (Opening Session), Liftoff, Course Correction, Orbit.

## Context read
- `index.html` (single-page site; service wording found via grep for "optimi")
- `.plans/README.md`, `.anchor/templates/plan.md`
- Existing plans: `.plans/` lanes are all empty, so there are no dependencies or duplicates.

Current occurrences of the service name in `index.html` (line numbers as of commit b3b8e08):
- L6 `<title>`: "Carefree Investments LLC | Business Optimization, Efficiency & Marketing"
- L1706 hidden `<h1>`: "Business Optimization, Efficiency & Marketing"
- L1710 hero slide title: "Business Optimization &amp; Efficiency"
- L1711 hero slide description (no dedicated service card exists in `services-grid`, so the hero description is the subheading spot): becomes "Supercharge any business, from day one to dominant."
- L2532 Services intro: "...through business optimization, efficiency systems, and marketing services."

Out of scope: L1721/L2538/L2703 use "optimization" for AI platform configuration, and L2799/L2903 are portfolio descriptions. These are not the service name, so leave them unchanged.

## Constraints
- Only the name changes. The service description and the four launch stages stay the same.
- Branding: Carefree Innovation is the brand and Carefree Investments LLC is the legal name. Keep the legal name in `<title>` unless the owner says otherwise.
- Plain HTML on GitHub Pages (`.nojekyll`, `CNAME`). No build step, so don't add frameworks.
- Don't touch the CNAME, DNS, or deploy settings.

## Conventions
Static HTML/CSS, edited in place. Keep existing class names (`hero-slide-title serif`, `services-grid`) and HTML entities (`&amp;`).

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Owner confirms final strings: title "Carefree Investments LLC \| Business Rocket Boost, Efficiency & Marketing", hero "Business Rocket Boost", subheading "Supercharge any business, from day one to dominant." | none | Owner approval recorded in Progress | human |
| 2 | Replace "Business Optimization" in `<title>` and the hidden `<h1>` | index.html | `grep -n "Business Rocket Boost" index.html` shows L6 and L1706 | small |
| 3 | Change the hero slide title to "Business Rocket Boost" and its description to the subheading "Supercharge any business, from day one to dominant." | index.html | grep shows the hero line | small |
| 4 | Services intro: "business optimization" becomes "our Business Rocket Boost accelerator" | index.html | `grep -ci "business optimization" index.html` returns 0 | small |
| 5 | Optionally add one line naming the stages (Ignition/Opening Session, Liftoff, Course Correction, Orbit) to the Services intro or hero slide text | index.html | Text visible in local preview | small |
| 6 | Preview with `node server.js`, check the hero carousel and Services section, push, and check the live carefreeinv.com | index.html | Live page shows the new name; no layout breaks | mid |

## Risks
- Search engines lose a familiar title. Keep "Efficiency & Marketing" in the title for continuity.
- A long hero title might wrap badly on mobile. Check a narrow viewport in Step 6.
- Pushing to main deploys right away. Do one commit with all edits after preview.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier → downgrade

## Done when
- `grep -ci "business optimization" index.html` returns 0
- `grep -c "Business Rocket Boost" index.html` is at least 3 (title, h1, hero, services)
- The out-of-scope "optimization" lines (AI platforms, portfolio) are unchanged
- The subheading "Supercharge any business, from day one to dominant." appears in the hero slide
- The live carefreeinv.com shows "Business Rocket Boost" in the hero and Services section
