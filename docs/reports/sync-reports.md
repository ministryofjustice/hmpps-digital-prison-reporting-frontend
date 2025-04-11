---
layout: layouts/sync-reports.njk
title: Integrate sync reports into your service
---
## Integrate using a handler

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

## Integrate using a method

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

## Integrate with data

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
