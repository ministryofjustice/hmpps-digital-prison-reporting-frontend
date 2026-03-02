---
layout: layouts/dashboards.njk
title: Line timeseries chart
subsection: Visualisation definition
phase: Experimental
phaseText: 'This feature is experimental and may be unstable. You can try it, but be aware that issues and changes are likely'
---

<img src="/assets/images/charts/line/Line-timeseries1.png" alt="" width="700" style="margin-bottom: 30px"/>

The `line-timeseries` chart visualisation type represents data as a line chart showing historic data.

- [When to use](#when-to-use)
- [When not to use](#when-not-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use a line‑timeseries chart when you need to show how a value changes over time. This chart type emphasizes trends, cycles, seasonality, and long‑term movement, making it ideal for temporal datasets.
Choose a line‑timeseries chart when:

- Your data represents values over time (e.g., days, weeks, months, years).
- You want to highlight temporal trends, such as growth, decline, volatility, or periodic patterns.
- Time order is crucial, and the spacing or frequency of data points matters.
- You’re comparing multiple time‑based series, such as performance metrics or daily counts.
- You have many data points, and other chart types would become cluttered.

Use a line‑timeseries chart when helping users understand how something evolves or behaves through time.

<hr class='dpr-docs-hr'/>

# When not to use

Avoid using a line‑timeseries chart when:

- The data isn’t related to time — use a standard line chart or another type entirely.
- Time intervals are inconsistent or categorical (e.g., “Phase 1, Phase 2”), which breaks the assumption of temporal continuity.
- You need to compare single points in time rather than trends — a bar or column chart works better.
- Your dataset has only a couple of timestamps, not enough to show a meaningful trend.
- You’re dealing with non‑continuous or event‑based timelines, where a dot plot, scatter, or bar chart may be clearer.
- Precision on individual values matters more than overall trend, as line charts can obscure exact readings.

<hr class='dpr-docs-hr'/>

# How it works

TBD

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'id',
  type: 'line-timeseries',
  display: 'name',
  description: 'description',
  column: {
    ...
  }
}
```

See the [Targeting data](/dashboards/visualisations/visualisation-dataset) for and how to target data with the `column`

<hr class='dpr-docs-hr'/>

# Examples

- [Example 1](#example-1)
- [Example 2](#example-2)

### Example Dataset

```js

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/25 |          |       |       | Drugs       | 17    |
| 2025/02/25 |          |       |       | Phones      | 22    |
| 2025/02/25 |          |       |       | Weapons     | 26    |
| 2025/02/25 |          |       |       | Alcohol     | 16    |
```

<hr class='dpr-docs-hr'/>

# Example 1

TBD

### Definition

```js
{
  id: 'example-1',
  type: 'vis-type',
  display: 'Example definition',
  description: 'Example definition description',
  option: {},
  column: {
    key: [],
    measure: [],
    filter: []
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

```js

```

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

<hr class='dpr-docs-hr'/>

### Visualisation

<img src="/assets/images/barExample1.png" alt="" width="500"/>

<hr class='dpr-docs-hr'/>

# Example 2

TBD

### Definition

```js
{
  id: 'example-1',
  type: 'vis-type',
  display: 'Example definition',
  description: 'Example definition description',
  option: {},
  column: {
    key: [],
    measure: [],
    filter: []
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

```js

```

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

<hr class='dpr-docs-hr'/>

### Visualisation

<img src="../../assets/images/barExample1.png" alt="" width="500"/>
