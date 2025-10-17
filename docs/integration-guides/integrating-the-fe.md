---
layout: layouts/integration-guides/integrate-the-fe.njk
title: Integrating the FE
subsection: Integration Guides
---

This guide describes the integration process to add FE components and processes into your service. 


## Pre-requisites

- [Integrate the DPR FE Library](/integration-guides/integrating-the-library)
- [Integrate the DPR platform](/integration-guides/integrating-the-platform)

## Contents

- [Report Catalogue component](#report-catalogue-component)
- [Implement request route directly](#implement-request-route-directly)
- [User reports list component](#user-reports-list-component)
- [Render report as list](#render-report-as-list)

<hr class='dpr-docs-hr'>

# Report Catalogue component

This component supports the DPR platform functionality by providing a unified way of listing and navigating reports 

The catalogue component is used to:

- view report variants in a list.
- view report information such as product, variant name, and description in the list.
- filter the list columns by string.
- request variants.
- bookmark variants.

## Initialise the components render data 

Initialise the component with the required data using the component utility helper and pass it to the `res.render` function.

```js
// server/routes/index.ts

import CatalogueUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/_catalogue/catalogue/utils'


export function routes(services: Services): Router {

  ...

  router.get('/path/to/catalogue', (req, res) => {
    const catalogue = await CatalogueUtils.init({ res, services })
    res.render('reports-catalogue.njk', {
      catalogue
    })
  })
}

export default routes
```

## Add the component to your HTML

```js
{ from "components/_catalogue/catalogue/view.njk" import dprCatalogue }

{ dprCatalogue(catalogue) }
```

See [Catalogue](/components/catalogue) component for usage and examples.

<hr class='dpr-docs-hr'>

# User reports list Component

This component is used to visualise and enable users to keep track of all requests, bookmarks and recently viewed reports so you can quickly navigate around the embedded DPR platform.

It is responsible for:  

- Listing requested reports
- Listing recently viewed reports
- Listing bookmarks
- Polling the status of a requested.

## Initialise the lists render data 

Initialise the component with the required data using the component utility helper:

```js
// server/routes/index.ts

import UserReportsListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/user-reports/utils'


export function routes(services: Services): Router {

  ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const userReportsLists = await UserReportsListUtils.init({ res, req, services })

    res.render('requested-reports.njk', {
      title: 'DPR test site',
      userReportsLists
    })
  })
}

export default routes
```

## Add the component to your HTML

```js
{ from "@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/user-reports/view.njk" import dprUserReports }

{ dprUserReports(userReportsLists) }
```

See [Reports List](/components/reports-list) component for usage and examples.

<hr class='dpr-docs-hr'>

# Implement request route directly

If you prefer to create your own report listings, and not use DPR's [Catalogue component](#report-catalogue-component), you can link your reports to the request path directly to start the process.

```html
<h1>My reports list</h1>

<a href="dpr/request-report/report/report-id-1/variant-id-1-1/filters">Async report 1</a>
<a href="dpr/request-report/report/report-id-1/variant-id-1-2/filters">Async report 2</a>
<a href="dpr/request-report/report/report-id-2/variant-id-2-1/filters">Async report 3</a>
```

url structure:

```
/dpr/request-report/:report-type/:report-id/:variant-id/filters
report-type: "report" | "dashboard" 
```

<hr class='dpr-docs-hr'>

# Render report as list

As an alternative to requesting a report, reports can be loaded syncronously and rendered as a list. 

There are three ways to render a report as a list that loads synchronously into your service:

- [Render using a handler](#render-using-a-handler) (**_Recommended_**)
- [Render using a method](#render-using-a-method)
- [Render with data](#render-with-data)

### Render using a handler

**Recommended**

```js
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'

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

### Render using a method

```js
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'

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

### Render with data

```js
import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'

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
