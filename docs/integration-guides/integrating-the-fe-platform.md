---
layout: layouts/integration-guides/integrate-the-platform.njk
title: Integrating the FE platform
subsection: Integration Guides
---

This guide explains how to integrate the DPR Frontend (FE) Platform into your service, using the <a href="https://github.com/ministryofjustice/hmpps-template-typescript" target="_blank">HMPPS TS template</a> as a reference.

The FE Platform provides a ready‑made user interface and routing layer that allows services to embed DPR’s reporting journeys and features with minimal setup.

**NOTE:**

These integration steps are only required if you want to use the full FE Platform.<br>
They are <i>not</i> required if you are only consuming DPR’s embedded synchronous report handlers.

## Outcome

By completing this guide, your service will have access to a set of predefined, fully‑integrated DPR routes for managing, viewing, and requesting reports.<br>
For details of the available endpoints, see the [reporting routes](/get-started/routes) section.

## Pre-requisites

- [Integrate the DPR FE Library](/integration-guides/integrating-the-library)

## Integration steps

- [Add DPR configuration](#add-dpr-configuration)
- [Initialise Redis client](#initialise-redis-client)
- [Initialise data clients](#initialise-data-clients)
- [Create services](#create-services)
- [Setup the DPR user in locals](#setup-the-dpr-user-in-locals)
- [Initialise middleware](#initialise-middleware)
- [Initialise routes](#initialise-routes)
- [Quick start guide](#quick-start-guide)

<hr class='dpr-docs-hr'>

# Add DPR configuration

### API config

Add DPR API configuration to your `config.ts` file.

```js
export const apis = {
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
export default {
  apis
}
```

See <a href="/get-started/environments" target="_blank">DPR Environments</a> for API base urls

### DPD path config

The DPD path is location in the definitions repo where your DPDs are stored. The path commonly follows this pattern:

```js
definitions/prisons/dps/${yourServiceName}
```

Add your DPD path to the `config.ts` file:

```js
export const apis = {
  ...
}
...
export const dpr = {
  dataProductDefinitionsPath: 'definitions/prisons/dps/yourServiceName'
}
export default {
  apis,
  dpr,
}
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
import { initDprReportingClients } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/initDprReportingClients'
import { createRedisClient } from './redisClient'
import config from '../config'

const {
  reportingClient,
  dashboardClient,
  reportDataStore,
  productCollectionClient,
  missingReportClient,
  featureFlagService,
} = initDprReportingClients(config.apis.dpr, createRedisClient())

export const dataAccess = () => ({
  ...reportingClient,
  dashboardClient,
  reportDataStore,
  productCollectionClient,
  missingReportClient,
  featureFlagService,
})
```

<hr class='dpr-docs-hr'>

# Create services

This setup is commonly done in the `server/services/index.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/services/index.ts" target="_blank">HMPPS template</a>

```js
import { createDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'

export const services = (): Services => {
  const {
    reportingClient,
    dashboardClient,
    reportDataStore,
    featureFlagService,
    ...
  } = dataAccess()

  const dprClients = {
    reportingClient,
    dashboardClient,
    reportDataStore,
    featureFlagService,
  }
  ...

  const dprServices = createDprServices(dprClients)

  return {
    ...,
    ...dprServices
  }
}

```

### Enable features

You can enable certain features by adding optional config to the `createDprServices` method:

```js
const featureConfig = {
  /** Enable/disable bookmarking
   *  - Bookmark links/buttons will be hidden
   *  - Bookmark service will be disabled
   */
  bookmarking: true

  /** Enable/disable download
   *  - Download links/buttons will be hidden
   */
  download: true

    /** Enable/disable feedbackOnDownload
   *  - If disabled, the download functionality will be available immediately
   *  - If enabled, users are required to fill out feedback to gain access to download
   */
  feedbackOnDownload: true,

   /** Enable/disable collections
   *  - collections dropdown will be hidden
   *  - collections service will be disabled
   */
  collections: true,

  /** Enable/disable Missing reports
   *  - Missing reports will be hidden in the report catalogue
   *  - Bookmark service will be disabled
   */
  missingReports: true,

  /** Enable/disable Save defaults
   *  - Save defaults button will be hidden in report filters
   *  - Save defaults service will be disabled
   */
  saveDefaults: true,
}

const dprServices = createDprServices(dprClients, featureConfig)
```

By default all features are set to `false`

<hr class='dpr-docs-hr'>

# Setup the DPR user in locals

In your `populateCurrentUser` middleware, ensure you have `dprUser` defined in your `res.locals`

```js
import { DprUser } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dprUser'

// example using manage user api
const user = await this.hmppsManageUsersClient.getUser(token)

// Init the DPR User
const dprUser = new DprUser()

// required
dprUser.token = res.locals.user.token
dprUser.id = user.uuid

// optional
dprUser.activeCaseLoadId = user.activeCaseLoadId
dprUser.emailAddress = user.email
dprUser.displayName = user.displayName
dprUser.staffId = user.staffId

res.locals.dprUser = dprUser
```

<hr class='dpr-docs-hr'>

# Initialise middleware

This setup is commonly done in the `server/app.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/app.ts" target="_blank">HMPPS template</a>

```js
import { setupResources } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/setUpDprResources'
import config from './config'

...
const env = nunjucksSetup(app, applicationInfo)

app.use(setupResources(services, 'path/to/layout.njk', env, config.dpr))
```

<hr class='dpr-docs-hr'>

# Initialise routes

Import the async routes in to your `routes` file. See [reporting routes](/get-started/routes).

This setup is commonly done in the `server/routes/index.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>

```js
import { routes as dprRoutes } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/routes'

export function routes(services: Services): Router {
  const router = Router()

  // Mount DPR routes BEFORE any root-level handlers.
  // This ensures internal DPR middleware (e.g. setUpNestedRoute)
  // runs correctly when the DPR router is entered.
  router.use('/', dprRoutes({ services, layoutPath: 'path/to/layout.njk' }))

  // Your application's own routes can follow afterwards
  router.get('/', controller.GET)

  return router
}

export default routes
```

This will give your application the preset DPR routes to use to run and manage your reports.

Note that all DPR routes are automatically namespaced under `/dpr`.  
So mounting the DPR router at a nested path like `/my/nested/route` will produce routes such as:

```js
/my/nested/route/dpr/...
```

See [reporting routes](/get-started/routes) to learn about the routes available to you.

## Important: Route ordering matters for nested mount paths

Express processes routes in the order they are registered.<br>
This becomes important when you mount DPR under a nested path, such as:

```js
router.use('/my/nested/route', dprRoutes(...))
```

The DPR library uses an internal nested route URL, so its middleware (such as `setUpNestedRoute()`) must run when a request enters the DPR router.

However, if you mount DPR at the application root (`'/'`), the routes are not considered nested and the middleware is a no‑op. In this case, route ordering is not important.

<hr class='dpr-docs-hr'>

# Quick start guide

This summary represents a simple view of the steps required for integrating the platform and should not be used in production. Please follow [these integration steps](#integration-steps) to integrate using best practices of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>

```js
// Clients
import { initDprReportingClients } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/initDprReportingClients'
// services
import { createDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/createDprServices'
// middleware
import { setupResources } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/setUpDprResources'
// Routes
import { routes as dprRoutes } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/routes'

import { createRedisClient } from './redisClient'
import config from '../config'

// 1. Init Data clients
const clients = initDprReportingClients(config.apis.dpr, createRedisClient())

// 2. Create services
const services = {
  ...createDprServices(clients),
}

// 3. Init DPR user in populateCurrentUser. See "Setup the DPR user in locals" section of guide

// 4. Add middleware
const env = nunjucksSetup(app, applicationInfo)
app.use(setupResources(services, 'path/to/layout.njk', env, config.dpr))

// 5. Initialise routes
router.use('/', dprRoutes({ services, layoutPath: 'path/to/layout.njk' }))
```
