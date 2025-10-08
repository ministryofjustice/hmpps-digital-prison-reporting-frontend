---
layout: layouts/dashboards.njk
title: Visualisation Definition
---
The visualisation definition is responsible for:

- specifying the type of visualisation
- retriveing the data needed for the visualisation from a single dataset
- defining the presentation information required to render the visualisation correctly

All visualisation types share the same common definition attributes:

| Name            | Type    | Required | Description                                                                       |
| ----------------| ------- | -------- | ----------------------------------------------------------------------------------|
| `id`            | string  | Yes      | The visualisation ID                                                              |
| `type`          | `list` `bar` `dougnhut` `line` `scorecard` `scorecard-group` | Yes      | The visualisation type            |
| `display`       | string  | no       | The visualisation title                                                           |
| `description`   | string  | no       | The visualisation desciption                                                      |
| `columns`       | object  | yes      | The dataset colums definition. See [Columns](#columns)                            |
| `columnsAsList` | boolean | no       | default value: `false`. Specific to  [List visualisation](/dashboards/visualisations/list) |
| `showLatest`    | boolean | no       | default value: `true`. Determines whether to include historic data                |

### Columns

The `columns` definition is responsible for targeting the required visualisation data from a dataset. See [Targeting data in a dataset](#targeting-data-in-a-dataset) for usage.

| Name          | Type    | Required | Description                                                |
| --------------| ------- | -------- | -----------------------------------------------------------|
| `keys`        | array   | Yes      |  The array of key column data. See [Key](#key)             |
| `measures`    | array   | Yes      |  The array of measure column data. See [Measure](#measure) |
| `filters`     | array   | no       |  The array of filter column data. See [Filter](#filter)    |
| `expectNulls` | boolean | no       |  See [expectNulls](#expectNulls)                           |

### Key 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `optional`  | boolean | no       |  Defines whether the key is optional                      |

### Measure 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `aggregate` | `sum`    | no       | The aggregation operation                               |
| `unit`      | `number`, `percentage`     | no       |  The unit type. Default: `number`     |
| `axis`      | `x`,`y` | no       |  specific to [bar visualisation types](/dashboards/visualisations/bar) |

### Filter 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `equals`    | string  | Yes      |  The value the column should match                       |
