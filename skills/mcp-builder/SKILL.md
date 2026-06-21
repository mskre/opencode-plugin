---
name: mcp-builder
description: Use when building, installing, debugging, or configuring MCP servers, MCP clients, tool schemas, stdio transports, SSE/HTTP MCP endpoints, or OpenCode mcp entries.
---

# MCP Builder

Use this skill for Model Context Protocol server work, including new servers, client configuration, tool design, and debugging broken MCP integrations.

## OpenCode Configuration Rules

- Edit OpenCode config only in the appropriate `opencode.json` or `opencode.jsonc` file.
- For global OpenCode MCPs, use `/Users/mikkel/.config/opencode/opencode.json`.
- Keep new MCP servers disabled by default unless the user explicitly asks for always-on behavior.
- Use an object under `mcp`, keyed by server name.
- For local servers, use `type: "local"` and `command` as an array of strings.
- For remote servers, use `type: "remote"` and `url`.
- Do not inline secrets. Use environment variables or existing secret stores.
- Validate the resulting config before telling the user it is ready.

## Server Design

- Keep tools small and deterministic.
- Prefer one clear tool per user intent over a broad catch-all tool.
- Define precise JSON schemas with required fields, descriptions, enums, and safe defaults.
- Return structured data when another model or tool will consume the output.
- Add timeouts around network and browser operations.
- Surface actionable errors instead of raw stack traces when possible.

## Debugging Checklist

- Confirm the command launches outside the MCP client.
- Confirm stdio servers do not print logs to stdout.
- Check Node, Bun, Python, or binary versions used by the command.
- Verify required environment variables are available to the launched process.
- Test with the smallest possible tool call before debugging complex flows.
- Check whether the client caches MCP server definitions and needs a restart.

## Safety

- Never expose API tokens, cookies, OAuth refresh tokens, or private keys in logs or docs.
- Ask before enabling tools that can mutate production data.
- Keep destructive tools separate from read-only tools where possible.
