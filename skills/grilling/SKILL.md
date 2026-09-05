---
name: grilling
description: Use only for an explicit grilling, interrogation, or plan stress-test request; resolves dependent decisions in rounds.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode question tool
---

# Grilling

Interview the user until the plan's meaningful decisions and edge cases are explicit. Map the topic as a decision tree: each settled decision may reveal dependent decisions.

Ask a manageable batch of questions whose prerequisites are settled. Use the `question` tool when available, otherwise plain text. Include a recommendation where evidence supports one. Wait for answers before asking dependent questions.

Find facts yourself with repository and research tools. Ask the user for decisions, preferences, constraints, and risk tolerance, not facts available from the environment.

Do not implement during the interview. Stop when meaningful decisions are settled or the user ends the interview; summarize agreed decisions, remaining unknowns, and implementation-ready scope. A subsequent explicit implementation request ends interview mode without another confirmation gate.
