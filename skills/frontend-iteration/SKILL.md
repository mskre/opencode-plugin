---
name: frontend-iteration
description: Use for visual changes to existing web UI; preserves design intent and verifies affected layouts with screenshots.
---

# Frontend Iteration

Changing how an existing site looks. Two ways it goes wrong: replacing a look the user liked, and shipping a change verified in only one viewport or locale. Both are preventable.

## 1. Respect what exists

- The current design is a constraint, not a draft to throw away. "Make it better" / "it's a bit tacky" does NOT mean "redesign it."
- Ask about redesign direction only when the request leaves it unresolved. An explicit brief or delegated choice is sufficient; vague dissatisfaction is not permission to replace the identity.
- Fix in place: the smallest diff that solves the stated problem. Delete the specific offenders (a gaudy text-shadow, scattered decorations, a clashing color) rather than rewriting the component. Keep the identity.

## 2. Verify affected layouts

- **Viewports:** inspect representative mobile and desktop layouts for responsive changes, plus any reported failing width or affected breakpoint. For a change isolated to one device layout, verify that layout and a neighboring unaffected width.
- **Locales:** check the affected language for copy-only changes. For shared text/layout changes, include the default and a long-text locale, plus RTL when supported and affected. Expand to all locales for changes to locale routing, fonts, or shared translation behavior. Force route, cookie, or account locale as needed; do not trust the browser default.
- **Trigger reveal animations before capturing.** framer-motion `whileInView` with an `opacity:0` initial does NOT fire during a fullPage screenshot, so off-screen sections render as an empty "void" and look broken when they are fine. Scroll top→bottom, then capture.
- Check clipping, overflow, contrast, and console errors. Run available accessibility checks for affected semantics, controls, or colors.
- Actually open the PNGs and judge them. Do not assume from the DOM.

## 3. Screenshot harness (this machine)

Use the available browser-testing skill or MCP first. If those tools are unavailable, run the bundled Chromium harness by its loaded skill path.

```
node <skill-base-dir>/scripts/shot.mjs <url> [outDir] [locales] [widths]
# mobile + desktop, both locales:
node <skill-base-dir>/scripts/shot.mjs http://localhost:3939 /tmp/shots nb-NO,en-US 360,390,1440
```

The harness sets the browser locale, scroll-triggers reveals, and writes `<locale>-<width>.png`. Apps that choose locale from the route, cookie, or account state need a separate URL or setup step for each locale.

Run the project's existing accessibility check when available. Do not claim an axe result from this screenshot harness; it captures images only.

## 4. Stack gotchas (Next.js + Tailwind + framer-motion)

- If Tailwind config changes are not picked up, restart the dev server and re-verify; check the installed version's configuration mechanism.
- Do not run `next build` alongside `next dev` when they share an output directory. Use the project's type check, stop dev first, or use configured separate output directories.
- `next/font/google`: `axes` only works on variable fonts and throws otherwise in some Next versions. If it errors, drop `axes`; do not pass `weight` and `axes` together.
- When a heading looks invisible on a light section, a global `h1{color:…}` base rule is likely overriding the section's inherited color. Set the color on the element.

## 5. Report

Report the change, exact viewport x locale matrix inspected, checks actually run, and any verification gaps. If screenshots cannot be captured or opened, state the blocker rather than claiming visual verification.
