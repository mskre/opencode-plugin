---
name: phantom-ui
description: Use when adding skeleton loaders, loading placeholders, shimmer states, or structure-aware loading UI with the @aejkatappaja/phantom-ui Web Component. Applies to React, Next.js, Vue, Svelte, Angular, Solid, Qwik, HTMX, and plain HTML frontend apps.
---

# Phantom UI

Use `@aejkatappaja/phantom-ui` for skeleton loaders that mirror the real DOM instead of maintaining separate skeleton components.

## When To Use

- Loading cards, rows, profiles, dashboards, feeds, tables, or async detail panels.
- A frontend app already renders placeholder data while loading.
- The team wants skeletons that stay aligned with the real component markup.

Do not install it globally or in a home directory. Install it in the app repo that renders the UI.

## Install

Use the repo's package manager:

```bash
npm install @aejkatappaja/phantom-ui
```

```bash
bun add @aejkatappaja/phantom-ui
```

```bash
pnpm add @aejkatappaja/phantom-ui
```

Optional project setup from the app root:

```bash
npx @aejkatappaja/phantom-ui init
```

The init command may add JSX type declarations and SSR pre-hydration CSS. Inspect its changes before committing.

## Basic Usage

Import once near the app/component entry:

```ts
import "@aejkatappaja/phantom-ui"
```

Wrap real markup and toggle `loading`:

```tsx
<phantom-ui loading={isLoading}>
  <div className="card">
    <img src={user?.avatar ?? "/placeholder.png"} width="48" height="48" />
    <h3>{user?.name ?? "Placeholder Name"}</h3>
    <p>{user?.bio ?? "Short placeholder bio text."}</p>
  </div>
</phantom-ui>
```

For lists, use `count` while loading:

```tsx
<phantom-ui loading={isLoading} count={5} count-gap={8}>
  <div className="row">
    <span>Placeholder Name</span>
    <span>placeholder@example.com</span>
  </div>
</phantom-ui>
```

## SSR CSS

For SSR frameworks, add this to the root layout when needed:

```ts
import "@aejkatappaja/phantom-ui/ssr.css"
```

Common files: `app/layout.tsx`, `pages/_app.tsx`, `app.vue`, `src/routes/+layout.svelte`, `app/root.tsx`, `src/root.tsx`.

## Rules

- Keep real component markup as the skeleton source.
- Use realistic placeholder text so skeleton dimensions match real content.
- Do not build duplicate skeleton components unless `phantom-ui` cannot represent the shape.
- Verify loading and loaded states in the browser.
