---
layout: layouts/dashboards.njk
title: Matrix timeseries chart
subsection: Visualisation definition
---

<img src="/assets/images/charts/matrix/matrixExample2.png" alt="bar chart example" width="350" style="margin-bottom: 30px"/>
<img src="/assets/images/charts/matrix/matrixExample1.png" alt="bar chart example" width="350" style="margin-bottom: 30px"/>

The `matrix-timeseries` chart visualisation type represents data as a matrix/heatmap chart visualisation.

- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use a matrix/heatmap when you want to show patterns, intensity, or relationships across two categorical or sequential dimensions. Heatmaps are especially effective for quickly spotting clusters, outliers, and high/low concentration areas through color.
Choose a matrix/heatmap when:

- You have two variables (e.g., time × category, metric × metric) and want to visualise how values vary across that grid.
- You want to reveal patterns or trends that are easier to see through colour gradients than numbers alone.
- You’re analysing large datasets where showing every value in a table would overwhelm the reader.
- Comparing magnitude via colour is sufficient, and exact values are secondary.
- You want to highlight correlations, intensity levels, or frequency distributions at a glance.
- Your audience benefits from visual grouping, such as heat clusters or distinct cold zones.

Heatmaps shine when the goal is to understand the shape or distribution of data across two dimensions.

<hr class='dpr-docs-hr'/>

# When not to use

Avoid using a matrix/heatmap when:

- Precise numerical values matter - colour is less accurate than explicit numbers or bars.
- Your dataset has very few data points, making the grid sparse and uninformative.
- There is no clear second dimension - if you only have one variable, a bar or line chart is better.
- Your audience may struggle with colour interpretation (e.g. colour‑blindness concerns or inaccessible palettes).
- Colours don't have a strong meaning tied to the data (e.g., random colours instead of a meaningful scale).
- You need to emphasise ranking or order, which is harder to interpret through colour alone.
- Your categories are too long or numerous, causing unreadable labels or excessive scrolling.
- The data varies only slightly, producing a matrix where all cells look the same.

Use matrix charts for pattern recognition, not for fine‑grained comparison.

<hr class='dpr-docs-hr'/>

# How it works

The Matrix chart uses colour to represent data as two dimensional matrix. Values in a dataset are assigned to buckets which have a colour associated to them.

See [Custom buckets](/dashboards/visualisations/custom-buckets#custom-buckets) for docs on how data is scored and bucketed, and how to define custom buckets.

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'matrix-definition-id',
  type: 'matrix-timeseries',
  display: 'Matrix timeseries chart',
  description: 'Matrix visualisation description',
  option: {
    ...
  }
  column: {
    key: [{ id: 'ts', type: 'timestamp' }],
    measure: [
      { id: 'ts', type: 'timestamp', display: 'Date' },
      { id: 'id-of-count-column', display: 'Count column title' },
    ],
  }
}
```

See the [Visualisation definition](/dashboards/visualisations/visualisation-definition) docs for the definition schema

See the [Targeting data](/dashboards/visualisations/visualisation-dataset) for and how to target data with the `column` field

## Options:

See [Custom buckets](/dashboards/visualisations/custom-buckets##custom-buckets) for `options` documentation

<hr class='dpr-docs-hr'/>

# Data assumptions

- Ensure that your <strong>measure</strong> array in the definition includes an item of `type` of `timestamp` when specifying a timestamp measure.
- The `timestamp` date format must be one of the following, depending on the granularity of the matrix desired:
  -  `YYYY-MM-DD` for daily granularity (e.g `2024-01-18`)
  -  `YYYY-MM` for monthly granularity (e.g `2024-01`)
  -  `YYYY` for annual granularity (eg. `2024`)

<hr class='dpr-docs-hr'/>

# Examples

## Time Granularity examples
- [Daily Granularity](#daily-granularity)
- [Monthly Granularity](#monthly-granularity)
- [Yearly Granularity](#yearly-granularity)

## Buckets and colour exampled
- [Automatic bucketing](#automatic-bucketing)
- [Custom base colour](#custom-base-colour)
- [Custom buckets definition](#custom-buckets)
- [Custom buckets thresholds and colours](#custom-buckets-thresholds-and-colours)
- [Custom buckets with open ended boundaries](#custom-buckets-with-open-ended-boundaries)
- [RAG colours](#rag-colours)

<hr class='dpr-docs-hr'/>

# Buckets and colour exampled

### Example Dataset

For these examples we will use a mocked dataset representing finds totals

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       |             | 81    |
| 2025-02-25 |          |       |       | Drugs       | 17    |
| 2025-02-25 |          |       |       | Phones      | 22    |
| 2025-02-25 |          |       |       | Weapons     | 26    |
| 2025-02-25 |          |       |       | Alcohol     | 16    |
| 2025-02-24 |          |       |       |             | 69    |
| 2025-02-24 |          |       |       | Drugs       | 11    |
| 2025-02-24 |          |       |       | Phones      | 9     |
| 2025-02-24 |          |       |       | Weapons     | 30    |
| 2025-02-24 |          |       |       | Alcohol     | 19    |
| 2025-02-23 |          |       |       |             | 92    |
| 2025-02-23 |          |       |       | Drugs       | 14    |
| 2025-02-23 |          |       |       | Phones      | 22    |
| 2025-02-23 |          |       |       | Weapons     | 49    |
| 2025-02-23 |          |       |       | Alcohol     | 7     |
... more rows omitted


<hr class='dpr-docs-hr'/>

# Automatic bucketing

In this example we will define a matrix chart that:

- automatically defines buckets based on the values in the dataset
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  column: {
    key: [
      {
        id: 'ts',
      },
    ],
    measure: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       |             | 81    |
| 2025-02-24 |          |       |       |             | 69    |
| 2025-02-23 |          |       |       |             | 92    |
... more rows ommitted

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/matrixExample1.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom base colour

In this example we will define a matrix chart that:

- automatically defines buckets based on the values in the dataset
- uses a custom base colour for the gradient colours
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  option: {
    baseColour: '#00703c'   // <-- Sets the custom base colour
  },
  column: {
    key: [
      {
        id: 'ts',
      },
    ],
    measure: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       |             | 81    |
| 2025-02-24 |          |       |       |             | 69    |
| 2025-02-23 |          |       |       |             | 92    |
... more rows ommitted

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/matrix-example-base-colour.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets definition

In this example we will define a matrix chart that:

- uses custom bucketing to define the bucket count, size and boundaries
- uses the default base colour
- defines 5 buckets
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  option: {
    bucket: [
      { min: 0, max: 20 },
      { min: 21, max: 40 },
      { min: 41, max: 60 },
      { min: 61, max: 80 }
      { min: 81, max: 100 }
    ]
  },
  column: {
    key: [
      {
        id: 'ts',
      },
    ],
    measure: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       |             | 81    |
| 2025-02-24 |          |       |       |             | 69    |
| 2025-02-23 |          |       |       |             | 92    |
... more rows ommitted

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/matrix-example-custom.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets thresholds and colours

In this example we will define a matrix chart that:

- uses custom bucketing, defined in the definition
- uses custom colours defined in the definition
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  option: {
    bucket: [
      { min: 0, max: 20, hexColour: '#912b88' },
      { min: 21, max: 40, hexColour: '#f47738' },
      { min: 41, max: 60, hexColour: '#28a197' },
    ]
  },
  column: {
    key: [
      {
        id: 'ts',
      },
    ],
    measure: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       |             | 81    |
| 2025-02-24 |          |       |       |             | 69    |
| 2025-02-23 |          |       |       |             | 92    |
... more rows ommitted

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/matrix-example-custom-colour.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets with open ended boundaries

In this example we will define a matrix chart that:

- uses custom bucketing
- has open ended lower limit bucket, and open ended higher limit bucket
- selects the dataset rows that show the total weapons found for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'custom-bucket-open-sizing',
  type: 'matrix-timeseries',
  display: 'Open ended bucket boundaries',
  description:
    'Demonstrates custom bucketing where the first bucket has not lower limit, and the last bucket has no higher limit',
  option: {
    bucket: [
      {
        max: 10,
      },
      {
        min: 11,
        max: 30,
      },
      {
        min: 31,
      },
    ],
  },
  column: {
    key: [
      {
        id: 'ts',
      },
    ],
    measure: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
      filter: [
        {
          id: 'finds',
          equals: 'Weapons'
        }
      ]
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       | Weapons     | 26    |
| 2025-02-24 |          |       |       | Weapons     | 30    |
| 2025-02-23 |          |       |       | Weapons     | 49    |
... more rows ommitted

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation:

<img src="/assets/images/charts/matrix/matrixExample1.png" alt="bar chart example" width="500"/>

# RAG colours

In this example we will define a matrix chart that:

- Uses RAG colouring
- defines 3 automatic buckets
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  option: {
    useRagColour: true // <- Defines the use of RAG colouring
  },
  column: {
    key: [
      {
        id: 'ts',
      },
    ],
    measure: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'count',
        display: 'Tota finds',
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| ts         |  est_id  | wing  | cell  | finds       | count |
|------------|----------| ------|-------|-------------|-------|
| 2025-02-25 |          |       |       |             | 81    |
| 2025-02-24 |          |       |       |             | 69    |
| 2025-02-23 |          |       |       |             | 92    |
... more rows ommitted

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/matrixExample2.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>


# Granularity examples

# Daily Granularity

This example demonstrates how are matrix chart is visualised using data in day format (`YYYY-MM-DD`)

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
  id: 'daily-matrix-example',
  type: 'matrix-timeseries',
  display: 'Daily matrix chart example',
  description: 'Daily matrix chart example',
  options: {
    showLatest: false
  },
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| Date       | Has MetricTwo |
|------------|---------------|
| 01/01/2026 | 733 |
| 03/01/2026 | 488 |
| 04/01/2026 | 651 |
| 05/01/2026 | 548 |
| 06/01/2026 | 716 |
| 07/01/2026 | 766 |
| 08/01/2026 | 377 |
| 09/01/2026 | 311 |
| 10/01/2026 | 628 |
| 11/01/2026 | 491 |
| 12/01/2026 | 242 |
| 13/01/2026 | 496 |
| 14/01/2026 | 736 |
| 15/01/2026 | 628 |
...omitted rows

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/chart-0-chromium-linux.png" alt="bar chart example"/>

<hr class='dpr-docs-hr'/>

# Monthly Granularity

This example demonstrates how are matrix chart is visualised using data in month format (`YYYY-MM`)

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
  id: 'monthly-matrix-example',
  type: 'matrix-timeseries',
  display: 'Monthly matrix chart example',
  description: 'Monthly matrix chart example',
  options: {
    showLatest: false
  },
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| Date    | Has MetricTwo |
|---------|---------------|
| 2025-08 | 459 |
| 2025-09 | 573 |
| 2025-10 | 638 |
| 2025-11 | 471 |
| 2025-12 | 584 |
| 2026-01 | 684 |

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/chart-1-chromium-linux.png" alt="bar chart example"/>

<hr class='dpr-docs-hr'/>

# Yearly Granularity


This example demonstrates how are matrix chart is visualised using data in year format (`YYYY`)

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
  id: 'yearly-matrix-example',
  type: 'matrix-timeseries',
  display: 'Yearly matrix chart example',
  description: 'Yearly matrix chart example',
  options: {
    showLatest: false
  },
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}
```

### Visualisation dataset

This definition will return the following dataset

| Date | Has MetricTwo |
|------|---------------|
| 2024 | 459 |
| 2025 | 684 |


see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

This will produce the following chart visualisation

<img src="/assets/images/charts/matrix/chart-2-chromium-linux.png" alt="matrix chart example"/>
