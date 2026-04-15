# OpenCode Plugins

A collection of local plugins for [OpenCode](https://opencode.ai).

## Plugins

### [image-downscale](./image-downscale)

Automatically downscales oversized uploaded images so the longest side is at most 2000px. Leaves text, PDFs, animated GIFs, and small images unchanged. Fails open on errors -- if an image can't be processed, it passes through unmodified.

**Supported formats:** PNG, JPEG, WebP, GIF (static only), AVIF, TIFF

## Installation

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

If the user wants Bun, install it:

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
