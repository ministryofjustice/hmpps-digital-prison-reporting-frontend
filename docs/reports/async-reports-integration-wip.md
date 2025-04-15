---
layout: layouts/reporting.njk
title: Aync reports integration guide - WIP
---


### Initialise data clients

```js
// server/data/index.ts

import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'
import UserDataStore from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/userDataStore'
import { createRedisClient } from './redisClient'

...

export const dataAccess = () => ({
  reportingClient: new ReportingClient(config.apis.reporting),
  userDataStore: new UserDataStore(createRedisClient()),
  ...
})

```

### Initialise services

```js
// server/services/index.ts

import ReportingService from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/services/reportingService'
import { createUserStoreServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/StoreServiceUtils'


export const services = (): Services => {
  const { reportingClient, userDataStore, ... } = dataAccess()

  ...
  const reportingService = new ReportingService(reportingClient)
  const userStoreServices = createUserStoreServices(userDataStore)

  return {
    ...
    reportingService,
    ...userStoreServices,
  }
}

```

### Initialise Async Routes

```js
// server/routes/index.ts

import DprEmbeddedAsyncReports from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/asyncReports'


export default function routes(services: Services): Router {

  ...
  
  DprEmbeddedAsyncReports({
    router,
    services,
    layoutPath: 'path/to/layout.njk',
  })
}
```

