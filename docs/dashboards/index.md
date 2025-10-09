---
layout: layouts/dashboards.njk
title: Dashboards
---
🚧 This section is a work in progress 🚧

A dashboard a collection of things. The role of the dashboard is present data in easy to digest slices, through the use of various [visualisation types](#visualisations).

## Structure

A dashboards structure is defined by a [dashboard definition](/dashboards/definitions/dashboard-definition).

A dashboard has: 

- a title and a description
- zero or many **filters**
- zero or many **sections**
- zero or many **visualisations** within a **section**


## Visualisations

Visualisations are defined by a [visualisation definition](/dashboards/visualisations/visualisation-definition)

A visualisation definition can be one of the following types:

- [`list`](/dashboards/visualisations/line)
- [`bar`](/dashboards/visualisations/bar)
- [`doughnut`](/dashboards/visualisations/doughnut)
- [`line`](/dashboards/visualisations/line)
- [`scorecard`](/dashboards/visualisations/scorecard)
- [`scorecard-group`](/dashboards/visualisations/scorecard-group)


## Data

A dashboard is always backed by a **single** dataset.
