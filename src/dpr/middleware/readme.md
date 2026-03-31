Please write a middleware function that will store the active report data into a namespaced session:

The requirements are:

- keep track of the current active report journey:
- should avoid collisions when multiple reports are run in different browser tabs
- should avoid collissions when the SAME report is run over different browser tabs

The data it will hold looks like this:

```
export interface AcitveReportSessionData {
  id: string
  reportId: string
  tableId?: string
  executionId?: string
  type: ReportType
  loadType: 'sync' : 'async'
  reportIsBookmarked: boolean
  downloadEnabled: boolean
  feedbackSubmissionFormPath?: string
  currentReportPathname?: string | undefined
  currentReportSearch?: string | undefined
  currentReportUrl?: string | undefined
}
```

The session data should be indexed by a concatenation of a combination of:

- reportId
- Id
- tableId
- executionId

`tableId` and `executionId` will not always be present as it only occurs:

- when the `loadType` is `async`
- `executionId` occurs in the middel the end of the active report journey, when the report is loading
- `tableId` occurs at the end of the active report journey, when the report has loaded

---

A single active report can have a maximum of three keys defined for it in the `activeReport` session:

- `reportId:Id` - stores data relevant about report (async and sync reports)
- `reportId:Id:executionId` - stores data relevant to execution id (only for async reports)
- `reportId:Id:tableId` - stores data relevant to a report instance with a tableId (only for async reports)

---

The field `loadType` is important as it will dictate under which key type certain values will be stored.

Under the index `reportId:Id` the following data should be stored:

```
  id: string
  reportId: string
  type: ReportType
  reportIsBookmarked: boolean
  downloadEnabled: boolean
  loadType: 'sync' : 'async'
```

if `loadType` is `sync` then the following will ALSO be stored under this key:

```
  feedbackSubmissionFormPath?: string
  currentReportPathname?: string | undefined
  currentReportSearch?: string | undefined
  currentReportUrl?: string | undefined
```

as these will not change through the report sync journey

---

If loadType is `async` then we expect there to be a `tableId` so Under the index `reportId:Id:tableId` the following data should be stored

```
  tableId?: string
  executionId?: string
  feedbackSubmissionFormPath?: string
  currentReportPathname?: string | undefined
  currentReportSearch?: string | undefined
  currentReportUrl?: string | undefined
```

as this is bespoke to the part of the journey where `tableId` is present and these URLs are constructed with `tableId` as part of the URL

---

All indexed `AcitveReportSessionData` data be stored under the namespace `activeReport`, so:

```
req.session.activeReport[index]
```

---

The useage should be as follows:

Async report

1. User starts active report journey for an `async` report:

- middleware knows the loadType at this point: `async`
- stores the relevant data under index `reportId:Id`

```
req.sesson.activeReport = {
  'example-report-id:example-id': {
    id: 'example-id'
    reportId: 'example-report-id'
    type: 'report'
    reportIsBookmarked: false
    downloadEnabled: false
    loadType: 'async'
  }
}
```

2. User requests report - Report is loading

- `executionId` is now present in the URL
- middleware stores all relevant data to an async report under a `reportId:Id:executionId` index

```
req.sesson.activeReport = {
  'example-report-id:example-id': {
    id: 'example-id'
    reportId: 'example-report-id'
    type: 'report'
    reportIsBookmarked: false
    downloadEnabled: false
    loadType: 'async'
  },
  'example-report-id:executionId': {
    executionId: 'example-table-id'
  }
}
```

NOTE: currently there is only the `executionId` to store under this index, which is absoluelty pointless as the executionId is needed to get the executionId, bonkers. BUT this is here to future proof the session in case we need/want to store more active data under a loading report. Is this a good idea, not sure?

3. The report loads

- `tableId` is present in URL and URLs are updated.
- middleware stores all relevant data to an async report under a `reportId:Id:tableId` index

```
req.sesson.activeReport = {
  'example-report-id:example-id': {
    id: 'example-id',
    reportId: 'example-report-id',
    type: 'report',
    reportIsBookmarked: false,
    downloadEnabled: false,
    loadType: 'async'
  },
  'example-report-id:example-id:example-table-id': {
    tableId: 'example-table-id',
    executionId: 'example-table-id' ,
    feedbackSubmissionFormPath: '/some/path',
    currentReportPathname?: '/some/path',
    currentReportSearch?: '?something=something',
    currentReportUrl?: '/some/path?something=something'
  }
}
```

Sync report

1. User starts active report journey for an `sync` report:

- middleware knows the loadType at this point: `sync`
- stores the data under index `reportId:Id`

```
req.sesson.activeReport = {
  'example-report-id:example-id': {
    id: 'example-id',
    reportId: 'example-report-id',
    type: 'report',
    reportIsBookmarked: false,
    downloadEnabled: false,
    loadType: 'sync'
    feedbackSubmissionFormPath: '/some/path',
    currentReportPathname?: '/some/path',
    currentReportSearch?: '?something=something',
    currentReportUrl?: '/some/path?something=something'
  }
}
```

---

When the session is data is required and needs to be references in the app, a helper function will be used.

The `req` and the parts for the index will be passed as args: eg

```
// Gets the data from the `reportId:Id` as no `tableId`, or `executionId`
const id = 'example-id'
const reportId = 'example-report-id'
const { feedbackSubmissionFormPath } = getActiveReportValue(req, { reportId, id })

// Gets the data from the `reportId:Id` as `tableId` is undefined
const id = 'example-id'
const reportId = 'example-report-id'
const tableId = undefined
const { feedbackSubmissionFormPath } = getActiveReportValue(req, { reportId, id, tableId })

// Gets the data from the `reportId:Id:tableId`
const id = 'example-id'
const reportId = 'example-report-id'
const tableId = 'example-table-id'
const { feedbackSubmissionFormPath } = getActiveReportValue(req, { reportId, id })
```

General questions:

- Will this process and implementation plan fulfill the requirements? No collisions etc
- Do these implementaion details make sense?
