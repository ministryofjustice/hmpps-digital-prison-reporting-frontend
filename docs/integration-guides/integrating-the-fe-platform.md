---
layout: layouts/integration-guides/integrate-the-platform.njk
title: Integrating the FE platform
subsection: Integration Guides
---

This integration quide describes the steps required to use DPR's FE Platform into your service, using the <a href="https://github.com/ministryofjustice/hmpps-template-typescript" target="_blank">HMPPS TS template</a>

The FE platform provides means for services to integrate DPR reporting processes and features. 

**NOTE:** These steps are not required if you are only using DPRs embedded sync report handlers.  

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

```
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

# Setup the DPR user in locals

In your `populateCurrentUser` middleware, ensure you have `dprUser` defined in your `res.locals` 

```js
// example using manage user api
const user = await this.hmppsManageUsersClient.getUser(token)

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
import setUpDprResources from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/setUpDprResources'
import config from './config'

...

app.use(setUpDprResources(services, config.dpr))
```

<hr class='dpr-docs-hr'>

# Initialise routes

Import the async routes in to your `routes` file. See [reporting routes](/get-started/routes). 

This setup is commonly done in the `server/routes/index.ts` file of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>

```js
import dprPlatformRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes'

export function routes(services: Services): Router {
  const router = Router()
  
  ...

  router.use('/', dprPlatformRoutes({ services, layoutPath: 'path/to/layout.njk'})) 
}

export default routes
```

<hr class='dpr-docs-hr'>

# Quick start guide

This summary represents a simple view of the steps required for integrating the platform and should not be used in production. Please follow [these integration steps](#integration-steps) to integrate using best practices of the <a href="https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/routes/index.ts" target="_blank">HMPPS template</a>  

```js
// Clients
import initDprReportingClients from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dprReportingClient'
// services
import createDprServices from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/ReportStoreServiceUtils'
// middleware
import setUpDprResources from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/setUpDprResources'
// Routes
import dprPlatformRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes'

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
app.use(setUpDprResources(services, config.dpr))

// 5. Initialise routes
router.use('/', dprPlatformRoutes({ services, layoutPath: 'path/to/layout.njk',})) 
