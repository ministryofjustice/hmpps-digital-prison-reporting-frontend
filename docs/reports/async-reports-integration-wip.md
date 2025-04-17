---
layout: layouts/reporting.njk
title: Aync reports integration guide - WIP
---
### Initialise data clients

```js
// server/data/index.ts

import { initDprReportingClients } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/dprReportingClient'
import { createRedisClient } from './redisClient'

reportingApiConfig = {
  url: `http://localhost:3010`,
  agent: { timeout: 10000 }
}

const { 
  reportingClient, 
  dashboardClient, 
  reportDataStore 
} = initDprReportingClients(config.apis.reporting, createRedisClient())

export const dataAccess = () => ({
  ...
  reportingClient, 
  dashboardClient, 
  reportDataStore
})

```

### create services

```js
// server/services/index.ts

import { initDprServices } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/utils/ReportStoreServiceUtils'


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

### Initialise report store services

Report store data is stored on a per user basis to create a unique experience for each user. eg. creating a users bookmarked list, or showing their recently viewed reports.

Therefore the user ID of the currently logged in user is required to initialise report store services.


```js
// server/app.tss

import setUpReportStore from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/middleware/setUpReportStore'

...
app.use(setUpReportStore(services))

```



### Initialise routes

```js
// server/routes/index.ts

import DprAsyncReports from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/routes/asyncReports'


export default function routes(services: Services): Router {
  
  ...

  DprAsyncReports({
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
