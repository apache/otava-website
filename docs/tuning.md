---
title: Tuning
---

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

# Tuning

Every workload has different noise characteristics and tolerance for change. Otava exposes a small set of analysis options on `otava analyze` so you can control how conservative or aggressive change point detection is for your dataset.

## Available Tuning Knobs

| Option | Default | What It Controls |
| --- | --- | --- |
| `-P`, `--p-value` | `0.001` | Maximum accepted p-value for a candidate change point |
| `--window` | `50` | Number of data points analyzed in each sliding window |
| `-M`, `--magnitude` | `0.0` | Minimum relative change in mean (`abs(new_mean / old_mean - 1.0)`) |
| `--orig-edivisive` | `false` | Uses the original unwindowed E-divisive permutation test |

### `-P`, `--p-value` (default: `0.001`)

The p-value represents the probability that a detected shift happened by random chance rather than a real difference between distributions.

- **Lower values** (e.g., `0.0001`) make detection **stricter**, requiring stronger statistical evidence and reducing false positives on noisy metrics.
- **Higher values** (e.g., `0.01` or `0.05`) make detection **more sensitive**, helping catch smaller or shorter regressions at the cost of more false alarms.

### `--window` (default: `50`)

Otava slides a fixed-size window across your time series rather than evaluating the entire history at once.

- **Larger windows** smooth out short-term noise bursts and outliers, reducing false positives. However, if a window is too large and spans multiple change points, short regressions can be dismissed as noise.
- **Smaller windows** react faster and can separate changes that happen closer together, though they are more sensitive to short-lived variance.

As a rule of thumb, keep `--window` large enough to absorb normal run-to-run noise, but short enough that it typically contains at most one change point.

### `-M`, `--magnitude` (default: `0.0`)

Even when a change is statistically significant (low p-value), it may be too small to matter operationally. `--magnitude` filters out changes whose relative mean shift is below the given threshold:

```text
abs(new_mean / old_mean - 1.0) >= magnitude
```

For example, setting `--magnitude 0.05` ignores any detected shift smaller than 5%, even if its p-value is below `--p-value`.

### `--orig-edivisive` (default: `false`)

By default, Otava uses the windowed Hunter algorithm (Student's t-test with sliding windows and weak change-point re-evaluation). Passing `--orig-edivisive` switches back to the original E-divisive permutation test without windowing. In most cases, the default algorithm is faster, deterministic, and better suited for continuous CI monitoring.

## Example: Choosing `--window`

Consider a series with three step changes at indices `50`, `100`, and `150` (`100 -> 110 -> 120 -> 130`).

With a very small window (`--window 5`), Otava reacts to short-term noise bursts, firing 5 false positives while missing or misaligning 2 of the real changes (`1 TP / 2 CM / 5 FP`):

![Detection with window size 5 showing false positives](/img/tuning/window-5.png)

Increasing the window (`--window 95`) gives Otava enough context on each side of a candidate point to ignore local noise and isolate all three step changes cleanly (`3 TP / 0 CM / 0 FP`):

![Detection with window size 95 isolating all three step changes](/img/tuning/window-95.png)
