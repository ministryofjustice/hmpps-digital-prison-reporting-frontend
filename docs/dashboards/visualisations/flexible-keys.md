---
layout: layouts/dashboards.njk
title: Flexible keys and Grouping
---

## 🚧 Docs in progress 🚧 

Flexible keys: 
- enable your visualisatons to react to dataset changes from interactive filtering.
- allow you visualisations to be less rigid and become multipurpose.


**contents**
- [When to use](#when-to-use)
- [How it works](#how-it-works)
- [Definition](#definition)
- [Data assumptions](#data-assumptions)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

TBD

# How it works

TBD

<hr class='dpr-docs-hr'/>

# Definition

```js
column: {
  key: [
    { 
      id: "final-fallback-group-id", 
      optional: true 
    },
    { 
      id: "secondary-fallback-group-id", 
      optional: true 
    },
    { 
      id: "primary-group-id", 
      optional: true 
    }
  ],
  measure: [
    ...
  ] 
}
```

## key

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `optional`  | boolean | no       |  Defines whether the key is optional                      |

<hr class='dpr-docs-hr'/>

# Examples

The following examples will demonstrate how to use flexible keys of using the `list` visualisation type.

- [Example 1](#example-1)
- [Example 2](#example-2)

### Example Dataset

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
  option: {},
  column: {
    key: [],
    measure: [],
    filter: []
    expectNull: true,
  },
}
```

### Dataset returned: 

This definition will return the following dataset
```js
```
see [here](/dashboards/visualisations/targeting-data) for more info on targeting data

<hr class='dpr-docs-hr'/>
