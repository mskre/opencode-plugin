---
name: wizard
description: Use for multi-step provisioning or cutovers requiring human dashboard or credential actions; generates an interactive Bash wizard.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode and ASCII terminals
---

# Wizard

Generate a wizard when repeated manual steps warrant one. For a single manual action, give direct instructions; perform work directly when authorized and available.

## Scope

Inspect relevant setup documentation, environment examples, deployment configuration, and CI references when present; a repository is not required. For migrations, establish current state, target state, and irreversible actions.

Identify each stage, its output, destination, and secrecy. Resolve ambiguous stage ordering; require explicit confirmation before irreversible actions even when the plan is clear.

## Author

Copy `template.sh` to the target path and replace only the example below its `STAGES` marker. Use one focused `stage` per manual task. Use the supplied helpers:

- `open_url` before browser instructions.
- `ask` for public values and `ask_secret` for credentials.
- `write_env` for local environment values.
- `set_secret` or `set_var` only when CI references that value.
- `confirm` immediately before irreversible actions.

Keep credentials out of logs, shell tracing, and committed files; use restrictive permissions for secret-bearing local files. Wizards are temporary by default. Retain repeatable setup scripts when useful, but commit only when requested.

## Verify

Run `bash -n <script>` and `shellcheck` when installed, then make the script executable. Do not run it end to end because it blocks on human input and may open browser pages. Statically verify that every captured value reaches its intended destination and CI names match exactly.
