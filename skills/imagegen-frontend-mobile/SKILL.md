---
name: imagegen-frontend-mobile
description: Use only when the user asks for mobile app screen or flow images and a real image-generation tool is available. Produces platform-aware visual concepts, not code or implementation files.
compatibility: Requires a real image-generation tool; text-only output must not be presented as generated imagery.
---

# Mobile screen image direction

Check the image-generation capability first. If it is absent, state the blocker and stop. Do not simulate calls, substitute stock assets, or claim files. Do not write SwiftUI, React Native, Flutter, HTML, or implementation instructions.

Choose one dominant platform feel (iOS, Android, or neutral cross-platform) and keep it consistent. Infer the flow and generate the requested number of distinct screens; use a fresh standalone detail render when a screen is unreadable rather than cropping a collage. Present a clean, consistent phone frame by default, unless raw screens are requested. Keep the app content more prominent than the device.

## Design checks

Make the first screen focused, readable, and touch-aware. Respect status bars, safe areas, bottom navigation, sheets, and home-indicator space. Keep the flow believable: onboarding→auth→home, browse→detail→cart, or another path implied by the brief. Carry the same palette, type hierarchy, radius, icons, media crops, and surface language across screens while varying composition by screen purpose.

Use imagery or texture when it gives the product meaning; protect copy with scrims or fades. Prefer fewer stronger surfaces over nested cards, fake charts, filler badges, tiny labels, website-like layouts, generic purple-blue gradients, and random decorative icons. Keep copy short and legible. Treat accessibility as visual direction: contrast, clear hierarchy, and no essential information conveyed only by color.

## Optional direction bank

Platform cues: iOS can favor safe-area breathing room, restrained chrome, tab bars, and sheets; Android can favor clearer app bars, bottom navigation, and firmer list/sheet structure; neutral mode should use familiar patterns without platform ornament. Category cues: fintech needs transaction clarity, health needs calm metrics, productivity needs task hierarchy, social needs profile/feed rhythm, commerce needs stable product imagery and browse→detail→checkout flow, and lifestyle apps can use richer editorial imagery. Image treatments may include photography-led onboarding, a masked image header, product crops, collection shelves, or atmospheric backgrounds; use only what serves the category and keeps copy readable.

Return only the generated screen image set and concise labels. Say when the tool is unavailable; never imply generation without a tool result.
