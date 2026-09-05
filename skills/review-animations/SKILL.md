---
name: review-animations
description: Use only for a focused review of animation or motion code. Flags feel, accessibility, performance, origin, easing, timing, and interruptibility problems; it does not review unrelated code or implement fixes.
disable-model-invocation: true
---

# Animation review

Review only motion. Default to findings, but delete motion when it has no user-facing purpose. Check frequency (never animate keyboard/high-frequency actions), purpose, responsive easing, duration, physical origin, interruptibility, GPU-safe properties, cohesion, and reduced-motion/hover handling. Cite `file:line`.

Use this remediation order: delete; reduce; fix easing; correct origin/entry scale; make it interruptible; move to `transform`/`opacity`; then polish. For exact curves, durations, springs, gestures, clip-path, WAAPI, and accessibility examples, read `STANDARDS.md` only when the finding needs that detail.

## Required response

Use one table, then a short verdict:

| Before | After | Why |
| --- | --- | --- |
| `transition: all` | named properties | Prevent unintended and expensive animation |

Group only non-empty findings by impact: feel-breaking, unnecessary motion, performance, interruptibility/timing, origin/cohesion, accessibility. End with `Block` or `Approve` and the reason. Do not fabricate line numbers or demand a recipe where evidence is absent.
