---
layout: layouts/async-reports/async-reports-integration.njk
title: Integration guide
subsection: Async reports
---
## 🚧 COMING SOON 🚧

**Asynchronous reports is currently unavailable. The process and documentation is in development and will be available soon.**

This integration quide describes the steps required to use DPR's Asynchronous reporting process.

## What you will get

By following this integration process and embedding the process into your service, you will get:

- [Routes](/reports/async-routes) to handle the entire asynchronous report workflow.
- [Async specific features](/reports/report-features).

# Pre-requisites

- [Integrate the DPR FE Library](/get-started/integrating-the-library)
- [Initialise Redis client](#initialise-redis-client)
- [Get the current User ID](#current-user-id)

### Initialise Redis Client

An initialised Redis client is a dependency of DPR's report store which is a requirement of Async reporting. The report store is used to keep track of the state of a requested report, and enable features such as bookmarking and downloading. 

### Get the current User ID

The user ID of the currently logged in user is used as the primary key in the report store, to retrieve and store report information against a specific user.

A users report data will be stored using this key structure: 
```js
`dprReportStoreUser:${ uuid }`
```

The integration assumes that users `uuid` is located in the `res` object at `res.locals.user.uuid`. 

In the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/middleware/setUpCurrentUser.ts" target="_blank">HMPPS template</a> this is set in at `server/middleware/setUpCurrentUser.ts` 

# Integration steps

- [Add DPR API configuration](#add-dpr-api-configuration)
- [Initialise data clients](#initialise-data-clients)
- [Create services](#create-services)
- [Initialise report Store](#initialise-report-store)
- [Initialise routes](#initialise-routes)
- [Implement request route](#implement-request-route)

### Extras
- [Reports list component](#reports-list-component)
- [Integration overview example](#integration-overview-example)

## Add DPR API configuration

Add DPR API configuration to your `config.ts` file. 

```js
export default {
  ...
  apis: {
    ...
    dpr: {
      url: get('DPR_API_URL', 'http://127.0.0.1:3002', requiredInProduction),
      timeout: {
        response: Number(get('DPR_API_TIMEOUT_RESPONSE', 60000)),
        deadline: Number(get('DPR_API_TIMEOUT_DEADLINE', 60000)),
      },
      agent: new AgentConfig(Number(get('DPR_API_TIMEOUT_RESPONSE', 60000))),
    }
  }
  ...
}
```
See <a href="/get-started/environments" target="_blank">DPR Environments</a> for API base urls

## Initialise data clients

Initialise DPR data clients within your app setup to point to DPR's API endpoint. 

This setup is commonly done in the `server/data/index.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/data/index.ts" target="_blank">HMPPS template</a>

```js
import initDprReportingClients from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dprReportingClient'
import { createRedisClient } from './redisClient'
import config from '../config'

const {  
  reportingClient, 
  dashboardClient, 
  reportDataStore 
} = initDprReportingClients(config.apis.dpr, createRedisClient())

export const dataAccess = () => ({
  ...
  reportingClient, 
  dashboardClient, 
  reportDataStore
})

```

## Create services

Create the services for the async process. 

This setup is commonly done in the `server/services/index.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/services/index.ts" target="_blank">HMPPS template</a>

```js
import createDprServices from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/ReportStoreServiceUtils'

export const services = (): Services => {
  const { reportingClient, dashboardClient, reportDataStore, ... } = dataAccess()

  ...
  const dprServices = createDprServices({ reportingClient, dashboardClient, reportDataStore })

  return {
    ...,
    ...dprServices
  }
}

```

### Enable/disable features

You can disable certain features by adding extra config to the `createDprServices` method:

```js
const featureConfig = {
  bookmarking: false    // Disables bookmarking feature 
  download: false       // Disables download feature
}

const dprServices = createDprServices({ reportingClient, dashboardClient, reportDataStore }, featureConfig)
```

## Initialise DPR middleware

This setup is commonly done in the `server/app.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/app.ts" target="_blank">HMPPS template</a>

```js
import dprPopulateRequestedReports from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/populateRequestedReports'

...

app.use(dprPopulateRequestedReports(services))
```



## Initialise routes

Import the async routes in to your `routes` file which will give you access to the [async reporting paths](/reports/async-routes). 

This setup is commonly done in the `server/routes/index.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>

```js
import DprEmbeddedAsyncReports from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/DprEmbeddedReports'


export default function routes(services: Services): Router {
  
  ...

  DprEmbeddedAsyncReports({
    router,
    services,
    layoutPath: 'path/to/layout.njk',
  })
}
```

## Implement request route

Use the async report process by linking your report definitions to the async journey request page.

```html
<h1>My Async reports list</h1>

<a href="/async/report/report-id-1/variant-id-1-1/request">Async report 1</a>
<a href="/async/report/report-id-1/variant-id-1-2/request">Async report 2</a>
<a href="/async/report/report-id-2/variant-id-2-1/request">Async report 3</a>
```

For information about the request path [see here](/reports/async-routes/#request-page)


# Extras
## Reports list Component

**NOTE: Not required for the async process to work**

The report list component is used to:

- List requested reports
- List recently viewed reports
- List bookmarks
- Poll request status.

It is a useful component used to keep track of all you async requests so you can quickly navigate around the async journey. 

### Initialise the lists render data 

Render your stored async request data to the frontend using `UserReportsListUtils`

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

### Add the component to your HTML

[see "Reports List" component](/components/reports-list)


## Integration overview example

This example is designed to give a simple view of the steps required for integration process and should not be used in production. Please follow [these integration steps](#integration-steps) to integrate using best practices of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>  

```js
// Import DPR helpers and deps

// Clients
import initDprReportingClients from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dprReportingClient'
// services
import createDprServices from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/ReportStoreServiceUtils'
// middleware
import dprPopulateRequestedReports from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/populateRequestedReports'
// Routes
import DprAsyncReportsRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/asyncReports'

import { createRedisClient } from './redisClient'
import config from '../config'

// 1. Init Data clients
const clients = initDprReportingClients(config.apis.dpr, createRedisClient())

// 2. Create services
const services = {
  ...createDprServices(clients),
}

// 3. Add middleware
app.use(populateRequestedReports(services))

// 4. Initialise routes
DprAsyncReportsRoutes({
  router: app,
  services,
  layoutPath: 'page.njk',
})
