# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Added a homepage Articles block (nested under media: below the Suno player,
  above the donation blurb) driven by the `ARTICLES` array in `index.html`.
  Cards show cover images, date, summary, SEO topic tags, and a link to each
  X Article. Empty array still removes the block and its nav entry.
- Layout: top article is always a full-width lead (image ~60%); remaining cards
  paginate four at a time in a two-column grid with Prev/Next (scrolls to the
  grid on page change).
- Ranking uses effective views (full weight for 90 days, then `views × 90/age`),
  then likes, then newest `publishedAt` — so long-lived high-view posts do not
  lock the lead forever. Likes/reposts chips only show at counts ≥ 100.
- Topic tags (3–5 per article) may link to related homepage services
  (`#service-*`) or projects (`#project-*`); deep links briefly highlight the
  target card. JSON-LD ItemList + schema.org Article markup included.
- Populated `ARTICLES` with six live `@carefreeinv` X Articles (covers, titles,
  metrics, tags).
- Added the Grok-only `/content-update` skill
  (`.grok/skills/content-update/SKILL.md`) documenting collect/merge/write,
  90-day views decay, tags + service/project links, and display rules. Non-Grok
  surfaces still refuse via `.claude/commands/content-update.md`.
- Added "Bueller" project card to the projects grid on the homepage.

### Fixed

- Restore the homepage YouTube playlist embed by removing a private/deleted video ID that made the whole playlist report as unavailable; open on First Footprint and rebuild the embed follow-on queue.
