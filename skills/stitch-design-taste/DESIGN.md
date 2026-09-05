# Design System: [Project]

Use this as a compact Stitch contract. Replace bracketed values; keep only rules supported by the brief.

## Atmosphere

[One paragraph: product context, audience, mood, density, variance, and whether motion is restrained or expressive.]

## Palette

- **Canvas** (`#______`) — page background
- **Surface** (`#______`) — panels when elevation is needed
- **Ink** (`#______`) — primary text; maintain readable contrast
- **Muted** (`#______`) — secondary text; do not use for essential meaning
- **Accent** (`#______`) — action/focus/status role, if needed

Keep one coherent neutral family. Avoid neon, accidental gradients, and pure black unless the brief explicitly requires them. Name any semantic success, warning, and error colors separately.

## Typography

- **Display:** [family, weight, scale such as `clamp(2.25rem, 5vw, 3.75rem)`, line-height, tracking]
- **Body:** [family, `1rem` minimum, `1.5–1.65` line-height, `65ch` maximum]
- **Metadata/mono:** [family and limited use, typically `0.8125rem` or larger when functional]

Use readable line lengths and preserve hierarchy without relying on size alone.

## Layout and components

[Grid/container/spacing logic and how the page changes at narrow widths. State a container width and spacing step, for example `max-width: 1400px`, `1rem` mobile / `2rem` tablet / `4rem` desktop gutters, and `1.5rem–6rem` section gaps.]

- **Actions:** [primary, secondary, hover, active, focus]
- **Surfaces:** [when cards, borders, dividers, or open space communicate hierarchy]
- **Forms:** labels above controls, visible focus, helper/error placement
- **Loading/empty/error:** [project-appropriate states]

## Responsive and accessibility

Collapse deliberately without horizontal scrolling. Default reference: collapse multi-column content at `768px` and keep interactive targets at least `44px`; change these when the product needs another breakpoint or target. Keep text readable, contrast sufficient, and information available without color alone. Provide keyboard focus, useful labels/alt text, and clear error recovery. Honor `prefers-reduced-motion`.

For viewport-filling screens, prefer `min-height: 100dvh`; use `100svh` when the stable small viewport is the intended constraint. Do not use either automatically for every section. Headline or inline images are optional. If used, keep them in a readable spatial zone and define a narrow-screen fallback that stacks them or removes them without losing meaning.

## Motion

[Optional purpose and personality.] Prefer short, interruptible `transform`/`opacity` transitions. Do not add perpetual loops or movement to every component without a product reason.

## Avoid

[A short, project-specific list: e.g. fake metrics, nested cards, generic gradients, filler copy, or a particular icon treatment.]
