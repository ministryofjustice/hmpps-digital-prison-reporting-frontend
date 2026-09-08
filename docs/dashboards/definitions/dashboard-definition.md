---
layout: layouts/dashboards.njk
title: Dashboard Definition
subsection: Dashboards
---

The dashboard definition is responsible for defining the structure and IA of a dashboard:

- a name, a description and a dataset
- zero or many filters
- zero or many sections
- zero or many visualisations within a section
- zero or many dashboard children (for parent-child dashboards)

**contents**
- [Definition](#definition)
- [Basic example](#basic-example)
- [Parent-child example](#parent-child-example)

<hr class='dpr-docs-hr'/>

# Definition

| Name          | Type    | Required | Description                                                             |
| --------------| ------- | -------- | ------------------------------------------------------------------------|
| `id`          | string  | yes      | The dashboard ID                                                        |
| `name`        | string  | yes      | The dashboard title                                                     |
| `description` | string  | yes      | The dashboard description                                               |
| `dataset`     | string  | yes      | The dashboard dataset                                                   |
| `section`     | array   | yes      | The dashboard sections. See [Section](#section)                         |
| `child`       | array   | no       | The dashboard's children. See [Child](#child)                             |

## Section

| Name             | Type    | Required | Description                                                          |
| -----------------| ------- | -------- | ---------------------------------------------------------------------|
| `id`             | string  | yes      | The section ID                                                       |
| `display`        | string  | yes      | The section title                                                    |
| `description`    | string  | yes      | The section description                                               |
| `visualisation`  | array   | yes      | The visualisation definitions. See [Visualisation Definition](/dashboards/visualisations/visualisation-definition/)   |

## Child

| Name             | Type    | Required | Description                                                          |
| -----------------| ------- | -------- | ---------------------------------------------------------------------|
| `dashboardId`    | string  | yes      | The ID of the child dashboard                                        |

<hr class='dpr-docs-hr'/>

# Basic example

```js
{
  id: 'dashboard-definition-example',
  name: 'Dashboard Definition Example',
  description:
    'A dashboard is made up of multiple sections. Each section can have a title, description, and multiple visualisation types',
  dataset: 'dataset-1',
  section: [
    {
      id: 'section-1',
      display: 'Section 1',
      description: 'Section 1 description',
      visualisation: [...],
    },
    {
      id: 'section-2',
      display: 'Section 2',
      description: 'Section 1 description',
      visualisation: [...],
    },
    {
      id: 'section-3',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisation: [...],
    },
  ],
}
```

<hr class='dpr-docs-hr'/>

# Parent-child example

For parent-child dashboards, the `child` property specifies a dashboard that holds zero or many child dashboards.
Different dashboards may use different datasets in order to display visualisations bearing different data subjects.

Assuming a DPD was created containing 3 dashboards - one parent (id: `dashboard-parent`) and two children (id: `dashboard-child-1` and `dashboard-child-2`), the parent dashboard could be setup as follows:

```js

{
  id: 'dashboard-parent',
  name: 'Dashboard Parent Child Example',
  description:
    'A dashboard is made up of multiple sections. Each section can have a title, description, and multiple visualisation types',
  dataset: 'dataset-1',
  section: [
    {
      id: 'section-1',
      display: 'Section 1',
      description: 'Section 1 description',
      visualisation: [...],
    },
    {
      id: 'section-2',
      display: 'Section 2',
      description: 'Section 1 description',
      visualisation: [...],
    },
    {
      id: 'section-3',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisation: [...],
    },
  ],
  child: [
    { dashboardId: 'dashboard-child-1' },
    { dashboardId: 'dashboard-child-2' },
  ],
}
```
