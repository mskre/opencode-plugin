---
name: sandbox-stable
description: Build or maintain Cloudflare Sandbox apps on the stable package, including bridge and stable-only deprecation cleanup.
---

# Sandbox SDK — stable package

Isolated Linux environments on [Cloudflare Containers](https://developers.cloudflare.com/containers/), driven from Workers.

Match the lockfile's stable package and container image; never mix stable and preview control protocols. Use installed stable types and the main docs. An app on `@next` belongs to [sandbox-next](../sandbox-next/SKILL.md); an explicitly requested port belongs to [sandbox-migrate-to-next](../sandbox-migrate-to-next/SKILL.md). Do not force a preview upgrade during stable maintenance.

Skills install: [Agent setup](https://developers.cloudflare.com/agent-setup/) · [cloudflare/skills](https://github.com/cloudflare/skills)

## Stable Contract

- `await sandbox.exec(command)` takes a **command string** and resolves when the command **finishes**, with buffered `stdout` / `stderr` / `exitCode` (and related fields).
- Long-running and streaming work use the **stable** command APIs (`startProcess`, `execStream`, and related helpers)—not the `@next` single-handle model. Open the Commands docs; do not invent `@next` `output()` handles on stable.
- **Sessions** can preserve working directory and environment across commands (default session / `enableDefaultSession`, `createSession`). See Sessions docs when state must carry across calls.
- Interactive browser terminals often use **`sandbox.terminal(request)`** and session/xterm helpers on stable—not preview `createTerminal` unless the package is `@next`.
- Prefer **RPC** transport when using tunnels or large/binary streaming. HTTP/WebSocket transports are deprecated (cleanup guide below).
- Files, mounts, ports, tunnels, backups, lifecycle, and interpreter: use main docs for signatures; trust installed **stable** types.
- Non-secret config in sandbox env; live credentials in the Worker. Use outbound handlers when processes call external APIs.
- Production preview hostnames need wildcard DNS on a custom domain when using those URL patterns.
- Do **not** apply `@next` argv/`process.output()` APIs while the dependency is still stable.
- Self-deployed **bridge** stays on the stable package and image. [Bridge](https://developers.cloudflare.com/sandbox/bridge/)

Minimal shape:

```ts
import { getSandbox, proxyToSandbox, Sandbox } from "@cloudflare/sandbox";

export { Sandbox };

const sandbox = getSandbox(env.Sandbox, "user-123");
const result = await sandbox.exec('python3 -c "print(2 + 2)"');
// result.stdout, result.exitCode, result.success
```

## Task References

| You need to… | Open |
| ------------ | ---- |
| Orient | [Sandbox overview](https://developers.cloudflare.com/sandbox/) |
| First Worker, template, Docker | [Get started](https://developers.cloudflare.com/sandbox/get-started/) |
| `exec`, streaming, background processes | [Commands API](https://developers.cloudflare.com/sandbox/api/commands/) · [Execute commands](https://developers.cloudflare.com/sandbox/guides/execute-commands/) · [Background processes](https://developers.cloudflare.com/sandbox/guides/background-processes/) · [Streaming output](https://developers.cloudflare.com/sandbox/guides/streaming-output/) |
| Sessions / shell state across commands | [Sessions concept](https://developers.cloudflare.com/sandbox/concepts/sessions/) · [Sessions API](https://developers.cloudflare.com/sandbox/api/sessions/) |
| `getSandbox` options, sleep, destroy | [Lifecycle API](https://developers.cloudflare.com/sandbox/api/lifecycle/) · [Sandbox options](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) |
| Env vars | [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) |
| Files | [Files API](https://developers.cloudflare.com/sandbox/api/files/) · [Manage files](https://developers.cloudflare.com/sandbox/guides/manage-files/) · [File watching](https://developers.cloudflare.com/sandbox/api/file-watching/) |
| Buckets / mounts | [Storage API](https://developers.cloudflare.com/sandbox/api/storage/) · [Mount buckets](https://developers.cloudflare.com/sandbox/guides/mount-buckets/) |
| Backups | [Backups API](https://developers.cloudflare.com/sandbox/api/backups/) · [Backup and restore](https://developers.cloudflare.com/sandbox/guides/backup-restore/) |
| Ports, preview URLs, expose | [Ports API](https://developers.cloudflare.com/sandbox/api/ports/) · [Expose services](https://developers.cloudflare.com/sandbox/guides/expose-services/) |
| Tunnels | [Tunnels API](https://developers.cloudflare.com/sandbox/api/tunnels/) |
| Proxy / Workers connections | [Proxy requests](https://developers.cloudflare.com/sandbox/guides/proxy-requests/) · [Workers connections](https://developers.cloudflare.com/sandbox/guides/workers-connections/) |
| Browser / PTY terminal | [Terminal API](https://developers.cloudflare.com/sandbox/api/terminal/) · [Terminal concept](https://developers.cloudflare.com/sandbox/concepts/terminal/) · [Browser terminals](https://developers.cloudflare.com/sandbox/guides/browser-terminals/) |
| Code interpreter | [Interpreter API](https://developers.cloudflare.com/sandbox/api/interpreter/) · [Code execution](https://developers.cloudflare.com/sandbox/guides/code-execution/) |
| Git in the sandbox | [Git workflows](https://developers.cloudflare.com/sandbox/guides/git-workflows/) |
| Secrets / egress | [Outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) |
| WebSockets | [WebSocket connections](https://developers.cloudflare.com/sandbox/guides/websocket-connections/) |
| Docker-in-Docker | [Docker in Docker](https://developers.cloudflare.com/sandbox/guides/docker-in-docker/) |
| Production deploy | [Production deployment](https://developers.cloudflare.com/sandbox/guides/production-deployment/) |
| Containers concept | [Containers](https://developers.cloudflare.com/sandbox/concepts/containers/) |
| How-to index | [Guides](https://developers.cloudflare.com/sandbox/guides/) |
| API index | [API reference](https://developers.cloudflare.com/sandbox/api/) |
| Deprecated APIs **while staying on stable** | [2026 deprecation guide](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/) |
| Self-deployed bridge | [Bridge](https://developers.cloudflare.com/sandbox/bridge/) · [Bridge HTTP API](https://developers.cloudflare.com/sandbox/bridge/http-api/) |
| Examples (stable/`main`) | [examples on GitHub](https://github.com/cloudflare/sandbox-sdk/tree/main/examples) |
| New work on 1.0 preview | **`sandbox-next`** · [1.0 preview](https://developers.cloudflare.com/sandbox/1-0-preview/) |
| Port existing app to `@next` | **`sandbox-migrate-to-next`** · [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) |

### Deprecated-API cleanup (stay on stable)

Update package + matching image first, then follow the guide. Typical search:

```sh
rg 'SANDBOX_TRANSPORT|transport:|exposePort\(|enableDefaultSession|execStream\(|readFileStream|writeFileStream'
```

This path does **not** switch you to `@next`.
