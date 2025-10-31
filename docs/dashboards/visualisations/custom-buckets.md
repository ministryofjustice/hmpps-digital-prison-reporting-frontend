---
layout: layouts/dashboards.njk
title: Data Scoring & Bucketing
subsection: Visualisation definition
---

Data scoring and bucketing is used by visualisations to attribute colour and score values to data in order to visualise performance, status, compliance, or quantative data.   

Visualisations that use buckets are: 
- [Matrix timeseries](/dashboards/visualisations/matrix-timeseries)
- [Scorecard](/dashboards/visualisations/scorecard)
- [Scorecard group](/dashboards/visualisations/scorecard-group)

# How to use:

- [Custom buckets](#custom-buckets)
- [Automatic bucketing](#automatic-bucketing) 
- [Scoring engine](#scoring-engine) 

# Custom buckets 

Custom buckets allow user to define:
- the bucket count
- the bucket sizing and boundaries
- the bucket colours

If custom buckets are defined in the visualisation definition values are binned within the appropriate custom bucket. 

- [Definition](#definition)
- [Examples](#examples) 

## Definition

Custom buckets are defined in the `options` field of the visualisaton definition

```js
options: {
  ...
  useRagColour: true,     // Defines whether to use Red, Amber and Green for bucket colours
  baseColour: '#00000'    // Define the base colour
  buckets: [
    { min: 0, max: 100, hexColour: '#00703c' },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, hexColour: '#f47738' },
  ]
}
```

### Options

| Name            | Type    | Required | Description                                                    |
| ----------------| ------- | -------- | ---------------------------------------------------------------|
| `useRagColour`  | boolean | No       | Defines whether to use RAG bucket colours. Default: `false`    |
| `baseColour`    | string  | No       | Defines the base colour to user. Default: `#1d70b8`            |
| `bucket`        | Array   | No       | Defines the custom buckets. See [Bucket](#bucket)              |

### Bucket

| Name        | Type    | Required | Description                                   |
| ------------| ------- | -------- | ----------------------------------------------|
| `min`       | number  | No      | The minimum value for the bucket               |
| `max`       | number  | No       | The maximum value for the bucket              |
| `hexColour` | string  | No       | The bucket colour value in hexidecimal format |

## Examples

[Defining buckets and boundaries](#defining-buckets-and-boundaries)
[Open ended boundaries](#open-ended-boundaries)
[Define bucket colours](#define-bucket-colours)
[Define colours and boundaries](#define-colours-and-boundaries)

### Defining buckets and boundaries

This example defines:
- 4 buckets
- bucket size and thresholds
- uses default base colour

```js
options: {
  buckets: [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 500 },
  ]
}
```

### Open ended boundaries

This example defines:
- 5 buckets
- bucket sizes and boundaries
- No lower, or upper limits on highest and lowest case buckets
- uses default base colour

```js
options: {
  buckets: [
    { max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401 },
  ]
}
```

### Custom buckets with custom base colour

This example defines:
- 4 buckets
- bucket size and thresholds
- uses custom base colour

```js
options: {
  baseColour: '#4c2c92',
  buckets: [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 500 },
  ]
}
```

### Custom buckets with RAG colours

This example defines:
- 3 buckets
- bucket size and open ended boundaries
- uses rag colours

Note: `useRagColour` only applies when 3 buckets are defined

```js
options: {
  useRagColour: true
  buckets: [
    { max: 100 },
    { min: 101, max: 200 },
    { min: 201 },
  ]
}
```

### Define bucket colours

This example defines:
- 3 buckets
- bucket boundaries set by the dataset
- colour values assigned to each bucket

```js
options: {
  buckets: [
    { hexColour: '#00703c' },
    { hexColour: '#1d70b8' },
    { hexColour: '#d53880' },
  ]
}
```

### Define colours and boundaries

This example defines:
- 5 buckets
- bucket sizes and boundaries
- colour values assigned to each bucket

```js
options: {
  buckets: [
    { min: 0, max: 100, hexColour: '#00703c' },
    { min: 101, max: 200, hexColour: '#1d70b8' },
    { min: 201, max: 300, hexColour: '#6f72af' },
    { min: 301, max: 500, hexColour: '#d53880' },
    { min: 501, hexColour: '#d4351c' },
  ]
}
```

<hr class='dpr-docs-hr'/>

# Automatic bucketing

**NOTE**: Only applies to `matrix-timeseries`

If no RAG score is in the dataset, or no custom buckets have been defined: 
- Buckets are defined by determining the data range and splitting it into 3 equal parts.
- Each bucket is assigned a specific colour
- Each value is put into the appropriate bucket

# Scoring engine

**This is in development and currently not available.**

Scores will be available in datasets through a scoring engine. This is currently in development and currently not available. 

If RAG values are present in the data
- The max RAG value is used to determine the total number of buckets.
- There is no upper limit to the number of buckets created.
- Each bucket is assigned and specific colour and an index starting from 0.
- Each RAG value is assigned to their corresponding bucket. 

