#!/usr/bin/env node
// Headless screenshot harness for THIS machine.
//
// Why this exists: the MCP Playwright / Accessibility-scanner browser tools are
// pinned to channel "chrome", which is not installed here. Instead of fighting
// them, drive the bundled Chromium-for-Testing directly. This script self-locates
// both the browser binary and a playwright module, so it runs from anywhere.
//
// Usage:
//   node shot.mjs <url> [outDir] [locales] [widths]
// Examples:
//   node shot.mjs http://localhost:3939
//   node shot.mjs http://localhost:3939 /tmp/shots nb-NO,en-US 360,390,1440
//
// Output: <outDir>/<locale>-<width>.png  (full page, reveal animations triggered)

import { readdirSync, statSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";

const HOME = os.homedir();
const url = process.argv[2];
if (!url) {
  console.error("usage: node shot.mjs <url> [outDir] [locales] [widths]");
  process.exit(1);
}
const outDir = process.argv[3] || "/tmp/shots";
const locales = (process.argv[4] || "en-US").split(",").filter(Boolean);
const widths = (process.argv[5] || "390,1440").split(",").map(Number).filter(Boolean);

// Find a playwright module in the npx cache (ESM ignores NODE_PATH, so import by abs path).
function findPlaywright() {
  const base = join(HOME, ".npm/_npx");
  if (!existsSync(base)) return null;
  for (const d of readdirSync(base)) {
    const p = join(base, d, "node_modules/playwright/index.js");
    if (existsSync(p)) return p;
  }
  return null;
}

// Find the Chromium-for-Testing executable (version dir moves over time).
function findChromium() {
  const base = join(HOME, "Library/Caches/ms-playwright");
  if (!existsSync(base)) return null;
  const dirs = readdirSync(base)
    .filter((n) => n.startsWith("chromium-") && !n.includes("headless"))
    .sort()
    .reverse();
  for (const d of dirs) {
    for (const m of ["chrome-mac-arm64", "chrome-mac"]) {
      const appBase = join(base, d, m);
      if (!existsSync(appBase)) continue;
      for (const app of readdirSync(appBase)) {
        if (!app.endsWith(".app")) continue;
        const macos = join(appBase, app, "Contents/MacOS");
        if (!existsSync(macos)) continue;
        for (const bin of readdirSync(macos)) {
          const full = join(macos, bin);
          try {
            if (statSync(full).isFile()) return full;
          } catch {}
        }
      }
    }
  }
  return null;
}

const pwPath = findPlaywright();
if (!pwPath) {
  console.error("No playwright found under ~/.npm/_npx/*/node_modules. Run any MCP browser tool once, or `npx playwright`.");
  process.exit(1);
}
const exe = findChromium();
const pw = await import(pwPath);
const chromium = pw.chromium ?? pw.default?.chromium;
if (!chromium) {
  console.error("playwright loaded but no chromium export found at", pwPath);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
for (const locale of locales) {
  for (const width of widths) {
    const mobile = width < 700;
    const ctx = await browser.newContext({
      viewport: { width, height: mobile ? 850 : 900 },
      deviceScaleFactor: 2,
      isMobile: mobile,
      locale,
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => console.log("nav warn:", e.message));
    // Trigger scroll-reveal animations (framer-motion whileInView with opacity:0
    // won't fire during a fullPage capture -> sections look like an empty void).
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 250) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const file = join(outDir, `${locale}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log("shot", file);
    await ctx.close();
  }
}
await browser.close();
console.log(`done -> ${outDir}`);
