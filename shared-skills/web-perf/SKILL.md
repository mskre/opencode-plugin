---
name: web-perf
description: Measure and diagnose page-load performance, Core Web Vitals, or Lighthouse regressions with Chrome DevTools MCP.
---

# Web Performance

| Task | Reference |
|---|---|
| Missing Chrome DevTools MCP | [Tool setup](devtools.md#setup) |
| Record a load or interaction and analyze insights | [Traces](devtools.md#traces-and-insights) |
| Inspect critical requests and caching | [Network](devtools.md#network) |
| Investigate accessibility alongside performance | [Accessibility](devtools.md#accessibility) |
| Trace a measured issue to build output | [Codebase checks](devtools.md#codebase-checks) |

Report measured values with URL, viewport/device, throttling, and cache state. A reload alone is not proof of a cold cache. Lab traces are not field percentiles; INP needs interaction evidence and TBT is not an INP measurement. If the MCP is unavailable, label any code-only analysis as unmeasured rather than inventing metrics.

Prioritize findings tied to requests, trace events, or code; distinguish estimated savings from measured improvements. A zero-savings hint alone is not a reason to change code. Check [Web Vitals definitions](https://web.dev/articles/vitals) and [Lighthouse scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) for current thresholds and weights.
