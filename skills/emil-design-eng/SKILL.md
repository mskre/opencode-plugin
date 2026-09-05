---
name: emil-design-eng
description: Use when the user asks to polish frontend interaction details, choose or review UI motion, or improve component feel using Emil Kowalski's design-engineering principles. Prefer this for concrete interaction work, not generic visual redesigns.
---

# Design engineering

Make interfaces feel correct before making them expressive. Inspect the interaction frequency, purpose, physical origin, interruptibility, performance, and reduced-motion behavior. Delete motion that has no job, especially on keyboard actions or controls used constantly.

## Practical defaults

- Enter/exit: `ease-out`; movement/morphing: `ease-in-out`; hover/color: `ease`; continuous motion: `linear`.
- Keep ordinary UI motion below 300ms. Typical ranges: press 100–160ms, tooltip/popover 125–200ms, dropdown 150–250ms, modal/drawer 200–500ms when justified.
- Use `transform` and `opacity`; use CSS transitions for rapidly retriggered UI and springs for interruptible gestures. Avoid layout properties and main-thread motion when CSS/WAAPI is enough.
- Popovers scale from their trigger; modals may scale from center. Never enter from `scale(0)`; use roughly `scale(.95)` plus opacity.
- Gate hover effects with `(hover: hover) and (pointer: fine)`. Respect `prefers-reduced-motion` by removing movement while preserving useful opacity/color changes.
- Buttons need immediate press feedback only when it helps; a subtle `scale(.97)` is enough.

Do not apply these as a recipe when the component's personality or evidence says otherwise. Check the real viewport and input method. For detailed values, gestures, springs, clip paths, and performance, optionally consult [the animation standards](../review-animations/STANDARDS.md).

## Focused component notes

For toast stacks, pause dismissal timers while `document.hidden` and resume with the remaining time when the tab becomes visible. Preserve the hover region across gaps between stacked toasts (for example with a wrapper or pointer-event bridge), and capture the pointer during drag. Rapidly added toasts should use interruptible transitions, not restarting keyframes.

Useful implementation details from the design-engineering practice:

- Prefer `@starting-style` for CSS entry where supported; use a mounted/data attribute fallback when compatibility requires it.
- Use percentage translations for self-sized drawers and toasts (`translateY(100%)`) instead of guessing heights.
- Do not drive a child transform through an inheritable CSS variable on a large parent during a drag; update the moving element directly to avoid style recalculation across descendants.
- Under load, prefer CSS/WAAPI or a full `transform` string over Framer Motion `x`, `y`, and `scale` shorthands.
- For drag dismissal, pointer capture, multi-touch protection, boundary damping, and velocity-based flick thresholds matter more than a fixed distance alone.
- Use blur only as a small crossfade bridge (`blur(2px)`, not a heavy effect), and test motion slowed down and on real touch hardware.

## Review output

For code review, use one markdown table with `Before | After | Why`, cite `file:line`, then give a short verdict. Mention accessibility and performance findings. Do not review unrelated code or create an animation merely to demonstrate a principle.
