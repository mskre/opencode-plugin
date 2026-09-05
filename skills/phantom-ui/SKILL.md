---
name: phantom-ui
description: Use when adding structure-aware skeleton loading to a frontend with @aejkatappaja/phantom-ui. Applies to React, Next.js, Vue, Svelte, Angular, Solid, Qwik, HTMX, and plain HTML apps.
---

# Phantom UI

Use the real component markup as the skeleton source so loading and loaded layouts stay aligned. Install `@aejkatappaja/phantom-ui` in the app repository, never globally. Use the repository's package manager:

```bash
npm install @aejkatappaja/phantom-ui
# or: pnpm add / bun add @aejkatappaja/phantom-ui
```

Import it once near the app entry:

```ts
import "@aejkatappaja/phantom-ui";
```

Wrap the real markup and toggle `loading`; use `count` and `count-gap` for repeated rows:

```tsx
<phantom-ui loading={isLoading} count={5} count-gap={8}>
  <div className="row">
    <span>{name ?? "Placeholder Name"}</span>
    <span>{email ?? "placeholder@example.com"}</span>
  </div>
</phantom-ui>
```

Use realistic placeholder lengths so the geometry matches. For SSR frameworks, add `@aejkatappaja/phantom-ui/ssr.css` in the root layout when needed; `npx @aejkatappaja/phantom-ui init` may add JSX types and pre-hydration CSS, so inspect its diff. Do not create duplicate skeleton components unless the web component cannot represent the shape. Verify loading, loaded, empty, error, keyboard, and reduced-motion states in a browser.
