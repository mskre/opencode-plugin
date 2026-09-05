---
name: ponytail-audit
description: Audit a repository for removable complexity when asked for a repo-wide over-engineering audit or /ponytail-audit. Read-only report.
---

# Ponytail Audit

Inspect the repository, not just its diff. Identify removable complexity from
actual usage and constraints; one implementation or a small file alone is not
proof of bloat. Rank findings by largest supported reduction.

## Report

One line per finding: `<tag> <what to cut>. <replacement>. [path]`.

- `delete:` dead code or unused flexibility; replacement is nothing.
- `stdlib:` name the standard-library function that replaces custom code.
- `native:` name the platform feature that replaces code or a dependency.
- `yagni:` unused abstraction, configuration, or speculative layer.
- `shrink:` equivalent logic in fewer lines; show the shorter form.

End with `net: -<N> lines, -<M> deps possible.` Calculate net lines removed
minus replacement lines without double-counting overlapping findings. Count
only dependencies removable after all usages are covered. Label estimates and
state unquantified findings rather than inventing precision.
Nothing to cut: `Lean already. Ship.`

## Boundaries

One-shot report; apply no fixes and do not change Ponytail mode. Correctness,
security, and performance review belong in a normal review pass. Do not propose
cuts that weaken those safeguards or remove the minimum runnable check.
"stop ponytail-audit" or "normal mode" ends this review style.
