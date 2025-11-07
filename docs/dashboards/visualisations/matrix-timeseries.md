---
layout: layouts/dashboards.njk
title: Matrix timeseries chart
subsection: Visualisation definition
---

<img src="/assets/images/matrixExample2.png" alt="bar chart example" width="350" style="margin-bottom: 30px"/>
<img src="/assets/images/matrixExample1.png" alt="bar chart example" width="350" style="margin-bottom: 30px"/>

The `matrix-timeseries` chart visualisation type represents data as a matrix/heatmap chart visualisation. 

- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use this visualisation type when you need to display historic data as a **heatmap**, or as a **Red, Amber, Green** traffic-light conventions.

### Red, Amber, Green

Use RAG when:

- You have 3 buckets
- You're visualising performance, status, or compliance data.
- Quick identification of "bad" areas in the primary goal.
- Your audience expects traffic-light conventions of red, amber and green.

### Heatmaps

Gradient variations of a base colour. Use heatmap colouring when:

- You need many buckets for fine grained data
- You're showing purely quantative data.
- When there are no natural thresholds. i.e. There are no meaningful good, warning, or bad thresholds.

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
    key: [{ id: 'ts' }],
    measure: [
      { id: 'ts', display: 'Date' },
      { id: 'id-of-count-column', display: 'Count column title' },
    ],
  }
}
```
See the [Visualisation definition](/dashboards/visualisations/visualisation-definition) docs for the definition schema

See the [Targeting data](/dashboards/visualisations/visualisation-dataset) for and how to target data with the `column`

## Options:

See [Custom buckets](/dashboards/visualisations/custom-buckets##custom-buckets) for `options` documentation 

<hr class='dpr-docs-hr'/>

# Data assumptions

- The dataset includes a column with an ID of `ts` that contains timestamp data
- The `ts` date format must be `YYYY/MM/DD`

<hr class='dpr-docs-hr'/>

# Examples

- [Automatic bucketing](#automatic-bucketing)
- [Custom base colour](#custom-base-colour)
- [Custom buckets definition](#custom-buckets)
- [Custom buckets thresholds and colours](#custom-buckets-thresholds-and-colours)
- [Custom buckets with open ended boundaries](#custom-buckets-with-open-ended-boundaries)
- [RAG colours](#rag-colours)

### Example Dataset

For these examples we will use a mocked dataset representing finds totals

```js

| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/25 |          |       |       | Drugs       | 17    |
| 2025/02/25 |          |       |       | Phones      | 22    |
| 2025/02/25 |          |       |       | Weapons     | 26    |
| 2025/02/25 |          |       |       | Alcohol     | 16    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/24 |          |       |       | Drugs       | 11    |
| 2025/02/24 |          |       |       | Phones      | 9     |
| 2025/02/24 |          |       |       | Weapons     | 30    |
| 2025/02/24 |          |       |       | Alcohol     | 19    |
| 2025/02/23 |          |       |       |             | 92    |
| 2025/02/23 |          |       |       | Drugs       | 14    |
| 2025/02/23 |          |       |       | Phones      | 22    |
| 2025/02/23 |          |       |       | Weapons     | 49    |
| 2025/02/23 |          |       |       | Alcohol     | 7     |
... more rows ommitted

```

<hr class='dpr-docs-hr'/>

# Automatic bucketing

In this example we will define a heatmap that:

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
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

<img src="/assets/images/matrixExample1.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom base colour

In this example we will define a heatmap that:

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
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

<img src="/assets/images/matrix-example-base-colour.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets definition

In this example we will define a heatmap that:

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
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

<img src="/assets/images/matrix-example-custom.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets thresholds and colours

In this example we will define a heatmap that:

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
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

<img src="/assets/images/matrix-example-custom-colour.png" alt="bar chart example" width="500"/>

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

```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       | Weapons     | 26    |
| 2025/02/24 |          |       |       | Weapons     | 30    |
| 2025/02/23 |          |       |       | Weapons     | 49    |
... more rows ommitted
```
see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation:

<img src="/assets/images/matrixExample1.png" alt="bar chart example" width="500"/>

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
    useRagColours: true // <- Defines the use of RAG colouring
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

```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```

see [here](/dashboards/visualisations/visualisation-dataset) for more info on targeting data

### Visualisation

<img src="/assets/images/matrixExample2.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

