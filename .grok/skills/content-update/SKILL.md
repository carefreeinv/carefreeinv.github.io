---
name: content-update
description: >
  Refresh the site's Articles cards from long-form Articles published by the
  @carefreeinv account on X. Reads the account live, writes summaries and
  observed engagement metrics into the ARTICLES array in index.html, and stops
  before committing. Requires live X access, so this skill runs on Grok only.
  Use when the user runs /content-update, or asks to refresh, sync, or pull in
  the site's X articles.
argument-hint: "[--dry-run|--limit N|--account @handle]"
disable-model-invocation: false
metadata:
  short-description: "Refresh the site's X Articles cards from @carefreeinv"
---

# /content-update — refresh the Articles cards from X

Populate the **`ARTICLES`** array in `index.html` from the long-form **Articles**
published by **`@carefreeinv`** on X, so the site's Articles block reflects what
has actually been published.

`$ARGUMENTS` is everything after `/content-update`.

## Usage

| Invocation | Behavior |
|------------|----------|
| `/content-update` | Collect, summarize, merge, and write `index.html` |
| `/content-update --dry-run` | Collect and summarize; print the result; **write nothing** |
| `/content-update --limit N` | Cap how many Articles to pull (default 20) |
| `/content-update --account @handle` | Override the account (default `@carefreeinv`) |

## 1. Model gate — check this first, before anything else

This skill needs **live access to X**. If you are not an xAI/Grok model with
that access, your **entire first line** must be:

```
SUGGEST-ESCALATE: grok — /content-update needs live X access
```

Then **stop**. Do not fall back to web search. Do not reconstruct the account's
posting history from memory, from an existing copy of `index.html`, or from a
third-party mirror. A wrong article list published on the company site is worse
than no article list, and the block is built to hide itself when empty — an
empty result is a safe outcome, an invented one is not.

## 2. Collect

List Articles — X's **long-form** posts, not ordinary tweets — published by the
account, newest first, up to `--limit` (default 20). For each, record:

| Field | Rule |
|-------|------|
| `title` | Exactly as published (prefer the Article title field when exposed, e.g. syndication `article.title`). Do not retitle, expand, or fix capitalization. |
| `url` | The canonical permalink **as you observed it** (typically `https://x.com/i/article/…`). Never construct a URL from an ID or a pattern. |
| `image` | Cover/headline image URL **as observed** (e.g. Article `cover_media.media_info.original_img_url` via syndication), or `null` if not exposed. Never invent or hotlink an unrelated image. |
| `tags` | **3–5** short SEO topic tags (see Tag rules). Empty array only if the piece is too thin to tag honestly. |
| `publishedAt` | ISO 8601 `YYYY-MM-DD`. |
| `likes` | Observed count, or `null` if not visible to you. |
| `reposts` | Observed count, or `null` if not visible to you. |
| `views` | Observed count, or `null` if not visible to you. |
| `metricsAsOf` | Today's date, ISO 8601. Stamp every entry you touch. |

**`null` is a real answer.** A count you cannot see is `null`, never `0` and
never an estimate — `0` means "observed as zero" and the site may render it as
such. Anything you are unsure of gets marked `(unverified)` in your report and
is **excluded from the write** (per `GROK.md` rule 5).

**Engagement source:** use the counts you can actually observe (often the
promoting post for the Article, or the Article surface itself). Prefer live
observation over third-party mirrors. Stamp `metricsAsOf` for every row you
touch.

## 3. Summarize

Write a **2–3 sentence** summary per Article, drawn **only from that Article's
own text**. No inference about the business, no claims the author did not make,
no marketing register that is not already in the source. If an Article is too
thin to summarize honestly, say so in the report and leave it out.

## 3b. Tag (SEO) + service/project links

Assign **3–5** short topic tags per Article so carefreeinv.com surfaces
discoverable phrases for Carefree Innovation long-form content.

**Shape:** each tag is either a plain string or an object with an optional link:

```js
tags: [
  "Starship",
  { label: "Physical AI", href: "#service-ai-integration" },
  { label: "Grok", href: "#project-artificial-intelligence" }
]
```

**Rules:**

- Tags must be **grounded in the Article's own topics/entities** (companies,
  products, technologies, events actually discussed). Do not invent entities.
- Prefer **searchable phrases** a human would type (e.g. `Orbital AI`,
  `Starship`, `Agentic AI`, `Data center power`) over vague fluff
  (`Innovation`, `Thought leadership`, `Must read`).
- **Title Case** or natural proper nouns; **no** `#hashtags`, no leading `@`
  (unless the tag *is* a product name like `Grok`).
- Length: roughly **1–4 words** each; no full sentences.
- Deduplicate case-insensitively; cap at **5**.
- Do **not** spam the brand on every row. The site and JSON-LD already
  attribute authorship to Carefree Innovation. Use a brand tag only when the
  piece is explicitly about Carefree Innovation / Carefree Investments as a
  subject — which these X Articles usually are not.
- Refresh tags on every update when the Article text or focus has changed;
  otherwise keep stable wording so diffs stay small.

**Link when relevant (required):**

If a tag clearly maps to a homepage **service** or **project**, set `href` so
the chip jumps there. Leave plain (no `href`) when there is no honest match —
do not force weak links.

| Target | `href` pattern | How to form it |
|--------|----------------|----------------|
| Service card | `#service-<slug>` | Use the service card’s `id` in `index.html` (stable list below). |
| Project card | `#project-<slug>` | Slugify the project **title**: lowercase, non-alphanumerics → `-`, trim `-`. Example: `"Artificial Intelligence"` → `#project-artificial-intelligence`. |
| Project with no good on-page card | project’s public URL | Only if the project is listed in `PROJECTS` with a `url` and an anchor is wrong/missing. Prefer `#project-*` when the card exists. |

**Current service anchors** (from the About services grid — re-check `index.html`
if cards are renamed):

| Service | Anchor |
|---------|--------|
| AI Systems Administration | `#service-ai-integration` |
| Software Development | `#service-software-dev` |
| Website Development | `#service-web-dev` |
| IoT Integration | `#service-iot-integration` |
| Hardware Prototyping | `#service-hardware-prototyping` |
| DevOps & Infrastructure | `#service-devops` |
| QA & Testing | `#service-qa-testing` |
| Media Production | `#service-media-production` |
| Real Estate Holdings | `#service-real-estate` |

**Examples of good associations:**

- Agentic AI / Grok / Physical AI / orbital compute → `#service-ai-integration`
  and/or `#project-artificial-intelligence`
- Hardware / memristors / photonics prototyping angle → `#service-hardware-prototyping`
- Data-center infra / ops angle → `#service-devops`
- Anchor / Bueller / MQTTpi / etc. by name → `#project-anchor`, `#project-bueller`, …

Only same-page hashes (`#…`) or absolute `https://…` URLs are allowed in
`href` (the renderer drops anything else).
## 4. Merge — do not clobber

Key on **`url`**.

- **Already present** → refresh `summary`, `image`, `tags`, `likes`, `reposts`,
  `views`, and `metricsAsOf`. Leave `title` and `publishedAt` unless X itself
  shows them changed.
- **New** → append it.
- **Present in `index.html` but not seen on X this run** → **keep it and report
  it.** You cannot distinguish "deleted by the author" from "not returned by
  this query", so deleting is the human's call, not yours.

## 5. Write

Edit **only** the `ARTICLES` array literal in `index.html`. Nothing else in that
file, and no other file.

Match the surrounding formatting exactly — 4-space indentation, double-quoted
keys and string values, no trailing commas — so the diff stays reviewable. The
contract comment directly above the array documents every field; if you find
yourself wanting a field that is not in it, stop and ask rather than inventing
one.

**Ordering is not your job.** Write entries in any order. The in-page renderer
sorts and lays out cards (see below). Do not pre-sort, do not invent a `weight`
field, and do not drop old high-view rows just because they might dominate —
decay is applied at render time.

## 6. Report and stop

Print counts: **added / updated / unchanged / missing-from-X**, then the list of
any `(unverified)` items you excluded and why.

Then stop. **Never `git commit`, never `git merge`, never push.** Tell the
operator to run **`/commit-prep`** (required by `GROK.md` rule 11) and commit on
a feature branch.

`--dry-run` performs steps 1–4 and prints the result without touching
`index.html`.

## Site behavior (renderer — do not reimplement in the write)

The skill only writes data. Display rules live in the Articles IIFE in
`index.html` and are the source of truth. Keep this section in sync when the UI
changes so the next `/content-update` run stays predictable.

### Placement

- Nested inside `#media` (class `services`), **below** the Suno music player
  (`#sunoPlayer`) and **above** the donation blurb (`.donation-prompt`).
- No section heading ("Articles" title is omitted).
- Wrapper id is `#articles` (nav `#articles` and empty-state removal target).
- Empty `ARTICLES` → remove `#articles` and its nav `<li>` from the DOM.

### Sort (computed at load, not stored)

Primary key uses **effective views**, not raw views:

```
ageDays        = whole days since publishedAt (clamped ≥ 0)
effectiveViews = views                          if ageDays ≤ 90
               = views × (90 / ageDays)         if ageDays > 90
               = −1                             if views is null (sorts last)
```

Then:

1. `effectiveViews` **DESC**
2. `likes` **DESC** (`null` → −1, sorts last)
3. `publishedAt` **DESC** (newest first)
4. `title` **ASC** (stable tiebreak)

**Intent:** a well-performing Article keeps full view weight for 90 days, then
views decay as `90/age` so an ancient viral piece cannot lock the lead slot
forever. Stored `views` stay factual; only ranking applies the factor.

### Layout

- **Lead (prime):** always `sorted[0]`, full-width featured card, **not paged**.
  Image area ≈ **60%** of the row on desktop; body takes the rest. Stacks on
  small screens.
- **Grid:** remaining articles, **4 per page**, 50% width (2-column).
- **Pager:** shown only when there are more than 4 non-lead articles. Prev/Next
  change the grid only; after click, smooth-scroll so the **top of the grid**
  (`#articlesGrid`) is in view.
- Cover `image` rendered when non-null (`alt` = title); omit the img when null.
- Card meta: **date only** (no `@carefreeinv` / dash), as `<time datetime>`.
- **Tags:** visible chips from `tags[]` (max 5). Items may be strings or
  `{ label, href }`. Linked chips (`.article-tag-link`) navigate to a related
  service (`#service-*`) or project (`#project-*`, filter cleared on hash so the
  card is visible) or open an external project URL. Also
  `itemprop="keywords"` and JSON-LD `ItemList` of `Article` entries with
  `keywords`, author Carefree Innovation, publisher Carefree Investments.
- Metrics chips:
  - `views` shown when a number (including 0)
  - `likes` / `reposts` shown only when the count is **≥ 100**
- Cards are `<article itemscope itemtype="https://schema.org/Article">`.
- Whole-card click opens the Article URL (inner "Read on X →" still works).

### Data contract reminder

```js
{
  title: "…",
  summary: "…",
  url: "https://x.com/i/article/…",
  image: "https://pbs.twimg.com/media/…jpg",  // or null
  tags: [
    "Starship",
    { label: "Physical AI", href: "#service-ai-integration" },
    { label: "Grok", href: "#project-artificial-intelligence" }
  ],
  publishedAt: "2026-07-25",
  likes: 1,          // or null
  reposts: 0,        // or null
  views: 10226,      // or null
  metricsAsOf: "2026-08-07"
}
```

## Verify

- `node -e "const h=require('fs').readFileSync('index.html','utf8');const m=h.match(/const ARTICLES = (\[[\s\S]*?\]);/);console.log(eval(m[1]).length+' articles parse OK')"`
- `git diff --stat` shows `index.html` only.
- Every `url` written resolves to a live `@carefreeinv` / `x.com/i/article/` permalink.
- Every non-null `image` URL returns HTTP 200 when checked.

## Footer

End with `## Result`, `## How to verify`, `## Deferred / concerns`.
