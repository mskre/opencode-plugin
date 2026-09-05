---
name: ponytail-debt
description: "Collect ponytail: code comments into a debt ledger when asked for Ponytail deferrals or /ponytail-debt. Read-only unless saving is requested."
---

# Ponytail Debt

Search repository code comments for `ponytail:`, excluding `.git`, dependencies,
and generated/build output. Start with `(#|//) ?ponytail:` using the content
search tool; include other comment syntax used by the project. Inspect matches
to exclude string literals, documentation examples, and prose mentions.

## Ledger

One row per marker, grouped by file:

`<file>:<line>, <what was simplified>. ceiling: <the limit named>. upgrade: <the trigger to revisit>.`

Extract the ceiling and upgrade path from the comment, not assumptions. Mark
missing values as unspecified. Tag markers with no upgrade path or trigger as
`no-trigger`. If ownership is requested, use `git blame -L<line>,<line> -- <file>`
as attribution, not proof of responsibility.

End with `<N> markers, <M> with no trigger.` Count actual markers and tagged
rows. Nothing found: `No ponytail: debt. Clean ledger.` Report inaccessible or
excluded relevant areas rather than claiming a complete scan.

One-shot; do not change mode or files. Save a ledger (e.g. `PONYTAIL-DEBT.md`)
only when requested, with explicit approval before a destructive overwrite.
"stop ponytail-debt" or "normal mode" ends this report style.
