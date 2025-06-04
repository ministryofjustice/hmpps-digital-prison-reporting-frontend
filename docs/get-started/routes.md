---
layout: layouts/get-started.njk
title: Routes
subsection: Platform
---
Integrating the platform will give you access to the following page routes:

- [Request route](#request-route)
- [Polling route](#polling-route)
- [Report route](#report-route)

# Request route

This is the entry point to the reporting process.

The request route is where users will:

- Apply filters to the master dataset.
- Apply sorting options.
- Request the report.

Upon requesting a report the user is navigated to the polling route

### Path

```js
/async/:type/:reportId/:id/request
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **id**: The variant ID

# Polling route

- Shows the user the current status of a report request
- Polls the for the report status **every 5 seconds**
- Directs the user to the report route when request is finished and the data is loaded.

### Path

```js
/async/:type/:reportId/:id/request/:executionId
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **id**: The variant ID
- **executionId**: The execution ID produced by the report request

# Report route

The report page

### Path

```js
/async/:type/:reportId/:id/request/:tableId/report'
```

- **type**: `report` | `dashboard` 
- **reportId**: The report ID
- **id**: The variant ID
- **tableId**: The ID of the table where the data is stored.
