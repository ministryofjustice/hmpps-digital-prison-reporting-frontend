---
layout: layouts/integration-guides/integrate-the-fe.njk
title: Integrating the FE
subsection: Integration Guides
---

This guide describes the integration process to add FE components and processes into your service.

## Pre-requisites

- [Integrate the DPR FE Library](/integration-guides/integrating-the-library)
- [Integrate the DPR platform](/integration-guides/integrating-the-fe-platform)

## Contents

- [Viewing a report](#viewing-a-report)
- [Optional components](#optional-components)

<hr class='dpr-docs-hr'>

# Viewing a report

- [Request or load report via href](#request-or-load-report-via-href)

<hr class='dpr-docs-hr'>

# Request or load report via href

## Async reports

```html
<h1>My Async reports list</h1>

<a href="/dpr/request-report/report/report-id-1/variant-id-1-1/filters">Async report 1</a>
<a href="/dpr/request-report/report/report-id-1/variant-id-1-2/filters">Async report 2</a>
<a href="/dpr/request-report/report/report-id-2/variant-id-2-1/filters">Async report 3</a>
```

See [async routes docs](/get-started/routes#asynchronous-routes) for route structure

## Sync reports

```html
<h1>My Sync reports list</h1>

<a href="/dpr/view-report/sync/report/report-id-1/variant-id-1-1/load-report">Sync report 1</a>
<a href="/dpr/view-report/sync/report/report-id-1/variant-id-1-2/load-report">Sync report 2</a>
<a href="/dpr/view-report/sync/report/report-id-2/variant-id-2-1/load-report">Sync report 3</a
```

See [sync routes docs](/get-started/routes#synchronous-routes) for route structure

<hr class='dpr-docs-hr'>

# Optional components

- [Report Catalogue component](#report-catalogue-component)
- [User reports list component](#user-reports-list-component)

<hr class='dpr-docs-hr'>

# Report Catalogue component

This component provides a unified way of listing and navigating reports

The catalogue component is used to:

- view report variants in a list.
- view report information such as product, variant name, and description in the list.
- filter the list columns by string.
- request variants.
- bookmark variants.

## Using this component

There are two ways of interacting with this component:

- Using the configured route, made available by integrating the DPR routes. See <a href="/get-started/routes" target="_blank">Routes</a>
- Embedding the component into your HTML directly.

## Embedding the component into your HTML directly

Follow this method if you want to embed the component into a pre-existing page that you have full control over.

### Initialise the components render data

Initialise the component with the required data using the component utility helper and pass it to the `res.render` function.

```js
// server/routes/index.ts
import { initCatalogue } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/catalogueUtils'

export function routes(services: Services): Router {
  ...
  router.get('/path/to/catalogue', (req, res) => {
    const catalogue = await initCatalogue({ res, services })
    res.render('reports-catalogue.njk', {
      catalogue
    })
  })
}
export default routes
```

### Add the component to your HTML

```js
// reports-catalogue.njk
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

## Using this component

There are two ways of interacting with this component:

- Using the configured route, made available by integrating the DPR routes. See <a href="/get-started/routes" target="_blank">Routes</a>
- Embedding the component into your HTML directly

## Embedding the component into your HTML directly

Follow this method if you want to embed the component into a pre-existing page that you have full control over.

### Initialise the lists render data

Initialise the component with the required data using the component utility helper:

```js
// server/routes/index.ts

import { initUserReports } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/userReportsListUtils'


export function routes(services: Services): Router {

  ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const userReportsLists = await initUserReports({ res, req, services })

    res.render('requested-reports.njk', {
      title: 'DPR test site',
      userReportsLists
    })
  })
}

export default routes
```

### Add the component to your HTML

```js
{ from "@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/user-reports/view.njk" import dprUserReports }

{ dprUserReports(userReportsLists) }
```

See [Reports List](/components/reports-list) component for usage and examples.

<hr class='dpr-docs-hr'>
