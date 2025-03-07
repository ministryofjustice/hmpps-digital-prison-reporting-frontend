const viewedReady = {
  reportId: 'test-report-3',
  id: 'variantId-1',
  executionId: 'exId_1729766362362',
  tableId: 'tblId_1729766362362',
  reportName: 'Test Report',
  variantName: 'Viewed report v2',
  name: 'Viewed report v2',
  description: 'this will succeed',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field2=value2.2&filters.field3.start=2004-02-01&filters.field3.end=2006-08-04&filters.field7=2003-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
      search:
        '?filters.field1=value1.1&filters.field2=value2.2&filters.field3.start=2004-02-01&filters.field3.end=2006-08-04&filters.field7=2003-02-01&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1',
    },
    report: {
      fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-24T10:39:32.169Z',
  },
  query: {
    data: {
      'filters.field1': 'value1.1',
      'filters.field2': 'value2.2',
      'filters.field3.start': '2004-02-01',
      'filters.field3.end': '2006-08-04',
      'filters.field6': 'Value 6.1',
      'filters.field7': '2003-02-01',
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
        value: 'value2.2',
      },
      {
        name: 'Field 3 start',
        value: '01/02/2004',
      },
      {
        name: 'Field 3 end',
        value: '04/08/2006',
      },
      {
        name: 'Field 6',
        value: 'Value 6.1',
      },
      {
        name: 'Field 7',
        value: '01/02/2003',
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
}

const viewedDashboard = {
  reportId: 'test-report-1',
  id: 'test-dashboard-8',
  executionId: 'exId_1730302242487',
  tableId: 'tblId_1730302242487',
  reportName: 'A Test Report',
  name: 'Viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request?',
      search: '',
    },
    report: {
      fullUrl:
        'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request/tblId_1730302242487/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-30T15:30:46.136Z',
  },
}

const viewedInteractive = {
  reportId: 'test-report-6',
  id: 'variantId-23',
  executionId: 'exId_1733925499607',
  tableId: 'tblId_1733925499607',
  reportName: 'Interactive reports',
  name: 'Interactive Report',
  description: 'this is an interactive report',
  type: 'report',
  status: 'READY',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/report/test-report-6/variantId-23/request?',
      pathname: '/async/report/test-report-6/variantId-23/request',
      search: '',
    },
    report: {
      pathname: '/async/report/test-report-6/variantId-23/request/tblId_1733925499607/report',
      fullUrl: 'http://localhost:3010/async/report/test-report-6/variantId-23/request/tblId_1733925499607/report',
    },
  },
  timestamp: {
    lastViewed: '2024-12-11T13:58:30.841Z',
  },
  query: {
    data: {},
    summary: [],
  },
}

const viewedExpired = {
  reportId: 'test-report-3',
  id: 'variantId-1',
  executionId: 'exId_1729766465228',
  tableId: 'tblId_1729766465228',
  reportName: 'Test Report',
  variantName: 'Expired viewed report v2',
  name: 'Expired viewed report v2',
  description: 'this will succeed',
  type: 'report',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl:
        'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
      search:
        '?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya',
    },
    report: {
      fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766465228/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-24T10:41:28.196Z',
    expired: '2024-10-24T10:41:28.196Z',
  },
  query: {
    data: {
      'filters.field2': 'value2.3',
      'filters.field3.start': '2003-09-05',
      'filters.field3.end': '2007-05-01',
      'filters.field4': 'Inigo Montoya',
      'filters.field7': '2007-05-04',
      sortColumn: 'field1',
      sortedAsc: 'true',
    },
    summary: [
      {
        name: 'Field 2',
        value: 'value2.3',
      },
      {
        name: 'Field 3 start',
        value: '05/09/2003',
      },
      {
        name: 'Field 3 end',
        value: '01/05/2007',
      },
      {
        name: 'Field 4',
        value: 'Inigo Montoya',
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
}

const expiredDashboard = {
  reportId: 'test-report-1',
  id: 'test-dashboard-8',
  executionId: 'exId_1730302123456',
  tableId: 'tblId_1730302123456',
  reportName: 'A Test Report',
  name: 'Expired viewed dashboard',
  description: 'Async Dashboard Testing',
  type: 'dashboard',
  status: 'EXPIRED',
  url: {
    origin: 'http://localhost:3010',
    request: {
      fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request?',
      search: '',
    },
    report: {
      fullUrl:
        'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request/tblId_1730302123456/report',
    },
  },
  timestamp: {
    lastViewed: '2024-10-30T15:30:46.136Z',
    expired: '2024-10-30T15:30:46.136Z',
  },
}

module.exports = {
  viewedReady,
  viewedExpired,
  viewedDashboard,
  expiredDashboard,
  viewedInteractive,
}
