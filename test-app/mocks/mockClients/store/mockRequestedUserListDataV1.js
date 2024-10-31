const requestedReady = {
  dataProductDefinitionsPath: '',
  reportId: 'test-report-3',
  reportName: 'Test Report',
  description: 'this will succeed',
  variantId: 'variantId-1',
  name: 'Successful report v1',
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
        'http://localhost:3010/async-reports/test-report-3/variantId-1/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      pathname: '/async-reports/test-report-3/variantId-1/request',
      search:
        '?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-1/request/exId_1729765628165',
      pathname: '/async-reports/test-report-3/variantId-1/request/exId_1729765628165',
    },
    report: {
      pathname: '/async-reports/test-report-3/variantId-1/request/tblId_1729765628165/report',
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-1/request/tblId_1729765628165/report',
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

const requestedSubmitted = {
  dataProductDefinitionsPath: '',
  reportId: 'test-report-3',
  reportName: 'Test Report',
  description: 'this will succeed',
  variantId: 'variantId-1',
  name: 'Submitted report v1',
  timestamp: {
    requested: '2024-10-24T10:27:09.173Z',
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
        'http://localhost:3010/async-reports/test-report-3/variantId-1/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      pathname: '/async-reports/test-report-3/variantId-1/request',
      search:
        '?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-1/request/exId_1729765628165',
      pathname: '/async-reports/test-report-3/variantId-1/request/exId_1729765628165',
    },
    report: {},
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
  status: 'SUBMITTED',
}

const requestedExpired = {
  dataProductDefinitionsPath: '',
  reportId: 'test-report-3',
  reportName: 'Test Report',
  description: 'This will Expire after one minute',
  variantId: 'variantId-4',
  name: 'Expiring report v1',
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
        'http://localhost:3010/async-reports/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1',
      pathname: '/async-reports/test-report-3/variantId-4/request',
      search:
        '?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-4/request/exId_1729765871851',
      pathname: '/async-reports/test-report-3/variantId-4/request/exId_1729765871851',
    },
    report: {
      pathname: '/async-reports/test-report-3/variantId-4/request/tblId_1729765871851/report',
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-4/request/tblId_1729765871851/report',
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
  reportId: 'test-report-3',
  reportName: 'Test Report',
  description: 'this report was cancelled',
  variantId: 'variantId-1',
  name: 'Cancelled Report v1',
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
        'http://localhost:3010/async-reports/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      pathname: '/async-reports/test-report-3/variantId-1/request',
      search:
        '?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-1/request/exId_1729766013077',
      pathname: '/async-reports/test-report-3/variantId-1/request/exId_1729766013077',
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
  reportId: 'test-report-3',
  reportName: 'Test Report',
  description: 'this will fail with returned fail Status',
  variantId: 'variantId-2',
  name: 'Failing report v1',
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
        'http://localhost:3010/async-reports/test-report-3/variantId-2/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.2&filters.field4=Inigo+Montoya',
      pathname: '/async-reports/test-report-3/variantId-2/request',
      search:
        '?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.2&filters.field4=Inigo+Montoya',
    },
    polling: {
      fullUrl: 'http://localhost:3010/async-reports/test-report-3/variantId-2/request/exId_1729765694790',
      pathname: '/async-reports/test-report-3/variantId-2/request/exId_1729765694790',
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

module.exports = {
  requestedReady,
  requestedExpired,
  requestedFailed,
  requestedAborted,
  requestedSubmitted,
}
