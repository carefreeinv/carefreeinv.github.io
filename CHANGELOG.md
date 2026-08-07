# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Added an Articles section to the homepage, rendering a card per entry in the
  `ARTICLES` array in `index.html` — ordered by engagement
  (`likes + 2 × reposts`) descending, then publish date descending, then title.
  Each card links to the article on X. While the array is empty, the section and
  its nav entry remove themselves, so the page is unchanged until articles exist.
- Added the `/content-update` skill (`.grok/skills/content-update/SKILL.md`),
  which refreshes those cards from long-form Articles published by `@carefreeinv`
  on X. It requires live X access and therefore runs on Grok only; other surfaces
  refuse it via the guard at `.claude/commands/content-update.md`.
- Populated the homepage `ARTICLES` array with six long-form Articles from
  `@carefreeinv` on X (first live `/content-update` run), so the Articles section
  and nav entry now appear with cards linking to each X Article permalink.
- Added "Bueller" project card to the projects grid on the homepage.

### Fixed

- Restore the homepage YouTube playlist embed by removing a private/deleted video ID that made the whole playlist report as unavailable; open on First Footprint and rebuild the embed follow-on queue.
