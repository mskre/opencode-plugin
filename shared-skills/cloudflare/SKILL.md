---
name: cloudflare
description: Choose Cloudflare products and route a platform architecture question to the relevant product skill or reference.
references:
  - workers
  - pages
  - d1
  - durable-objects
  - workers-ai
---

# Cloudflare Product Router

This skill selects products; specialized skills own implementation. For an unresolved product choice, consult the relevant section of [product selection](product-selection.md#quick-decision-trees) or its [complete index](product-selection.md#product-index).

| Selected product/task | Implementation owner |
|---|---|
| Workers runtime | [workers-best-practices](../workers-best-practices/SKILL.md) |
| Wrangler CLI/configuration/deployments | [wrangler](../wrangler/SKILL.md) |
| Per-entity coordination | [durable-objects](../durable-objects/SKILL.md) |
| Agents SDK | [agents-sdk](../agents-sdk/SKILL.md) |
| Email Sending/Routing | [cloudflare-email-service](../cloudflare-email-service/SKILL.md) |
| Zero Trust, Tunnel, Access, Gateway, WAN | [cloudflare-one](../cloudflare-one/SKILL.md) |
| Migration from another VPN/SASE stack | [cloudflare-one-migrations](../cloudflare-one-migrations/SKILL.md) |
| Turnstile | [turnstile-spin](../turnstile-spin/SKILL.md) |
| Sandbox | [stable](../sandbox-stable/SKILL.md), [1.0 preview](../sandbox-next/SKILL.md), or [stable-to-preview migration](../sandbox-migrate-to-next/SKILL.md), according to package line and task |
| Other products | Matching directory in the [product index](product-selection.md#product-index); select only the needed API/configuration/pattern reference |

Check [current docs](https://developers.cloudflare.com/) and [changelog](https://developers.cloudflare.com/changelog/) when availability, limits, pricing, or compatibility determines the choice. Bundled references are not authoritative for changing platform limits.
