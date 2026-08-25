---
name: diagnosing-bugs
description: Use ONLY for hard, intermittent, production-only, or performance bugs whose cause is not obvious after initial inspection. Builds a reproducible feedback loop before fixing. Do not use for straightforward type, syntax, or locally obvious errors.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode autonomous workflow
---

# Diagnosing Bugs

Use this discipline for bugs where guessing is likely to waste time. Skip a phase only when the reason is explicit. Read the repository instructions and relevant project documentation before investigating.

## Protect Secrets

Commands, logs, traces, and captured requests may contain credentials or personal data. Redact them before showing or saving output. Keep credentials in environment variables.

## 1. Build A Feedback Loop

Create one command that drives the real bug path and detects the user's exact symptom. Prefer, in order:

1. A failing test at the public seam.
2. A curl or HTTP script against the running service.
3. A CLI invocation with fixture input and an output assertion.
4. A Playwright script asserting DOM, console, or network behavior.
5. A replayable captured request, event, or trace.
6. A minimal throwaway harness.
7. A seeded property or fuzz loop.
8. `git bisect run` with an automated check.
9. A differential check against a known-good version or configuration.
10. A human-in-the-loop script based on `scripts/hitl-loop.template.sh`.

Tighten the loop until it is specific, deterministic, fast, and runnable unattended. For flaky bugs, raise the reproduction rate with repetition, parallelism, controlled timing, or load.

If no red-capable loop can be built, stop and state what was attempted. Ask only for the missing environment access, redacted artifact, or permission to add temporary instrumentation.

## 2. Reproduce And Minimise

Run the loop and verify it catches the reported symptom. Shrink the input, setup, data, and steps one at a time while keeping the loop red. Every remaining element should be load-bearing.

## 3. Rank Hypotheses

Write down three to five falsifiable hypotheses. Each must predict what observable result would change if it were correct. Record the ranking in a progress update, but continue autonomously unless a decision genuinely requires the user.

## 4. Instrument

Test one prediction at a time. Prefer a debugger or REPL, then narrowly targeted logs. Tag temporary logs with a unique `[DEBUG-xxxx]` prefix so cleanup is mechanical.

For performance regressions, establish a measured baseline and use a profiler, query plan, or bisection instead of broad logging.

## 5. Fix And Lock It Down

If a correct public seam exists:

1. Turn the minimal reproduction into a failing regression test.
2. Watch it fail.
3. Apply the smallest fix.
4. Watch the regression test pass.
5. Re-run the original feedback loop.

Do not add a shallow test that cannot reproduce the real bug pattern. If the architecture exposes no correct seam, document that testing gap instead.

## 6. Clean Up

Before declaring the bug fixed:

- Re-run the original reproduction.
- Run the regression test or document why no correct seam exists.
- Remove every tagged debug statement.
- Delete throwaway artifacts that have no continuing value.
- State the root cause and why the fix addresses it.
