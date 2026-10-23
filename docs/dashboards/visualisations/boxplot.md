---
layout: layouts/dashboards.njk
title: Boxplot
subsection: Visualisation definition
---
<img src="/assets/images/charts/boxplot/chart-0-chromium-linux.png" alt="bar chart example" width="500" style="margin-bottom: 20px"/>

The `boxplot` chart visualisation type represents data as a {type} chart visualisation.

- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use a box plot when you want to understand the distribution of data, rather than just a single average or total. Box plots help identify the spread of values, typical ranges, and potential outliers across one or more categories.

Choose a `boxplot` chart when:

- You want to compare the distribution of values across categories or groups.
- Understanding variation, spread, or consistency is as important as the average value.
- You need to show statistical summaries such as the minimum, lower quartile (Q1), median, upper quartile (Q3), and maximum.
- You want to identify potential outliers or unusually high or low values.
- Your data contains many individual observations that would be impractical to display individually.
- You need to compare ranges and distributions across multiple categories side-by-side.

Box plots are especially effective when analysing performance, measurements, durations, scores, or other datasets where understanding variability is more important than comparing simple totals.

<hr class='dpr-docs-hr'/>

# When not to use

Avoid using a `boxplot` chart when:

- Your audience is unfamiliar with quartiles or statistical summaries and requires a simpler visualisation.
- You only have a small number of observations, making the distribution less meaningful.
- The focus is on exact values rather than the overall spread and range of data.
- You need to show trends over time, where a line or line-timeseries chart is usually more appropriate.
- You want to display the contribution of individual data points rather than a statistical summary.
- Comparing totals, averages, or percentages alone is more important than understanding variation.

Box plots can be less intuitive than bar or line charts, so they are most effective when the audience needs insight into how values are distributed, not just what their central value is.

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'id',
  type: 'type',
  display: 'name',
  description: 'description',
  option: {
    ...
  }
  column: {
    ...
  }
}
```

See the [Visualisation definition](/dashboards/visualisations/visualisation-definition) docs for the definition schema

See the [Targeting data](/dashboards/visualisations/visualisation-dataset) for and how to target data with the `column` field

### Options:

```js
option: {
  horizontal: boolean
}
```

| Name         | Type    | Required | Description                                                    |
| ------------ | ------- | -------- | -------------------------------------------------------------- |
| `horizontal` | boolean | No       | Defines whether the chart should be rendered horizontally. |

<hr class='dpr-docs-hr'/>

# Examples

- [Boxplot wide example](#boxplot-wide-example)
- [Boxplot Grouped example](#boxplot-grouped-example)

### Example Dataset

| Date       | Type | Cat1 | Cat2 | Cat3 | Cat4 | Cat5 | Cat6 | Cat7 | Cat8 |
|------------|------|------|------|------|------|------|------|------|------|
| 01/01/2026 | one  | 14   | 82   | 37   | 65   | 14   | 82   | 37   | 65   |
| 01/01/2026 | one  | 91   | 23   | 58   | 11   | 91   | 23   | 58   | 11   |
| 01/01/2026 | two  | 46   | 75   | 19   | 88   | 46   | 75   | 19   | 88   |
| 01/01/2026 | two  | 32   | 97   | 44   | 53   | 32   | 97   | 44   | 53   |
| 02/01/2026 | one  | 67   | 29   | 83   | 12   | 67   | 29   | 83   | 12   |
| 02/01/2026 | one  | 74   | 8    | 61   | 34   | 74   | 8    | 61   | 34   |
| 02/01/2026 | two  | 21   | 56   | 92   | 47   | 21   | 56   | 92   | 47   |
| 02/01/2026 | two  | 39   | 68   | 15   | 80   | 39   | 68   | 15   | 80   |
| 03/01/2026 | one  | 63   | 17   | 78   | 25   | 63   | 17   | 78   | 25   |
| 03/01/2026 | one  | 55   | 43   | 27   | 96   | 55   | 43   | 27   | 96   |
| 03/01/2026 | two  | 9    | 71   | 35   | 62   | 9    | 71   | 35   | 62   |
| 03/01/2026 | two  | 18   | 89   | 50   | 6    | 18   | 89   | 50   | 6    |

<hr class='dpr-docs-hr'/>


# Boxplot wide example

An example boxplot visualisation definition where no keys/groups are specified

### Definition

```js
{
  id: 'box-plot-wide',
  type: 'boxplot',
  display: 'Box plot example',
  description: 'Example of a box plot chart',
  options: {},
  columns: {
    keys: [],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
      {
        id: 'cat4',
        display: 'Category 4',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| Cat1 | Cat2 | Cat3 | Cat4 |
|------|------|------|------|
| 14   | 82   | 37   | 65   |
| 91   | 23   | 58   | 11   |
| 46   | 75   | 19   | 88   |
| 32   | 97   | 44   | 53   |
| 67   | 29   | 83   | 12   |
| 74   | 8    | 61   | 34   |
| 21   | 56   | 92   | 47   |
| 39   | 68   | 15   | 80   |
| 63   | 17   | 78   | 25   |
| 55   | 43   | 27   | 96   |
| 9    | 71   | 35   | 62   |
| 18   | 89   | 50   | 6    |

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

<hr class='dpr-docs-hr'/>

### Visualisation

This will produce the following cart visualisation

<img src="/assets/images/charts/boxplot/chart-0-chromium-linux.png" alt="boxplot chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Boxplot grouped example

An example boxplot visualisation definition using groups/keys

### Definition

```js
{
  id: 'box-plot-grouped',
  type: 'boxplot',
  display: 'Box plot grouped example',
  description: 'Example of a box plot chart using groups - multiple categorys, composite key',
  options: {},
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
      {
        id: 'type',
        display: 'type',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| Date       | Type | Cat1 | Cat2 |
|------------|------|------|------|
| 01/01/2026 | one  | 14   | 82   |
| 01/01/2026 | one  | 91   | 23   |
| 01/01/2026 | two  | 46   | 75   |
| 01/01/2026 | two  | 32   | 97   |
| 02/01/2026 | one  | 67   | 29   |
| 02/01/2026 | one  | 74   | 8    |
| 02/01/2026 | two  | 21   | 56   |
| 02/01/2026 | two  | 39   | 68   |
| 03/01/2026 | one  | 63   | 17   |
| 03/01/2026 | one  | 55   | 43   |
| 03/01/2026 | two  | 9    | 71   |
| 03/01/2026 | two  | 18   | 89   |

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

<hr class='dpr-docs-hr'/>

### Visualisation

This will produce the following cart visualisation

<img src="/assets/images/charts/boxplot/chart-5-chromium-linux.png" alt="boxplot chart example 2" width="500"/>
