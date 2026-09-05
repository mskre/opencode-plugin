# Supabase Security

## Auth and Keys

- `user_metadata` / `raw_user_meta_data` is user-editable and cannot authorize access. Use trusted `app_metadata` / `raw_app_meta_data` for claims, accounting for stale JWTs until refresh.
- Deleting a user does not invalidate issued access tokens. Session revocation does not by itself revoke an already issued stateless JWT; use short expiry and validate `session_id` against `auth.sessions` for sensitive operations requiring immediate revocation.
- Never expose `service_role` or secret keys in clients. Prefer publishable keys; legacy `anon` keys remain for existing integrations. `NEXT_PUBLIC_` variables are browser-visible.

## Data API and RLS

Table grants and RLS are separate: grants decide whether roles can access a table; policies decide which rows. If a SQL-created table is inaccessible, inspect [Data API settings](https://supabase.com/dashboard/project/<ref>/integrations/data_api/settings), schema exposure, and `GRANT`s. Enable RLS on every table in exposed schemas (including `public` by default) before granting `anon`/`authenticated` access. See [securing the API](https://supabase.com/docs/guides/api/securing-your-api.md).

Policies must fit the actual access model. `TO authenticated` only selects a database role; anonymous sign-ins also use that role. It does not establish ownership or a non-anonymous identity. Prefer the `TO` clause over deprecated `auth.role()` predicates.

```sql
create policy "read own rows" on table_name for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "update own rows" on table_name for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
```

Updates also need row visibility via a SELECT policy. `USING` controls existing rows and `WITH CHECK` controls new values; specify both to make intent explicit. Postgres can reuse `USING` when `WITH CHECK` is omitted, so omission is not automatically an ownership bypass.

## Views and Privileged Functions

- Views can use owner privileges and bypass caller RLS. On Postgres 15+, use `CREATE VIEW ... WITH (security_invoker = true)` when caller policies should apply; on older versions revoke public-role access or place the view in an unexposed schema.
- Prefer `SECURITY INVOKER`. Do not add `SECURITY DEFINER` as a permission-error workaround: it uses owner privileges, often bypassing RLS.
- A necessary definer function needs a trusted `search_path`, explicit authorization appropriate to its callers, and restricted `EXECUTE` grants. Functions grant `EXECUTE` to `PUBLIC` by default. Keep internal helpers in non-exposed schemas; schema placement alone does not replace privilege checks.
- Review security advisors after privileged schema changes: `supabase db advisors` (CLI >= 2.81.3) or MCP `get_advisors`.

## Storage and Dependencies

Storage upsert requires INSERT, SELECT, and UPDATE access. Granting only INSERT permits new objects but not replacement.

Pin installed Supabase package versions and retain lockfiles. See [npm security](https://supabase.com/docs/guides/security/npm-security.md) for supply-chain controls and [product security](https://supabase.com/docs/guides/security/product-security.md) for other surfaces.
