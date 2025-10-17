---
layout: layouts/component.njk
title: Reports list
subsection: Async Report components
---
{% example "reports-list/default", 800, 'default' %}

## Overview

The report list component is used to:

- List requested reports
- List recently viewed reports
- List bookmarks
- Poll request status.

This component supports the async reports functionality by providing a way for user to navigate the through their requested reports. 

### When to use

Use this component when you have integrated async reports into your service and want to navigate:

- Requested reports.
- Recently viewed reports.
- Reports you have bookmarked.

### When not to use 

Do not use this component if you have not integrated async reports into your service. 

## How to use

This component requires you have followed the [async reporting integration steps](/reports/async-reports-integration)

Render your stored async request data to the frontend using `UserReportsListUtils`

```js
// server/routes/index.ts

import UserReportsListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/user-reports/utils'


export function routes(services: Services): Router {

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

export default routes
```

This will give you the arguments to simply apply as components arguments in the HTML:

```js
dprUserReports({
  requestedReports: requestedReports,
  viewedReports: viewedReports,
  bookmarks: bookmarks
})
```

### View and navigate requested reports

{% example "reports-list/requested", 800, 'requested' %}

