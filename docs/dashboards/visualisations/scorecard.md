---
layout: layouts/dashboards.njk
title: Scorecard
subsection: Visualisation definition
---

<img src="" alt="" width="500" style="margin-bottom: 20px"/>

The `scorecard` chart visualisation type represents data as a scorecard visualisation. 

- [When to use](#when-to-use)
- [When not to use](#when-not-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use this visualisation type when you need to display data as a **single** scorecard.

A scorecard is used to display:

- A snapshot value of a data point at a specific point in time.
- The data trend over time, within a user selected date range.
- The RAG status for the data point value.

<hr class='dpr-docs-hr'/>

# When not to use

If you want to display a group of scorecards using a single visualisaton definition you should use [Scorecard group](/dashboards/visualisations/scorecard-group)

Use [Scorecard group](/dashboards/visualisations/scorecard-group) when:

- You have **multiple rows** in your visualisation dataset
- You want to display a group of scorecards

<hr class='dpr-docs-hr'/>

# How it works

## Metric value

The metric value and description is taken from the value in the single `measure` column provided in the definition 

## Data score

The data score is represented as a colour to denote its status.

See [Data Scoring & Bucketing](/dashboards/visualisations/custom-buckets) for docs on how data is scored and bucketed, and how to define custom buckets.  

If not data score or custom bucketing is found then the data score is not displayed.

## Trend

The trend data for the metric value is derived from the difference between the earliest and latest value in the dataset. 

If no timestamp data is found then the trend is not displayed

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'scorecard-definition-example',
  type: 'scorecard',
  display: 'scorecard title',
  description: 'scorecard visualisation description',
  options: {
    ...
  }
  columns: {
    keys: [
      ...
    ], 
    // Always expects only a single measure
    measures: [
      {
        id: 'column-id'
        display: 'The description displayed in the scorecard'
      }
    ]
  }
}
```

See the [Targeting data](/dashboards/visualisations/targeting-data) for and how to target data with the `column`

### Options: 

See [Custom buckets](/dashboards/visualisations/custom-buckets##custom-buckets) for `options` documentation 

<hr class='dpr-docs-hr'/>

# Data assumptions

- The dataset for the visualisation only has a **single** row. Otherwise only the first row will be used.
- To display trend data, a column with an ID of `ts` must be present in the **parent data**

<hr class='dpr-docs-hr'/>

# Examples

- [Example 1](#example-1)
- [Example 2](#example-2)

### Example Dataset

For these examples we will use a mocked dataset representing diet totals. 

```js
| ts         | est_id | has_nationality | nationality_is_missing | has_religion | religion_is_missing |
|------------|--------|-----------------|------------------------|--------------|---------------------|
| 24/10/2025 | MDI    | 638             | 485                    | 300          | 500                 |
| 25/10/2025 | MDI    | 585             | 701                    | 280          | 320                 |
| 26/10/2025 | MDI    | 663             | 725                    | 220          | 214                 |
| 27/10/2025 | MDI    | 422             | 765                    | 220          | 214                 |
| 28/10/2025 | MDI    | 543             | 765                    | 220          | 214                 |
| 29/10/2025 | MDI    | 588             | 765                    | 220          | 214                 |
| 30/10/2025 | MDI    | 651             | 765                    | 220          | 214                 |
```

<hr class='dpr-docs-hr'/>

# Simple scorecard

TBD

### Definition

```js
{
  id: 'simple-scorecard',
  type: 'scorecard',
  display: 'Example scorecard',
  description: 'Example definition description',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_nationality',
        display: 'No of prisoners with nationality',
      },
    ],
  },
}
```

### Dataset returned: 

This definition will return the following dataset
```js

```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

<hr class='dpr-docs-hr'/>

### Visualisation

<img src="../../assets/images/barExample1.png" alt="" width="500"/>

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
  options: {},
  columns: {
    keys: [],
    measures: [],
    filters: []
    expectNulls: true,
  },
}
```

### Dataset returned: 

This definition will return the following dataset
```js

```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

<hr class='dpr-docs-hr'/>

### Visualisation

<img src="../../assets/images/barExample1.png" alt="" width="500"/>
