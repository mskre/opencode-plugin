---
name: tdd
description: Use only when the user explicitly requests TDD, test-first, red-green-refactor, or integration tests; tests public behavior in vertical slices.
license: MIT
metadata:
  source: https://github.com/mattpocock/skills
  adapted-for: OpenCode autonomous workflow
---

# Test-Driven Development

TDD is a red-green loop. Work in vertical slices: one behavior, one failing test, and the minimum implementation that passes it.

## Test Public Behavior

Tests should verify behavior through a public interface, not implementation details, and survive internal refactoring.

Choose the narrowest public seam that proves the requested behavior from the specification and codebase. Ask only about unresolved product decisions. Load `tests.md` or `mocking.md` when test design or isolation needs guidance.

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

For integration-test-only requests, test existing behavior without forcing production changes; verify the test detects a controlled failure when feasible. Refactor after green only for concrete duplication or clarity problems, then rerun affected tests. Do not anticipate speculative cases.
