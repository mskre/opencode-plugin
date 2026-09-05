# Writing and Installation

## Authoring

Read the existing root and relevant resources before editing. Capture the real
tools, inputs, outputs, decision points, and constraints from the conversation
and files. Ask about consequential gaps, not a fixed list of interview questions.

For a new skill, use a system-temp staging directory unless the user specifies a
destination. Edit an existing skill in the requested location. Keep experimental
outputs outside installed skills.

```markdown
---
name: example-skill
description: Use for the specific task and trigger boundary this skill supports.
---

# Example Skill

Task-specific instructions and conditional links to supporting resources.
```

The directory name matches `name`: 1-64 characters matching
`^[a-z0-9]+(-[a-z0-9]+)*$`. `description` is a nonempty string, at most 1024
characters. Optional `compatibility` describes actual tool dependencies.

Descriptions are always exposed to the model. Keep them short and precise:
state the task, relevant trigger terms, and an exclusion only where confusion is
likely. Do not broaden triggers to adjacent tasks or urge unconditional use.

Keep the root to decisions and instructions needed on every invocation. Link
`references/` documents with a clear condition for reading each. Put output
templates in `assets/` and deterministic, reusable operations in `scripts/`
only when needed. Include examples where they resolve ambiguity, not as filler.
Delete generic coaching and duplicate recipes rather than relocating them whole.
Preserve exact tool fields, paths, calculations, safety constraints, and approvals.

## Validation and Installation

Check frontmatter and referenced files, then test the affected behavior at the
appropriate depth. A small documentation change need not start an eval campaign.
For output comparisons use [evaluation.md](evaluation.md); for trigger accuracy
use [trigger-optimization.md](trigger-optimization.md).

When available, `skill_validate({skillPath})` checks structure;
`skill_parse({skillPath})` returns parsed metadata and full content.
These checks do not prove behavioral quality.

Install only when requested, to `.opencode/skills/<name>/` for a project or
`~/.config/opencode/skills/<name>/` globally. Include required resources, not
workspace runs or review artifacts. Confirm before destructively replacing an
existing destination. Restart OpenCode to load the result.
