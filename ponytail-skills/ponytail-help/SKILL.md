---
name: ponytail-help
description: Explain Ponytail modes, commands, or default configuration when asked for Ponytail help or /ponytail-help.
---

# Ponytail Help

Display the relevant part of this card. One-shot: change no mode or files.

## Commands

| Command | Behavior |
| --- | --- |
| `/ponytail lite` | Build what's asked; name a simpler alternative. |
| `/ponytail full` | Prefer YAGNI, stdlib, native features, installed dependencies, then minimal code. |
| `/ponytail ultra` | Prefer deletion; flag speculative requirements without blocking a clear task. |
| `/ponytail off` | Disable Ponytail injection. |
| `/ponytail` | OpenCode plugin uses the configured default, normally `full`. |
| `/ponytail-review` | Read-only over-engineering review of the diff. |
| `/ponytail-audit` | Read-only repo-wide complexity audit. |
| `/ponytail-debt` | Count and list `ponytail:` deferrals. |
| `/ponytail-gain` | Published benchmark scoreboard, not live repo savings. |
| `/ponytail-help` | This reference. |

The active level lasts until changed or session end; the OpenCode adapter also
persists explicit command switches. "stop ponytail" or "normal mode" asks the
agent to stop; use `/ponytail off` to persistently disable plugin injection.
The command hook applies mode changes from the next message.

Codex uses `@ponytail` and `@ponytail-review` skill invocation; Claude Code and
OpenCode use slash commands. In OpenCode, skill discovery alone does not
register commands; the installed command files provide them.

## Default Configuration

Resolution: `PONYTAIL_DEFAULT_MODE` environment variable, then `defaultMode` in
`~/.config/ponytail/config.json` (Windows: `%APPDATA%\ponytail\config.json`),
then `full`. Values: `lite`, `full`, `ultra`, `off`.

Examples: `export PONYTAIL_DEFAULT_MODE=ultra` or `{ "defaultMode": "lite" }`.
Use `off` to disable automatic activation when no persisted override applies.
An existing OpenCode mode flag takes precedence over the default; this help
request does not edit it.

For host-specific installation or updates, consult the matching section of
https://github.com/DietrichGebert/ponytail rather than applying another host's
plugin commands. Updating is separate from displaying help and may overwrite
local skill adaptations; confirm the intended scope before doing it.
