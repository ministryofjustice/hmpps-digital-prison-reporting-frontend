---
layout: layouts/integration-guides/integrate-the-fe.njk
title: Integrating the FE
subsection: Integration Guides
---

This integration quide describes the integration process to add FE components and processes to the FE to make use of the platform. 

## Pre-requisites

- [Integrate the DPR FE Library](/integration-guides/integrating-the-library)
- [Integrate the DPR platform](/integration-guides/integrating-the-platform)

## Contents

- [Implement request route directly](#implement-request-route-directly)
- [Report Catalogue component](#report-catalogue-component)
- [User reports list component](#user-reports-list-component)

# Implement request route directly

If you prefer to create your own report listing page, and not use DPR's [Catalogue component](#report-catalogue-component), you can link your reports to the request path directly.

```html
<h1>My reports list</h1>

<a href="/async/report/report-id-1/variant-id-1-1/request">Async report 1</a>
<a href="/async/report/report-id-1/variant-id-1-2/request">Async report 2</a>
<a href="/async/report/report-id-2/variant-id-2-1/request">Async report 3</a>
```

For information about the request path [see here](/reports/async-routes/#request-page)

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


export default function routes(services: Services): Router {

  ...

  router.get('/path/to/catalogue', (req, res) => {
    const catalogue = await CatalogueUtils.init({
      title: 'My reports',
      res,
      services,
    })

    res.render('reports-catalogue.njk', {
      catalogue
    })
  })
}
```

## Add the component to your HTML

```js
{ from "components/_catalogue/catalogue/view.njk" import dprCatalogue }

{ dprCatalogue(catalogue) }
```

See [Catalogue](/components/catalogue) component for usage and examples.

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


export default function routes(services: Services): Router {

  ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const {
      requestedReports,
      viewedReports,
      bookmarks,
    } = await UserReportsListUtils.initLists({ res, req, services })

    res.render('requested-reports.njk', {
      title: 'DPR test site',
      requestedReports,
      viewedReports,
      bookmarks
    })
  })
}
```

## Add the component to your HTML

```js
{ from "@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/user-reports/view.njk" import dprUserReports }

{ dprUserReports({
  requestedReports: requestedReports,
  viewedReports: viewedReports,
  bookmarks: bookmarks
}) }
```

See [Reports List](/components/reports-list) component for usage and examples.

