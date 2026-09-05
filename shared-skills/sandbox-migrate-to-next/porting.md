# Sandbox Preview Porting Reference

Code replacements and cutover commands for an explicitly requested migration. API authority: [migration docs](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) and installed preview types.

## Replacement map

| Stable | `@next` |
| ------ | ------- |
| `SANDBOX_TRANSPORT` / `transport` / `setTransport` | Remove — RPC only |
| `await sandbox.exec("cmd")` → buffered result | `await sandbox.exec(argv)` → handle, then `output` / waits |
| `execStream` / `startProcess` | Same handle: `logs`, `waitFor*`, `kill` |
| Default / named sessions | Gone — `cwd`/`env` per launch, or one shell script |
| `sandbox.terminal(request)` / session terminal | `createTerminal` + `terminal.connect(request)` |
| xterm `sessionId` | `terminalId` |
| Interpreter methods on `Sandbox` | `withInterpreter` → `sandbox.interpreter.*` |
| `gitCheckout` | argv `git` via `exec` |
| String kill signals | Numeric only |
| Files, mounts, backups, ports, tunnels, `proxyToSandbox` | Mostly unchanged (ignore session/transport bits on stable pages) |

Depth: [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) · after port, day-to-day → **`sandbox-next`**

## Audit

```sh
rg 'SANDBOX_TRANSPORT|transport:|setTransport|enableDefaultSession|createSession|getSession|deleteSession|execStream\(|startProcess\(|killProcess\(|sandbox\.terminal\(|sessionId|gitCheckout\(|SandboxTransport|ExecutionSession'
```

Also: string `exec(`, `cd` then a later `exec`, bare `createCodeContext` / `runCode` on `Sandbox`.

## Upgrade

### Package and image

```sh
npm install @cloudflare/sandbox@next
```

```dockerfile
FROM cloudflare/sandbox:next
# Python: cloudflare/sandbox:next-python
```

Same prerelease tag on Worker and image when not on floating `next`.

### Code by area

Apply replacements from the map. For each area, implement from the doc—not from stable habits:

| Area | Doc |
| ---- | --- |
| Commands / handles / waits | [Processes](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) · [Processes API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/) |
| `cwd` / `env` / secrets | [Environment](https://developers.cloudflare.com/sandbox/1-0-preview/environment/) · [Outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) |
| Drop sessions | [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) · [Lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/) |
| Terminals | [Terminals](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/) |
| Interpreter | [Interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/) |
| Errors | [Errors](https://developers.cloudflare.com/sandbox/1-0-preview/errors/) |
| Durable job across requests | [Process execution — lifetime / durability](https://developers.cloudflare.com/sandbox/1-0-preview/processes/) |

**Commands (shape):**

```ts
// Before (stable)
const result = await sandbox.exec("npm test");

// After (@next)
const process = await sandbox.exec(["/bin/bash", "-lc", "npm test"]);
const result = await process.output({ encoding: "utf8" });
```

```ts
const server = await sandbox.exec(["/bin/bash", "-lc", "npm run dev"], {
  cwd: "/workspace/app",
});
await server.waitForPort(3000, { timeout: 60_000 });
await server.kill(); // numeric; default 15
```

**Terminals (shape):**

```ts
const terminal = await sandbox.createTerminal({ command: ["bash"], cwd: "/workspace" });
const t = await sandbox.getTerminal(terminal.id);
if (!t) return new Response("terminal gone", { status: 410 });
return t.connect(request, { cursor, cols, rows });
```

**Interpreter (shape):**

```ts
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox<Env> {
  interpreter = withInterpreter(this);
}
```

**Git (shape):**

```ts
const clone = await sandbox.exec(
  ["git", "clone", "--depth", "1", "--", repoUrl, "/workspace/repo"],
  { cwd: "/workspace" },
);
const result = await clone.output({ encoding: "utf8" });
```

Delete transport settings entirely. Remove session APIs. Isolate users with **separate sandbox IDs**.

### Deploy cutover

Staging/branch first. Production is **one** deploy of matching Worker + image:

```sh
npx wrangler deploy --containers-rollout=immediate
```

Leave `rollout_active_grace_period` at default `0` (or set `0` if raised). After cutover, pre-deploy process/terminal IDs are invalid. Details: [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) · [Container rollouts](https://developers.cloudflare.com/containers/platform-details/rollouts/)

## Migration Checks

1. Lockfile + Dockerfile on the same `@next` line  
2. Typecheck against `@next`  
3. Smoke argv `exec` + `output({ encoding: "utf8" })`  
4. Smoke long process / terminal / interpreter if used  
5. Errors distinguished: unavailable / interrupted-RPC / stale / local wait  
6. No live secrets in sandbox env  
7. Grep again for removed APIs  
8. Production used `--containers-rollout=immediate`  

Then day-to-day work uses **`sandbox-next`**.
