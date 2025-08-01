const requestedReady = {
  dataProductDefinitionsPath: '',
  type: 'report',
  reportId: 'request-examples',
  reportName: 'Request examples',
  description: 'this will succeed',
  id: 'request-example-success',
  name: 'Successful report',
  timestamp: {
    requested: '2024-10-24T10:27:09.173Z',
    completed: '2024-10-24T10:27:15.448Z',
  },
  executionId: 'exId_1729765628165',
  tableId: 'tblId_1729765628165',
  filters: {
    data: {
      field1: 'value1.3',
      field2: 'value2.3',
      'field3.start': '2003-02-01',
      'field3.end': '2006-05-04',
      field6: 'Value 6.1',
      field7: '2005-02-01',
    },
    queryString:
      'field1=value1.3&field2=value2.3&field3.start=2003-02-01&field3.end=2006-05-04&field6=Value+6.1&field7=2005-02-01',
  },
  sortBy: {
    data: {
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    queryString: 'sortColumn=field1&sortedAsc=true',
  },
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-success/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      pathname: '/async/report/request-examples/request-example-success/request',
      search:
        '?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/report/request-examples/request-example-success/request/exId_1729765628165',
      pathname: '/async/report/request-examples/request-example-success/request/exId_1729765628165',
    },
    report: {
      pathname: '/async/report/request-examples/request-example-success/request/tblId_1729765628165/report',
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-success/request/tblId_1729765628165/report',
    },
  },
  query: {
    data: {
      'filters.field1': 'value1.3',
      'filters.field2': 'value2.3',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      'filters.field6': 'Value 6.1',
      'filters.field7': '2005-02-01',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.3',
      },
      {
        name: 'Field 2',
        value: 'value2.3',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2003',
      },
      {
        name: 'Field 3 end',
        value: '04/05/2006',
      },
      {
        name: 'Field 6',
        value: 'Value 6.1',
      },
      {
        name: 'Field 7',
        value: '01/02/2005',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
  status: 'FINISHED',
}

const requestedExpired = {
  dataProductDefinitionsPath: '',
  type: 'report',
  reportId: 'request-examples',
  reportName: 'Request examples',
  description: 'This will Expire after one minute',
  id: 'request-example-expire',
  name: 'Expiring report',
  timestamp: {
    requested: '2024-10-24T10:31:12.861Z',
    completed: '2024-10-24T10:31:22.225Z',
    expired: '2024-10-24T10:31:22.313Z',
  },
  executionId: 'exId_1729765871851',
  tableId: 'tblId_1729765871851',
  filters: {
    data: {
      field1: 'value1.3',
      field2: 'value2.1',
      'field3.start': '2003-02-01',
      'field3.end': '2006-05-04',
    },
    queryString: 'field1=value1.3&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04',
  },
  sortBy: {
    data: {
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    queryString: 'sortColumn=field1&sortedAsc=true',
  },
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-expire/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1',
      pathname: '/async/report/request-examples/request-example-expire/request',
      search:
        '?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/report/request-examples/request-example-expire/request/exId_1729765871851',
      pathname: '/async/report/request-examples/request-example-expire/request/exId_1729765871851',
    },
    report: {
      pathname: '/async/report/request-examples/request-example-expire/request/tblId_1729765871851/report',
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-expire/request/tblId_1729765871851/report',
    },
  },
  query: {
    data: {
      'filters.field1': 'value1.3',
      'filters.field2': 'value2.1',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.3',
      },
      {
        name: 'Field 2',
        value: 'value2.1',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2003',
      },
      {
        name: 'Field 3 end',
        value: '04/05/2006',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
  status: 'EXPIRED',
}

const requestedAborted = {
  dataProductDefinitionsPath: '',
  type: 'report',
  reportId: 'request-examples',
  reportName: 'Request examples',
  description: 'this will succeed',
  id: 'request-example-success',
  name: 'Cancelled report',
  timestamp: {
    requested: '2024-10-24T10:33:34.078Z',
    aborted: '2024-10-24T10:33:35.430Z',
  },
  executionId: 'exId_1729766013077',
  tableId: 'tblId_1729766013077',
  filters: {
    data: {
      field1: 'value1.1',
      field2: 'value2.3',
      'field3.start': '2003-02-01',
      'field3.end': '2006-05-04',
      field6: 'Value 6.1',
      field7: '2007-05-04',
    },
    queryString:
      'field1=value1.1&field2=value2.3&field3.start=2003-02-01&field3.end=2006-05-04&field6=Value+6.1&field7=2007-05-04',
  },
  sortBy: {
    data: {
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    queryString: 'sortColumn=field1&sortedAsc=true',
  },
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-success/request?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      pathname: '/async/report/request-examples/request-example-success/request',
      search:
        '?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async/report/request-examples/request-example-success/request/exId_1729766013077',
      pathname: '/async/report/request-examples/request-example-success/request/exId_1729766013077',
    },
    report: {},
  },
  query: {
    data: {
      'filters.field1': 'value1.1',
      'filters.field2': 'value2.3',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      'filters.field6': 'Value 6.1',
      'filters.field7': '2007-05-04',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.1',
      },
      {
        name: 'Field 2',
        value: 'value2.3',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2003',
      },
      {
        name: 'Field 3 end',
        value: '04/05/2006',
      },
      {
        name: 'Field 6',
        value: 'Value 6.1',
      },
      {
        name: 'Field 7',
        value: '04/05/2007',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
  status: 'ABORTED',
}

const requestedFailed = {
  dataProductDefinitionsPath: '',
  type: 'report',
  reportId: 'request-examples',
  reportName: 'Request examples',
  description: 'this will fail with returned Status: FAILED',
  id: 'request-example-fail-status',
  name: 'Failing report',
  timestamp: {
    requested: '2024-10-24T10:28:15.792Z',
    failed: '2024-10-24T10:28:22.013Z',
  },
  executionId: 'exId_1729765694790',
  tableId: 'tblId_1729765694790',
  filters: {
    data: {
      field1: 'value1.3',
      field2: 'value2.2',
      'field3.start': '2003-02-01',
      'field3.end': '2006-05-04',
      field4: 'Inigo Montoya',
    },
    queryString: 'field1=value1.3&field2=value2.2&field3.start=2003-02-01&field3.end=2006-05-04&field4=Inigo+Montoya',
  },
  sortBy: {
    data: {
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    queryString: 'sortColumn=field1&sortedAsc=true',
  },
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-fail-status/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.2&filters.field4=Inigo+Montoya',
      pathname: '/async/report/request-examples/request-example-fail-status/request',
      search:
        '?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.2&filters.field4=Inigo+Montoya',
    },
    polling: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-fail-status/request/exId_1729765694790',
      pathname: '/async/report/request-examples/request-example-fail-status/request/exId_1729765694790',
    },
    report: {},
  },
  query: {
    data: {
      'filters.field1': 'value1.3',
      'filters.field2': 'value2.2',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      'filters.field4': 'Inigo Montoya',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.3',
      },
      {
        name: 'Field 2',
        value: 'value2.2',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2003',
      },
      {
        name: 'Field 3 end',
        value: '04/05/2006',
      },
      {
        name: 'Field 4',
        value: 'Inigo Montoya',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
  status: 'FAILED',
  errorMessage: {
    userMessage: 'An error has occurred for some reason - Status API returned Failed Status',
    developerMessage: 'Mock stack trace',
  },
}

const requestedSubmitted = {
  dataProductDefinitionsPath: '',
  type: 'report',
  reportId: 'request-examples',
  reportName: 'Request examples',
  description: 'this will fail with returned Status: FAILED',
  id: 'request-example-fail-status',
  name: 'Submitted report',
  timestamp: {
    requested: '2024-10-24T10:28:15.792Z',
  },
  executionId: 'exId_1729765698654',
  tableId: 'tblId_1729765698654',
  filters: {
    data: {
      field1: 'value1.1',
      field2: 'value2.1',
      'field3.start': '2003-02-01',
      'field3.end': '2006-05-04',
      field4: 'Inigo Montoya',
    },
    queryString: 'field1=value1.1&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04&field4=Inigo+Montoya',
  },
  sortBy: {
    data: {
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    queryString: 'sortColumn=field1&sortedAsc=true',
  },
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-fail-status/request?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1&filters.field4=Inigo+Montoya',
      pathname: '/async/report/request-examples/request-example-fail-status/request',
      search:
        '?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1&filters.field4=Inigo+Montoya',
    },
    polling: {
      fullUrl:
        'http://localhost:3010/async/report/request-examples/request-example-fail-status/request/exId_1729765698654',
      pathname: '/async/report/request-examples/request-example-fail-status/request/exId_1729765698654',
    },
    report: {},
  },
  query: {
    data: {
      'filters.field1': 'value1.1',
      'filters.field2': 'value2.1',
      'filters.field3.start': '2003-02-01',
      'filters.field3.end': '2006-05-04',
      'filters.field4': 'Inigo Montoya',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 1',
        value: 'value1.1',
      },
      {
        name: 'Field 2',
        value: 'value2.1',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2003',
      },
      {
        name: 'Field 3 end',
        value: '04/05/2006',
      },
      {
        name: 'Field 4',
        value: 'Inigo Montoya',
      },
      {
        name: 'Sort Column',
        value: 'Field 1',
      },
      {
        name: 'Sort Direction',
        value: 'Ascending',
      },
    ],
  },
  status: 'SUBMITTED',
}

module.exports = {
  requestedReady,
  requestedExpired,
  requestedFailed,
  requestedAborted,
  requestedSubmitted,
}
