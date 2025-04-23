---
layout: layouts/async-reports/async-reports.njk
title: Asynchronous reports
---
## 🚧 COMING SOON 🚧

**Asynchronous reports is currently unavailable. The process and documentation is in development and will be available soon.**

Embed reports where data is loaded asynchronously.

# What is Async Reporting?

Asynchronous reports are reports where the execution and the loading of data is done asynchronously. 

Reports are requested with user defined filters that are applied to a reports master dataset. The data is loaded in the backend asynchronously which creates a subset of data based in the users request filters. 

During the data loading process, the FE is unblocked from synchronous loading and users can interact with other service features while the report data loads.

Once loaded, the user can view the report. Interactive filters can be applied within the report view, and are applied to the data subset for quick and responsive filtering.

Loaded/Ready reports can be revisited without re-requesting the data subset for 24 hours. 

## Async User Journey

[See here](/reports/async-reports-user-journey) for details on the user journey

## Live example 

You can view and test a working example of asynchronous reporting through our [main service](https://digital-prison-reporting-mi-ui-dev.hmpps.service.justice.gov.uk/). 
