---
name: wizard
description: Use when a human must perform manual provisioning, credential setup, dashboard configuration, migration, or cutover steps that the agent cannot perform. Generates an interactive Bash wizard.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode and ASCII terminals
---

# Wizard

Generate an interactive Bash script for a manual procedure that would otherwise require repeatedly explaining browser and credential steps. Do not invoke this when the agent can perform the work directly.

## Scope

Read the repository first. For setup work, inspect environment examples, documentation, deployment configuration, and CI references to secrets or variables. For migrations, establish current state, target state, and irreversible actions.

Identify each stage, the value it produces, where that value is stored, and whether it is secret. Ask for confirmation only when stage order or an irreversible choice is ambiguous.

## Author

Copy `template.sh` to the target path and replace only the example below its `STAGES` marker. Use one focused `stage` per manual task. Use the supplied helpers:

- `open_url` before browser instructions.
- `ask` for public values and `ask_secret` for credentials.
- `write_env` for local environment values.
- `set_secret` or `set_var` only when CI references that value.
- `confirm` immediately before irreversible actions.

Wizards are temporary by default. Commit one only when it is a repeatable setup path the repository should retain.

## Verify

Run `bash -n <script>` and `shellcheck` when installed, then make the script executable. Do not run it end to end because it blocks on human input and may open browser pages. Statically verify that every captured value reaches its intended destination and CI names match exactly.
