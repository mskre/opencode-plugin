---
name: supabase
description: Integrate or troubleshoot Supabase Auth, Data API, Storage, Realtime, Edge Functions, CLI, and MCP.
metadata:
  author: supabase
  version: "0.1.2"
---

# Supabase

Use MCP `search_docs` or fetch the relevant [docs](https://supabase.com/docs) page with `.md` appended. Consult the [changelog](https://supabase.com/changelog.md) for upgrades or suspected breaking changes, not every edit.

| Task | Reference |
|---|---|
| Auth, user data, Data API grants/RLS, views, privileged functions, storage | [Security](references/security.md) |
| CLI commands, migration workflow, MCP connectivity | [CLI and migrations](references/cli-and-migrations.md) |
| SQL/schema design, indexes, locking, query performance | [Postgres skill](../supabase-postgres-best-practices/SKILL.md) |
| Service errors, empty results, logs | [Monitoring and debugging](https://supabase.com/docs/guides/monitoring-and-debugging.md) |
| Other product security issues | [Product security](https://supabase.com/docs/guides/security/product-security.md) |
| User-requested feedback to skill maintainers | [Skill feedback](references/skill-feedback.md); obtain permission before submitting an issue |

Keep service-role/secret keys server-side. Enable RLS on tables in exposed schemas and grant only intended API access; `authenticated` alone is not row authorization. Follow the project's database target and migration convention; shared or production databases are not disposable local scratch space.
