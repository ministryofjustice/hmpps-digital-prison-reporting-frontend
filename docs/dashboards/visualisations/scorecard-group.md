---
layout: layouts/dashboards.njk
title: Scorecard Group
subsection: Visualisation definition
---

<img src="" alt="" width="500" style="margin-bottom: 20px"/>

The `scorecard-group` chart visualisation type represents data as a scorecard visualisation. 

- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use this visualisation type when you need to display data as a **group** of scorecards.

A scorecard is used to display:

- A snapshot value of a data point at a specific point in time, in an impactful way.
- The data trend over time, within a user selected date range.
- The RAG status for the data point value.

Use scorecard group when:

- You want to display a group of scorecards
- You want multiple rows in a data subset displayed as scorecards 

<hr class='dpr-docs-hr'/>

# How it works

TBD

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'scorecard-group-definition-example',
  type: 'scorecard-group',
  display: 'Scorecard Group title',
  description: 'scorecard-group visualisation description',
  options: {
    ...
  }
  columns: {
    ...
  }
}
```
  To learn more about defining the data for the visualisation using the `columns` field see [here](/dashboards/visualisations/targeting-data)

### Options: 

```js
options: {
  ...
}
```

<hr class='dpr-docs-hr'/>

# Examples

- [Example 1](#example-1)
- [Example 2](#example-2)

### Example Dataset

For these examples we will use a mocked dataset representing diet totals. 

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 5000  |
| 2025/02/25 | MDI      |       |       |             | 1109  |
| 2025/02/25 | MDI      | north |       |             | 140   |
| 2025/02/25 | MDI      | north | cell1 |             | 30    |
| 2025/02/25 | MDI      | north | cell2 |             | 29    |
| 2025/02/25 | MDI      | north | cell3 |             | 13    |
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
| 2025/02/25 |          |       |       | vegetarian  | 1507  |
| 2025/02/25 |          |       |       | pescatarian | 1130  |
| 2025/02/25 |          |       |       | vegan       | 1354  |
| 2025/02/25 |          |       |       | omnivore    | 1009  |
| 2025/02/25 | MDI      |       |       | vegetarian  | 169   |
| 2025/02/25 | MDI      |       |       | pescatarian | 463   |
| 2025/02/25 | MDI      |       |       | vegan       | 397   |
| 2025/02/25 | MDI      |       |       | omnivore    | 80    |
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
