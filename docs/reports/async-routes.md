---
layout: layouts/async-reports/async-reports.njk
title: Routes
subsection: Asynchronous reports
---
Integrating Async reporting will give you access to the following page routes:

- [Request Page](#request-page)
- [Polling Page](#polling-page)
- [Report Page](#report-page)

# Request page

This is the entry point to the async process.

The request page is where users will:

- Apply filters to the master dataset.
- Apply sorting options.
- Request the report.

Upon requesting a report, the user is navigated to the polling page

### Path

```js
/async/:type/:reportId/:id/request
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **id**: The variant ID

# Polling page

- Shows the user the current status of a report request
- Polls the for the report status **every 5 seconds**
- Directs the user to the report page when request is finished and data is loaded.

### Path

```js
/async/:type/:reportId/:id/request/:executionId
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **id**: The variant ID
- **executionId**: The execution ID produced by the report request

# Report page

The report page

### Path

```js
/async/:type/:reportId/:id/request/:tableId/report'
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **id**: The variant ID
- **tableId**: The ID of the table where the data is stored.
