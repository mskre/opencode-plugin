---
name: agents-sdk
description: Implement or debug Cloudflare Agents SDK agents, chat, RPC, scheduling, and integrations.
---

# Cloudflare Agents SDK

Match APIs to the installed `agents` version and [current docs](https://developers.cloudflare.com/agents/). Experimental APIs and AI SDK upgrades need their version-specific docs.

| Task | Reference |
|---|---|
| Installation, bindings, decorators | [Configuration](references/configuration.md); `npm ls agents`, `npm install agents`; for chat: `npm install agents @cloudflare/ai-chat ai @ai-sdk/react` |
| State, SQL, schedules | [State and scheduling](references/state-scheduling.md) |
| Callable RPC or routing/auth hooks | [Callable](references/callable.md), [routing](references/routing.md) |
| Chat, tools, resumable streams | [Streaming chat](references/streaming-chat.md) |
| React or client connections | [Client SDK](references/client-sdk.md) |
| Proactive messages or approvals | [Server-driven messages](references/server-driven-messages.md), [human-in-the-loop](references/human-in-the-loop.md) |
| Background jobs | [Workflows](references/workflows.md), [durable execution](references/durable-execution.md), [queues and retries](references/queue-retries.md) |
| MCP client/server and OAuth | [MCP](references/mcp.md) |
| Email | [Email](references/email.md); [Email Service](../cloudflare-email-service/SKILL.md) for domain/sending setup |
| Webhooks or push | [Webhooks and push](references/webhooks-push.md) |
| Diagnostics | [Observability](references/observability.md) |
| Experimental higher-level agents | [Think](references/think.md), [voice](references/voice.md), [Code Mode](references/codemode.md), [browser tools](references/browse-the-web.md) |
| AI SDK upgrade | [v5 migration](https://developers.cloudflare.com/agents/guides/migration-to-ai-sdk-v5/), [v6 migration](https://developers.cloudflare.com/agents/guides/migration-to-ai-sdk-v6/) |

Each new agent class needs a DO binding and SQLite migration; append migration tags rather than rewriting deployed history. `nodejs_compat` is required; `experimentalDecorators` breaks `@callable`. Authenticate access to instances and validate client state/RPC input; an instance name is not authorization.
