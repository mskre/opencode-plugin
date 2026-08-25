---
name: grilling
description: Use ONLY when the user explicitly asks to be grilled, interrogated, or have a plan stress-tested. Interviews them through a dependency-ordered decision tree.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode question tool
---

# Grilling

Interview the user until the plan's meaningful decisions and edge cases are explicit. Map the topic as a decision tree: each settled decision may reveal dependent decisions.

Work in rounds. The frontier is every question whose prerequisites are already settled. Ask the whole frontier in one `question` tool call, with your recommended answer first and marked recommended. Wait for the answers, recompute the frontier, and continue.

Find facts yourself with repository and research tools. Ask the user for decisions, preferences, constraints, and risk tolerance, not facts available from the environment.

Do not ask questions whose answers depend on unresolved questions in the same round. Do not implement while grilling. When the frontier is empty, summarize the agreed decisions, remaining unknowns, and the smallest implementation-ready scope. Ask for confirmation before acting.
