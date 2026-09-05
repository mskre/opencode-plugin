---
name: ponytail-gain
description: Show the published Ponytail benchmark scoreboard when asked for Ponytail gains, savings, or /ponytail-gain. Not a per-repository estimate.
---

# Ponytail Gain

Display the older single-shot benchmark medians: five tasks (email validator,
debounce, CSV sum, countdown timer, rate limiter), three models (Haiku, Sonnet,
Opus). Source: the vendor repository's `benchmarks/` and README's older
single-shot results. These are not the newer agentic benchmark averages.

```text
ponytail gain                 single-shot medians | 5 tasks | 3 models

Lines of code  no-skill  ####################  100%
                ponytail  #---................    6-20%  reduction 80-94%
Cost           no-skill  ####################  100%
                ponytail  #####------.........   23-53%  reduction 47-77%
Speed           ponytail  3-6x faster

Bars: # lower bound, - range to upper bound, . remainder (approximate).
This repo: /ponytail-debt (counted deferrals), /ponytail-audit (possible cuts).
```

Preserve the exact labels; bars only approximate the ranges. Do not present
these figures as current-repo savings or universal results: no unbuilt baseline
exists to subtract from. The published README notes conversational-baseline
effects in these older results. A debt count is not measured savings either.

One-shot display. Edit nothing, write no flag files, and change no mode.
