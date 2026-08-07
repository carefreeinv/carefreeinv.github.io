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
published by **`@carefreeinv`** on X, so the site's Articles section reflects
what has actually been published.

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
than no article list, and the section is built to hide itself when empty — an
empty result is a safe outcome, an invented one is not.

## 2. Collect

List Articles — X's **long-form** posts, not ordinary tweets — published by the
account, newest first, up to `--limit` (default 20). For each, record:

| Field | Rule |
|-------|------|
| `title` | Exactly as published. Do not retitle, expand, or fix its capitalization. |
| `url` | The canonical permalink **as you observed it**. Never construct a URL from an ID or a pattern. |
| `publishedAt` | ISO 8601 `YYYY-MM-DD`. |
| `likes` | Observed count, or `null` if not visible to you. |
| `reposts` | Observed count, or `null` if not visible to you. |
| `views` | Observed count, or `null`. Display only — it does not affect ordering. |
| `metricsAsOf` | Today's date, ISO 8601. Stamp every entry you touch. |

**`null` is a real answer.** A count you cannot see is `null`, never `0` and
never an estimate — `0` means "observed as zero" and the site renders it as
such. Anything you are unsure of gets marked `(unverified)` in your report and
is **excluded from the write** (per `GROK.md` rule 5).

## 3. Summarize

Write a **2–3 sentence** summary per Article, drawn **only from that Article's
own text**. No inference about the business, no claims the author did not make,
no marketing register that is not already in the source. If an Article is too
thin to summarize honestly, say so in the report and leave it out.

## 4. Merge — do not clobber

Key on **`url`**.

- **Already present** → refresh `summary`, `likes`, `reposts`, `views`, and
  `metricsAsOf`. Leave `title` and `publishedAt` unless X itself shows them
  changed.
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

Ordering is **not** your job: the renderer sorts by
`score DESC → publishedAt DESC → title ASC` at page load, where
`score = (likes || 0) + 2 * (reposts || 0)`. Write entries in any order.

## 6. Report and stop

Print counts: **added / updated / unchanged / missing-from-X**, then the list of
any `(unverified)` items you excluded and why.

Then stop. **Never `git commit`, never `git merge`, never push.** Tell the
operator to run **`/commit-prep`** (required by `GROK.md` rule 11) and commit on
a feature branch.

`--dry-run` performs steps 1–4 and prints the result without touching
`index.html`.

## Verify

- `node -e "const h=require('fs').readFileSync('index.html','utf8');const m=h.match(/const ARTICLES = (\[[\s\S]*?\]);/);console.log(eval(m[1]).length+' articles parse OK')"`
- `git diff --stat` shows `index.html` only.
- Every `url` written resolves to a live `@carefreeinv` permalink.

## Footer

End with `## Result`, `## How to verify`, `## Deferred / concerns`.
