# Copilot Instructions

## Overview
- The entire experience is a single static page ([carefree-investments.html](carefree-investments.html)) that mixes layout, styling, and scripting in one file; keep that structure when touching layouts or behavior.
- The page is split into hero/media/about/values/contact sections, plus the footer. Each section leans on small utility classes (`.container`, `.services-grid`, `.service-card`, etc.) that repeat throughout the document.

## Styling & layout conventions
- Styles live in a single `<style>` block near the top. Reuse the CSS variables (`--primary`, `--accent`, etc.) for new colors and keep selectors close to the DOM they target for readability.
- Grids rely on `display: grid` with `auto-fit`/`minmax` so any new content should slot into existing `.services-grid` or `.values-grid` containers without restructuring the HTML hierarchy.
- Animated floats (hero callout, service-card hover states, mouse-driven parallax) rely on relative positioning + transform transitions—avoid adding heavy new layout wrappers that would break these effects.

## JavaScript responsibilities
- The YouTube player is configured inside the `YOUTUBE_CONFIG` object near the bottom of the file; edit the `videoId`/`playlistId` or player flags directly in that script block.
- The Suno playlist widget is driven by the `SUNO_PLAYLISTS` array and the playlist tabs. Each playlist entry can declare a `tracks` array (with `{ id, title, streamId/streamUrl, openUrl }` as needed); clicking a tab simply shuffles that playlist and reports the chosen track instead of rendering a full list. Populate the `tracks` array by copying the `collection` from the playlist page (use the console snippet explained in the inline comment) and keep the shuffle/play logic in lockstep with any new ordering. The `Space Soundtrack` playlist already contains sample `id/title` pairs so the player can stream immediately without extra data, while empty playlists show the reminder in the status tram when loaded.
- The header stars are drawn on a `<canvas id="starCanvas">` by the final self-invoking script. It responds to resize and mouse events, so keep any DOM changes in that area simple (e.g., don’t remove the canvas or break the container sizes it assumes).

## Workflow notes
- No build/test tools are configured; editing and verifying happen by opening the HTML in a browser or serving it through `python -m http.server`/`npx serve` from the repo root.
- Because everything is inline, prefer editing in a single pass; maintain the order of CSS → HTML → scripts so manual formatting stays consistent.
- If you need to add assets (fonts, images, icon SVGs), keep them in the repo root and reference them via relative paths; there is no bundler or asset pipeline.

## Recommended focus areas
- When adding new sections (e.g., another service) reuse existing markup + utility classes rather than inventing new layouts—this keeps the typography and spacing uniform.
- For interactive updates, follow the pattern of self-invoking scripts that cache element references once (`const audio = document.getElementById(...)`), then manage state via local variables (`playing`, `shuffleOn`, etc.).
- Keep performance in mind: the star canvas and Suno playlist are already animation-heavy, so avoid adding DOM-heavy loops outside those dedicated scripts.

## Questions
- Need clarification on anything above or want this guide to cover another area? Let me know so I can expand or adjust it.