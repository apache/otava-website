---
title: Overview
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

# Overview

Monitoring a software system's performance is critical to maintaining it, and that performance depends not only on the system itself, but also on the environment around it. While performance tests help ensure a system stays fast over time, simply running a set of tests still leaves a gap in how to analyze their output. Apache Otava (incubating) was built to solve this problem using continuous change point detection to isolate real regressions and pinpoint when they were introduced.

Detecting a performance regression may seem trivial, but consider the example below:

Suppose we track **p99 latency** (in milliseconds) across our performance tests. In practice, latency naturally fluctuates due to round-trip times between external services and other environmental factors. This variance is healthy. Nothing about the system's underlying performance has actually changed, so we do not want to trigger an alert:

![Healthy p99 latency variance with no regression](/img/overview/no-regression.png)

In the second chart below, we see similar noisy data, except there is a small step increase at **index 100** before the series settles back into a comparable level of variance at a higher baseline:

![p99 latency showing a regression at index 100](/img/overview/regression.png)

To the human eye, it is clear that something changed at index 100. Simple heuristics struggle here: a point-to-point derivative or a static threshold (such as alerting above 120 ms) fires false alarms on the healthy spikes in the first chart while struggling to separate a ~20 ms shift from normal noise, and a moving average blurs which exact run introduced the regression. Otava compares the distributions of runs before and after each candidate point so it can ignore healthy millisecond-level variance and pinpoint index 100.

## Key Features

- **Statistical Change Point Detection:** Isolates statistically significant shifts in noisy time-series data rather than relying on brittle static thresholds. See [Change Point Detection](math.md) for how the algorithm works, or try it interactively in the [Otava Playground](http://playground.otava.apache.org/).
- **Tunable Detection Sensitivity:** Adjust parameters such as window length and p-value thresholds to backtest historical metrics and tailor sensitivity to your workload. See [Tuning](tuning.md).
- **Flexible Data Sources:** Reads test metrics directly from [CSV](csv.md), [Graphite](graphite.md), [PostgreSQL](postgresql.md), [BigQuery](big-query.md), and [InfluxDB](influxdb.md).
- **CI & Feature Branch Workflows:** Run analyses from the CLI or Docker to validate feature branches and catch regressions before they land. See [Quick Start](getting-started.md) and [Basics](basics.md).
- **Grafana Integration:** Automatically annotate detected change points on your dashboards. See [Grafana](grafana.md).

<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
  <a href="/docs/getting-started" className="button button--primary button--lg" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Get Started</a>
  <a href="/docs/math" className="button button--secondary button--lg" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>How It Works</a>
</div>
