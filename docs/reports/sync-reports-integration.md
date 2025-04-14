---
layout: layouts/sync-reports.njk
title: Sync reports integration guide
---
Perform the following integration steps in your `routes` file.

## Prerequisites

- Install the DPR library ([see here for integration guide](/get-started/integrating-the-library))

## Import the Utility helper

```js
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'
```

## Integration types:

There are three ways to integrate sync reports into your service:

- [Integrate using a handler](#integrate-using-a-handler) (**_Recommended_**)
- [Integrate using a method](#integrate-using-a-method)
- [Integrate with data](#integrate-with-data)

### Integrate using a handler

**Recommended**

```js
app.get(
  '/handler',
  ReportListUtils.createReportListRequestHandler({
    title: 'Test app',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:3010`,
    apiTimeout: 10000,
    layoutTemplate: 'page.njk',
    tokenProvider: (req, res, next) => res.locals.user.token,
    definitionsPath: 'definitions/prisons/test'
  }),
)
```

### Integrate using a method

```js
app.get('/method', (req, res, next) => {
  const args = {
    title: 'Method',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: 'http://localhost:3010',
    layoutTemplate: 'page.njk',
  }

  ReportListUtils.renderListWithDefinition({
    ...args,
    request: req,
    response: res,
    next,
  })
})
```

### Integrate with data

```js
app.get('/data', (req, res, next) => {
  const MyVariantDefinition = Promise.resolve(reportName, variantName)
  const args = {
    title: 'Test app',
    reportName: 'ReportName',
    variantDefinition: MyVariantDefinition,
    getListDataSources: () => ({
      data: Promise.resolve(data),
      count: Promise.resolve(data.length),
    }),
    otherOptions: {
      exampleOption: true,
    },
    layoutTemplate: 'page.njk',
  }

  ReportListUtils.renderListWithData({
    ...args,
    request: req,
    response: res,
    next,
  })
})

```
