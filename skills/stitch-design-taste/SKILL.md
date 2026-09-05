---
name: stitch-design-taste
description: Use when generating or revising a Google Stitch DESIGN.md for a named project. Converts an explicit product brief into a concise, conditional design system with usable color, type, layout, component, responsive, motion, accessibility, and anti-pattern guidance.
compatibility: Requires Google Stitch access for generation; an MCP server is optional.
---

# Stitch design system authoring

Write a project-specific `DESIGN.md`, not a universal taste manifesto. Start from the brief and describe the atmosphere, density, visual variance, and intended users. Choose values that serve the product; do not force asymmetry, a serif, inline images, perpetual motion, a single accent, or banned fonts when the brief does not support them.

Include only decisions that help Stitch produce consistent screens:

- semantic palette names with hex values and functional roles;
- display/body/mono type roles, readable scale, contrast, and line length;
- layout grid, containment, spacing, section rhythm, and when cards/dividers are appropriate;
- component states for buttons, inputs, loading, empty, error, and focus;
- responsive collapse, no-overflow behavior, readable type, and touch targets;
- motion intent only when useful, with `transform`/`opacity`, reduced-motion behavior, and no perpetual loop by default;
- a short anti-pattern list tied to the project, not generic bans.

Record the chosen breakpoint and minimum interactive target instead of pretending one responsive recipe fits every product. A reasonable starting point is a `768px` collapse and `44px` touch targets, but change them when the content or platform requires it. Specify actual type sizes, line heights, tracking, container width, and spacing values (for example a display `clamp()`, body `1rem`, `65ch` measure, and a project spacing step) so Stitch has usable anchors rather than adjectives.

Use `min-height: 100dvh` when the screen must fill the viewport; use `svh` when the stable small viewport is the correct constraint, and avoid treating either as universal. Inline or headline images are optional: use them only when the brief supports them, keep text in a readable spatial zone, and define a mobile fallback that stacks or removes them.

Prefer semantic descriptions over framework recipes. Keep the result concise enough to be read as a design contract. Do not invent names, metrics, claims, or assets. Preserve accessibility: contrast, keyboard focus, labels, error recovery, alt text, and motion preferences. The bundled `DESIGN.md` is a compact example/template; adapt or replace its values for the project.
