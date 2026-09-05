---
name: workers-best-practices
description: Author or review Cloudflare Workers runtime code, bindings, configuration, and production safety.
---

# Workers Best Practices

Use the project's generated types, compatibility date, and `node_modules/wrangler/config-schema.json`. Consult [current Workers guidance](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/) for changed or uncertain APIs; latest types alone do not establish compatibility with an installed runtime.

| Task | Reference |
|---|---|
| Runtime patterns and code examples | [Rules](references/rules.md) |
| Binding types, config, serialization, review | [Review](references/review.md) |
| CLI, deployments, secrets | [Wrangler](../wrangler/SKILL.md) |
| Stateful coordination | [Durable Objects](../durable-objects/SKILL.md) |
| Durable multi-step jobs | [Workflow rules](https://developers.cloudflare.com/workflows/build/rules-of-workflows/) |

- Stream unbounded payloads. Keep request-scoped state out of module globals to prevent cross-request leaks.
- Await or return promises; use `ctx.waitUntil()` for post-response work without destructuring `ctx`. `void` alone neither handles rejection nor extends lifetime.
- Use secrets, Web Crypto, and timing-safe secret comparisons; do not hardcode credentials or fail open through `passThroughOnException`.
- Bindings avoid public REST hops for data-plane access. Use `env.X` in handlers and `this.env.X` in platform subclasses.
- Regenerate `Env` with `wrangler types` after binding changes. Compatibility-date or flag upgrades are behavior changes, not incidental cleanup.
