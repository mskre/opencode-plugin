---
name: cloudflare-email-service
description: Configure Cloudflare Email Sending or Routing, integrate transactional email, or diagnose deliverability.
---

# Cloudflare Email Service

Check version-sensitive fields against [Email Service docs](https://developers.cloudflare.com/email-service/), the [REST API](https://developers.cloudflare.com/api/resources/email_sending), and installed Workers types.

| Task | Reference |
|---|---|
| Send from Workers or Agents SDK | [Sending](references/sending.md) |
| Send via REST from external apps, or explicitly from Workers | [REST API](references/rest-api.md) |
| Receive, parse, forward, reply | [Routing](references/routing.md) |
| Domain onboarding, CLI or MCP | [CLI and MCP](references/cli-and-mcp.md) |
| SPF/DKIM/DMARC, bounces, suppressions | [Deliverability](references/deliverability.md) |

- Sending requires an onboarded `from` domain; inspect with `npx wrangler email sending list`. Workers use a `send_email` binding; REST uses a secret Bearer token.
- Workers `from.email` / `replyTo` differ from REST `from.address` / `reply_to`; REST delivery arrays are not a Workers `messageId`.
- Transactional mail only, not bulk marketing. Include text alongside HTML; test with addresses you control. Remote dev bindings send real mail.
- Forwarding destinations must be verified. Inbound `message.raw` is single-use; buffer before multiple reads. `postal-mime` is needed only for MIME parsing.
- Keep API tokens in secrets, not source. Agents reply resolvers and loop prevention are covered in the sending reference.
