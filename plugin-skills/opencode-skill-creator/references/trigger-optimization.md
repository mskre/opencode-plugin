# Trigger Optimization

Use this guide to measure or improve description selection, not output quality.
Read [plugin-tools.md](plugin-tools.md) before tool calls. These tools launch
OpenCode runs; agree on a bounded scope for an expensive optimization campaign.

## Eval Set

Save a JSON array of realistic requests with positive cases and adjacent
near-misses. Cover the intended task boundary rather than maximizing activations.
Use enough cases for a meaningful held-out split; around 20 is a useful starting
point, not a fixed requirement. Include short requests if they are real usage.

```json
[
  {"query": "Create an OpenCode skill for our release checklist", "should_trigger": true},
  {"query": "Run the application unit tests", "should_trigger": false}
]
```

Resolve ambiguous labels from context or a targeted question. A user review of
every query is optional when the boundary is already clear.

For an editable browser review, use [eval-review.html](../templates/eval-review.html).
Replace `__EVAL_DATA_PLACEHOLDER__` with the JSON array as a JavaScript value
(not a quoted JSON string); escape `<` as `\u003c` in the serialized JSON to
prevent script termination. HTML-escape the name and description when replacing
`__SKILL_NAME_PLACEHOLDER__` and `__SKILL_DESCRIPTION_PLACEHOLDER__`.
Write the rendered template to staging and open it with the host's browser
opener. "Export Eval Set" downloads `eval_set.json`; use the intended download,
accounting for numbered duplicate filenames, as the tool's input.

## Run and Apply

Use `skill_eval` for a single description test; `descriptionOverride` tests a
candidate without editing the root. `skill_improve_description` proposes a
revision from saved eval results. For the full loop:

```text
skill_optimize_loop({
  evalSetPath: <trigger-eval.json>,
  skillPath: <skill-directory>,
  model: <current provider/model-id>,
  maxIterations: 5
})
```

Defaults are 60% training / 40% held-out test, 3 runs per query, and up to 5
iterations. The result's `best_description` is selected using test score rather
than training score. Use the current session's actual model ID; do not hardcode
a model from an example. Report both false activations and missed activations.

Apply a candidate only if it still describes the intended scope. Report the
before/after description, measured scores, and remaining near-miss failures.
Do not claim triggering is guaranteed, or expand the skill's remit just to
raise a score. For an HTML optimization report, save the loop result and call
`skill_generate_report` with `dataPath` and `outputPath`.
