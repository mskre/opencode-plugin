---
name: vault-daydream
description: Use when the user asks for vault daydream, Obsidian vault synthesis, roadmap brainstorming, project ideas, future planning, or strategy that should be grounded in their notes.
---

# Vault Daydream

Use this skill to turn the user's Obsidian vault into grounded ideas, roadmaps, speculative plans, or creative project directions.

## Required Context

- Start from the user's Obsidian vault (path defined in `AGENTS.md`).
- For infrastructure, servers, services, agents, automation, roadmap, or company/project context, follow the vault reading order in `AGENTS.md`: `homelab/`, then `future/`, then `bitstraum/`, then other folders.
- Prefer specific references from existing notes over generic brainstorming.
- If a note is missing or stale, say what is missing instead of inventing details.

## Workflow

1. Identify the topic, decision horizon, and expected output: ideas, roadmap, architecture, checklist, narrative, or tradeoff analysis.
2. Read relevant vault notes before proposing anything.
3. Extract constraints, live systems, existing plans, people, brands, and recurring themes.
4. Generate a small set of concrete directions, not a long list of shallow ideas.
5. Tie each direction back to observed vault context.
6. If the task changes infrastructure, services, configurations, or workflows, update the corresponding vault note so the vault stays the source of truth.

## Output Style

- Lead with the most actionable direction.
- Separate confirmed facts from speculation.
- Include next steps only when they are specific and useful.
- Avoid vague strategy language like "unlock potential", "seamless experience", or "leverage synergies".
