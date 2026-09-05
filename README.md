# OpenCode Plugins

A collection of local plugins and install tracking for my global [OpenCode](https://opencode.ai) setup.

**Default model:** `openai/gpt-5.6-sol`, using the `medium` variant for the default `build` agent.

> **Tip:** Using an AI coding assistant? Skip to the [LLM Install](#llm-install) section and paste the instructions directly into your assistant for automated setup.

## Plugins

### [image-downscale](./image-downscale)

Automatically downscales oversized uploaded images so the longest side is at most 2000px. Leaves text, PDFs, animated GIFs, and small images unchanged. Fails open on errors -- if an image can't be processed, it passes through unmodified.

**Supported formats:** PNG, JPEG, WebP, GIF (static only), AVIF, TIFF

### [ponytail](https://github.com/DietrichGebert/ponytail)

External checkout that injects the Ponytail lazy senior developer ruleset into OpenCode every turn and provides `/ponytail` level commands.

**Checkout:** `~/.config/opencode/vendor/ponytail`
**Plugin path:** `~/.config/opencode/vendor/ponytail/.opencode/plugins/ponytail.mjs`
**Commands:** symlinked into `~/.config/opencode/command/`

### [fcm-opencode](https://github.com/vava-nessa/free-coding-models/tree/main/packages/fcm-opencode) (beta)

OpenCode adapter for `free-coding-models` (FCM): scans free coding LLM providers, ranks them, and lets you hot-swap the active OpenCode model mid-session via `/fcm`. Startup only reads a local cache or the FCM daemon -- no network probe happens unless `/fcm` is run explicitly. API keys are referenced via `{env:...}` placeholders, never inlined into `opencode.json`.

**Commands:** `/fcm` (list/switch ranked models), `/fcm-status` (diagnostics), `/fcm-router` (point OpenCode at the local FCM Smart Router daemon)
**Checkout:** `~/.local/share/free-coding-models` (git clone of the monorepo -- the npm package alone doesn't ship this plugin)
**Plugin path:** `~/.config/opencode/plugins/fcm-opencode.js` (symlink to `packages/fcm-opencode/index.js` in the checkout)
**Requires:** `free-coding-models` installed globally (`npm install -g free-coding-models`) for its dependencies (chalk, etc.) and at least one provider API key (Groq, Cerebras, NVIDIA NIM, ...) configured via env var or `~/.free-coding-models.json`

### Other global plugins

- `@nick-vi/opencode-type-inject@latest` for direct type injection support.
- `opencode-goal-plugin@latest` for the `/goal` session objective and auto-continue workflow.
- `opencode-claude-auth@latest` for direct Anthropic models using Claude Code credentials.
- `magic-compact` v1.1.0 for lossless manual context compression via `/magic-compact`; `/magic-stats` reports token and cost savings.

## MCP Servers

All MCP servers are disabled by default and should be enabled only for sessions that need them.

- `playwright` via `@playwright/mcp`
- `chrome-devtools` via `chrome-devtools-mcp@latest` with `--isolated`, `--no-usage-statistics`, and `--no-performance-crux`
- `context7` via `@upstash/context7-mcp@latest` for current library/framework docs
- `magic-ui` via `@magicuidesign/mcp@latest`
- `shadcn` via `shadcn@latest mcp`
- `accessibility-scanner` via `mcp-accessibility-scanner@latest` for automated accessibility checks
- Existing disabled servers: `mobbin`, `mobile-mcp`, `n8n`, `google-scholar`, `trogon`, `supabase-cloud`, the private self-hosted `supabase` endpoint, and all configured Cloudflare servers

## Local Skills

The 2026-09-05 snapshot tracks **44 canonical skill names** with complete supporting resources. [`installed-plugins.json`](./installed-plugins.json) records each active source and repository mapping, including duplicate locations. The existing 20 OpenCode trees remain in [`skills/`](./skills), along with the existing Playwright mirror:

- `brandkit`
- `cloudflare-skills`
- `diagnosing-bugs`, adapted from `mattpocock/skills` for hard bugs only
- `emil-design-eng`
- `frontend-iteration`
- `grill-me` and its `grilling` workflow, adapted from `mattpocock/skills`
- `image-to-code`
- `imagegen-frontend-mobile`
- `imagegen-frontend-web`
- `impeccable` v4.1.3 from `pbakaus/impeccable`
- `industrial-brutalist-ui`
- `mcp-builder`
- `minimalist-ui`
- `phantom-ui`
- `playwright-cli` installed at `~/.agents/skills/playwright-cli`
- `review-animations`
- `stitch-design-taste`
- `tdd`, adapted from `mattpocock/skills` for explicit test-first requests
- `vault-daydream`
- `wizard`, adapted from `mattpocock/skills` for manual setup procedures

`/impeccable` is exposed through `command/impeccable.md`; the wrapper loads the skill and forwards its arguments.

`/grill-me` is exposed through `command/grill-me.md`; it loads the explicitly invoked grilling workflow.

`impeccable` is the general frontend design skill. `minimalist-ui` and `industrial-brutalist-ui` are explicit aesthetic modes. Image-generation skills check for a real image-generation tool and stop without fabricating output when the current harness lacks one.

### Shared And Managed Sources

- [`shared-skills/`](./shared-skills) contains 16 shared canonical sources: `agents-sdk`, `cloudflare`, `cloudflare-email-service`, `cloudflare-one`, `cloudflare-one-migrations`, `durable-objects`, `frontend-design`, `sandbox-migrate-to-next`, `sandbox-next`, `sandbox-stable`, `supabase`, `supabase-postgres-best-practices`, `turnstile-spin`, `web-perf`, `workers-best-practices`, and `wrangler`. Shared Playwright uses the existing `skills/playwright-cli/` mirror only.
- `shared-skills/impeccable/` separately preserves the shared variant, including its distinct metadata, command/path syntax, agent metadata and resources. The `.config/opencode/skills/impeccable` tree is identical to the `.opencode` tree and reuses that mirror.
- [`plugin-skills/opencode-skill-creator/`](./plugin-skills/opencode-skill-creator) preserves the installed creator skill, its guides, agents, template and version marker. It does not install or enable creator plugin tools; those must actually be exposed by the host to be used.
- [`ponytail-skills/`](./ponytail-skills) preserves `ponytail`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help`, and `ponytail-review`. The Ponytail checkout remains responsible for its plugin, commands and benchmark sources.

There are 45 repository trees: 44 canonical skills and the shared Impeccable variant. These represent 46 installed locations through 46 mappings because both OpenCode Impeccable locations reuse one snapshot. Do not add the repository root to `skills.paths`; restore each tree to its mapped destination instead.

### Local Adaptations

These are locally adapted snapshots, not pristine upstream releases. The all-skills rework narrows trigger descriptions, routes to task-specific resources, makes interviews and discovery conditional on missing context, and scopes verification to the affected behavior. The skill text retains safety gates, actual image inspection, vault accuracy and explicit TDD triggering. These are instruction changes, not evidence of better model behavior; no behavioral evaluation is claimed by this sync.

Article reference: Eric Provencher, [Rethinking skills and prompts for GPT-6 Astra](https://x.com/pvncher/status/2095991462416490862), 2026-09-04 (citation supplied by the user).

Upstream skill installers, creator regeneration and Ponytail checkout updates can overwrite these local adaptations. Review upstream diffs and reapply the relevant snapshot before restarting OpenCode. Existing upstream source/version fields identify provenance, not an unmodified release. The full rework edits live skill documentation; copying those trees into this repository does not alter runtime behavior or modify runtime `AGENTS.md`, plugin implementation, configuration, credential or state files. Bundled reference documents named `AGENTS.md`, if present, are resources, not changes to runtime instructions.

Snapshots exclude Git metadata, dependencies, caches, virtual environments, browser runtime output, logs, environment files, keys and secret/runtime directories; the exact exclusion list is in `skillSnapshot.excluded`. Preserve source resources and executable modes. Sync without deletion, then compare both trees so stale destination files are reported rather than silently removed.

The volume audit retained Cloudflare's indexed product references and Impeccable's scripts, browser bundles and font catalogue, which its tooling loads. Six non-operational files are deliberately omitted from new shared snapshots: a Zaraz implementation report, a font-index failure report, two Supabase changelogs and two contributor/template documents. Their exact paths are in `skillSnapshot.omittedResources`; preserve these omissions during future syncs. Task-facing evaluation and feedback templates remain.

## Sync To A New Machine

Restore mappings (paths are relative to this repository and the target user's home):

| Repository Tree | Installed Destination |
| --- | --- |
| `skills/<name>/`, except `playwright-cli` | `~/.opencode/skills/<name>/` |
| `shared-skills/<name>/`, including shared Impeccable | `~/.agents/skills/<name>/` |
| `skills/playwright-cli/` | `~/.agents/skills/playwright-cli/` |
| `skills/impeccable/` | Also `~/.config/opencode/skills/impeccable/` |
| `plugin-skills/opencode-skill-creator/` | `~/.config/opencode/skills/opencode-skill-creator/` |
| `ponytail-skills/<name>/` | `~/.config/opencode/vendor/ponytail/skills/<name>/` |

Clone this repo and install Ponytail using the section below before restoring its adapted skills. Review any existing destination edits before overwriting files. These commands do not delete destination-only files:

```bash
git clone git@github.com:mskre/opencode-plugin.git ~/opencode-plugin
mkdir -p ~/.opencode/skills ~/.agents/skills ~/.config/opencode/skills/impeccable
rsync -a --exclude '/playwright-cli/' ~/opencode-plugin/skills/ ~/.opencode/skills/
rsync -a ~/opencode-plugin/shared-skills/ ~/.agents/skills/
mkdir -p ~/.agents/skills/playwright-cli
rsync -a ~/opencode-plugin/skills/playwright-cli/ ~/.agents/skills/playwright-cli/
rsync -a ~/opencode-plugin/skills/impeccable/ ~/.config/opencode/skills/impeccable/
rsync -a ~/opencode-plugin/plugin-skills/ ~/.config/opencode/skills/
rsync -a ~/opencode-plugin/ponytail-skills/ ~/.config/opencode/vendor/ponytail/skills/
mkdir -p ~/.config/opencode/command
rsync -a ~/opencode-plugin/command/ ~/.config/opencode/command/
```

Make sure the global OpenCode config includes an absolute `skills.paths` entry for that machine:

```json
{
  "skills": {
    "paths": ["/Users/mikkel/.opencode/skills"]
  }
}
```

For Linux servers or other usernames, replace `/Users/mikkel` with that machine's absolute home path.

The current shell disables Claude skill discovery with `OPENCODE_DISABLE_CLAUDE_CODE_SKILLS=1`; `.agents/skills` is the active shared source, not `.claude/skills`. The Impeccable duplicate locations are recorded, not deduplicated by this task. Do not infer loader precedence from their presence.

Quit and restart OpenCode after syncing skills or changing plugin config. Running sessions retain already-loaded instructions.

## Global Setup Sync

This repo is the GitHub-backed source for plugins, MCP servers, and local skills installed in the global OpenCode setup.

- Update `installed-plugins.json` and this README whenever adding, removing, or updating a global OpenCode plugin.
- Track global MCP and skill changes in `installed-plugins.json` when they are part of the OpenCode setup.
- Add or update complete skill trees under the mapped snapshot directory so the setup can be synced to other servers and laptops.
- Verify the live config at `~/.config/opencode/opencode.json` after changes.
- Standing OpenCode sync instructions require committing and pushing this repo to `origin/main` so GitHub stays synced with the live setup.

## image-downscale Installation

1. Copy the plugin source files into your OpenCode global config:

```bash
# Copy the plugin hook
cp image-downscale/src/plugins/image-downscale.ts ~/.config/opencode/plugins/

# Copy the helper library
mkdir -p ~/.config/opencode/lib
cp image-downscale/src/lib/image-downscale.ts ~/.config/opencode/lib/
```

2. Install the `sharp` dependency in your OpenCode config:

```bash
cd ~/.config/opencode
bun add sharp
```

3. Restart OpenCode. The plugin loads automatically from `~/.config/opencode/plugins/`.

## Ponytail Installation

```bash
git clone https://github.com/DietrichGebert/ponytail.git ~/.config/opencode/vendor/ponytail
mkdir -p ~/.config/opencode/command
ln -sf ~/.config/opencode/vendor/ponytail/.opencode/command/* ~/.config/opencode/command/
```

Add the absolute plugin path to `~/.config/opencode/opencode.json`:

```json
{
  "plugin": [
    "/Users/mikkel/.config/opencode/vendor/ponytail/.opencode/plugins/ponytail.mjs"
  ]
}
```

Restart OpenCode after installing or updating Ponytail.

## fcm-opencode Installation

The plugin adapter lives in the `free-coding-models` monorepo, not in the published npm package -- clone the repo to get it:

```bash
npm install -g free-coding-models
git clone --depth 1 https://github.com/vava-nessa/free-coding-models.git ~/.local/share/free-coding-models
```

Wire the checkout's package resolution to the global npm install's dependencies (chalk, etc.) and to itself (so bare `free-coding-models/...` imports resolve):

```bash
ln -sf /opt/homebrew/lib/node_modules/free-coding-models/node_modules \
  ~/.local/share/free-coding-models/node_modules
mkdir -p ~/.local/share/free-coding-models/packages/node_modules
ln -sf ../../ ~/.local/share/free-coding-models/packages/node_modules/free-coding-models
```

Symlink the adapter into OpenCode's plugins directory:

```bash
mkdir -p ~/.config/opencode/plugins
ln -sf ~/.local/share/free-coding-models/packages/fcm-opencode/index.js \
  ~/.config/opencode/plugins/fcm-opencode.js
```

Configure at least one provider API key (`GROQ_API_KEY`, `CEREBRAS_API_KEY`, `NVIDIA_API_KEY`, ...) as an env var, or run `free-coding-models` once and add a key through its Settings screen (`P`) -- it's saved to `~/.free-coding-models.json` and shared with the plugin.

Restart OpenCode, then use `/fcm` to scan and switch models, `/fcm-status` for diagnostics.

**Updating:** `git -C ~/.local/share/free-coding-models pull` (there's no npm package for this piece).

## Running Tests

```bash
cd image-downscale
bun install
bun test
```

---

## LLM Install

Paste everything below this line into your LLM coding assistant to have it install the plugin automatically.

---

You are installing a global OpenCode plugin that automatically downscales oversized uploaded images (longest side > 2000px) before sending them to the model. It uses the `experimental.chat.messages.transform` hook and depends on `sharp`.

Follow these steps exactly, in order.

### Step 1: Check for Bun

Check if Bun is installed by running:

```bash
bun --version
```

If Bun is installed, skip to Step 2.

If Bun is NOT installed, ask the user:

> "Bun is not installed. This plugin requires a JavaScript package manager. Bun is recommended because it's faster and is what OpenCode uses internally. Would you like to install Bun, or use npm instead?"

If the user wants Bun, check if the system is macOS:

```bash
uname -s
```

If macOS, check if Homebrew is installed:

```bash
brew --version
```

If Homebrew is available, ask the user:

> "You have Homebrew installed. Would you like to install Bun via Homebrew (`brew install oven-sh/bun/bun`), or via the official install script?"

If the user wants Homebrew:

```bash
brew install oven-sh/bun/bun
```

Otherwise (no Homebrew, not macOS, or user prefers the install script):

```bash
curl -fsSL https://bun.sh/install | bash
```

Then confirm it works:

```bash
bun --version
```

If the user prefers npm, use `npm` in place of `bun` for all subsequent commands (`npm install` instead of `bun add`, etc.).

### Step 2: Create the helper library

Create the file `~/.config/opencode/lib/image-downscale.ts` with this content:

```ts
import sharp from "sharp"

export const MAX_IMAGE_DIMENSION = 2000

const FORMAT_BY_MIME = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpeg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/tiff": "tiff",
} as const

type SupportedMime = keyof typeof FORMAT_BY_MIME

type FileLikePart = {
  type: string
  mime?: string
  url?: string
}

function parseDataUrl(url: string) {
  const match = url.match(/^data:([^;]+);base64,(.+)$/s)
  if (!match) return null
  return {
    mime: match[1],
    base64: match[2],
  }
}

export async function downscaleImageDataUrl(url: string, mime: string) {
  const format = FORMAT_BY_MIME[mime as SupportedMime]
  const parsed = parseDataUrl(url)
  if (!format || !parsed || parsed.mime !== mime) return url

  try {
    const input = Buffer.from(parsed.base64, "base64")
    const metadata = await sharp(input, { animated: false }).metadata()
    if ((metadata.pages ?? 1) > 1) {
      return url
    }

    const orientationSwapsDimensions = [5, 6, 7, 8].includes(metadata.orientation ?? 1)
    const width = orientationSwapsDimensions ? (metadata.height ?? 0) : (metadata.width ?? 0)
    const height = orientationSwapsDimensions ? (metadata.width ?? 0) : (metadata.height ?? 0)

    if (!width || !height || Math.max(width, height) <= MAX_IMAGE_DIMENSION) {
      return url
    }

    const resized = await sharp(input, { animated: false })
      .rotate()
      .resize({
        width: MAX_IMAGE_DIMENSION,
        height: MAX_IMAGE_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat(format)
      .toBuffer()

    return `data:${mime};base64,${resized.toString("base64")}`
  } catch {
    return url
  }
}

export async function rewriteMessageParts<T extends FileLikePart>(parts: T[]) {
  return Promise.all(
    parts.map(async (part) => {
      if (part.type !== "file") return part
      if (!part.mime?.startsWith("image/")) return part
      if (!part.url) return part

      const url = await downscaleImageDataUrl(part.url, part.mime)
      if (url === part.url) return part

      return {
        ...part,
        url,
      }
    }),
  )
}
```

### Step 3: Create the plugin hook

Create the file `~/.config/opencode/plugins/image-downscale.ts` with this content:

```ts
import type { Plugin } from "@opencode-ai/plugin"
import { rewriteMessageParts } from "../lib/image-downscale"

export const ImageDownscalePlugin: Plugin = async () => {
  return {
    "experimental.chat.messages.transform": async (_input, output) => {
      for (const message of output.messages) {
        message.parts = await rewriteMessageParts(message.parts)
      }
    },
  }
}

export default ImageDownscalePlugin
```

### Step 4: Install the dependency

Run this in the terminal:

```bash
cd ~/.config/opencode && bun add sharp
```

### Step 5: Verify

Run this to confirm both files exist and sharp is installed:

```bash
ls ~/.config/opencode/plugins/image-downscale.ts ~/.config/opencode/lib/image-downscale.ts && cd ~/.config/opencode && bun pm ls 2>/dev/null | grep sharp
```

You should see both file paths printed and `sharp` in the package list.

### Done

Restart OpenCode. The plugin will automatically downscale any uploaded image with a longest side exceeding 2000px. Images that are already small enough, animated GIFs, PDFs, and text are left unchanged.
