---
name: sandbox-migrate-to-next
description: Port an existing Cloudflare Sandbox app from stable to @cloudflare/sandbox@next (SDK 1.0 preview).
---

# Sandbox Stable-to-Preview Migration

Use [current migration docs](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/) and installed preview types. New preview apps use [sandbox-next](../sandbox-next/SKILL.md); maintenance or [2026 deprecation cleanup](https://developers.cloudflare.com/sandbox/guides/2026-deprecation/) without a port uses [sandbox-stable](../sandbox-stable/SKILL.md).

| Task | Reference |
|---|---|
| Identify removed APIs and replacements | [Replacement map](porting.md#replacement-map), [audit command](porting.md#audit) |
| Package/image changes and code examples | [Upgrade](porting.md#upgrade) |
| Approved deployment | [Cutover](porting.md#deploy-cutover) |
| Migration verification | [Migration checks](porting.md#migration-checks) |

- Worker package and image must match the same preview line. Self-deployed bridge stays stable.
- Production cutover requires explicit agreement: `--containers-rollout=immediate` with `rollout_active_grace_period` at `0`. Protocols are incompatible both ways; gradual rollout is unsafe and in-flight work may stop. Verify on staging/branch first.
- `exec(argv)` returns a started-process handle; collect `output()` or wait for exit. No implicit shell, persistent sessions, process stdin, or core `gitCheckout`. Pass `cwd`/`env` per launch; interactive input uses terminals.
- Local wait timeouts/AbortSignal do not kill processes. Recovery depends on the error type, not a blanket retry loop. Pre-cutover process/terminal IDs are invalid after replacement; persist job definitions, not only IDs.
- Isolate users with separate sandbox IDs. Keep live secrets in the Worker, using outbound handlers rather than launch env or `setEnvVars`.
