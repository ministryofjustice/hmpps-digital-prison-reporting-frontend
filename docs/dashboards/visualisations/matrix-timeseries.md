---
layout: layouts/dashboards.njk
title: Matrix timeseries chart
subsection: Visualisation definition
---

<img src="../../assets/images/matrixExample2.png" alt="bar chart example" width="250" style="margin-bottom: 20px"/>
<img src="../../assets/images/matrixExample1.png" alt="bar chart example" width="250" style="margin-bottom: 20px"/>

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

This chart uses colour to represent data as two dimensional matrix. Values in a dataset can be assigned colours in few ways value. 

### Custom threshold Bucketing

If custom buckets thresholds are defined in the visualisation definition:
- Bins the value within the appropriate custom bucket. 

### Using the RAG value 

If RAG values are present in the data
- The max RAG value is used to determine the total number of buckets.
- There is no upper limit to the number of buckets created.
- Each bucket is assigned and specific colour and an index starting from 0.
- Each RAG value is assigned to their corresponding bucket. 

### Automatic threshold bucketing

If no RAG value is in the dataset, or any custom buckets defined in the definition: 
- Buckets are defined by determining the data range and splitting it into 3 equal parts.
- Each bucket is assigned a specific colour
- Each value is put into the appropriate bucket

<hr class='dpr-docs-hr'/>

# Definition

See the [Visualisation definition]() docs for the Definition schema

```js
{
  id: 'line-definition-example',
  type: 'matrix-timeseries',
  display: 'Matrix timeseries chart',
  description: 'Matrix visualisation description',
  option: {
    ...
  }
  column: {
    ...
  }
}
```
See the [Visualisation definition](/dashboards/visualisations/visualisation-definition) docs for the definition schema

To learn more about defining the data for the visualisation using the `columns` field see [here](/dashboards/visualisations/targeting-data)

## Options:

```js
options: {
  // Defines whether to use Red, Amber and Green for bucket colours
  useRagColour: true, // default: false

  // Define the base colour:
  baseColour: '#00000'

  // Custom bucketing
  bucket: [
    { min: 0, max: 100, hexColour: '' },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, hexColour: '' },
  ]
}
```

| Name            | Type    | Required | Description                                                    |
| ----------------| ------- | -------- | ---------------------------------------------------------------|
| `useRagColour`  | boolean | No       | Defines whether to use Red, Amber and Green for bucket colours |
| `baseColour`    | string  | No       | Defines the base colour to user                                |
| `bucket`        | Array   | No       | Defines the number of buckets and their thresholds             |

### bucket

| Name        | Type    | Required | Description                                   |
| ------------| ------- | -------- | ----------------------------------------------|
| `min`       | number  | Yes      | The minimum value for the bucket              |
| `max`       | number  | No       | The maximum value for the bucket              |
| `hexColour` | string  | No       | The bucket colour value in hexidecimal format |

<hr class='dpr-docs-hr'/>

# Data assumptions

- The dataset includes a column with an ID of `ts` that contains timestamp data
- The `ts` date format must be `YYYY/MM/DD`

<hr class='dpr-docs-hr'/>

# Examples

- [Automatic bucketing](#automatic-bucketing)
- [Custom base colour](#custom-base-colour)
- [Custom buckets](#custom-buckets)
- [Custom buckets thresholds and colours](#custom-buckets)
- [RAG colours](#define-a-timeseries-rag-matrix-chart)

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

- defines buckets based on the values in the dataset
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  option: {},
  columns: {
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

### Dataset returned: 

This definition will return the following dataset
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

### Visualisation

<img src="../../assets/images/matrixExample1.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom base colour

In this example we will define a heatmap that:

- defines buckets based on the values in the dataset
- Uses a custom base colour for the gradient colours
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
  columns: {
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

### Dataset returned: 

This definition will return the following dataset
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

### Visualisation

<img src="../../assets/images/matrixExample1.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets

In this example we will define a heatmap that:

- Uses buckets defined in the definition
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
    buckets: [
      { min: 0, max: 20 },
      { min: 21, max: 40 },
      { min: 41, max: 60 },
      { min: 61, max: 80 }
      { min: 81, max: 100 }
    ]
  },
  columns: {
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

### Dataset returned: 

This definition will return the following dataset
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

### Visualisation

<img src="../../assets/images/matrixExample1.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Custom buckets thresholds and colours

In this example we will define a heatmap that:

- Uses custom buckets defined in the definition
- Uses custom colours defined in the definition
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
    buckets: [
      { min: 0, max: 20, hexColour: '#' },
      { min: 21, max: 40, hexColour: '#' },
      { min: 41, max: 60, hexColour: '#' },
      { min: 61, max: 80, hexColour: '#' }
      { min: 81, max: 100, hexColour: '#' }
    ]
  },
  columns: {
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

### Dataset returned: 

This definition will return the following dataset
```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

### Visualisation

<img src="../../assets/images/matrixExample1.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>


# RAG colours

In this example we will define a matrix chart that:

- Uses RAG colouring
- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show daily finds over 3 months

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  options: {
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

### Dataset returned: 

This definition will return the following dataset

```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 81    |
| 2025/02/24 |          |       |       |             | 69    |
| 2025/02/23 |          |       |       |             | 92    |
... more rows ommitted
```

see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

### Visualisation

<img src="../../assets/images/matrixExample2.png" alt="bar chart example" width="500"/>

<hr class='dpr-docs-hr'/>

# Weapons finds total over time

In this example we will define a matrix chart that:

- selects the dataset rows that show the total count of finds for each day
- represent that as a matrix chart that show weapon finds over 3 months
- Uses RAG colouring

### Definition

```js
{
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  columns: {
    keys: [
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
        display: 'Weapons found',
      },
    ],
    filters: [
      {
        id: 'finds',
        equals: 'Weapons'
      }
    ]
    expectNull: true,
  },
}
```

### Dataset returned: 

This definition will return the following dataset

```js
| ts         |  est_id  | wing  | cell  | finds       | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       | Weapons     | 26    |
| 2025/02/24 |          |       |       | Weapons     | 30    |
| 2025/02/23 |          |       |       | Weapons     | 49    |
... more rows ommitted
```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

### Visualisation:

<img src="../../assets/images/matrixExample1.png" alt="bar chart example" width="500"/>
