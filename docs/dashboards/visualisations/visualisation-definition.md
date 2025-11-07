---
layout: layouts/dashboards.njk
title: Visualisation Definition
---
The visualisation definition is responsible for:

- specifying the type of visualisation
- retriveing the data needed for the visualisation from a single dataset
- defining the presentation information required to render the visualisation correctly

**contents**
- [Visualisation Types](#visualisation-types)
- [Definition](#definition)

<hr class='dpr-docs-hr'/>

# Visualisation Types

- `list`
- `bar`
- `bar-timeseries`
- `dougnhut`
- `line`
- `line-timeseries`
- `matrix-timeseries`
- `scorecard`
- `scorecard-group`

<hr class='dpr-docs-hr'/>

# Definition

All visualisation types share the same common definition attributes:

| Name            | Type    | Required | Description                                                                       |
| ----------------| ------- | -------- | ----------------------------------------------------------------------------------|
| `id`            | string  | Yes      | The visualisation ID                                                              |
| `type`          | string  | Yes      | The visualisation type   See [Visualisation types](#visualisation-types)       |
| `display`       | string  | no       | The visualisation title                                                           |
| `description`   | string  | no       | The visualisation desciption                                                      |
| `column`       | object  | yes      | The dataset colums definition. See [Columns](#columns)                            |
| `option`       | object  | no       | Set specific option per visualisation type [Options](#options)                            |

## Options

| Name            | Type    | Required | Description                                                                       |
| ----------------| ------- | -------- | ----------------------------------------------------------------------------------|
| `columnsAsList` | boolean | no       | default value: `false`. Specific to  [List visualisation](/dashboards/visualisations/list) |
| `showLatest`    | boolean | no       | default value: `true`. Specific to  [List visualisation](/dashboards/visualisations/list)  |
| `useRagColour` | boolean | no       | default value: `false`. Specific to  [Bucketed visualisations](/dashboards/visualisations/custom-buckets)  |
| `baseColour`    | string  | No       | dDefault: `#1d70b8`. Specific to  [Bucketed visualisations](/dashboards/visualisations/custom-buckets)            |
| `bucket`       | Array   | No       | Defines the custom buckets. Specific to  [Bucketed visualisations](/dashboards/visualisations/custom-buckets)              |

## Columns

The `columns` definition is responsible for targeting the data required by the visualisation. 

See [Targeting data in a dataset](/dashboards/visualisations/visualisation-dataset) for usage.

| Name          | Type    | Required | Description                                                |
| --------------| ------- | -------- | -----------------------------------------------------------|
| `key`        | array   | Yes      |  The array of key columns. See [Key](#key)             |
| `measure`    | array   | Yes      |  The array of measure columns. See [Measure](#measure) |
| `filter`     | array   | no       |  The array of filter columns. See [Filter](#filter)    |
| `expectNull` | boolean | no       |  Targets rows based on whether columns contain null/undefined values. See [here](/dashboards/visualisations/visualisation-dataset/#targeting-specific-rows) for example usage                        |

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
| `axis`      | `x`,`y` | no       |  specific to [bar visualisation types](/dashboards/visualisations/bar-vis) |

## Filter 

| Name        | Type    | Required | Description                                              |
| ------------| ------- | -------- | -------------------------------------------------------- |
| `id`        | string  | Yes      |  The id/column name of the column within the dataset     |
| `equals`    | string  | Yes      |  The value the column should match                       |
