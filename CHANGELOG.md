# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Added `smky` (YAML-based Playwright smoke-test tool) to the homepage
  Projects list, linking to `https://carefreeinv.com/smky/`.
- Added a homepage Articles block (nested under media: below the Suno player,
  above the donation blurb) driven by the `ARTICLES` array in `index.html`.
  Cards show cover images, date, summary, SEO topic tags, and a link to each
  X Article. Empty array still removes the block and its nav entry.
- Layout: top article is always a full-width lead (image ~60%); remaining cards
  paginate four at a time in a two-column grid with Prev/Next (scrolls to the
  grid on page change).
- Ranking features brand-new posts first (`publishedAt` today), then effective
  views (full weight for 90 days, then `views × 90/age`), likes, and newest
  `publishedAt` — so a fresh Article leads immediately and ancient high-view
  posts do not lock the lead forever. Likes/reposts chips only show at counts
  ≥ 100.
- Topic tags (3–5 per article) may link to related homepage services
  (`#service-*`) or projects (`#project-*`); deep links briefly highlight the
  target card. JSON-LD ItemList + schema.org Article markup included.
- Populated `ARTICLES` with live `@carefreeinv` X Articles (covers, titles,
  metrics, tags); currently eight entries including “Three New Hardware Feats”
  and “AMD’s Advancing AI Conference”.
- Added the Grok-only `/content-update` skill
  (`.grok/skills/content-update/SKILL.md`) documenting collect/merge/write,
  90-day views decay, tags + service/project links, and display rules. Non-Grok
  surfaces still refuse via `.claude/commands/content-update.md`.
- Added Anchor operator skills/commands `/tag`, `/push`, and `/release` (plus
  `plan_parse.py`) via scaffold upgrade.
- Added "Bueller" project card to the projects grid on the homepage.
- Added Google Analytics 4 (gtag.js, measurement ID `G-74LD7QY7FF`) to the
  `<head>` of `index.html`, so all page views on the site are reported to GA.

### Changed

- Refreshed homepage `ARTICLES` from live `@carefreeinv` X Articles (new rows,
  updated engagement metrics / `metricsAsOf`).
- Articles ranking now features brand-new posts first (`publishedAt` today /
  under ~24h given date-only stamps), then the existing effective-views decay.
- Upgraded the in-repo Anchor scaffold (Claude/Grok/Nemotron agent roots,
  fleet scripts, MCP servers, and plan skills) to the current Anchor checkout.

### Fixed

- Restore the homepage YouTube playlist embed by removing a private/deleted video ID that made the whole playlist report as unavailable; open on First Footprint and rebuild the embed follow-on queue.
