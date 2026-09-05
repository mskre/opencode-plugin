---
name: cloudflare-one-migrations
description: Assess and map migrations from Zscaler, Palo Alto, or legacy VPN/SWG/SASE stacks to Cloudflare One.
---

# Cloudflare One Migrations

Map source rule intent from exports, dependencies, and logs, not a presumed one-to-one product equivalence. Exact configuration belongs to [cloudflare-one](../cloudflare-one/SKILL.md) and current vendor/API docs.

| Source or task | Reference |
|---|---|
| Missing artifacts or initial assessment | [Exports](source-mapping.md#exports-to-ask-for), [assessment inputs](source-mapping.md#migration-assessment-prompts) |
| Legacy VPN or general product mapping | [Mapping heuristics](source-mapping.md#mapping-heuristics) |
| ZIA / SWG | [ZIA traps](source-mapping.md#zscaler-zia--swg) |
| ZPA / private access, including combined ZIA/ZPA | [ZPA topology and policy mapping](source-mapping.md#zscaler-zpa--private-access) |
| Palo Alto / Prisma / NGFW | [Palo Alto traps](source-mapping.md#palo-alto--prisma--ngfw) |
| Rollout review | [Gotchas](source-mapping.md#gotchas), [validation gates](source-mapping.md#validation-gates) |

- Account for every source rule: target objects, partial/unsupported status, or Not Migrated with reason and security impact. Compare counts with expected one-to-many mappings; investigate mismatches before enablement.
- Resolve identity, posture, routes/DNS, TLS bypasses, and logging dependencies before policy activation. Missing SCIM or DLP must not silently become broad access or placeholder protection.
- Stage with a migration prefix and disabled/audit-mode rules; pilot with real identities and traffic, preserve a rollback path, and obtain approval for broad production enablement.
- Preserve order, hit counts, and stale rules unless deletion is approved. No broad allow-all catchalls unless explicitly requested and time-limited. Source-IP changes and unsupported semantics need explicit decisions.
