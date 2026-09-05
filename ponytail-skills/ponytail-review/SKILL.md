---
name: ponytail-review
description: Review a diff for unnecessary complexity when asked for an over-engineering review or /ponytail-review. Reports cuts without applying fixes.
---

# Ponytail Review

Inspect the requested diff and enough surrounding usage to verify each proposed
cut preserves required behavior. Review the available scope directly; ask only
if the target cannot be determined. For repo-wide work use `ponytail-audit`.

## Report

One line per finding: `L<line>: <tag> <what>. <replacement>.`
For multiple files use `<file>:L<line>: ...`.

- `delete:` dead code or unused flexibility; replacement is nothing.
- `stdlib:` name the standard-library function replacing custom code.
- `native:` name the platform feature replacing code or a dependency.
- `yagni:` unused abstraction, configuration, or speculative layer.
- `shrink:` equivalent logic in fewer lines; show the shorter form.

Example: `date.ts:L4: native: moment.js used only for display formatting. Intl.DateTimeFormat.`

End with `net: -<N> lines possible.` Sum removed lines minus replacement lines,
without double-counting overlapping cuts. Label estimates and disclose anything
unquantified. If nothing is supported by the evidence: `Lean already. Ship.`

## Boundaries

One-shot report; apply no fixes and do not change Ponytail mode. Correctness,
security, and performance findings belong in a normal review pass, but proposed
simplifications must preserve their safeguards. Do not flag a minimum runnable
check as bloat. One implementation alone does not prove an abstraction is unused.
"stop ponytail-review" or "normal mode" ends this review style.
