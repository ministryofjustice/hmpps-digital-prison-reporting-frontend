---
layout: layouts/dashboards.njk
title: Visualisation dataset
---
These docs describe how to create and use a **visualisation dataset**. 

A visualisation dataset is: 
- a subset of the master dataset that is specific to a **single** visualisation.
- a dataset that contains only the relevant rows and columns to create a visualisation.
- created by the `column` definition of the visualisation definition. 

**contents**
- [Defining the dataset](#defining-the-dataset)
- [Examples](#examples)

<hr class='dpr-docs-hr'/>

# Defining the dataset

A visualisation dataset is created by defining the fields of the `column` definition.

### Column Schema

| Name          | Type    | Required | Description                                                |
| --------------| ------- | -------- | -----------------------------------------------------------|
| `key`        | array   | Yes      |  The array of key columns. See [Key](#key)             |
| `measure`    | array   | Yes      |  The array of measure columns. See [Measure](#measure) |
| `filter`     | array   | no       |  The array of filter columns. See [Filter](#filter)    |
| `expectNull` | boolean | no       |  Targets rows based on whether columns contain null/undefined values. See [expectNull](#expectnull) |

<hr class='dpr-docs-hr'/>

# key

The `key` array is used to:
- identify the rows we want in our dataset
- identify the **visualisation group**

The `key` array works by:
- specifying the columns that must have **non-null** values
- filtering out rows whose key column value is null

Key values are **not used in the visualisation display** and are only in defining the visualisation dataset

### Schema

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The column ID     |
| `display`   | string  | no       |  The display name of the column                          |
| `optional`  | boolean | no       |  Defines whether the key is optional                     |

### Example usage

```js
column: {
  key: [
    { id: 'establishment_id' }, 
    { id: 'establishmenr_wing' }
  ]
  ...
}
```
- creates a **visualisation group** of `establishment_id` and `establishment_wing`
- filters out rows whose values for `establishment_id` and `establishment_wing` are `null` or `undefined`
- left with rows grouped by `establishment_id` and `establishment_wing`

<hr class='dpr-docs-hr'/>

# measure

The `measure` array is used to:
- identify the rows we want in our dataset
- specify the columns you want to **visualise**

The `measure` array works by:
- specifying the columns that must have **non-null** values
- filtering out rows whose column value is null
- displaying the column value in the chosen chart/visualisation type. 

### Schema

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The column ID       |
| `display`   | string  | no       |  The display name of the column                          |
| `aggregate` | `sum`    | no       | The aggregation operation                               |
| `unit`      | `number`, `percentage`     | no       |  The unit type. Default: `number`     |
| `axis`      | `x`,`y` | no       |  specific to [bar visualisation types](/dashboards/visualisations/bar-vis) |

### Example usage

```js
column: {
  ...
  measure: [
    { id: 'establishment_id', display: 'Establisment ID' }, 
    { id: 'count', display: 'No of ' }
  ]
  ...
}
```
- filters out rows whose values for `establishment_id` and `count` are `null` or `undefined`
- will use the values in columns `establishment_id` and `count` to create the visualisation/chart

<hr class='dpr-docs-hr'/>

# filter

The `filter`array is used to:
- filter the dataset based on specific column values

The `filter` array works by:
- specifying the column and value you want to filter the data set by
- filtering out rows that do not match the criteria

### Schema

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `equals`    | string, `null`  | Yes      |  The value the column should match                       |

### Example usage 1 - string matching

```js
column: {
  filter: [
    { id: 'establishment_id', equals: 'MDI' }, 
    { id: 'establishment_wing', equals: 'North' }
  ]
  ...
}
```
- filters out rows whose values for `establishment_id` column are not 'MDI' 
- filters out rows whose values for `establishment_wing` column are not 'North' 

### Example usage 2 - Null matching

```js
column: {
  filter: [
    { id: 'establishmenr_wing', equals: null },
    { id: 'establishment_wing', equals: 'North' }
  ]
  ...
}
```
- filters out rows whose values for `establishment_wing` column are not 'North' 
- filters out rows whose values for `establishment_wing` column are not `null`, `undefined` or an empty string 

<hr class='dpr-docs-hr'/>

# expectNull

`expectNull` is used to:
- filter out rows based on the values of the **unspecified columns** that are not defined in `key`, `measure` or `filter` 

`expectNull` works by:
- checking all the columns that have not been specified in `key`, `measure` or `filter`
- filtering out columns based on their non-null/null state. 

See the [Targeting specific rows](#targeting-specific-rows) example for usage, and how this field effects the visualisation dataset

<hr class='dpr-docs-hr'/>

# Examples

The following examples will demonstrate the targeting of specific rows, using the `list` visualisation type.

- [Targeting specific rows](#targeting-specific-rows)
- [Filtering by column value](#filtering-by-column-value)
- [Targeting prisoner totals](#targeting-prisoner-totals)
- [Targeting diet totals](#targeting-diet-totals)
- [Diet totals with sum total row](#diet-totals-with-sum-total-row)
- [Cell totals with sum total row](#cell-totals-with-sum-total-row)


### Example Dataset

For these examples we will use mocked data that represents diet totals as our master dataset. 

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

# Targeting specific rows

This example shows a visualisation definiton of type `list`, where the keys are `est_id` and `wing`, with a measure of `count`: 

```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals by wing',
  column: {
    key: [
      {
        id: 'est_id',
      },
      {
        id: 'wing',
      },
    ],
    measure: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
  },
}
```

This definition will return the following dataset:

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north |       |             | 140   |
| 2025/02/25 | MDI      | north | cell1 |             | 30    |
| 2025/02/25 | MDI      | north | cell2 |             | 29    |
| 2025/02/25 | MDI      | north | cell3 |             | 13    |
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
```

Note that rows with `cell` values were also returned here also, as the defintion returns all rows where the `keys` and `measures` are defined.

## expectNull

To filter out the rows with `cell` values, and therefore specifically target the row for wing totals, we can specify `expectNulls` as `true`

This defines that all remaining columns that are **NOT** specified in the definition, **MUST** contain null values to be a valid row. 

e.g.
```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals by wing',
  column: {
    key: [
      {
        id: 'est_id',
      },
      {
        id: 'wing',
      },
    ],
    measure: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNull: true, // <-- all remaining cols other than est_id, wing, and count, must be null.
  },
}
```

will return the following dataset:

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north |       |             | 140   |
```

which will produce the following `list` visualisation.

```js
| Total prisoners | 
|-----------------|
| 140             |
```

<hr class='dpr-docs-hr'/>

# Filtering by column value

### Definition

```js
{
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Cell totals by establishment',
  description: '',
  column: {
    key: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measure: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum'
      },
    ],
    filter: [
      {
        id: 'cell'
        equals: 'cell5'; 
      },
      {
        id: 'cell'
        equals: 'cell4'; 
      },
      {
        id: 'wing'
        equals: 'north'; 
      },
    ]
    expectNull: false
  },
}
```

- returns rows where `cell` values are 'cell5' or 'cell4'
- returns rows where `wing` value is 'north

### Visualisation dataset

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
```

### Visualisation

```js
| Cell  | Total prisoners | 
|-------|-----------------|
| cell4 | 26              |
| cell5 | 42              |
| Total | 140             |
```

<hr class='dpr-docs-hr'/>

# Targeting specific rows example using filters

This example uses filtering instead of expect nulls to create the dataset. The resultant dataset will be the same as the [first example](#targeting-specific-rows) that uses `expectNulls`

```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals by wing',
  column: {
    key: [
      {
        id: 'est_id',
      },
      {
        id: 'wing',
      },
    ],
    measure: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
  },
}
```

This definition will return the following dataset:

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north |       |             | 140   |
| 2025/02/25 | MDI      | north | cell1 |             | 30    |
| 2025/02/25 | MDI      | north | cell2 |             | 29    |
| 2025/02/25 | MDI      | north | cell3 |             | 13    |
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
```

Note that rows with `cell` values were also returned here also, as the defintion returns all rows where the `keys` and `measures` are defined.

## Filter by null values

To filter out the rows with `cell` values, and therefore specifically target the row for wing totals, we can specify a filter for `cell` that checks its value is empty

e.g.
```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals by wing',
  column: {
    key: [
      {
        id: 'est_id',
      },
      {
        id: 'wing',
      },
    ],
    measure: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'cell',
        equals: null,
      },
    ]
  },
}
```

will return the following dataset:

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north |       |             | 140   |
```

which will produce the following `list` visualisation.

```js
| Total prisoners | 
|-----------------|
| 140             |
```

<hr class='dpr-docs-hr'/>

# Targeting prisoner totals

### Definition

```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals',
  column: {
    key: [],
    measure: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNull: true,
  },
}
```
### Visualisation dataset

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 5000  |
```

### Visualisation:

```js
| Total prisoners | 
|-----------------|
| 5000            |
```

<hr class='dpr-docs-hr'/>

# Targeting diet totals

### Definition

```js
{
  id: 'diet-totals',
  type: 'list',
  display: 'Diet totals',
  description: '',
  column: {
    key: [],
    measure: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       | vegatarian  | 1507  |
| 2025/02/25 |          |       |       | Pescatarian | 1130  |
| 2025/02/25 |          |       |       | Vegan       | 1354  |
| 2025/02/25 |          |       |       | Omnivore    | 1009  |
```

### Visualisation:

```js
| Diet        | Total prisoners | 
|-------------|-----------------|
| vegatarian  | 1507            |
| Pescatarian | 1130            |
| Vegan       | 1354            |
| Omnivore    | 1009            |
```

<hr class='dpr-docs-hr'/>

# Diet totals with sum total row

### Definition

```js
{
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  column: {
    key: [
      {
        id: 'establishment_id',
      },
    ],
    measure: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum' 
      },
    ],
    expectNull: true,
  },
}
```

### Visualisation dataset

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      |       |       | vegatarian  | 169   |
| 2025/02/25 | MDI      |       |       | Pescatarian | 463   |
| 2025/02/25 | MDI      |       |       | Vegan       | 397   |
| 2025/02/25 | MDI      |       |       | Omnivore    | 80    |
```

### Visualisation:
 
```js
|  Establishment ID  | Diet        | Total prisoners | 
|--------------------|-------------|-----------------|
| MDI                | vegatarian  | 169             |
| MDI                | Pescatarian | 463             |
| MDI                | Vegan       | 397             |
| MDI                | Omnivore    | 80              |
| Total              |             | 1109            |
```

<hr class='dpr-docs-hr'/>

# Cell totals with sum total row

### Definition

```js
{
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Cell totals by establishment',
  description: '',
  column: {
    key: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measure: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum'
      },
    ],
    expectNull: false, // or undefined
  },
}
```

### Visualisation dataset

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north | cell1 |             | 30    |
| 2025/02/25 | MDI      | north | cell2 |             | 29    |
| 2025/02/25 | MDI      | north | cell3 |             | 13    |
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
```

### Visualisation:

```js
| Cell  | Total prisoners | 
|-------|-----------------|
| cell1 | 30              |
| cell2 | 29              |
| cell3 | 13              |
| cell4 | 26              |
| cell5 | 42              |
| Total | 140             |
```
