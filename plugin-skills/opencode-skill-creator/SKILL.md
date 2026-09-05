---
name: opencode-skill-creator
description: Create or edit OpenCode skills, run skill evals, or optimize their trigger descriptions. Not for other hosts unless porting to OpenCode.
---

# OpenCode Skill Creator

Use the request, existing skill, and examples to establish the intended behavior,
trigger boundary, and output. Ask only for missing information that changes the
implementation. Sufficient context needs no intake interview or confirmation gate.

## Choose the Work

Read only the guide needed for the current task:

| Task | Guide |
| --- | --- |
| Draft, refactor, or install a skill | [Writing](references/writing.md) |
| Test outputs or compare skill versions | [Evaluation](references/evaluation.md) |
| Diagnose triggering or optimize a description | [Trigger optimization](references/trigger-optimization.md) |
| Call a creator plugin tool | [Plugin tools](references/plugin-tools.md) |
| Write eval, grading, benchmark, or comparison JSON | [Schemas](references/schemas.md) |

For specialized evaluation, load [grader](agents/grader.md) for assertion grading,
[comparator](agents/comparator.md) for blind A/B judging, or
[analyzer](agents/analyzer.md) for benchmark patterns and comparison analysis.
These are optional tasks, not prerequisites to editing a skill.

## Finish

Validate frontmatter, resource links, and the behavior affected by the change.
Use plugin tools only if exposed in this session; otherwise report the limitation
and perform available structural checks without claiming model evals ran.
Run benchmarks or open a review viewer when they serve the requested work, not
as a mandatory completion gate. Report changed files, checks, and remaining gaps.

Keep edits within the requested scope. Get explicit user approval before
irreversible actions, destructive overwrites, or publishing. Do not build hidden
side effects or unauthorized access into a skill. After installing or editing
loaded skills, tell the user to quit and restart OpenCode.
