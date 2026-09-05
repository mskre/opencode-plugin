---
name: image-to-code
description: Use for a visually important frontend implementation when the user supplies reference images, or when a real image-generation tool is available and the user wants image-led design exploration followed by code. Do not trigger for ordinary code-first frontend work; use impeccable instead.
compatibility: Requires reference images or a real image-generation tool for image-led work.
---

# Image to code

Use supplied images as the primary reference. If there are no references, verify a real image-generation tool before generating anything. If neither exists, state the blocker and ask whether to proceed code-first with `impeccable`; never simulate generation or claim an artifact.

## Workflow

1. Establish the page/section count from the brief. If the user supplied reference images, use those as the source and do not regenerate them. If the user is asking to create new visual references and a tool exists, generate one readable horizontal reference per section; use extra standalone detail renders only where text or controls cannot be inspected. Do not compress a page into an unreadable board or crop a large render as a substitute for a fresh detail render.
2. Inspect each image as a specification: readable copy, hierarchy, type relationships, spacing, media frames, controls, color, borders/radii, and repeated motifs. Record what is uncertain instead of guessing.
3. Implement the same structure and visual language. Preserve distinctive composition, content density, typography, CTA hierarchy, image treatment, and responsive intent. Use normal semantic HTML, keyboard access, readable contrast, touch-sized controls, and `prefers-reduced-motion`.
4. Validate the first viewport and narrow layouts. If the reference is ambiguous, choose the smallest faithful implementation rather than adding generic cards, pills, fake stats, nested boxes, or filler labels.

## Quality bar

Keep the hero short and readable, vary section rhythm without losing the system, and use imagery only where it has structural or brand purpose. Avoid default centered dark heroes, repeated left-text/right-image blocks, purple-blue AI gradients, tiny copy, fake dashboards, and card-inside-card layouts unless the brief explicitly calls for them. Reference images guide the design; they do not justify copying protected marks or exact assets.

When no image tool is available, do not output fake generated files. When the user supplied an image, do not regenerate it unless asked.

## Optional direction bank

Use one or two compatible choices only when the brief leaves direction open. Narrative spines: artifact/archive, journey/waypoints, precision instrument, living system, or stage/spotlight. Composition anchors: centered statement, off-grid editorial, bottom-left over image, image-as-canvas with a safe text zone, stacked center, or inverted split. Second-read motifs: one oversized numeral, a narrow side rail, a material switch, a controlled macro crop, or an asymmetric bleed. These are prompts for interpretation, not a checklist; preserve an existing reference over them.
