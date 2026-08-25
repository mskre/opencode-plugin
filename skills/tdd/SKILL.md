---
name: tdd
description: Use when the user explicitly requests test-first development, red-green-refactor, TDD, or integration tests. Implements one behavior slice at a time through public interfaces.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode autonomous workflow
---

# Test-Driven Development

TDD is a red-green loop. Work in vertical slices: one behavior, one failing test, and the minimum implementation that passes it.

## Test Public Behavior

Tests should verify behavior through a public interface, not implementation details. A useful test reads like a capability and survives internal refactoring. See `tests.md` and `mocking.md` for examples.

Choose the narrowest public seam that proves the requested behavior. Infer it from the specification and codebase. Ask the user only when multiple seams would create materially different product behavior or maintenance costs.

## Avoid These Tests

- Implementation-coupled tests that mock internal collaborators or test private methods.
- Tautological tests whose expected value repeats the implementation.
- Snapshot tests used instead of a specific behavioral assertion.
- Horizontal batches where all tests are written before any implementation.

## Loop

1. Write one test for one observable behavior.
2. Run it and confirm it fails for the expected reason.
3. Write only enough production code to pass it.
4. Run it and confirm it passes.
5. Repeat for the next behavior.

Do not anticipate speculative cases. Refactor only when the passing implementation has concrete duplication or clarity problems.
