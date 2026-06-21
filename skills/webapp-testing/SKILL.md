---
name: webapp-testing
description: Use when testing websites or web apps with browser automation, Playwright, Chrome DevTools, accessibility checks, responsive behavior, console logs, network requests, or end-to-end user flows.
---

# Webapp Testing

Use this skill to verify web applications as a user would experience them, not just by reading code.

## Test Strategy

- Start with the critical user flow, then cover edge states and regressions.
- Run the project's existing test, lint, and build commands when available.
- Use browser automation for UI behavior, responsive layouts, forms, navigation, auth flows, and visual regressions.
- Check console errors and failed network requests before declaring success.
- Include mobile viewport checks for new or changed UI.
- Include keyboard navigation and basic accessibility checks for interactive components.

## Browser Tooling

- Use Playwright or Chrome DevTools MCP when enabled for the session.
- Keep MCP browser servers disabled by default in OpenCode config; enable only when the session needs them.
- Prefer isolated browser profiles for testing so personal cookies and extensions do not affect results.
- Capture screenshots only when they help diagnose layout or visual issues.

## Manual Checklist

- Page loads without runtime errors.
- Main route and changed routes render on desktop and mobile.
- Forms validate bad input and handle success/failure states.
- Loading, empty, and error states are visible and understandable.
- Interactive elements have accessible names and keyboard focus states.
- Network calls use the expected endpoints and handle non-2xx responses.
- No obvious layout overflow, clipped text, or invisible contrast failures.

## Reporting

- Report what was tested, what passed, and what remains untested.
- Include exact commands and browser/MCP checks used.
- If a test cannot run, state the blocker and the next best verification path.
