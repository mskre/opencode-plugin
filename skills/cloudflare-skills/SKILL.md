---
name: cloudflare-skills
description: Use when working with Cloudflare Workers, Pages, DNS, tunnels, Access, R2, D1, KV, Durable Objects, Queues, cache rules, or Wrangler configuration.
---

# Cloudflare Skills

Use this skill for Cloudflare application, edge, DNS, and infrastructure work.

## Workflow

1. Identify the Cloudflare product involved: Workers, Pages, DNS, Tunnel, Access, R2, D1, KV, Durable Objects, Queues, or cache/security rules.
2. Inspect the existing project files before changing anything: `wrangler.toml`, `wrangler.json`, `package.json`, route config, environment bindings, and deployment scripts.
3. Preserve existing production bindings and routes unless the user explicitly asks to change them.
4. Prefer small config changes that can be deployed and rolled back independently.
5. Validate locally with the project's existing commands before recommending deployment.

## Common Checks

- Confirm account, zone, route, and project names before changing DNS or deployment config.
- Treat production DNS and Access policy changes as high risk.
- Keep secrets in Cloudflare secret bindings or environment variables, not committed files.
- For Workers, verify bindings match both local dev and deployed environments.
- For D1, confirm whether a migration is local, preview, or production before applying it.
- For R2, confirm bucket name, public access, CORS, lifecycle rules, and cache behavior.
- For Durable Objects, check class names, migrations, namespaces, and compatibility dates.

## Output Style

- State exactly what will change in Cloudflare and what remains untouched.
- Include validation and rollback notes when changing deploy, DNS, or data storage behavior.
- If deployment requires credentials or interactive auth, stop at the prepared command and explain what access is needed.
