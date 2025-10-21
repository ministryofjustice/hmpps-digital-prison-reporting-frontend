---
layout: layouts/dashboards.njk
title: Line chart
subsection: Visualisation definition
---

The `matrix-timeseries` chart visualisation type represents data as a matrix/heatmap chart visualisation.

Charts are accompanied by a table/list representation of the underlying chart data. 

## When to use

Use this visualisation type when you need to display historic data in as a heatmap. 

## Definition

```js
{
  id: 'line-definition-example',
  type: 'matrix-timeseries',
  display: 'Matrix timeseries chart',
  description: 'Matrix visualisation description',
  options: {
    ...
  }
  columns: {
    ...
  }
}
```

### Options: 

```js
options: {}
```

To learn more about defining the data for the visualisation using the `columns` field see [here](/dashboards/visualisations/targeting-data)

# Examples

## Define a timeseries matrix chart


