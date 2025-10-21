---
layout: layouts/dashboards.njk
title: Visualisation Definition
---
The visualisation definition is responsible for:

- specifying the type of visualisation
- retriveing the data needed for the visualisation from a single dataset
- defining the presentation information required to render the visualisation correctly

## Visualisation types:

- `list`
- `bar`
- `bar-timeseries`
- `dougnhut`
- `line`
- `line-timeseries`
- `matrix-timeseries`
- `scorecard`
- `scorecard-group`

## Visualisation definition

All visualisation types share the same common definition attributes:

| Name            | Type    | Required | Description                                                                       |
| ----------------| ------- | -------- | ----------------------------------------------------------------------------------|
| `id`            | string  | Yes      | The visualisation ID                                                              |
| `type`          | string  | Yes      | The visualisation type   See [Visualisation types](#visualisation-types)       |
| `display`       | string  | no       | The visualisation title                                                           |
| `description`   | string  | no       | The visualisation desciption                                                      |
| `columns`       | object  | yes      | The dataset colums definition. See [Columns](#columns)                            |
| `options`       | object  | no       | Set specific option per visualisation type [Options](#options)                            |

## Options

| Name            | Type    | Required | Description                                                                       |
| ----------------| ------- | -------- | ----------------------------------------------------------------------------------|
| `columnsAsList` | boolean | no       | default value: `false`. Specific to  [List visualisation](/dashboards/visualisations/list) |
| `showLatest`    | boolean | no       | default value: `true`. Specific to  [List visualisation](/dashboards/visualisations/list)  |

## Columns

The `columns` definition is responsible for targeting the required visualisation data from a dataset. See [Targeting data in a dataset](/dashboards/visualisations/targeting-data) for usage.

| Name          | Type    | Required | Description                                                |
| --------------| ------- | -------- | -----------------------------------------------------------|
| `keys`        | array   | Yes      |  The array of key column data. See [Key](#key)             |
| `measures`    | array   | Yes      |  The array of measure column data. See [Measure](#measure) |
| `filters`     | array   | no       |  The array of filter column data. See [Filter](#filter)    |
| `expectNulls` | boolean | no       |  Targets rows based on whether columns contain null/undefined values. See [here](/dashboards/visualisations/targeting-data/#targeting-specific-rows) for example usage                        |

## Key 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `optional`  | boolean | no       |  Defines whether the key is optional                      |

## Measure 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `display`   | string  | no       |  The display name of the column                          |
| `aggregate` | `sum`    | no       | The aggregation operation                               |
| `unit`      | `number`, `percentage`     | no       |  The unit type. Default: `number`     |
| `axis`      | `x`,`y` | no       |  specific to [bar visualisation types](/dashboards/visualisations/bar) |

## Filter 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `equals`    | string  | Yes      |  The value the column should match                       |
