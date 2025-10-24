---
layout: layouts/dashboards.njk
title: List chart
subsection: Visualisation definition
---

The `list` visualisation type represents data as a simple list visualisation.

- [When to use](#when-to-use)
- [Definition](#definition)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# When to use

Use this visualisation type when you need to display data in a list. 

<hr class='dpr-docs-hr'/>

# Definition

To define a list visualisation:

```js
{
  id: 'diet-totals',
  type: 'list',
  display: 'List title',
  description: 'List visualisation description',
  columns: {
    ...
  }
}
```

To learn more about defining the data for the visualisation using the `columns` field see [here](/dashboards/visualisations/targeting-data)

### Options: 

```js
options: {
  columnsAsList: true,  // default: false
  showLatest: false,    // default: true
}
```

<hr class='dpr-docs-hr'/>

# Examples

There are two ways to represent data from a dataset as a list:

- [Using dataset rows as list rows](#using-dataset-rows-as-list-rows) using-dataset-rows-as-list-rows
- [Using dataset columns as list rows](#using-dataset-columns-as-list-rows)


### Example Dataset

```js
| est_id | metric_1 | metric_2 | metric_3 | metric_4 |
|--------|----------|----------|----------|----------|
| MDI    | 100      | 231      | 300      | 500      |
| SLI    | 200      | 238      | 280      | 320      |
| LTI    | 150      | 208      | 220      | 214      |
```

<hr class='dpr-docs-hr'/>

# Using dataset rows as list rows

### Definition

```js
{
  id: 'vis-id',
  type: 'list',
  display: 'Dataset rows as list rows',
  description: '',
  columns: {
    keys: [
      {
        id: 'est_id',
      },
    ],
    measures: [
      {
        id: 'est_id',
        display: 'Establishment ID'
      },
      {
        id: 'metric_1',
        display: 'Metric 1',
      },
      {
        id: 'metric_2',
        display: 'Metric 2 title',
      },
      {
        id: 'metric_3',
        display: 'Random name',
      },
    ],
  },
}
```

### Visualisation

```js
| Establishment ID | Metric 1 | Metric 2 title | Random name |
|------------------|----------|----------------|-------------|
| MDI              | 100      | 231            | 300         |
| SLI              | 200      | 238            | 280         |
| LTI              | 150      | 208            | 220         |
```

<hr class='dpr-docs-hr'/>

# Using dataset columns as list rows

### Definition: 

```js
{
  id: 'vis-id',
  type: 'list',
  display: 'Dataset columns as list rows',
  description: '',
  columns: {
    keys: [
      {
        id: 'est_id',
      },
    ],
    measures: [
      {
        id: 'metric_1',
        display: 'Metric 1',
      },
      {
        id: 'metric_2',
        display: 'Metric 2 title',
      },

      {
        id: 'metric_3',
        display: 'Random name',
      },
    ],
  },
  columnsAsList: true,    // <-- Note the addition of this boolean field
}
```

### Visualisation

```js
                 | MDI      | SLI      | LTI      |
|----------------|----------|----------|----------|
| Metric 1       | 100      | 200      | 150      |
| Metric 2 title | 231      | 238      | 208      |
| Random name    | 300      | 280      | 220      |
```

