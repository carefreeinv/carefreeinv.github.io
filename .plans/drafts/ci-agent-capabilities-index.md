# Plan: Carefree Innovation agent capabilities, index and build order for three AI agent builds

- **Value:** high
- **Priority:** P1
- **Slug:** ci-agent-capabilities-index
- **Preferred models:** planner, reasoner
- **Assignee:** human
- **Depends on:** none

## Progress
- [ ] Step 1: Build capability 1, sales / lead research agent
- [ ] Step 2: Build capability 2, MCP server for internal tools
- [ ] Step 3: Build capability 3, eval dashboard plus guardrails layer
- [ ] Done when holds

## Goal
Carefree Innovation, the private AI install and automation department of Carefree Investments LLC, builds three AI agent capabilities in order. Each one is a reusable internal tool and a client-facing demo or offering, deployed publicly with an honest "What broke" log.

## Why these three
Small businesses considering a private AI install want to see agents that do real work safely before they commit. Carefree Innovation will build three capabilities it can use itself and offer to clients, deploy them publicly, and write plainly about what broke:
- **Lead research agent:** supports Carefree's own sales pipeline, and demonstrates to clients an agent doing real business work with a human approving every outbound message.
- **MCP server for internal tools:** an integration pattern Carefree can install for clients, connecting an assistant to their existing systems with scoped, read-mostly access.
- **Eval dashboard plus guardrails:** a quality and safety layer Carefree can offer with every AI install.

These files are the plans. Nothing here is built yet, and no metrics, customers, or results are claimed.

## Build order

| # | Plan | Business value and what it demonstrates to clients | Target |
|---|------|---------------|--------|
| 1 | [`ci-agent-capabilities-lead-research-agent`](ci-agent-capabilities-lead-research-agent.md): Sales / lead research agent | Feeds Carefree's own sales pipeline; shows clients an agent doing real business work end to end, with a human approving every outbound message. | First public repo around **Tue Nov 24, 2026** (planned) |
| 2 | [`ci-agent-capabilities-mcp-internal-tools`](ci-agent-capabilities-mcp-internal-tools.md): MCP server for internal tools | A repeatable install pattern for clients: integrating an assistant with existing systems through the Model Context Protocol, with scoped, read-mostly access. | After capability 1 (planned) |
| 3 | [`ci-agent-capabilities-eval-guardrails`](ci-agent-capabilities-eval-guardrails.md): Eval dashboard plus guardrails layer | A quality and safety layer offered with every AI install: measuring agents on accuracy, cost, and latency, and blocking prompt injection and risky actions. Wraps capabilities 1 and 2. | After capability 2 (planned) |

The order is enforced through **Depends on**: capability 2 depends on capability 1, and capability 3 depends on capabilities 1 and 2.

## How each plan is organized
Each capability plan follows `.anchor/templates/plan.md` (header, Progress, Goal, Context read, Constraints, Conventions, Steps, Risks, Escalation triggers, Done when) and also keeps these sections from the original drafts:
- Goal and the business value it delivers (what it demonstrates to clients)
- MVP scope and non-goals
- Architecture sketch (mermaid)
- Suggested stack (vendor-flexible, open or local models where reasonable)
- Milestones sized for weekday evenings (about two hours each), as the Steps table
- Public deploy and demo plan
- Evaluation plan
- Risks
- A "What broke" template, filled in only after real failures

## Shared ground rules
- No agent sends, deletes, or spends anything without a human approving it.
- Demos use public or synthetic data. No private lead or client data is published.
- Numbers appear in these plans or any write-up only after they are measured, with a link to the run that produced them.

## Context read
- `.plans/README.md`, `.anchor/templates/plan.md`, `GROK.md`, `CLAUDE.md`, `.anchor/conventions.md`
- Existing plans in `.plans/drafts/` and `.plans/completed/` (all about carefreeinv.com service copy; none overlap with this work, so no dependencies outside this set)
- Original standalone HTML drafts of these plans (converted here to markdown)

## Constraints
- Each capability is built in its own new public repository under the `carefreeinv` GitHub account, not in this site repo.
- This repo's homepage (`index.html`), its PROJECTS list, and its nav are not changed by these plans.
- Per the `.plans/README.md` docs rule, README, CHANGELOG, blog, and site copy must not restate these plans as a roadmap or advertise them as services. Write about a capability only after it ships, and document what shipped.
- No invented metrics, customers, or results.

## Conventions
Per-capability conventions live in each capability plan (Python by default). SOLID and the "Code quality defaults" in `.anchor/ANCHOR.md` apply.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Build capability 1 per `ci-agent-capabilities-lead-research-agent` | new public repo (capability 1) | That plan's Done when holds | human |
| 2 | Build capability 2 per `ci-agent-capabilities-mcp-internal-tools` | new public repo (capability 2) | That plan's Done when holds | human |
| 3 | Build capability 3 per `ci-agent-capabilities-eval-guardrails` | new public repo (capability 3) | That plan's Done when holds | human |

## Risks
- Scope creep across capabilities → each plan lists explicit non-goals; finish and publish one capability before starting the next.
- Claiming results before they exist → numbers appear only after they are measured, linked to the run.
- Plans leaking into public docs as a roadmap or a service promise → follow the `.plans/README.md` docs rule.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier → downgrade

## Done when
- `ci-agent-capabilities-lead-research-agent`, `ci-agent-capabilities-mcp-internal-tools`, and `ci-agent-capabilities-eval-guardrails` are all in `.plans/completed/`
- Each capability has a public repository under `carefreeinv` and a write-up containing only measured results
