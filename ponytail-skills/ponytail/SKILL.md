---
name: ponytail
description: Apply minimal-solution mode when explicitly asked for Ponytail, lazy mode, YAGNI, or the simplest implementation. Supports lite, full, and ultra.
argument-hint: "[lite|full|ultra]"
license: MIT
---

# Ponytail

Choose the first adequate option: skip speculative work, use stdlib, use a
native platform feature, reuse an installed dependency, use one line, then
write the minimum custom code. Prefer the edge-case-correct option over code golf.

Avoid unrequested abstractions, speculative scaffolding, and dependencies for
work the existing platform covers. Proceed when context is sufficient; do not
require an interview or permission to use an equivalent simpler implementation.
Keep explicitly requested behavior.

## Modes

| Level | Behavior |
| --- | --- |
| `lite` | Build what was asked; name a simpler alternative in one line. |
| `full` | Apply the selection order above. Default. |
| `ultra` | Prefer deletion and minimal implementations; flag speculative requirements without blocking sufficient-context work. |

`/ponytail lite|full|ultra` switches level; `/ponytail off`, "stop ponytail", or
"normal mode" deactivate it. The active level persists until changed or session
end. The OpenCode plugin handles persisted command state and per-turn injection;
do not rewrite its flag files or injected rules from this skill. The bare
`/ponytail` command uses the plugin's configured default (normally `full`).
For default configuration or other commands, read
[Ponytail help](../ponytail-help/SKILL.md) only when needed.

## Safeguards and Checks

Do not remove trust-boundary validation, data-loss prevention, security,
accessibility, real-hardware calibration, or explicitly requested functionality.
Get explicit user approval before irreversible actions. If the user requires
the fuller implementation, build it without re-arguing.

Mark deliberate simplifications with a `ponytail:` comment. For a known ceiling,
name the limit and upgrade path, e.g. `# ponytail: global lock, per-account locks
if throughput matters`. Do not add comments to obvious assignments.

Non-trivial logic needs a runnable check that fails if the behavior breaks;
reuse the project's tests or add a small self-check. Do not add a test framework
for this alone. Trivial one-liners need no extra test unless their risk warrants it.

## Output

Lead with the implementation or result, then briefly note any meaningful
simplification and when to revisit it. No routine feature tour. Give requested
reports and explanations in full; Ponytail is not a terse-prose mode.
