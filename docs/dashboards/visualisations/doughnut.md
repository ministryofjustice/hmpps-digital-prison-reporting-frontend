---
layout: layouts/dashboards.njk
title: Doughnut chart
subsection: Visualisation definition
phase: Beta
---

<img src="/assets/images/charts/doughnut/Pie2.png" alt="" width="700" style="margin-bottom: 30px"/>

The `doughnut` chart visualisation type represents data as a matrix/heatmap chart visualisation.

- [When to use](#when-to-use)
- [When not to use](#when-not-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use a pie chart when you want to show how individual categories contribute to a single whole. Pie charts work best when the goal is to communicate proportions, share, or relative distribution at a glance.
Choose a pie chart when:

- Your data represents parts of a whole, and the total is meaningful (e.g., 100%, total revenue, total population).
- You have a small number of categories — ideally 3–5 — so each slice is easy to distinguish.
- You want to highlight the largest or smallest contributors in a dataset.
- The general proportion matters more than precise comparison, as pies emphasize broad shares rather than exact values.
- You need a simple, visual snapshot of how something is divided.

Pie charts are especially effective when clarity of overall composition is more important than detailed numerical comparison.

<hr class='dpr-docs-hr'/>

# When not to use

Avoid using a pie chart when:

- You need to compare values precisely — pie slices make exact comparisons difficult; bar charts are clearer.
- There are many categories or slices — anything above 5–6 segments becomes cluttered and hard to read.
- The values are similar in size, making slice differences nearly impossible to distinguish.
- You want to show changes over time — use a line or bar chart instead of multiple pie charts.
- Negative values are present, as pie charts can only represent positive proportions of a whole.
- The data doesn’t sum to a meaningful whole (e.g., independent metrics) — a pie chart implies parts of a single total.
- Your categories don’t represent parts of a whole, but stand‑alone values better shown in a bar chart.
- You need to compare multiple datasets — pie charts don’t scale well for side‑by‑side comparison.
- Order matters, such as progression or ranking — pie charts don’t convey sequence.

<hr class='dpr-docs-hr'/>

# How it works

TBD

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'id',
  type: 'doughnut',
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
