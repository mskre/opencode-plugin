# Chrome DevTools Performance Reference

## Setup

When Chrome DevTools MCP tools are unavailable, this OpenCode MCP entry enables them. Configuration changes are a separate authorized task, not a prerequisite for a code-only review:

```json
"chrome-devtools": {
  "type": "local",
  "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
}
```

Tool names and arguments depend on the installed MCP version. See [DevTools performance docs](https://developer.chrome.com/docs/devtools/performance).

## Traces and Insights

```text
navigate_page(url: "<target-url>")
performance_start_trace(autoStop: true, reload: true)
performance_analyze_insight(insightSetId: "<id-from-trace>", insightName: "LCPBreakdown")
```

Use the returned insight set and available names; inspect the trace response rather than inventing IDs. An empty trace may mean the page failed to load. For interaction latency, record the relevant user interaction, not just navigation.

| Insight | Evidence |
|---|---|
| `LCPBreakdown` | TTFB, resource load, render delay |
| `CLSCulprits` | Images without dimensions, injected content, font swaps |
| `RenderBlocking` | CSS/JS delaying first paint |
| `DocumentLatency` | Server response delay |
| `NetworkRequestsDepGraph` | Late discovery and dependency chains |

Rate metrics with current [web.dev thresholds](https://web.dev/articles/vitals) and [Lighthouse methodology](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring), not a single threshold table applied to every device and run.

## Network

```text
list_network_requests(resourceTypes: ["Script", "Stylesheet", "Document", "Font", "Image"])
get_network_request(reqid: <id>)
```

Inspect render-blocking resources, late CSS imports/font/hero discovery, transfer size, content encoding, and `Cache-Control`/`ETag`/`Last-Modified`. Preloads should target measured critical dependencies, not every resource. Confirm a preconnect is unused across the relevant flow before removing it; absence from one trace is not proof of global disuse.

## Accessibility

```text
take_snapshot(verbose: true)
```

A tree snapshot can reveal missing accessible names and structural problems. Contrast needs rendered colors; focus traps and focus indicators need keyboard/visual checks. WCAG AA text contrast is 4.5:1 for normal text and 3:1 for large text; do not claim a full accessibility audit from the snapshot alone.

## Codebase Checks

Only with source access and a measured lead: inspect framework/bundler config and production output for eager dependencies, dynamic imports, unused JS/CSS, tree-shaking, polyfills, and compression. Relevant files include `package.json`, `webpack.config.js`, `vite.config.ts`, `rollup.config.js`, `esbuild.config.js`, `.parcelrc`, `next.config.js`, `nuxt.config.js`, `svelte.config.js`, and `astro.config.mjs` (including their project-specific variants).

Webpack `sideEffects`/`usedExports`, Rollup `treeshake`, Babel `useBuiltIns`, `core-js`, and `browserslist` are diagnostic leads, not blanket recommendations. Preserve supported browsers and dynamically used styles; inspect source-map exposure before changing production maps.
