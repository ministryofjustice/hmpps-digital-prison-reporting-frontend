---
layout: layouts/reporting.njk
title: Asynchronous reports
---
## 🚧 COMING SOON 🚧

**Asynchronous reports is not currently available. The process and documentation is currently in development and will be available soon.**

Embed reports where data is loaded asynchronously.

## What is Async Reporting?

Asynchronous reports are reports where the execution and the loading of data is done asynchronously. Reports are requested, and the report data is loaded in the backend. Unblocking the user from synchronous loading, allowing them to interact with other service features while the report loads. Once the report data has finished loading, the user can view the report. 

Async reporting is a three stage process:

- [Request the report](#request-the-report)
- [Poll the report status](#poll-the-report-status)
- [View the report](#view-the-report)

### Benefits of async reports

- Applying filters to the reports dataset before loading reduces load time compared to sync reports.
- Data is loaded in the background unblocking the user from interacting with other service features while the report loads.
- Users can view finished reports without reloading them.

### User journey

A typical journey for an async report:

1. The user clicks on a link to **request** a report
2. The user is presented with a selection of pre-request filters.
3. The user updates the filters and **requests** the report.
4. The user is presented with the report **status page** displaying the current report load status.
6. The report status is `finished`. 
7. The user views the report.

## Stages

### 1. Request the report

TBD

### 2. Polling the report status

TBD

### 3. Viewing the report
