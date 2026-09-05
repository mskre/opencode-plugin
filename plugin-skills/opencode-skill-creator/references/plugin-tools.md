# Creator Plugin Tools

Read this only when using plugin tools. These signatures reflect the installed
0.2.20 plugin; the live tool schema is authoritative. A listed tool may not be
exposed in the current session. Do not invent a call or silently install a plugin
to compensate. Paths identify directories unless a filename is specified.

In the table, `?` denotes an optional argument. Paths, names, descriptions,
model IDs, and agent IDs are strings; counts, thresholds, and timeouts are
numbers; `allowPartial` and `autoRefresh` are booleans.

| Tool | Arguments | Result or effect |
| --- | --- | --- |
| `skill_validate` | `skillPath` | Structure/frontmatter validation |
| `skill_parse` | `skillPath` | `name`, `description`, `content`, `contentLength` |
| `skill_eval` | `evalSetPath`, `skillPath`, `descriptionOverride?`, `numWorkers?`, `timeout?`, `runsPerQuery?`, `triggerThreshold?`, `model?`, `agent?` | Trigger pass/fail results from OpenCode runs |
| `skill_improve_description` | `skillPath`, `evalResultsPath`, `historyPath?`, `model?`, `logDir?`, `iteration?` | Proposed `description`, `charCount` |
| `skill_optimize_loop` | `evalSetPath`, `skillPath`, `descriptionOverride?`, `maxIterations?`, `numWorkers?`, `timeout?`, `runsPerQuery?`, `triggerThreshold?`, `holdout?`, `model?`, `agent?`, `liveReportPath?`, `logDir?` | Iteration results and `best_description` |
| `skill_aggregate_benchmark` | `benchmarkDir`, `skillName?`, `skillPath?`, `outputPath?`, `markdownPath?` | Writes benchmark JSON and Markdown; returns paths and summary |
| `skill_generate_report` | `dataPath`, `outputPath`, `skillName?`, `autoRefresh?` | Writes optimization HTML report |
| `skill_serve_review` | `workspace`, `port?`, `skillName?`, `previousWorkspace?`, `benchmarkPath?`, `allowPartial?` | Starts server, opens browser, returns URL, feedback path, benchmark path, workflow guard |
| `skill_stop_review` | `workspace?` | Stops that workspace's server; omitted workspace stops all |
| `skill_export_static_review` | `workspace`, `outputPath`, `skillName?`, `previousWorkspace?`, `benchmarkPath?`, `allowPartial?` | Writes standalone review HTML and returns path and workflow guard |

Trigger defaults: `numWorkers: 10`, `timeout: 30` seconds, `runsPerQuery: 3`,
`triggerThreshold: 0.5`, `agent: "build"`. Loop-only defaults:
`maxIterations: 5`, `holdout: 0.4`. Optional `model` uses `provider/model` format.

The creator validator rejects frontmatter keys outside `name`, `description`,
`license`, `allowed-tools`, `metadata`, and `compatibility`. A host-specific
field such as Ponytail's existing `argument-hint` may therefore fail this
validator even when the host loads it. Report that distinction; do not remove a
command-contract field just to satisfy a narrower validator.

Aggregation writes `<benchmarkDir>/benchmark.json` and `benchmark.md` unless
overridden. The viewer uses port 3117 and `allowPartial: false` by default.
Without `benchmarkPath`, review tools generate the benchmark first. Both review
tools enforce paired outputs; explicit user acceptance is required to use
`allowPartial: true`. `autoRefresh` defaults to false for optimization reports.

## Optional Gold Standards

Only use these when managing durable description examples, not during ordinary
skill edits. Add/remove mutate the plugin's saved collection.

| Tool | Arguments | Result |
| --- | --- | --- |
| `skill_add_gold_standard` | `skillName`, `description`, numeric `passRate` (0-1), `notes?` | Saved example |
| `skill_list_gold_standards` | none | Saved examples |
| `skill_remove_gold_standard` | `id` | `removed` |
| `skill_get_gold_advice` | none | Formatted `advice` |

Get explicit approval before deleting a saved example or any other irreversible
action. Do not invent pass rates for gold standards.
