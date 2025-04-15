---
layout: layouts/dashboards.njk
title: Dashboard Visualisation Definition
---

These docs describe hows to define and use the dashboard visualisation definition

contents:
- [The Visualisation definition](#the-visualisation-definition)
- [Targeting data in a dataset](#targeting-data-in-a-dataset)

## Visualisation types

A visualisation definition can be one of the following types:

- [`list`](./line.md)
- [`bar`](./bar.md)
- [`doughnut`](./dougnhut.md)
- [`line`](./line.md)
- [`scorecard`](./scorecard.md)
- [`scorecard-group`](./scorcard-group.md)

## The Visualisation definition

The visualisation definition is responsible for:

- specifying the type of visualisation
- retriveing the data needed for the visualisation from a single dataset
- defining the presentation information required to render the visualisation correctly

All visualisation types share the same common definition attributes:

| Name          | Type    | Required | Description                                                             |
| --------------| ------- | -------- | ------------------------------------------------------------------------|
| `id`          | string  | Yes      | The visualisation ID                                                    |
| `type`        | enum    | Yes      | The visualisation type See [Visualisation types](#visualisation-types)  |
| `display`     | string  | no       | The visualisation title                                                 |
| `description` | string  | no       | The visualisation desciption                                            |
| `columns`     | object  | yes      | The dataset colums definition. See [Columns](#details)                  |
| `showLatest`  | boolean | no       | default value: `true`. Determines whether to include historic data      |

### Columns Definition

The `columns` definition is responsible for targeting the required visualisation data from a dataset. See [Targeting data in a dataset](#targeting-data-in-a-dataset) for usage.

| Name        | Type    | Required | Description                                                |
| ------------| ------- | -------- | -----------------------------------------------------------|
| `keys`      | array   | Yes      |  The array of key column data. See [Key](#key)             |
| `measures`  | array   | Yes      |  The array of measure column data. See [Measure](#measure) |
| `filters`   | array   | no       |  The array of filter column data. See [Filter](#filter)  |
| `expectNulls` | boolean   | no   |  See [expectNulls](#expectNulls)  |

### Key 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `optional`  | boolean  | no      |  Defines whether the key is optional                     |

### Measure 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `aggregate` | enum    | no       |  `sum`                                                   |
| `unit`      | enum    | no       |  `number` | `percentage`                                 |
| `axis`      | `x` | `y` | no     |  specific to `bar` visualisation types                   |

### Filter 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `equals`    | string  | Yes      |  The value the column should match                       |

See [Filtering a dataset by column value](#filtering-a-dataset-by-column-value) for usage
