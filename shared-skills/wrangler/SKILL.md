---
name: wrangler
description: Run Wrangler CLI commands for Cloudflare development, resource administration, deployments, and secrets.
---

# Wrangler CLI

Examples target v4. Use the installed version's `wrangler --version`, command `--help`, and `node_modules/wrangler/config-schema.json`; [current docs](https://developers.cloudflare.com/workers/wrangler/) resolve changed flags. If installation is needed, the project dependency command is `npm install -D wrangler@latest`, not an automatic upgrade on every task.

| Task | Command reference |
|---|---|
| New Worker or routine commands | [Setup](commands.md#quick-start-new-worker), [core](commands.md#quick-reference-core-commands) |
| Config and generated types | [Configuration](commands.md#configuration-wranglerjsonc) |
| Local dev, remote bindings, scheduled handlers | [Development](commands.md#local-development) |
| Deploy, secrets, versions, rollback | [Deployment](commands.md#deployment) |
| KV, R2, D1, Vectorize, Hyperdrive | Matching storage section in [contents](commands.md#contents) |
| AI, Queues, Containers, Workflows, Pipelines, Secrets Store, Pages | Matching product section in [contents](commands.md#contents) |
| Logs, startup failures, tests | [Observability](commands.md#observability), [testing](commands.md#testing), [troubleshooting](commands.md#troubleshooting) |

- Confirm account/environment/config and local versus remote resources before writes. `--dry-run` validates a deployment without publishing it; deletion and other destructive operations need approval.
- Remote bindings touch real resources even during local dev; Workers AI is remote and billable.
- Keep secrets out of arguments, logs, config, and version control. Use `wrangler secret put` prompts, stdin, or `secret bulk` with an ignored protected file.
- `wrangler types` regenerates bindings. Compatibility-date changes alter runtime behavior; do not upgrade dates incidentally. See [compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).
- Turnstile credential recovery uses its stricter approved-executable rules, not project-local package resolution: [turnstile-spin](../turnstile-spin/SKILL.md).
