# Bar Chart Visualisation Type

The `bar` chart visualisation type represents data as a bar chart visualisation.

Charts are accompanied by a table/list representation of the underlying chart data. 

## When to use

Use this visualisation type when you need to display data as a bar chart. 

## Visualisation Definition Structure

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

## Bar chart representations

There are two ways to represent data from a dataset in a bar chart:

- [Using dataset columns as list bar co](#using-dataset-columns-as-list-rows)
- [Using dataset rows as list rows](#using-dataset-rows-as-list-rows)

## Examples
