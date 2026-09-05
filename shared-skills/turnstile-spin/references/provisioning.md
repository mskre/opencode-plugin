# Turnstile Provisioning

## Account and Scope

The scripts require Bash, curl, Python 3, and (for validation) jq. Resolve script paths from the skill bundle, not the target project's working directory. The commands below use bundle-relative paths.

`scripts/auth-probe.sh` reads `CLOUDFLARE_API_TOKEN` and optional `CLOUDFLARE_ACCOUNT_ID`. Its Edit-scope check sends an intentionally invalid POST and may create/delete a cleanup widget if upstream validation changes. Obtain approval for that probe, not merely for read-only inspection.

Account enumeration uses only an approved canonical absolute `WRANGLER_BIN` outside `PROJECT_ROOT` with exact `WRANGLER_VERSION`; otherwise supply the account ID. Never use project package resolution for credentials or install Wrangler automatically.

| JSON status | Response |
|---|---|
| `ok` | Selected account passed the Edit-scope probe |
| `missing_token` / `missing_scope` | Inspect `reason`; request `Account.Turnstile:Edit` scoped to the target account at [API tokens](https://dash.cloudflare.com/profile/api-tokens) |
| `multiple_accounts` | Obtain the user's selection, set `CLOUDFLARE_ACCOUNT_ID`, rerun |
| `account_mismatch` | Correct or unset the declared account based on confirmed intent |
| `network_failure` | Diagnose VPN/proxy, TLS, DNS; not a token-scope error |
| `upstream_failure` | Report HTTP status; retry after recovery, not credential replacement by assumption |

Do not recommend `wrangler login` unless that version's OAuth scopes include Turnstile Edit. Tokens must not enter chat. User-run Bash options:

```bash
# Read without shell history, then relaunch the agent from that terminal.
read -rsp 'Cloudflare API token: ' token; echo
export CLOUDFLARE_API_TOKEN="$token"; unset token

# Alternative: user-only token file; load later without printing.
umask 077
read -rsp 'Cloudflare API token: ' token; echo
printf '%s' "$token" > ~/.cf-turnstile-token; unset token
```

## Create and Store

Confirm production domains from project evidence, plus `localhost` and `127.0.0.1` if using the shared dev/production widget. Production backend allowlists must exclude those local names. Confirm protected surfaces and their stable actions; use the integration reference for existing CAPTCHA migrations.

After widget-creation approval, use the approved Wrangler when its subcommand exists:

```bash
# Capture stdout, never display it. Clear inherited export attributes.
set +x
set -euo pipefail
unset response WIDGET_SECRET
response="$(WRANGLER_WRITE_LOGS=false WRANGLER_LOG=log WRANGLER_LOG_SANITIZE=true \
  "$WRANGLER_BIN" turnstile widget create "$NAME" \
  --domain example.com --domain localhost --domain 127.0.0.1 --mode managed --json)"
SITEKEY="$(printf '%s' "$response" | jq -er '.sitekey | select(type == "string" and test("^\\S+$"))')"
WIDGET_SECRET="$(printf '%s' "$response" | jq -er '.secret | select(type == "string" and test("^\\S+$"))')"
unset response
```

Execute capture/parsing in a shell with `set +x` and `set -euo pipefail`; stop on command or validation failure. If the approved executable/subcommand is absent, capture the same way from `scripts/widget-create.sh --account-id "$ACCOUNT_ID" --name "$NAME" --domains "$DOMAINS_CSV" --mode managed`. Do not fall back after authentication/API failure. Report only the sitekey.

Validate the captured secret and approved domain mapping before storing:

```bash
printf '%s' "$WIDGET_SECRET" | scripts/validate.sh \
  --sitekey "$SITEKEY" --account-id "$ACCOUNT_ID" \
  --expected-domains "$EXPECTED_DOMAINS_JSON"
```

The validator uses stdin, checks sitekey/domain/clearance/secret correspondence, and expects dummy Siteverify `invalid-input-response` without `invalid-input-secret`. Its success is not backend validation.

Use only the confirmed existing secret destination. For local env files, require `git check-ignore -q <path>` in a git worktree. For Workers, resolve account, Worker name, config, environment, and binding, then run `"$WRANGLER_BIN" secret list` with those exact target arguments immediately before piping to `secret put TURNSTILE_SECRET`. Other platform managers must accept stdin. Keep tracing/disk/debug logs disabled; unset `WIDGET_SECRET` after storage and on failure.

If domains need updating, the widget endpoint uses PUT, not PATCH (`10405`): `curl -X PUT .../widgets/$SITEKEY -d '{"name":"...","mode":"managed","domains":[...]}'`. Retrieve the existing configuration and confirm the domain change; preserve clearance level. Never inline authorization secrets in this illustrative command.

## Optional Persistence

Only when requested, `scripts/persist-skill.sh --path <bundle-directory>/SKILL.md` installs into an empty project-contained directory. It downloads the upstream `cloudflare/skills` bundle, not this locally refactored copy; disclose that distinction. File-oriented targets use the hosted `prompt.md` instead, not the bundle script. Do not persist or update skills as a side effect of integration.
