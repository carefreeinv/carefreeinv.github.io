# Plan: Agent portfolio, index and build order for three AI agent projects

- **Value:** high
- **Priority:** P1
- **Slug:** agent-portfolio-index
- **Preferred models:** planner, reasoner
- **Assignee:** Daniel
- **Depends on:** none

## Progress
- [ ] Step 1: Build project 1, sales / lead research agent
- [ ] Step 2: Build project 2, MCP server for internal tools
- [ ] Step 3: Build project 3, eval dashboard plus guardrails layer
- [ ] Done when holds

## Goal
Three AI agent projects are built in order, each deployed publicly with an honest "What broke" log, as proof of shipped agents for AI engineering and Forward Deployed Engineer roles.

## Why these three
AI engineering and Forward Deployed Engineer postings mostly ask for proof of shipped AI agents. The approach is to pick three agent projects, deploy them publicly, and write plainly about what broke. These files are the plans. Nothing here is built yet, and no metrics, customers, or results are claimed.

## Build order

| # | Plan | What it shows | Target |
|---|------|---------------|--------|
| 1 | [`agent-portfolio-lead-research-agent`](agent-portfolio-lead-research-agent.md): Sales / lead research agent | An agent doing real business work end to end, with a human approving every outbound message. | First public repo around **Tue Nov 24, 2026** (planned) |
| 2 | [`agent-portfolio-mcp-internal-tools`](agent-portfolio-mcp-internal-tools.md): MCP server for internal tools | Integrating an assistant with existing systems through the Model Context Protocol, with scoped, read-mostly access. | After project 1 (planned) |
| 3 | [`agent-portfolio-eval-guardrails`](agent-portfolio-eval-guardrails.md): Eval dashboard plus guardrails layer | Measuring agents on accuracy, cost, and latency, and blocking prompt injection and risky actions. Wraps projects 1 and 2. | After project 2 (planned) |

The order is enforced through **Depends on**: project 2 depends on project 1, and project 3 depends on projects 1 and 2.

## How each plan is organized
Each project plan follows `.anchor/templates/plan.md` (header, Progress, Goal, Context read, Constraints, Conventions, Steps, Risks, Escalation triggers, Done when) and also keeps these sections from the original drafts:
- Goal and the hiring signal it shows
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
- Each project is built in its own new public repository under the `carefreeinv` GitHub account, not in this site repo.
- This repo's homepage (`index.html`), its PROJECTS list, and its nav are not changed by these plans.
- Per the `.plans/README.md` docs rule, README, CHANGELOG, blog, and site copy must not restate these plans as a roadmap. Write about a project only after it ships, and document what shipped.
- No invented metrics, customers, or results.

## Conventions
Per-project conventions live in each project plan (Python by default). SOLID and the "Code quality defaults" in `.anchor/ANCHOR.md` apply.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Build project 1 per `agent-portfolio-lead-research-agent` | new public repo (project 1) | That plan's Done when holds | human (Daniel) |
| 2 | Build project 2 per `agent-portfolio-mcp-internal-tools` | new public repo (project 2) | That plan's Done when holds | human (Daniel) |
| 3 | Build project 3 per `agent-portfolio-eval-guardrails` | new public repo (project 3) | That plan's Done when holds | human (Daniel) |

## Risks
- Scope creep across projects → each plan lists explicit non-goals; finish and publish one project before starting the next.
- Claiming results before they exist → numbers appear only after they are measured, linked to the run.
- Plans leaking into public docs as a roadmap → follow the `.plans/README.md` docs rule.

## Escalation triggers
- Ambiguous requirement discovered → back to planner
- Task fails verification twice → bigger model
- Architectural decision needed → bigger model / human
- Step looks overqualified for its assigned tier → downgrade

## Done when
- `agent-portfolio-lead-research-agent`, `agent-portfolio-mcp-internal-tools`, and `agent-portfolio-eval-guardrails` are all in `.plans/completed/`
- Each project has a public repository under `carefreeinv` and a write-up containing only measured results
