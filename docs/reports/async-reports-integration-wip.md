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

### Initialise routes

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

## Requested Reports list

### Initialise data

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

### Add component to template

```jinja
<!-- views/requested-reports.njk -->

{% from "dpr/components/user-reports/view.njk" import dprUserReports %}

{{ dprUserReports({
  requestedReports: requestedReports,
  viewedReports: viewedReports,
  bookmarks: bookmarks
}) }}
```
