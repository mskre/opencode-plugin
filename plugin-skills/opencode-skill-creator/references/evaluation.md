# Output Evaluation

Use this guide for requested output tests, benchmarks, or version comparisons.
For trigger tests use [trigger-optimization.md](trigger-optimization.md).
Tool arguments are in [plugin-tools.md](plugin-tools.md); JSON formats are in
[schemas.md](schemas.md).

## Prepare and Run

Choose realistic prompts covering the changed behavior and useful edge cases.
Reuse suitable existing evals. Save `evals/evals.json` with `skill_name` and
`evals[]`: `id`, `prompt`, `expected_output`, optional `files`, and `expectations`
(verifiable statements). Do not substitute `assertions` for `expectations` here.
Use qualitative judgment for subjective outcomes instead of artificial scores.

Keep results in a sibling `<skill-name>-workspace/iteration-N/` in staging.
For comparisons, preserve the old skill before editing and use the same prompt,
inputs, model, and conditions for both configurations. Isolate runs so baseline
agents do not inherit the candidate skill or each other's outputs.

```text
iteration-N/
  eval-<ID>-<descriptive-name>/
    eval_metadata.json
    with_skill/
      run-1/
        outputs/
        grading.json
        timing.json
    without_skill/       # new skill baseline; old_skill/ for version comparison
      run-1/
        outputs/
        grading.json
        timing.json
```

Use `run-N/` even for one run: the 0.2.20 aggregator ignores flat configuration
directories, although the review guard accepts them. Keep eval metadata at the
eval root for aggregation; include the same metadata in each run directory for
the viewer, whose lookup checks the run and its immediate parent.

`eval_metadata.json` uses `eval_id`, `eval_name`, `prompt`, and `assertions`.
Copy the eval's expectation statements into that metadata field.

When a Task tool is available, use independent `general` tasks for each run,
parallelizing paired runs where supported. Supply the skill path (omit for the
no-skill baseline), prompt, input files, output directory, and required artifacts.
Without an isolated runner, report that a valid model comparison could not run.

Capture transcripts and real metrics. If completion notifications provide
`total_tokens` and `duration_ms`, save them immediately in `timing.json` with
`total_duration_seconds = duration_ms / 1000`. Do not invent missing timing or
token values; flag missing data when interpreting aggregates.

## Grade and Compare

Read [grader.md](../agents/grader.md) when grading. Verify outputs, not just
executor claims. Each `grading.json` expectation uses exactly `text`, `passed`,
and `evidence`; `summary` contains passed/failed/total and pass_rate. Use runnable
checks for deterministic assertions. Preserve the schema's optional metrics,
claims, user notes, and eval feedback when available.

Call `skill_aggregate_benchmark` with `benchmarkDir` and optional `skillName` and
`skillPath`. It writes `benchmark.json` and `benchmark.md`, including mean,
standard deviation, and deltas for pass rate, time, and tokens. Inspect individual
runs for missing data and variance before interpreting the summary. Keep the
with-skill configuration before its baseline in manually assembled comparisons.
In 0.2.20, automatic deltas subtract the second discovered configuration from
the first (alphabetical directory traversal); with `old_skill`, this reverses
the usual candidate-minus-baseline direction. Label the actual direction.
The aggregator may use `execution_metrics.output_chars` as a token fallback,
and skips reading `timing.json` if grading already supplies nonzero duration.
Verify reported tokens against captured totals; label proxies or missing values
rather than presenting them as measured usage. See the schema's calculation notes.
Read [analyzer.md](../agents/analyzer.md#analyzing-benchmark-results) for a deeper
benchmark analysis; do not infer causes from aggregate numbers alone.

For requested blind A/B comparisons, use an independent task following
[comparator.md](../agents/comparator.md), with outputs labeled A/B and no skill
identity. Analyze the skills and transcripts only after judgment. Preserve the
comparator's scoring and JSON contract.

## Optional Human Review

Open the plugin viewer when visual review or user feedback is useful. Review is
not required before applying an otherwise well-specified change.

Call `skill_serve_review` with `workspace`, `skillName`, `benchmarkPath`, and
`allowPartial: false`. For later iterations, supply `previousWorkspace`.
Omitting `benchmarkPath` makes the tool generate the benchmark automatically.
The tool requires `with_skill` plus `without_skill` or `old_skill` outputs per
eval. Use `allowPartial: true` only with explicit user acceptance of incomplete
comparisons; describe the gaps rather than presenting a paired benchmark.

For headless review, call `skill_export_static_review` with the same review
arguments and required `outputPath`. Use the bundled viewer, not custom HTML.
The Outputs tab shows artifacts, grades, and feedback; Benchmark shows metrics.
"Submit All Reviews" saves `feedback.json`; static review downloads it, so place
the intended download in the workspace before reading it.

Read submitted feedback from `reviews[]` (`run_id`, `feedback`, `timestamp`) and
`status`. Blank feedback is not proof that a review occurred. Stop your viewer
with `skill_stop_review({workspace})` when finished. If another iteration is
useful, fix the observed failure pattern and rerun affected cases and comparisons
in a new iteration directory. Do not require an indefinite review loop.
