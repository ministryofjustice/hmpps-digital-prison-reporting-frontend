---
layout: layouts/get-started.njk
title: Routes
subsection: Platform
---

Integrating the platform will give you a set of routes that you can nest into your current app structure. See [here](/integration-guides/integrating-the-fe-platform#initialise-routes) for how to integrate, and nest the DPR routes into you app structure.

## Manage reports routes

These routes provide you with the means to manage and search your reports

- [DPR style homepage](#dpr-style-homepage)
- [Report catalogue route](#report-catalogue-route)
- [My reports routes](#my-reports-routes)

## Loading reports routes

The provided routes allow you to run reports either **synchronously**, or **asynchronously**

- [Synchronous routes](#synchronous-routes)
- [Asynchronous routes](#asynchronous-routes)

<hr class='dpr-docs-hr'/>

# Manage reports routes

## DPR style homepage

```js
/dpr
```

This route resolves to a view with a configured report catalogue, and user reports lists

## Report catalogue route

```js
/dpr/report-catalogue
```

This route resolves to a view with a configured report catalogue

## My reports routes

```
/dpr/my-reports
```

This route resolves to a view with a configured user reports list that shows requested reports, recently viewed reports, and bookmarks if this has been configured.

In addition to this, the following routes allow you to drill down into each list individually:

```
/dpr/my-reports/requested-reports/list
/dpr/my-reports/recently-viewed/list
/dpr/my-reports/bookmarks/list
```

<hr class='dpr-docs-hr'/>

# Loading reports routes

## Synchronous routes

- [Load report](#load-report)
- [View report](#view-report)

### Load report

```js
/dpr/view-report/sync/:type/:reportId/:id/load-report
```

| param       | description           |
| ----------- | --------------------- |
| `:type`     | `report`, `dashboard` |
| `:reportId` | The report/product ID |
| `:id`       | The variant ID        |

The route resolves to the report loading page:

- Displays the meta data about the report while the report is loading
- Automatically redirects to the report once the report data has loaded

### View report

```js
/dpr/view-report/sync/:type/:reportId/:id/report
```

| param       | description           |
| ----------- | --------------------- |
| `:type`     | `report`, `dashboard` |
| `:reportId` | The report/product ID |
| `:id`       | The variant ID        |

<hr class='dpr-docs-hr'/>

## Asynchronous routes

Asynchronous reporting is a 3 stage linear process:

- Request report, with optional filters
- Execution status polling
- View report

**Routes**

- [Request](#request)
- [Polling](#polling)
- [View](#view)

### Request

```js
/dpr/request-report/:type/:reportId/:id/filters
```

| param       | description           |
| ----------- | --------------------- |
| `:type`     | `report`, `dashboard` |
| `:reportId` | The report ID         |
| `:id`       | The variant ID        |

This is the entry point to the reporting process.

The request route is where users will:

- Apply filters to the master dataset.
- Apply sorting options.
- Request the report.

Upon requesting a report the user is navigated to the polling route.

The `executionId` required for the polling route is returned by the report request.

### Polling

```js
/dpr/request-report/:type/:reportId/:id/:executionId/status
```

| param          | description                                     |
| -------------- | ----------------------------------------------- |
| `:type`        | `report`, `dashboard`                           |
| `:reportId`    | The report ID                                   |
| `:id`          | The variant ID                                  |
| `:executionId` | The execution ID produced by the report request |

The route resolves to the polling page:

- Shows the user the current status of a report request
- Polls the for the report status **every second**
- Directs the user to the report route when request is finished and the data is loaded.

The `tableId` required for the view route is returned by the polling endpoint.

### View

```js
/dpr/view-report/async/:type/:reportId/:id/:tableId/:type
```

| param       | description                                  |
| ----------- | -------------------------------------------- |
| `:loadType` | `async`, `sync`                              |
| `:type`     | `report`, `dashboard`                        |
| `:reportId` | The report ID                                |
| `:id`       | The variant ID                               |
| `:tableId`  | The ID of the table where the data is stored |

The route resolves to the report page:

- Displays the report, or dashboard
