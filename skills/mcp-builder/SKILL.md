---
name: mcp-builder
description: Use to build, configure, or debug MCP servers, client connections, and tool schemas; not ordinary API endpoints.
---

# MCP Builder

Use only the section relevant to the MCP task.

## OpenCode Configuration Rules

- For OpenCode entries, load `customize-opencode` for the current schema and config location; skip this section for other clients.
- Keep new MCP servers disabled by default unless the user explicitly asks for always-on behavior.
- Do not inline secrets. Use environment variables or existing secret stores.
- Validate the resulting config before telling the user it is ready.

## Server Design

- Prefer one clear tool per user intent over a broad catch-all tool.
- Define precise JSON schemas with required fields, descriptions, enums, and safe defaults.
- Return structured data when another model or tool will consume the output.
- Add timeouts around network and browser operations.
- Surface actionable errors instead of raw stack traces when possible.

## Debugging Checklist

- For local/stdio servers, confirm the launch command, runtime version, and environment outside the client. Keep logs on stderr, never protocol stdout.
- For remote servers, check endpoint, transport compatibility, authentication, and HTTP errors without exposing credentials.
- Verify initialization and tool discovery before a representative tool call.
- Test with the smallest possible tool call before debugging complex flows.
- Check whether the client caches MCP server definitions and needs a restart.

## Safety

- Never expose API tokens, cookies, OAuth refresh tokens, or private keys in logs or docs.
- Ask before enabling tools that can mutate production data.
- Keep destructive tools separate from read-only tools where possible.
