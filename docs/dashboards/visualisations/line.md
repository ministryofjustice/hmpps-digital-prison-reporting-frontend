---
layout: layouts/dashboards.njk
title: Line chart
subsection: Visualisation definition
---

The `line` chart visualisation type represents data as a line chart visualisation.

Charts are accompanied by a table/list representation of the underlying chart data. 

## When to use

Use this visualisation type when you need to display data in as a line chart. 

## Definition

```js
{
  id: 'line-definition-example',
  type: 'line',
  display: 'line title',
  description: 'line visualisation description',
  columns: {
    ...
  }
}
```

To learn more about defining the data for the visualisation using the `columns` field see [here](/dashboards/visualisations/targeting-data)

# Examples
