# Supabase CLI and Migrations

## CLI Versions

```bash
supabase --version
supabase --help
supabase <group> --help
supabase <group> <command> --help
```

`supabase db query` requires CLI >= 2.79.0; older versions can use MCP `execute_sql` or `psql`. `supabase db advisors` requires >= 2.81.3; MCP `get_advisors` is the fallback. Verify evolving commands in the [CLI docs](https://supabase.com/docs/reference/cli/introduction) or [releases](https://github.com/supabase/cli/releases).

## Schema Workflow

Use the project's documented database target. No resets or exploratory schema writes on shared/production databases; tests there must be rollback-safe. Migration deployment is separate from writing the migration.

When `supabase/schemas/` or `config.toml` `schema_paths` defines a declarative workflow, edit desired state and generate/review the migration per the [declarative guide](https://supabase.com/docs/guides/local-development/declarative-database-schemas). Do not bypass it with an unrelated hand-written history.

For imperative migrations, create the file with:

```bash
supabase migration new <name>
```

Only on an explicitly disposable local development database, the SQL-first iteration workflow can use MCP `execute_sql` / `supabase db query`, followed by:

```bash
supabase db advisors
supabase db pull <descriptive-name> --local --yes
supabase migration list --local
```

In that SQL-first workflow, `apply_migration` writes history on each call and can make later diff/pull empty or conflicting; use the project's migration workflow instead of mixing approaches. Review [security](security.md) for views, RLS, functions, and storage.

## MCP Connectivity

The hosted endpoint is `https://mcp.supabase.com/mcp`; see [MCP setup](https://supabase.com/docs/guides/getting-started/mcp).

```bash
curl -so /dev/null -w "%{http_code}" https://mcp.supabase.com/mcp
```

An unauthenticated `401` means reachable, not unavailable. Timeouts/refused connections suggest transport issues. Inspect the current agent's MCP configuration format rather than automatically creating `.mcp.json`; when OAuth 2.1 authentication is missing, complete the agent's browser auth flow and reload the session.
