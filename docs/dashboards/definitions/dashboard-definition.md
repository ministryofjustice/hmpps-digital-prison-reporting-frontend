---
layout: layouts/dashboards.njk
title: Dashboard Definition
---
The dashboard definition is responsible for defining the structure and IA of a dashboard:

- a title and a description
- zero or many filters
- zero or many sections
- zero or many visualisations within a section

**contents**
- [Definition](#definition)
- [Example](#example)

<hr class='dpr-docs-hr'/>

# Definition

| Name          | Type    | Required | Description                                                             |
| --------------| ------- | -------- | ------------------------------------------------------------------------|
| `id`          | string  | yes      | The dashboard ID                                                        |
| `name`        | string  | yes      | The dashboard title                                                     |
| `description` | string  | yes      | The dashboard desciption                                                |
| `sections`    | array   | yes      | The dashboard sections. See [Section](#section)                         |
| `filterFields`| boolean | no       | The dashboard filters                                                   |

## Section

| Name             | Type    | Required | Description                                                          |
| -----------------| ------- | -------- | ---------------------------------------------------------------------|
| `id`             | string  | yes      | The section ID                                                       |
| `display`        | string  | yes      | The section title                                                    |
| `description`    | string  | yes      | The section desciption                                               | 
| `visualisations` | array   | yes      | The visualisation definitions. See [Visualisation Definition](/dashboards/visualisations/visualisation-definition/)   |

<hr class='dpr-docs-hr'/>

# Example

```js
{
  id: 'dashboard-definition-example',
  name: 'Dashboard Defintion Example',
  description:
    'A dashboard is made up of multiple sections. Each section can have a title, description, and multiple visualisation types',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1',
      description: 'Section 1 description',
      visualisations: [...],
    },
    {
      id: 'section-2',
      display: 'Section 2',
      description: 'Section 1 description',
      visualisations: [...],
    },
    {
      id: 'section-3',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisations: [...],
    },
  ],
  filterFields: [...],
}
```


