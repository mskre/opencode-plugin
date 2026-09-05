---
name: minimalist-ui
description: Use only when the user explicitly asks for minimalist-ui, warm flat editorial UI, or a document-like utilitarian interface. Favors whitespace, typographic contrast, restrained borders, and muted accents without gradients or heavy shadows.
---

# Minimalist UI

This is an explicit aesthetic opt-in. Start with a warm white/bone canvas, charcoal text, thin structural borders, one restrained accent family, and generous but usable whitespace. Let typography and alignment carry hierarchy. A serif may be used for an editorial display moment; software UI and dense data should remain clear sans/mono.

Prefer open layouts and asymmetric grids over box nesting. Use cards only when elevation communicates hierarchy; otherwise use whitespace or dividers. Keep radii modest, shadows absent or very faint, and gradients/neon/glass effects out. Avoid generic filler copy, invented claims, emoji, and default decorative icon clutter. Use project assets or clearly labeled placeholders.

Make primary actions obvious, labels explicit, errors contextual, and focus visible. Keep controls keyboard-accessible and at least touch-sized. Collapse layouts cleanly on narrow screens without horizontal scrolling; preserve readable body text and contrast. Motion is optional and quiet: animate only purposeful `transform`/`opacity`, gate hover by pointer capability, and honor `prefers-reduced-motion`. Verify the actual viewports rather than treating fixed spacing as a recipe.

## Optional compact reference

Use semantic muted pastel pairs only where they carry meaning, for example `#FDEBEC` / `#9F2F2D` (error), `#E1F3FE` / `#1F6C9F` (info), `#EDF3EC` / `#346538` (success), and `#FBF3DB` / `#956400` (warning). Check contrast before shipping and never make the pastel background the only state cue.

Useful pairings when they fit the product: a characterful sans with a restrained editorial serif for display; `Geist Mono`, `SF Mono`, or `JetBrains Mono` for metadata; bottom dividers for accordions instead of nested cards; and `<kbd>` with a light border, bone background, and mono type for shortcuts. These are options, not bans or mandatory tokens.
