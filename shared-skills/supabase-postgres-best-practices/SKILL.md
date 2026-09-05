---
name: supabase-postgres-best-practices
description: Design or review Postgres schemas, SQL, RLS, indexes, and diagnose query, connection, or locking problems.
license: MIT
metadata:
  author: supabase
  version: "1.1.1"
  organization: Supabase
  date: January 2026
  abstract: Postgres SQL and performance references, maintained by Supabase.
---

# Supabase Postgres Best Practices

Read only the rules matching the SQL or operational issue. These apply to Postgres anywhere; Supabase service/auth integration belongs to [supabase](../supabase/SKILL.md).

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Query Performance | CRITICAL | `query-` |
| 2 | Connection Management | CRITICAL | `conn-` |
| 3 | Security & RLS | CRITICAL | `security-` |
| 4 | Schema Design | HIGH | `schema-` |
| 5 | Concurrency & Locking | MEDIUM-HIGH | `lock-` |
| 6 | Data Access Patterns | MEDIUM | `data-` |
| 7 | Monitoring & Diagnostics | LOW-MEDIUM | `monitor-` |
| 8 | Advanced Features | LOW | `advanced-` |

## How to Use

Browse the matching prefix in [references](references/). Entry points: [missing indexes](references/query-missing-indexes.md), [partial indexes](references/query-partial-indexes.md), [data types](references/schema-data-types.md), [constraints](references/schema-constraints.md), [RLS](references/security-rls-basics.md), [privileges](references/security-privileges.md), [pooling](references/conn-pooling.md), [EXPLAIN](references/monitor-explain-analyze.md).

Use least-privilege application roles. `EXPLAIN ANALYZE` executes the query; use rollback-safe checks for writes and never reset a shared database as a test shortcut.

## References

- https://www.postgresql.org/docs/current/
- https://supabase.com/docs
- https://wiki.postgresql.org/wiki/Performance_Optimization
- https://supabase.com/docs/guides/database/overview
- https://supabase.com/docs/guides/auth/row-level-security
