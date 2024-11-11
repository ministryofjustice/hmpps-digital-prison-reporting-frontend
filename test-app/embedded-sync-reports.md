# Embedded Sync Reports WIP

This document is a work in progress to detail how to embed sync reports in to a UI using the routes import.

Some details and implementations may be missing in order to fully fulfil the requirements. This document should help identify these areas that require improvement and discussion

## What you will get

Implementing these instructions will add a sync report route with the following structure:

```js
// Path defintions
GET `/sync/report/${reportId}/${id}/report` 

GET `/sync/report/${reportId}/${id}/report?dataProductDefinitionsPath=${dpdPath}` 

// Example usage:
`sync/report/this-report-id-123/this-variant-id-123/report`

// Example with DPD path
`sync/report/this-report-id-123/this-variant-id-123/report?dataProductDefinitionsPath=/my/definitions/path`
```

Accessing this route will load the report, and render the report.



## Adding Sync reports to the UI


### Initialise services

The first step is to initialise the reporting service and create the services config:

```js
import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import ReportingService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/reportingService'

// Initialise Reporting Client with API endpoint
const clientArgs = {
  url: `http://localhost:3010`,
  agent: { timeout: 10000 }
}
const reportingClient = new ReportingClient(clientArgs)

// Initialise the reporting service with the reporting client
const reportingService = new ReportingService(reportingClient)

// create the services config
const services: Services = {
  reportingService
}
```

### Import the sync routes

In your routes file, import the sync reports route file and initialise the route:

```js
import addSyncReportsRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/recentlyViewed'

const routeConfig = {
  router: app,
  services,
  layoutPath: 'page.njk',
  templatePath: 'dpr/views/',
}

addSyncRoutes(routeConfig)
```

# Additional Features

Additonal features can be added to the sync reports by adding additional services, and updating config. The available features are as follows:

- [Report Download](#download) ✅
- Recently Viewed Reports list ❌ 
- Bookmarks ❌

## Pre-requisites

### Redis Client

To begin to use additional features, your Redis client will first need to be initialised, and then provided to the DPR `UserDataStore`. 

The `UserDataStore` is a required dependency of the additional feature services.

```js
import UserDataStore from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/userDataStore'

// Init your Redis Client and create the user data store
const yourRedisClient = createYourRedisClient()
const userDataStore = new UserDataStore(yourRedisClient),
```

### Get the current userId

The user ID of the logged in user is required to initialise additional services. 

Config is stored on a per user basic to create a unique experience for each user. eg. creating a users bookmarked list, or showing their recently viewed reports.

## Download:

```js
// Import the service
import DownloadPermissionService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/downloadPermissionService'

// Import the download routes
import addDownloadRoutes from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/download'

// Initialise with the UserDataStore, and userId
const downloadPermissionService = new DownloadPermissionService(UserDataStore)
const userId = myGetUserIdFunction()
downloadPermissionService.init(userId)

// Append to the services config
services: Services = {
  ...services,
  downloadPermissionService
}

const routeConfig = {
  router: app,
  services,
  layoutPath: 'page.njk',
  templatePath: 'dpr/views/',
}

// Initialise the download routes
addDownloadRoutes(routeConfig)

// Append to the features attrubute of the sync route config
addSyncRoutes({ 
  ...routeConfig
  features: {
    download: true
  }
})
```


