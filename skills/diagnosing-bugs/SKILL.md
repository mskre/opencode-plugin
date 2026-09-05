---
name: diagnosing-bugs
description: Use for difficult, intermittent, production-only, or performance bugs still unexplained after inspection; not obvious local errors.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode autonomous workflow
---

# Diagnosing Bugs

Use the steps needed to distinguish causes; skip work already settled by evidence.

## Protect Secrets

Commands, logs, traces, and captured requests may contain credentials or personal data. Redact them before showing or saving output. Keep credentials in environment variables.

## 1. Build A Feedback Loop

Prefer a failing public-interface test. Otherwise use a replayable HTTP, CLI, browser, or trace check that detects the exact symptom. Use `scripts/hitl-loop.template.sh` when reproduction needs human input; use bisection or a known-good comparison when useful.

Tighten the loop until it is specific, deterministic, fast, and runnable unattended. For flaky bugs, raise the reproduction rate with repetition, parallelism, controlled timing, or load.

If reproduction is unavailable, continue safe inspection or targeted instrumentation and label conclusions provisional. Ask only for access, a redacted artifact, or permission actually needed; do not claim a verified fix without evidence. Do not run mutating or load-generating production checks without authorization.

## 2. Reproduce And Minimise

Verify the loop catches the reported symptom. Reduce inputs and setup when that helps isolate the cause, keeping the loop red.

## 3. Rank Hypotheses

Rank plausible causes and test their distinguishing predictions. Do not invent extra hypotheses once evidence isolates the cause.

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
