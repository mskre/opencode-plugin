---
name: playwright-cli
description: Automate browser interactions with playwright-cli or run and debug Playwright tests.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Playwright CLI

Use `playwright-cli open <url>`, then `snapshot` to obtain current element refs for `click`, `fill`, and other actions. Refresh refs after navigation or DOM changes. Screenshots provide visual evidence; snapshots provide structure.

| Task | Reference |
|---|---|
| CLI syntax, launch options, screenshots, input, tabs, raw output | Relevant section in [command catalogue](commands.md#contents) |
| Missing CLI | [Installation](commands.md#installation); local fallback is `npx playwright cli` |
| Run/debug existing tests | [Playwright tests](references/playwright-tests.md) |
| Mock requests or execute browser code | [Mocking](references/request-mocking.md), [running code](references/running-code.md) |
| Named sessions, attach/detach, persistent profiles | [Session management](references/session-management.md) |
| Cookies and saved auth | [Storage state](references/storage-state.md) |
| Generate tests | [Test generation](references/test-generation.md) |
| Capture diagnostics | [Tracing](references/tracing.md), [video](references/video-recording.md) |
| Inspect hidden attributes | [Element attributes](references/element-attributes.md) |
| User-requested live annotation | [Interactive session](commands.md#example-interactive-session) |

Use the requested browser/device rather than substituting mobile to reduce output. Auth files, cookies, profiles, traces, and screenshots may contain secrets; keep them out of commits and public output. Close only sessions owned by the task; use `detach` for attached user browsers. Profile deletion and global kill/close commands are not routine cleanup.
