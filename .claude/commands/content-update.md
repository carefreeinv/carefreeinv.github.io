---
description: Refresh the site's X Articles cards from @carefreeinv — Grok-only, this surface refuses
argument-hint: "[--dry-run|--limit N|--account @handle]"
---

# /content-update — Grok-only, not runnable here

This skill refreshes the **`ARTICLES`** array in `index.html` from long-form
Articles published by **`@carefreeinv`** on X. It requires **live access to X**,
which this session does not have.

**Your entire first line must be:**

```
SUGGEST-ESCALATE: grok — /content-update needs live X access; run it in a Grok session
```

Then **stop**. Change nothing.

## Do not work around this

Specifically, do **not**:

- Search the web for the account's articles and write those in.
- Reconstruct the list from memory, from a cached page, or from a third-party
  mirror of X.
- Copy entries from an older revision of `index.html` and re-stamp
  `metricsAsOf`.
- Populate any field with a plausible-looking guess — engagement counts most of
  all.

The Articles section is built to **remove itself when the array is empty**, so
shipping with no articles is a safe, intended state. A fabricated article list on
the company's public site is not recoverable by an edit — it is a false public
claim about what Carefree has published.

## What to tell the operator

The real skill lives at **`.grok/skills/content-update/SKILL.md`**. Run
`/content-update` from a Grok session in this repo. Then, back in any session:
`/commit-prep`, and commit on a feature branch.

The plan that owns this work is `x-articles-section` under `.plans/` — its
Step 6 is the live populate run, and it is marked as requiring Grok with no
substitute.
