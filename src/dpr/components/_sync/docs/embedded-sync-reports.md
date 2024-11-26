# Embedded Sync Reports WIP

This document is a work in progress to detail how to embed sync reports in to a UI using the routes import.

#### contents:

- [What you will get](#what-you-will-get)
- [Adding sync reports to the UI](#adding-sync-reports-to-the-ui)
- [Options config](#options-config)
- [Additional features](#additional-features)

## What you will get

Implementing these instructions will add a sync report route with the following structure:

```js
// Path defintions
GET `/dpr/embedded/sync/report/${reportId}/${id}/report` 

GET `/dpr/embedded/sync/report/${reportId}/${id}/report?dataProductDefinitionsPath=${dpdPath}` 

// Example usage:
`/dpr/embedded/sync/report/this-report-id-123/this-variant-id-123/report`

// Example with DPD path
`/dpr/embedded/sync/report/this-report-id-123/this-variant-id-123/report?dataProductDefinitionsPath=/my/definitions/path`
```

Accessing this route will load the report, and render the report.



## Adding sync reports to the UI
 
#### Dependecies:

- `DprReportingService`
- `DprReportingClient`

#### Initialisation process:

There are multiple ways to initialise the sync report in to your service.

- [Sync route config](#sync-route-config) (simplest)
- [Pre-initialise services](#pre-initialise-services)


### Sync route config

This implementation initialises and loads the required services for you, and will give the the route to [view an render a report](#what-you-will-get)

```js
// Import the sync routes
import addSyncRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/recentlyViewed'

// Create the reporting client config
const reportingClientConfig: {
  url: `http://localhost:3010`,  // NOTE: DPR can provide you the our API endpoint to use here.
  agent: { timeout: 10000 }
}

// Create the route config
const routeConfig = {
  router: app,
  config: {
    reportingClient: reportingClientConfig
  }
}

// add the routes
addSyncRoutes(routeConfig)
```

### Pre-initialise services 

This implementation requires that you pre-initialise the dependency services and adding them to the route config.

```js
// Import the sync routes
import addSyncRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/recentlyViewed'

// Import the Reporting dependecies
import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import ReportingService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/reportingService'

// Initialise Reporting Client with API endpoint
const clientArgs = {
  url: `http://localhost:3010`, // NOTE: DPR can provide you the our API endpoint to use here.
  agent: { timeout: 10000 }
}

// Initialise the reporting service with the reporting client
const reportingClient = new ReportingClient(clientArgs)
const reportingService = new ReportingService(reportingClient)

// Create the services config
const preInitialsedServices: Services = {
  reportingService
}

// Initialise the route with the services in the config
addSyncRoutes({
  router: app,
  services: preInitialsedServices
})
```

## Options config

The route config accepts an options config. The full options config is as follows.

```js
addSyncRoutes({ 
  ...routeConfig,
  options: {
    // Set this option to use a definitions path without using query params
    dpdPath: `/my/definitions/path`
  }
})
```

# Additional features

Additonal features can be added to the sync reports by adding/loading additional services, and updating config. 

#### Feature availability:

- [Report Download](#download) ✅
- Recently Viewed Reports list 🚧 (under construction)
- Bookmarks 🚧 (under construction)

#### Dependencies:

- An initialised Redis client
- The logged in users `uuid`
- DPR `UserDataStore`

## Pre-requisites

- [Redis Client](#redis-client)
- [The current userId](#the-current-user-id)

### Redis Client

To begin to use additional features, your Redis client will first need to be initialised.

This is a required dependency of the DPR `UserDataStore`, which is required dependency for the additional features services.

### The current userId

The user ID of the logged in user is required to initialise additional services. 

Config is stored on a per user basic to create a unique experience for each user. eg. creating a users bookmarked list, or showing their recently viewed reports.

## Initialising Features

There are two ways to initialise features and the DPR `UserDataStore`

- [Initialising the user store via the config](#initialising-the-user-store-via-the-config) (simplest)
- [Pre-initialised user store](#re-initialised-user-store)

### Initialising the user store via the config (simplest)

```ts
// Init your Redis Client
const yourRedisClient = createYourRedisClient()

// Add the client features config
addSyncRoutes({
  ...
  features: {
    config: {
      redisClient: yourRedisClient
    }
    list: []
  },
})
```

### Pre-initialised user store

```ts
// Import the dependency
import UserDataStore from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/userDataStore'

// Init your Redis Client and create the user data store
const yourRedisClient = createYourRedisClient()
const initialisedUserDataStore = new UserDataStore(yourRedisClient),

// Add the service to the features config
addSyncRoutes({
  ...
  features: {
    config: {
      userDataStore: initialisedUserDataStore
    }
    list: [],
  },
})
```

## Download:

### Init download via config (simple)

```ts
addSyncRoutes({
  ...
  features: {
    config: {
      ...
      userId: 'userId',
    }
    list: ['download'],
  },
})
```

### Init download via service pre-initialisation

```js
// Import the service
import DownloadPermissionService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/downloadPermissionService'

// Import the download routes
import addDownloadRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/download'

// Initialise with the UserDataStore, and userId
const downloadPermissionService = new DownloadPermissionService(userDataStore)
const userId = myGetUserIdFunction()
downloadPermissionService.init(userId)

// Append to the services config
const preInitialsedServices: Services = {
  ...services,
  downloadPermissionService
}

// Initialise the download routes
addDownloadRoutes({
  router: app,
  services,
  layoutPath: 'page.njk',
  templatePath: 'dpr/views/',
})

// Append to the features attrubute of the sync route config
addSyncRoutes({
  ...
  services: preInitialsedServices
  features: {
    config: {
      ...
      userId: 'userId',
    }
    list: ['download'],
  },
})
```
