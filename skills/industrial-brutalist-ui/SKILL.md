---
name: industrial-brutalist-ui
description: Use only when the user explicitly requests industrial-brutalist UI, Swiss industrial print, or tactical terminal aesthetics. Applies the selected visual language to frontend design without mixing modes by default.
---

# Industrial brutalist UI

This is an explicit aesthetic opt-in, not a default frontend style. Choose one mode for the project:

- **Swiss industrial print:** paper/off-white substrate, carbon ink, hazard red, heavy grotesk display type, visible grid lines, measured asymmetry, and large structural numerals.
- **Tactical telemetry:** dark charcoal substrate, phosphor text, monospace data, dense tables, restrained red alerts, and technical framing. Optional terminal green belongs to one meaningful status only.

Use CSS Grid for deterministic tracks and visible rules. Keep corners square, shadows/gradients/translucency absent unless the brief overrides them, and alternate dense technical data with deliberate negative space. Use semantic elements such as `data`, `samp`, `kbd`, `output`, and `dl` when they describe real content. Use `clamp()` for macro type and keep small metadata readable.

## Optional compact recipes

For a blueprint grid, `display: grid; gap: 1px` on a contrasting parent/child background creates crisp structural rules without border bookkeeping. For macro type, a fluid range such as `clamp(4rem, 10vw, 15rem)` can make a structural wordmark or numeral hold its scale; use it only where the layout can absorb it. For tactical scanlines, a restrained layer can use `repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.1) 2px 4px)` over the background. Keep all three optional and validate contrast, readability, and reduced-motion behavior.

Analog texture is optional: a low-opacity fixed overlay, scanlines, or a deliberate halftone treatment. Keep it off scrolling content and behind content with `pointer-events: none`; do not add noise for decoration alone. Syntax markers, crosshairs, registration marks, and warning stripes are restrained graphic language, not filler.

Use real project data or clearly labeled fixtures. Do not invent operational identifiers, statuses, metrics, or claims. Preserve semantic HTML, keyboard navigation, contrast, focus states, responsive reflow, and reduced motion. Do not mix Swiss and telemetry substrates unless the user asks for a hybrid.
