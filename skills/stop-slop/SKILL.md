---
name: stop-slop
description: Use when reviewing, rewriting, or polishing AI-generated text, documentation, marketing copy, prompts, READMEs, plans, or UI copy to remove generic slop and make it specific.
---

# Stop Slop

Use this skill to remove generic AI filler from writing and replace it with concrete, useful language.

## Slop Signals

- Vague benefits: "seamless", "robust", "powerful", "intuitive", "unlock", "elevate", "streamline".
- Repeated three-part lists that do not add information.
- Claims without examples, numbers, constraints, or tradeoffs.
- Overconfident wording for uncertain facts.
- Decorative adjectives that could describe any product.
- Long introductions before the actual answer.
- Synthetic enthusiasm that does not match the user's direct style.

## Rewrite Rules

- Replace abstractions with the actual object, person, file, route, service, metric, or behavior.
- Prefer short sentences with one job each.
- Keep uncertainty explicit.
- Preserve technical accuracy over polish.
- Cut marketing language unless the user is explicitly asking for marketing copy.
- Do not add fake specificity. If the source lacks detail, point out the gap.

## Review Workflow

1. Identify the audience and the action the text should cause.
2. Mark sentences that are generic, inflated, redundant, or unsupported.
3. Rewrite with concrete nouns and verbs.
4. Keep the user's voice: direct, factual, and concise.
5. If editing files, make the smallest text change that fixes the issue.

## Output Style

- Lead with the revised text or the highest-impact findings.
- Briefly explain major cuts when useful.
- Avoid turning the review itself into slop.
