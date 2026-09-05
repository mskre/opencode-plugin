---
name: sandbox-next
description: Build or debug Cloudflare Sandbox apps on @cloudflare/sandbox@next, the SDK 1.0 preview line.
---

# Sandbox SDK — `@next` (1.0 preview)

Isolated Linux environments on [Cloudflare Containers](https://developers.cloudflare.com/containers/), driven from Workers.

Match the installed preview types, lockfile, and container image (`cloudflare/sandbox:next` or `next-python`). Never mix preview and stable protocols. Stable apps use [sandbox-stable](../sandbox-stable/SKILL.md); requested ports use [sandbox-migrate-to-next](../sandbox-migrate-to-next/SKILL.md). Self-deployed [bridge](https://developers.cloudflare.com/sandbox/bridge/) remains on stable, not preview.

Skills install: [Agent setup](https://developers.cloudflare.com/agent-setup/) · [cloudflare/skills](https://github.com/cloudflare/skills)

## Preview Contract

- `sandbox.exec(argv)` takes an **argv** list and resolves when the process **starts**. It returns a **handle**, not a finished command result.
- Collect results with handle methods: `output()`, `logs()`, `waitForExit()`, `waitForPort()`, `waitForLog()`, `kill(signal?)`.
- No implicit shell. Shell syntax needs an explicit shell, e.g. `["/bin/bash", "-lc", script]`.
- Each launch is independent. A `cd` / `export` in one `exec` is not visible to the next. Pass `cwd` and `env` per launch, or one shell script.
- Process handles have **no stdin**. Interactive use → terminals (`createTerminal` + `connect`).
- Local wait `timeout` / `AbortSignal` cancel the **wait only**. They do not kill the process. Use `kill` or `exec`’s remote `timeout`.
- `getProcess` / `listProcesses` / `getTerminal` / `listTerminals` do **not** start a container; they return `null` / `[]` when none is up.
- Process and terminal IDs belong to the **current container**, not forever to a sandbox ID. For work that must survive replace, store the full job (argv, cwd, env, app state)—not only an id.
- Non-secret config only in `setEnvVars` / launch `env`. Live credentials stay in the Worker; use outbound handlers when the sandbox calls external APIs.
- Production preview hostnames need wildcard DNS on a custom domain when using those URL patterns.
- Do **not** invent removed stable APIs (`gitCheckout` on core, string-`exec` completion, session execution, `sandbox.terminal(request)`).
- Do **not** use one retry loop for every error (see Errors docs).

Minimal shape:

```ts
import { getSandbox, proxyToSandbox, Sandbox } from "@cloudflare/sandbox";

export { Sandbox };

const sandbox = getSandbox(env.Sandbox, "user-123");
const process = await sandbox.exec(["python3", "-c", "print(2 + 2)"]);
const result = await process.output({ encoding: "utf8" });
// result.stdout, result.exitCode
```

Optional **non-exhaustive** cheatsheet (process/terminal/interpreter only): [references/api-quick-ref.md](references/api-quick-ref.md)  
Examples index (`next` branch): [references/examples.md](references/examples.md)

## Task References

| You need to… | Open |
| ------------ | ---- |
| Orient / choose preview | [1.0 preview overview](https://developers.cloudflare.com/sandbox/1-0-preview/) |
| First Worker, wrangler, Dockerfile | [Get started](https://developers.cloudflare.com/sandbox/1-0-preview/get-started/) |
| `exec`, handles, readiness, durability | [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) |
| Process API signatures | [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/) |
| Sandbox ID vs container vs sleep/destroy | [Lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/) |
| `cwd` / `env` / `setEnvVars` | [Environment](https://developers.cloudflare.com/sandbox/1-0-preview/environment/) |
| Interactive PTY / browser terminal | [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/) · [Terminals API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/) |
| Python/JS code interpreter | [Interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/) · [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/) |
| Extensions model | [Extensions](https://developers.cloudflare.com/sandbox/1-0-preview/extensions/) |
| Error classes and recovery | [Errors](https://developers.cloudflare.com/sandbox/1-0-preview/errors/) · [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/) |
| Common failures | [Troubleshooting](https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/) |
| API hub | [API reference](https://developers.cloudflare.com/sandbox/1-0-preview/api/) |
| Files, mounts, backups, ports, tunnels, `proxyToSandbox` | Main docs for shared surfaces (ignore stable-only session/transport/`sandbox.terminal`): [Files](https://developers.cloudflare.com/sandbox/api/files/) · [Storage / mounts](https://developers.cloudflare.com/sandbox/api/storage/) · [Ports](https://developers.cloudflare.com/sandbox/api/ports/) · [Tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) · [Backups](https://developers.cloudflare.com/sandbox/api/backups/) · [Outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) · [Expose services](https://developers.cloudflare.com/sandbox/guides/expose-services/) · [Production](https://developers.cloudflare.com/sandbox/guides/production-deployment/) |
| Example apps | [examples on `next`](https://github.com/cloudflare/sandbox-sdk/tree/next/examples) |
| Still on stable package | **`sandbox-stable`** · [Main Sandbox docs](https://developers.cloudflare.com/sandbox/) |
| Porting an existing stable app | **`sandbox-migrate-to-next`** · [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) |
