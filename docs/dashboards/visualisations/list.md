# List Visualisation Type

The list visualisation type represents data as a simple list visualisation.

## When to use

Use this visualisation type when you need to display data in a list. 

## Definition Structure

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

To learn more about defining the data for the visualisation using the `columns` field see [here](./visualisation-definition.md#targeting-data-in-a-dataset)

## List representations

There are two ways to represent data from a dataset as a list:

- [Using dataset rows as list rows](#using-dataset-rows-as-list-rows)
- [Using dataset columns as list rows](#using-dataset-columns-as-list-rows)

## Examples

For these examples we will use this mocked dataset:

```
| est_id | metric_1 | metric_2 | metric_3 | metric_4 |
|--------|----------|----------|----------|----------|
| MDI    | 100      | 231      | 300      | 500      |
| SLI    | 200      | 238      | 280      | 320      |
| LTI    | 150      | 208      | 220      | 214      |
```

### Using dataset rows as list rows:

List visualisation:

```
| Establishment ID | Metric 1 | Metric 2 title | Random name |
|------------------|----------|----------------|-------------|
| MDI              | 100      | 231            | 300         |
| SLI              | 200      | 238            | 280         |
| LTI              | 150      | 208            | 220         |
```

The definition: 

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

### Using dataset columns as list rows:

List visualisation
```
                 | MDI      | SLI      | LTI      |
|----------------|----------|----------|----------|
| Metric 1       | 100      | 200      | 150      |
| Metric 2 title | 231      | 238      | 208      |
| Random name    | 300      | 280      | 220      |
```

the definition: 

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

