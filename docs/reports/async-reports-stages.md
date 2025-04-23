---
layout: layouts/async-reports/async-reports.njk
title: Stages
subsection: Asynchronous reports
---

Async reporting is a three stage process:

- [Request report](#request-the-report)
- [Polling request status](#poll-the-report-status)
- [View Report](#view-the-report)

## Request report

This path will show the request page.

```js
/async/:type/:reportId/:id/request'
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **ID**: The variant ID

## Polling request status

This path will show the polling page.

```js
/async/:type/:reportId/:id/request/:executionId
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **ID**: The variant ID
- **executionId**: The execution ID produced by the report request

## Viewing report

This path will show the report page.

```js
/async/:type/:reportId/:id/request/:tableId/report'
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **ID**: The variant ID
- **tableId**: The ID of the table where the data is stored.
