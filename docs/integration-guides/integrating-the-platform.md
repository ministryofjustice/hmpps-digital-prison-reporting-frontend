---
layout: layouts/integration-guides/integrate-the-platform.njk
title: Integrating the platform
subsection: Integration Guides
---

This integration quide describes the steps required to use DPR's Platform into your service, using the <a href="https://github.com/ministryofjustice/hmpps-template-typescript" target="_blank">HMPPS TS template</a>

## Pre-requisites

- [Integrate the DPR FE Library](/integration-guides/integrating-the-library)

## Integration steps

- [Add DPR configuration](#add-dpr-configuration)
- [Initialise Redis client](#initialise-redis-client)
- [Initialise data clients](#initialise-data-clients)
- [Create services](#create-services)
- [Get the current User ID](#current-the-current-user-id)
- [Initialise middleware](#initialise-middleware)
- [Initialise routes](#initialise-routes)

<hr class='dpr-docs-hr'>

# Add DPR configuration

### API config
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

### DPD path config

The DPD path is location in the definitions repo where your DPDs are stored. The path commonly follows this pattern: 

```
definitions/prisons/dps/${yourServiceName}
```

Add your DPD path to the `config.ts` file: 

```js
export default {
  ...
  apis: {
    ...
  }
  ...
  dpr {
    dataProductDefinitionPath: 'definitions/prisons/dps/yourServiceName'
  }
  ...
}
```

### Route prefix config

DPR routes are prefixed with `/dpr` by default. e.g.
```
/dpr/async/:type/:reportId/:id/request
```

This should adequate for your integration, however you can replace this prefix by adding your own to the `config.ts` file: 

```js
export default {
  ...
  apis: {
    ...
  }
  dpr: {
    ...
    routePrefix: '/my-prefix'
  }
  ...
}
```

This will adjust the routes accordingly. e.g.
```
/my-prefix/async/:type/:reportId/:id/request
```

<hr class='dpr-docs-hr'>

# Initialise Redis Client

An initialised Redis client is a dependency DPR's reporting platform. Redis is used to store report request config to keep track of the state of a requested report, and enable features such as bookmarking and downloading. 

See [next section (Initialise data clients)](#initialise-data-clients) for details on how the redis client is used. 

<hr class='dpr-docs-hr'>

# Initialise data clients

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

<hr class='dpr-docs-hr'>

# Create services 

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

<hr class='dpr-docs-hr'>

# Get the current User ID

The user ID of the currently logged in user is the primary key used in the report config store, to retrieve and store report information against a specific user.

A users report data will be stored using this key structure: 
```js
`dprReportStoreUser:${ uuid }`
```

The integration assumes that users `uuid` is located in the `res` object at `res.locals.user.uuid`. 

In the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/middleware/setUpCurrentUser.ts" target="_blank">HMPPS template</a> this is set in at `server/middleware/setUpCurrentUser.ts` 

<hr class='dpr-docs-hr'>

# Initialise middleware

This setup is commonly done in the `server/app.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/app.ts" target="_blank">HMPPS template</a>

```js
import dprPopulateRequestedReports from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/populateRequestedReports'
import setUpDprResources from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/setUpDprResources'
import config from './config'

...

app.use(setUpDprResources(services, config.dpr))
```

<hr class='dpr-docs-hr'>

# Initialise routes

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

This step will enable the page routes documented [here](/reports/async-routes)

<hr class='dpr-docs-hr'>

# Summary

This summary represents a simple view of the steps required for integrating the platform and should not be used in production. Please follow [these integration steps](#integration-steps) to integrate using best practices of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>  

```js
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
app.use(dprPopulateDefinitions(services, config.dpr))
app.use(dprPopulateRequestedReports(services))

// 4. Initialise routes
DprAsyncReportsRoutes({
  router: app,
  services,
  layoutPath: 'page.njk',
})
