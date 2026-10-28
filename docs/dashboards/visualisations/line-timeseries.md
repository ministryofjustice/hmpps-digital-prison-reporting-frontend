---
layout: layouts/dashboards.njk
title: Line timeseries chart
subsection: Visualisation definition
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

Use a `line‑timeseries` chart when you need to show how a value changes over time. This chart type emphasizes trends, cycles, seasonality, and long‑term movement, making it ideal for temporal datasets.
Choose a line‑timeseries chart when:

- Your data represents values over time (e.g., days, weeks, months, years).
- You want to highlight temporal trends, such as growth, decline, volatility, or periodic patterns.
- Time order is crucial, and the spacing or frequency of data points matters.
- You’re comparing multiple time‑based series, such as performance metrics or daily counts.
- You have many data points, and other chart types would become cluttered.

Use a line‑timeseries chart when helping users understand how something evolves or behaves through time.

<hr class='dpr-docs-hr'/>

# When not to use

Avoid using a `line‑timeseries` chart when:

- The data isn’t related to time - use a standard line chart or another type entirely.
- Time intervals are inconsistent or categorical (e.g., “Phase 1, Phase 2”), which breaks the assumption of temporal continuity.
- You need to compare single points in time rather than trends - a bar or column chart works better.
- Your dataset has only a couple of timestamps, not enough to show a meaningful trend.
- You’re dealing with non‑continuous or event‑based timelines, where a dot plot, scatter, or bar chart may be clearer.
- Precision on individual values matters more than overall trend, as line charts can obscure exact readings.

<hr class='dpr-docs-hr'/>

# How it works

- **Line‑timeseries charts detect partial time periods** (e.g., the first or last month in a range that isn’t a full month).
- **Partial periods are shown with a dotted line** to distinguish them from complete data.
- This indicates that **these values don’t represent a full time unit** at the chosen granularity.
- **Standard line charts don’t handle partial dates**, so all points appear as fully complete.

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

See the [Targeting data](/dashboards/visualisations/visualisation-dataset) for and how to target data with the `column` field

<hr class='dpr-docs-hr'/>

# Data assumptions

- Ensure that your <strong>measure</strong> array in the definition includes an item of `type` of `timestamp` when specifying a timestamp measure.
- The `timestamp` date format must be one of the following, depending on the granularity of the line chart desired:
  -  `YYYY-MM-DD` for daily granularity (e.g `2024-01-18`)
  -  `YYYY-MM` for monthly granularity (e.g `2024-01`)
  -  `YYYY` for annual granularity (eg. `2024`)

<hr class='dpr-docs-hr'/>

# Examples

- [Daily Granularity](#daily-granularity)
- [Monthly Granularity](#monthly-granularity)
- [Yearly Granularity](#monthly-granularity)

<hr class='dpr-docs-hr'/>

# Daily Granularity

This example demonstrates how are `line-timeseries` chart is visualised using data in day format (`YYYY-MM-DD`)

### Dataset

| ts         | establishment_id | has_metric_one | metric_one_is_missing | has_metric_two |
|------------|------------------|----------------|-----------------------|----------------|
| 2026-01-01 | ABC              | 126            | 479                   | 733            |
| 2026-01-02 | ABC              | 92            | 521                   | null            |
| 2026-01-03 | ABC              | 455            | 508                   | 488            |
| 2026-01-04 | ABC              | 182            | 238                   | 651            |
| 2026-01-05 | ABC              | 579            | 445                   | 548            |
| 2026-01-06 | ABC              | 599            | 361                   | 716            |
| 2026-01-07 | ABC              | 613            | 48                   | 766            |
| 2026-01-08 | ABC              | 170            | 481                   | 377            |
| 2026-01-09 | ABC              | 594            | 614                   | 311            |
| 2026-01-10 | ABC              | 78            | 217                   | 628            |
| 2026-01-11 | ABC              | 353            | 340                   | 491            |
| 2026-01-12 | ABC              | 358            | 772                   | 242            |
| 2026-01-13 | ABC              | 36            | 151                   | 496            |
| 2026-01-14 | ABC              | 78            | 270                   | 736            |
| 2026-01-15 | ABC              | 638            | 424                   | 628            |
...omitted rows

### Definition

```js
{
  id: 'lineTimeseriesExample1',
  type: 'line-timeseries',
  display: 'Missing MetricOne timeseries chart',
  description: 'Total of missing metric one - daily',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'metric_one_is_missing',
        display: 'Has no MetricOne',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| Date       | | establishment_id | Has no MetricOne |
|------------|--------------------|------------------|
| 2026-01-01 | ABC                | 479              |
| 2026-01-02 | ABC                | 521              |
| 2026-01-03 | ABC                | 508              |
| 2026-01-04 | ABC                | 238              |
| 2026-01-05 | ABC                | 445              |
| 2026-01-06 | ABC                | 361              |
| 2026-01-07 | ABC                | 48               |
| 2026-01-08 | ABC                | 481              |
| 2026-01-09 | ABC                | 614              |
| 2026-01-10 | ABC                | 217              |
| 2026-01-11 | ABC                | 340              |
| 2026-01-12 | ABC                | 772              |
| 2026-01-13 | ABC                | 151              |
| 2026-01-14 | ABC                | 270              |
| 2026-01-15 | ABC                | 424              |
...omitted rows

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/line-timeseries/chart-0-chromium-linux.png" alt="line-timeseries chart example showing daily granularity"/>

<hr class='dpr-docs-hr'/>

# Monthly Granularity

This example demonstrates how are `line-timeseries` chart is visualised using data in month format (`YYYY-MM`)

### Dataset

| ts      | establishment_id | has_metric_one | metric_one_is_missing | has_metric_two | metric_two_is_missing |
|---------|------------------|----------------|-----------------------|----------------|-----------------------|
| 2025-08 | ABC              | 424            | 781                   | 459            | 528                   |
| 2025-08 | GHI              | 761            | 610                   | 734            | 785                   |
| 2025-08 | DEF              | 401            | 499                   | 611            | 524                   |
| 2025-09 | ABC              | 733            | 514                   | 573            | 554                   |
| 2025-09 | GHI              | 559            | 518                   | 453            | 758                   |
| 2025-09 | DEF              | 656            | 521                   | 659            | 531                   |
| 2025-10 | ABC              | 738            | 598                   | 638            | 417                   |
| 2025-10 | GHI              | 692            | 676                   | 758            | 521                   |
| 2025-10 | DEF              | 665            | 687                   | 556            | 615                   |
| 2025-11 | ABC              | 479            | 522                   | 471            | 546                   |
| 2025-11 | GHI              | 635            | 790                   | 581            | 660                   |
| 2025-11 | DEF              | 482            | 713                   | 707            | 751                   |
| 2025-12 | ABC              | 467            | 431                   | 584            | 605                   |
| 2025-12 | GHI              | 577            | 536                   | 524            | 664                   |
| 2025-12 | DEF              | 660            | 590                   | 529            | 708                   |
...omitted rows

### Definition

```js
{
  id: 'lineTimeseriesExample2',
  type: 'line-timeseries'
  display: 'Missing MetricOne timeseries chart',
  description: 'totals for missing MetricOne for multiple establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'metric_two_is_missing',
        display: 'Has no MetricTwo',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts      | establishment_id | metric_two_is_missing |
|---------|------------------|-----------------------|
| 2025-08 | ABC              | 528                   |
| 2025-08 | GHI              | 785                   |
| 2025-08 | DEF              | 524                   |
| 2025-09 | ABC              | 554                   |
| 2025-09 | GHI              | 758                   |
| 2025-09 | DEF              | 531                   |
| 2025-10 | ABC              | 417                   |
| 2025-10 | GHI              | 521                   |
| 2025-10 | DEF              | 615                   |
| 2025-11 | ABC              | 546                   |
| 2025-11 | GHI              | 660                   |
| 2025-11 | DEF              | 751                   |
| 2025-12 | ABC              | 605                   |
| 2025-12 | GHI              | 664                   |
| 2025-12 | DEF              | 708                   |

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/line-timeseries/chart-4-chromium-linux.png" alt="line-timeseries chart example showing monthly granularity"/>

<hr class='dpr-docs-hr'/>

# Yearly Granularity

This example demonstrates how are `line-timeseries` chart is visualised using data in year format (`YYYY`)

### Dataset

| ts   | establishment_id | has_metric_one | metric_one_is_missing | has_metric_two | metric_two_is_missing |
|------|------------------|----------------|-----------------------|----------------|-----------------------|
| 2024 | ABC              | 424            | 781                   | 459            | 528                   |
| 2024 | GHI              | 761            | 610                   | 734            | 785                   |
| 2024 | DEF              | 401            | 499                   | 611            | 524                   |
| 2025 | ABC              | 533            | 614                   | 684            | 665                   |
| 2025 | GHI              | 484            | 713                   | 700            | 506                   |
| 2025 | DEF              | 406            | 682                   | 703            | 409                   |

### Definition

```js
{
  id: 'lineTimeseriesExample3',
  type: 'line-timeseries'
  display: 'Missing MetricOne timeseries chart',
  description: 'Prisoner totals for missing MetricOne for multiple establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'metric_one_is_missing',
        display: 'Has no MetricOne',
      },
    ],
    expectNulls: false,
  }
}
```

### Visualisation dataset

This definition will return the following dataset

| ts   | establishment_id | metric_one_is_missing |
|------|------------------|-----------------------|
| 2024 | ABC              | 781                   |
| 2024 | GHI              | 610                   |
| 2024 | DEF              | 499                   |
| 2025 | ABC              | 614                   |
| 2025 | GHI              | 713                   |
| 2025 | DEF              | 682                   |


see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/line-timeseries/chart-6-chromium-linux.png" alt="line-timeseries chart example show yearly granularity"/>
