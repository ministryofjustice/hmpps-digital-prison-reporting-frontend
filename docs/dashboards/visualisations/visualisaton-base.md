---
layout: layouts/dashboards.njk
title: Chart Type
subsection: Visualisation definition
---

<img src="" alt="" width="500" style="margin-bottom: 20px"/>

The `vis-type` chart visualisation type represents data as a matrix/heatmap chart visualisation. 

- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

TBD

<hr class='dpr-docs-hr'/>

# How it works

TBD

<hr class='dpr-docs-hr'/>

# Definition

```js
{
  id: 'id',
  type: 'type',
  display: 'name',
  description: 'description',
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
