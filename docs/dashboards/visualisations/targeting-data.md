---
layout: layouts/dashboards.njk
title: Targeting data in a dataset
---
These docs describe how to define a visualisation definition to target specific data within a dataset.

## How to target data

Data can be targeted to create a data subset specific to your visualisation by defining the following fields:

#### `keys` 
- Specifies the columns whose values are expected to be present for a specific row
- The column values are checked for the presence. 
- If a row contains values that are undefined the row is removed

#### `measures`
- Specifies the columns you want to include/visualise in your visualisation
- Does not affect the data sub-set
- Column values will be used/shown in your visualisation.

#### `filters`
- Specifies the column and value you want to filter the data set by
- The specified column is checked to contain a specified value
- If not equal, the row is removed

# Examples 

The following examples will demonstrate the targeting of specific rows, using the `list` visualisation type.

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

## Targeting specific rows

This example shows a visualisation definiton of type `list`, where the keys are `est_id` and `wing`, with a measure of `count`: 

```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals by wing',
  columns: {
    keys: [
      {
        id: 'est_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
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

### expectNulls field

To filter out the rows with `cell` values, and therefore specifically target the row for wing totals, we can specify `expectNulls` as `true`

This defines that all remaining columns that are **NOT** specified in the definition, **MUST** contain null values to be a valid row. 

e.g.
```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals by wing',
  columns: {
    keys: [
      {
        id: 'est_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true, // <-- all remaining cols other than est_id, wing, and count, must be null.
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

## Filtering by column value

```js
{
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Cell totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
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
    filters: [
      {
        id: 'cell'
        equals: 'cell5'; 
      },
      {
        id: 'cell'
        equals: 'cell4'; 
      }
      {
        id: 'wing'
        equals: 'north'; 
      }
    ]
    expectNulls: false, // or undefined
  },
}
```

Dataset returned: 

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
```

List visualisation:

```js
| Cell  | Total prisoners | 
|-------|-----------------|
| cell4 | 26              |
| cell5 | 42              |
| Total | 140             |
```

## Targeting Prisoner Totals

```js
{
  id: 'total-prisoners',
  type: 'list',
  display: 'Prisoner totals',
  columns: {
    keys: [],
    measures: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}
```
### Dataset returned: 

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       |             | 5000  |
```

### List visualisation:

```js
| Total prisoners | 
|-----------------|
| 5000            |
```

## Targeting diet Totals

```js
{
  id: 'diet-totals',
  type: 'list',
  display: 'Diet totals',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}
```

### Dataset returned: 

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 |          |       |       | vegatarian  | 1507  |
| 2025/02/25 |          |       |       | Pescatarian | 1130  |
| 2025/02/25 |          |       |       | Vegan       | 1354  |
| 2025/02/25 |          |       |       | Omnivore    | 1009  |
```

### List visualisation:

```js
| Diet        | Total prisoners | 
|-------------|-----------------|
| vegatarian  | 1507            |
| Pescatarian | 1130            |
| Vegan       | 1354            |
| Omnivore    | 1009            |
```

## Targeting diet totals by establishment, with a sum total row

```js
{
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
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
    expectNulls: true,
  },
}
```

### Dataset returned: 

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      |       |       | vegatarian  | 169   |
| 2025/02/25 | MDI      |       |       | Pescatarian | 463   |
| 2025/02/25 | MDI      |       |       | Vegan       | 397   |
| 2025/02/25 | MDI      |       |       | Omnivore    | 80    |
```

### List visualisation:
 
```js
|  Establishment ID  | Diet        | Total prisoners | 
|--------------------|-------------|-----------------|
| MDI                | vegatarian  | 169             |
| MDI                | Pescatarian | 463             |
| MDI                | Vegan       | 397             |
| MDI                | Omnivore    | 80              |
| Total              |             | 1109            |
```

## Targeting cell totals, with sum total row

```js
{
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Cell totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
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
    expectNulls: false, // or undefined
  },
}
```

Dataset returned: 

```js
| ts         |  est_id  | wing  | cell  | diet        | count | 
|------------|----------| ------|-------|-------------|-------|
| 2025/02/25 | MDI      | north | cell1 |             | 30    |
| 2025/02/25 | MDI      | north | cell2 |             | 29    |
| 2025/02/25 | MDI      | north | cell3 |             | 13    |
| 2025/02/25 | MDI      | north | cell4 |             | 26    |
| 2025/02/25 | MDI      | north | cell5 |             | 42    |
```

List visualisation:

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
