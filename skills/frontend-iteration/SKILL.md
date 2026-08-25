---
name: frontend-iteration
description: Use when restyling, redesigning, polishing, or fixing the look of an existing web UI, and before claiming any visual change is done. Enforces fixing in place over rewrites, confirming direction before a big redesign, and verifying every change across all viewports AND locales with screenshots. Bundles a headless-Chromium screenshot harness for this machine plus Next.js/Tailwind/framer-motion gotchas.
---

# Frontend Iteration

Changing how an existing site looks. Two ways it goes wrong: replacing a look the user liked, and shipping a change verified in only one viewport or locale. Both are preventable.

## 1. Respect what exists

- The current design is a constraint, not a draft to throw away. "Make it better" / "it's a bit tacky" does NOT mean "redesign it."
- A full redesign is an expensive fork. Confirm direction first with one question and concrete options; never infer it. (A full reskin can come back as "this looks worse" — the in-place fix was what was wanted.)
- Fix in place: the smallest diff that solves the stated problem. Delete the specific offenders (a gaudy text-shadow, scattered decorations, a clashing color) rather than rewriting the component. Keep the identity.

## 2. Verify the full matrix before saying "done"

- **Viewports:** at least 360 + 390 (mobile) and one desktop width. Any new/changed UI must be looked at on mobile.
- **Locales:** EVERY locale the site supports. Longer languages (nb, de, fi…) clip where English fits — this is the #1 missed bug. Force the locale; do not trust the browser default. (Text clipped out of a cloud only in Norwegian; English looked fine and hid it.)
- **Trigger reveal animations before capturing.** framer-motion `whileInView` with an `opacity:0` initial does NOT fire during a fullPage screenshot, so off-screen sections render as an empty "void" and look broken when they are fine. Scroll top→bottom, then capture.
- Look for: text overflowing or clipping its container, contrast (run axe), console errors.
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

- Editing `tailwind.config.*` needs a dev-server RESTART. JIT will not pick up new theme tokens, so new color/font classes silently become no-ops and "your styles don't apply." Restart, then re-verify.
- NEVER run `next build` while `next dev` is running — build rewrites `.next` and the dev server then serves unstyled HTML until it recompiles. To check types use `npx tsc --noEmit`; or stop dev first.
- `next/font/google`: `axes` only works on variable fonts and throws otherwise in some Next versions. If it errors, drop `axes`; do not pass `weight` and `axes` together.
- When a heading looks invisible on a light section, a global `h1{color:…}` base rule is likely overriding the section's inherited color. Set the color on the element.

## 5. Report

State the smallest-diff summary, the exact viewport x locale matrix verified, any accessibility check actually run, and that nothing was committed unless asked.
