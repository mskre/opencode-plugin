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
