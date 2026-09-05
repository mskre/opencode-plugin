---
name: durable-objects
description: Implement or review Cloudflare Durable Objects storage, concurrency, RPC, alarms, and WebSockets.
---

# Durable Objects

Use a DO for a coordination unit such as a room, document, or tenant; stateless requests belong in Workers. Match APIs to the project's compatibility date and [DO API docs](https://developers.cloudflare.com/durable-objects/api/).

| Task | Reference |
|---|---|
| Sharding, SQLite, transactions, RPC, alarms, hibernation | [Rules and examples](references/rules.md) |
| Vitest pool, integration tests, alarm tests | [Testing](references/testing.md) |
| Worker handlers, bindings, migrations, types | [Workers integration](references/workers.md) |
| Platform patterns or limits | [Best practices](https://developers.cloudflare.com/durable-objects/best-practices/), [examples](https://developers.cloudflare.com/durable-objects/examples/) |

- New classes use SQLite via `new_sqlite_classes`; append migration tags, not edits to deployed history.
- Persist critical state before updating memory; memory disappears on eviction. Parameterize SQL and preserve atomicity across related writes.
- External I/O permits interleaving. Keep `blockConcurrencyWhile` scoped to initialization rather than wrapping requests or external calls.
- Deterministic routing uses `getByName`; retain IDs from `newUniqueId` when using unique objects. RPC requires compatibility date >= `2024-04-03`; HTTP/WebSocket handlers still use `fetch`.
- One alarm per DO: `setAlarm` replaces the previous alarm. Alarm retries require idempotent side effects.
